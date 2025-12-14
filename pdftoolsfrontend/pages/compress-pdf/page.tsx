from fastapi import UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import tempfile
import os


def save_temp_file(data: bytes, suffix: str) -> str:
    fd, path = tempfile.mkstemp(suffix=suffix)
    with os.fdopen(fd, "wb") as f:
        f.write(data)
    return path


@app.post("/compress-pdf")
async def compress_pdf(file: UploadFile = File(...)):
    """
    Ek PDF le ke usko valid PDF ke रूप में hi wapas bhejega.
    (Abhi ke liye simple copy-compress, taaki error na aaye.)
    """
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    try:
        # 1) Upload se bytes le lo
        data = await file.read()
        if not data:
            raise HTTPException(status_code=400, detail="Empty file uploaded.")

        # 2) Output temp PDF bana do
        out_path = save_temp_file(data, ".pdf")

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process PDF: {e}")

    # 3) FileResponse se proper PDF bhej do
    return FileResponse(
        out_path,
        media_type="application/pdf",
        filename="compressed.pdf",
    )
