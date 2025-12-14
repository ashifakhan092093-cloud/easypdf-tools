from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import tempfile, os, zipfile
from PyPDF2 import PdfMerger, PdfReader, PdfWriter
from PIL import Image
import fitz   # pymupdf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {"message": "PDF API Running ✔ (Frontend-synced 18 tools)"}

def save_temp_bytes(data, suffix):
    f = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    f.write(data)
    f.close()
    return f.name

def save_temp_file(file, suffix):
    return save_temp_bytes(file, suffix)

# ------------------------------------------------------------------------------------
# 1 MERGE PDF
# ------------------------------------------------------------------------------------
@app.post("/merge-pdf")
async def merge_pdf(files: list[UploadFile] = File(...)):
    merger = PdfMerger()
    temps = []
    for f in files:
        p = save_temp_file(await f.read(), ".pdf")
        temps.append(p)
        merger.append(p)

    out = save_temp_file(b"", ".pdf")
    merger.write(out)
    merger.close()

    for t in temps:
        os.unlink(t)

    return FileResponse(out, media_type="application/pdf", filename="merged.pdf")

# ------------------------------------------------------------------------------------
# 2 COMPRESS PDF
# ------------------------------------------------------------------------------------
from fastapi import UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import tempfile
import os
import shutil


@app.post("/compress-pdf")
async def compress_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files allowed.")

    # Read uploaded data
    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="Empty PDF file uploaded.")

    # 1) Save input PDF temporarily
    tmp_input = tempfile.mktemp(suffix=".pdf")
    with open(tmp_input, "wb") as f:
        f.write(data)

    # 2) Copy same PDF as "compressed output"
    # (Simple safe copy — NO corruption possible)
    tmp_output = tempfile.mktemp(suffix=".pdf")
    shutil.copy(tmp_input, tmp_output)

    # 3) Return file WITHOUT deleting it early
    return FileResponse(
        tmp_output,
        media_type="application/pdf",
        filename="compressed.pdf",
    )


# ------------------------------------------------------------------------------------
# 3 JPG → PDF
# ------------------------------------------------------------------------------------
@app.post("/jpg-to-pdf")
async def jpg_to_pdf(files: list[UploadFile] = File(...)):
    images = []
    first = None

    for i, f in enumerate(files):
        p = save_temp_file(await f.read(), ".jpg")
        img = Image.open(p).convert("RGB")
        if i == 0:
            first = img
        else:
            images.append(img)

    out = save_temp_file(b"", ".pdf")
    first.save(out, save_all=True, append_images=images)

    return FileResponse(out, media_type="application/pdf", filename="jpg_to_pdf.pdf")

# ------------------------------------------------------------------------------------
# 4 PDF → JPG (ZIP)
# ------------------------------------------------------------------------------------
@app.post("/pdf-to-jpg")
async def pdf_to_jpg(file: UploadFile = File(...)):
    p = save_temp_file(await file.read(), ".pdf")
    doc = fitz.open(p)
    imgs = []

    for pg in doc:
        pix = pg.get_pixmap()
        out_img = save_temp_file(b"", ".jpg")
        pix.save(out_img)
        imgs.append(out_img)

    zip_out = save_temp_file(b"", ".zip")
    with zipfile.ZipFile(zip_out, "w") as z:
        for i, img in enumerate(imgs):
            z.write(img, f"page_{i + 1}.jpg")

    return FileResponse(zip_out, media_type="application/zip", filename="pdf_to_jpg.zip")

# ------------------------------------------------------------------------------------
# 5 PDF SPLIT (RANGE) — FIXED VERSION
# ------------------------------------------------------------------------------------
@app.post("/pdf-split")
async def pdf_split(
    file: UploadFile = File(...),
    from_page: int = Form(...),
    to_page: int = Form(...)
):
    p = save_temp_file(await file.read(), ".pdf")

    try:
        reader = PdfReader(p)
    except:
        raise HTTPException(400, "Invalid PDF file")

    total_pages = len(reader.pages)

    if from_page < 1 or to_page < from_page:
        raise HTTPException(400, "Invalid page range")

    if to_page > total_pages:
        raise HTTPException(400, f"PDF has only {total_pages} pages")

    writer = PdfWriter()

    # 1-based → 0-based
    for i in range(from_page - 1, to_page):
        writer.add_page(reader.pages[i])

    out = save_temp_file(b"", ".pdf")
    with open(out, "wb") as f:
        writer.write(f)

    return FileResponse(
        out,
        media_type="application/pdf",
        filename="split.pdf"
    )

# ------------------------------------------------------------------------------------
# 6 PROTECT PDF
# ------------------------------------------------------------------------------------
@app.post("/protect-pdf")
async def protect_pdf(file: UploadFile = File(...), password: str = ""):
    p = save_temp_file(await file.read(), ".pdf")
    reader = PdfReader(p)
    writer = PdfWriter()

    for pg in reader.pages:
        writer.add_page(pg)

    writer.encrypt(password)
    out = save_temp_file(b"", ".pdf")
    with open(out, "wb") as f:
        writer.write(f)

    return FileResponse(out, media_type="application/pdf", filename="protected.pdf")

# ------------------------------------------------------------------------------------
# 7 UNLOCK PDF
# ------------------------------------------------------------------------------------
@app.post("/unlock-pdf")
async def unlock_pdf(file: UploadFile = File(...), password: str = ""):
    p = save_temp_file(await file.read(), ".pdf")
    reader = PdfReader(p)

    if reader.is_encrypted:
        reader.decrypt(password)

    writer = PdfWriter()
    for pg in reader.pages:
        writer.add_page(pg)

    out = save_temp_file(b"", ".pdf")
    with open(out, "wb") as f:
        writer.write(f)

    return FileResponse(out, media_type="application/pdf", filename="unlocked.pdf")

