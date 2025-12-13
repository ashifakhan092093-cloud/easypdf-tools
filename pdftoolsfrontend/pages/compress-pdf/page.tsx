@app.post("/compress-pdf")
async def compress_pdf(file: UploadFile = File(...)):
    """
    Single PDF ko compress karke naya PDF return karega.
    Frontend se field name EXACT "file" aana chahiye.
    """
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    # --- 1) Input PDF ko temp file me save karo ---
    try:
        original_bytes = await file.read()
        input_path = save_temp_file(original_bytes, ".pdf")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read uploaded file: {e}")

    # --- 2) Naya compressed PDF banane ki koshish karo ---
    output_path = save_temp_file(b"", ".pdf")

    try:
        reader = PdfReader(input_path)
        writer = PdfWriter()

        # Simple "compression": pages copy + object cleanup
        for page in reader.pages:
            writer.add_page(page)

        # Optional: metadata hata do (thoda size kam)
        writer.add_metadata({})

        with open(output_path, "wb") as out_f:
            writer.write(out_f)

    except Exception as e:
        # Agar kuch bhi galat ho jaye to clean up + error
        if os.path.exists(output_path):
            os.unlink(output_path)
        raise HTTPException(status_code=500, detail=f"Failed to compress PDF: {e}")
    finally:
        # Input temp file delete
        if os.path.exists(input_path):
            os.unlink(input_path)

    # --- 3) Compressed PDF client ko bhejo ---
    return FileResponse(
        output_path,
        media_type="application/pdf",
        filename="compressed.pdf",
    )