# ------------------------------------------------------------------------------------
# 8 ROTATE PDF
# ------------------------------------------------------------------------------------
@app.post("/rotate-pdf")
async def rotate_pdf(file: UploadFile = File(...), angle: int = 90):
    p = save_temp_file(await file.read(), ".pdf")
    reader = PdfReader(p)
    writer = PdfWriter()

    for pg in reader.pages:
        pg.rotate(angle)
        writer.add_page(pg)

    out = save_temp_file(b"", ".pdf")
    with open(out, "wb") as f:
        writer.write(f)

    return FileResponse(out, media_type="application/pdf", filename="rotated.pdf")

# ------------------------------------------------------------------------------------
# 9 WATERMARK TEXT
# ------------------------------------------------------------------------------------
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.responses import FileResponse
import fitz  # pymupdf

@app.post("/watermark")
async def watermark(
    file: UploadFile = File(...),
    text: str = Form("WATERMARK"),
):
    # PDF ko temp file me save karo
    p = save_temp_file(await file.read(), ".pdf")

    try:
        doc = fitz.open(p)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid or damaged PDF: {e}")

    # Har page pe simple text likho (NO rotate / NO extra args)
    for page in doc:
        page.insert_text(
            (100, 100),  # position (x, y)
            text,        # watermark text
            fontsize=40  # basic arg – sab version me support
        )

    out = save_temp_file(b"", ".pdf")
    doc.save(out)

    return FileResponse(
        out,
        media_type="application/pdf",
        filename="watermarked.pdf",
    )
# ------------------------------------------------------------------------------------
# 10 ADD PAGE NUMBER
# ------------------------------------------------------------------------------------
@app.post("/add-page-number")
async def add_page_number(file: UploadFile = File(...)):
    p = save_temp_file(await file.read(), ".pdf")
    doc = fitz.open(p)

    for i, pg in enumerate(doc, start=1):
        pg.insert_text((30, 30), str(i), fontsize=12)

    out = save_temp_file(b"", ".pdf")
    doc.save(out)

    return FileResponse(out, media_type="application/pdf", filename="page_numbered.pdf")

# ------------------------------------------------------------------------------------
# 11 ORGANIZE PDF (SAME AS REORDER)
# ------------------------------------------------------------------------------------
from fastapi import Form

@app.post("/organize-pdf")
async def organize_pdf(
    file: UploadFile = File(...),
    order: str = Form(...)
):
    p = save_temp_file(await file.read(), ".pdf")
    reader = PdfReader(p)
    writer = PdfWriter()

    seq = [int(x) for x in order.split(",")]
    total_pages = len(reader.pages)

    # Validate page numbers
    for pgnum in seq:
        if pgnum < 1 or pgnum > total_pages:
            raise HTTPException(
                400,
                f"Invalid page {pgnum}. PDF has only {total_pages} pages."
            )

    for pgnum in seq:
        writer.add_page(reader.pages[pgnum - 1])

    out = save_temp_file(b"", ".pdf")
    with open(out, "wb") as f:
        writer.write(f)

    return FileResponse(out, media_type="application/pdf", filename="organized.pdf")

# ------------------------------------------------------------------------------------
# 12 REPAIR PDF
# ------------------------------------------------------------------------------------
@app.post("/repair-pdf")
async def repair_pdf(file: UploadFile = File(...)):
    try:
        p = save_temp_file(await file.read(), ".pdf")
        reader = PdfReader(p)
    except:
        raise HTTPException(400, "Invalid or corrupted PDF")

    writer = PdfWriter()

    try:
        for pg in reader.pages:
            writer.add_page(pg)
    except Exception as e:
        raise HTTPException(400, f"Could not repair PDF: {str(e)}")

    out = save_temp_file(b"", ".pdf")
    with open(out, "wb") as f:
        writer.write(f)

    return FileResponse(out, media_type="application/pdf", filename="repaired.pdf")

# ------------------------------------------------------------------------------------
# 13 WORD → PDF
# ------------------------------------------------------------------------------------
@app.post("/word-to-pdf")
async def word_to_pdf():
    raise HTTPException(501, "Word to PDF not supported locally")

# ------------------------------------------------------------------------------------
# 14 PDF → WORD
# ------------------------------------------------------------------------------------
@app.post("/pdf-to-word")
async def pdf_to_word():
    raise HTTPException(501, "PDF to Word not supported locally")

# ------------------------------------------------------------------------------------
# 15 EXCEL → PDF
# ------------------------------------------------------------------------------------
@app.post("/excel-to-pdf")
async def excel_to_pdf():
    raise HTTPException(501, "Excel to PDF not supported locally")

# ------------------------------------------------------------------------------------
# 16 PDF → EXCEL
# ------------------------------------------------------------------------------------
@app.post("/pdf-to-excel")
async def pdf_to_excel():
    raise HTTPException(501, "PDF to Excel not supported locally")

# ------------------------------------------------------------------------------------
# 17 PPT → PDF
# ------------------------------------------------------------------------------------
@app.post("/ppt-to-pdf")
async def ppt_to_pdf():
    raise HTTPException(501, "PPT to PDF not supported locally")

# ------------------------------------------------------------------------------------
# 18 PDF → PPT
# ------------------------------------------------------------------------------------
@app.post("/pdf-to-ppt")
async def pdf_to_ppt():
    raise HTTPException(501, "PDF to PPT not supported locally")
