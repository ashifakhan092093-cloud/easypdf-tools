"use client";

import { useState } from "react";
import Link from "next/link";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://easypdf-tools.onrender.com";

export default function PdfToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<"high" | "medium" | "low">("high");

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setDownloadUrl("");

    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    try {
      setIsProcessing(true);

      const formData = new FormData();
      formData.append("file", file);
      // optional: backend ignore kare to bhi ok
      formData.append("quality", quality);

      // NOTE: backend endpoint name must match your FastAPI
      const res = await fetch(`${API_BASE}/pdf-to-jpg`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Failed to convert PDF to JPG.");
      }

      // Most backends return a ZIP of JPGs
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);

      // auto download
      const a = document.createElement("a");
      a.href = url;
      a.download = "pdf-to-jpg.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setSuccessMsg("✅ Images downloaded. Check your Downloads folder.");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong while converting.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="page page--inner">
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <div className="header-logo">PDF</div>
            <div className="header-texts">
              <div className="header-title">EasyPDF Tools</div>
              <div className="header-subtitle">Fast • Free • Secure</div>
            </div>
          </div>

          <Link href="/" className="header-pill">
            ← Back to all tools
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">
          PDF to <span className="hero-title-green">JPG</span>
        </h1>
        <p className="hero-desc">
          Convert each page of your PDF into JPG images (downloaded as a ZIP).
        </p>
      </section>

      {/* CONTENT */}
      <section className="tool-wrapper">
        <div className="tool-main-card">
          <h2 className="tool-main-title">Upload your file</h2>
          <p className="tool-main-subtitle">
            Choose output quality and download JPG images.
          </p>

          <form className="upload-form" onSubmit={handleSubmit}>
            <label className="dropzone">
              <input
                type="file"
                accept="application/pdf"
                className="file-input"
                onChange={(e) => {
                  setError("");
                  setSuccessMsg("");
                  setDownloadUrl("");
                  setFile(e.target.files?.[0] || null);
                }}
              />
              <div className="dropzone-inner">
                <div className="dropzone-icon">⬆</div>
                <div className="dropzone-text-main">Drop PDF here</div>
                <div className="dropzone-text-sub">or click to browse</div>
              </div>
            </label>

            {file && (
              <div className="selected-info">
                Selected: <b>{file.name}</b>
              </div>
            )}

            <div className="level-card">
              <div className="level-title">Image quality</div>
              <div className="level-grid">
                <label className={`level-pill ${quality === "high" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="quality"
                    value="high"
                    checked={quality === "high"}
                    onChange={() => setQuality("high")}
                  />
                  <span>High</span>
                  <small>Best quality</small>
                </label>

                <label className={`level-pill ${quality === "medium" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="quality"
                    value="medium"
                    checked={quality === "medium"}
                    onChange={() => setQuality("medium")}
                  />
                  <span>Medium</span>
                  <small>Balanced</small>
                </label>

                <label className={`level-pill ${quality === "low" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="quality"
                    value="low"
                    checked={quality === "low"}
                    onChange={() => setQuality("low")}
                  />
                  <span>Low</span>
                  <small>Smallest size</small>
                </label>
              </div>
              <div className="level-note">
                Note: If your backend doesn’t use “quality”, it will ignore it safely.
              </div>
            </div>

            {error && <div className="error-text">{error}</div>}
            {successMsg && <div className="success-text">{successMsg}</div>}

            <button
              type="submit"
              className="primary-btn"
              disabled={isProcessing || !file}
            >
              {isProcessing ? "Converting..." : "Convert to JPG"}
            </button>

            {/* Backup manual download button */}
            {downloadUrl && (
              <div className="download-box">
                <div className="download-title">Your JPG images are ready:</div>
                <a
                  href={downloadUrl}
                  download="pdf-to-jpg.zip"
                  className="download-btn"
                >
                  Download JPG ZIP
                </a>
                <div className="download-note">
                  If auto-download didn’t start, use this button.
                </div>
              </div>
            )}
          </form>
        </div>

        {/* SIDE CARD */}
        <aside className="side-card">
          <h3 className="side-title">Tips</h3>
          <ul className="side-list">
            <li>Each PDF page becomes one JPG image.</li>
            <li>Download will be a ZIP file.</li>
            <li>Large PDFs can take more time.</li>
          </ul>
        </aside>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <span>© {new Date().getFullYear()} EasyPDF Tools</span>
          <span className="footer-dot">•</span>
          <span>Convert PDFs safely in your browser.</span>
        </div>
      </footer>

      {/* SAME DESIGN CSS */}
      <style jsx>{`
        .page{min-height:100vh;background:#f3f4f6;color:#0f172a;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
        .page--inner{display:flex;flex-direction:column}
        .header{position:sticky;top:0;z-index:20;background:linear-gradient(90deg,#059669,#16a34a,#65a30d);color:#fff;border-bottom:1px solid rgba(22,163,74,.35);box-shadow:0 10px 30px rgba(15,118,110,.4)}
        .header-inner{max-width:1120px;margin:0 auto;padding:14px 16px;display:flex;align-items:center;justify-content:space-between}
        .header-left{display:flex;align-items:center;gap:12px}
        .header-logo{width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700}
        .header-texts{display:flex;flex-direction:column;gap:2px}
        .header-title{font-size:18px;font-weight:800;letter-spacing:-.03em}
        .header-subtitle{font-size:11px;opacity:.9}
        .header-pill{display:inline-flex;padding:6px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.2);font-size:11px;color:#fff;text-decoration:none;white-space:nowrap}
        .header-pill:hover{background:rgba(255,255,255,.3)}
        .hero{max-width:880px;margin:32px auto 0;padding:0 16px;text-align:center}
        .hero-title{font-size:30px;font-weight:800;letter-spacing:-.04em}
        @media(min-width:640px){.hero-title{font-size:38px}}
        .hero-title-green{color:#059669}
        .hero-desc{margin-top:10px;font-size:14px;line-height:1.6;color:#4b5563}
        .tool-wrapper{max-width:1120px;margin:28px auto 40px;padding:0 16px 32px;display:grid;grid-template-columns:1fr;gap:18px}
        @media(min-width:900px){.tool-wrapper{grid-template-columns:minmax(0,2.3fr) minmax(0,1fr);align-items:flex-start}}
        .tool-main-card{background:#fff;border-radius:18px;border:1px solid #e5e7eb;box-shadow:0 10px 22px rgba(15,23,42,.08);padding:18px 18px 20px}
        .tool-main-title{font-size:16px;font-weight:600}
        .tool-main-subtitle{margin-top:4px;font-size:13px;color:#6b7280}
        .upload-form{margin-top:16px;display:flex;flex-direction:column;gap:14px}
        .dropzone{border:2px dashed #d1d5db;border-radius:14px;background:#f9fafb;cursor:pointer;transition:all .15s ease-out;display:block}
        .dropzone:hover{border-color:#059669;background:#ecfdf5}
        .file-input{display:none}
        .dropzone-inner{padding:18px 14px;display:flex;flex-direction:column;align-items:center;gap:4px}
        .dropzone-icon{width:32px;height:32px;border-radius:999px;background:#059669;color:white;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:4px}
        .dropzone-text-main{font-size:14px;font-weight:600}
        .dropzone-text-sub{font-size:12px;color:#6b7280}
        .selected-info{font-size:12px;color:#374151}

        .level-card{border:1px solid #e5e7eb;border-radius:14px;background:#f9fafb;padding:12px}
        .level-title{font-size:12px;font-weight:700;color:#374151;margin-bottom:10px}
        .level-grid{display:grid;grid-template-columns:1fr;gap:10px}
        @media(min-width:640px){.level-grid{grid-template-columns:1fr 1fr 1fr}}
        .level-pill{border:1px solid #e5e7eb;border-radius:12px;background:#fff;padding:10px;cursor:pointer;display:flex;flex-direction:column;gap:4px;transition:all .15s ease-out}
        .level-pill input{display:none}
        .level-pill span{font-size:13px;font-weight:700;color:#111827}
        .level-pill small{font-size:11px;color:#6b7280}
        .level-pill.active{border-color:#059669;box-shadow:0 0 0 3px rgba(16,185,129,.18)}
        .level-note{margin-top:10px;font-size:11px;color:#6b7280}

        .error-text{font-size:12px;color:#b91c1c;background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:10px 12px}
        .success-text{font-size:12px;color:#065f46;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;padding:10px 12px}
        .primary-btn{margin-top:4px;align-self:flex-start;padding:8px 18px;border-radius:999px;border:none;background:linear-gradient(90deg,#059669,#16a34a);color:#fff;font-size:13px;font-weight:600;cursor:pointer;box-shadow:0 10px 20px rgba(16,185,129,.4);transition:all .15s ease-out}
        .primary-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 16px 30px rgba(16,185,129,.5)}
        .primary-btn:disabled{opacity:.7;cursor:default;box-shadow:none}

        .download-box{margin-top:6px;border:1px solid #e5e7eb;border-radius:14px;padding:12px;background:#f9fafb}
        .download-title{font-size:12px;color:#374151;margin-bottom:8px;font-weight:600}
        .download-btn{display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:12px;background:#059669;color:#fff;text-decoration:none;font-size:13px;font-weight:700}
        .download-btn:hover{background:#047857}
        .download-note{margin-top:8px;font-size:11px;color:#6b7280}

        .side-card{background:#f9fafb;border-radius:16px;border:1px solid #e5e7eb;padding:16px 16px 14px}
        .side-title{font-size:14px;font-weight:600;margin-bottom:6px}
        .side-list{list-style:disc;padding-left:18px;margin:0;font-size:12px;color:#4b5563}
        .side-list li+li{margin-top:4px}

        .footer{border-top:1px solid #e5e7eb;background:#fff}
        .footer-inner{max-width:1120px;margin:0 auto;padding:12px 16px 18px;font-size:12px;color:#6b7280;display:flex;justify-content:center;align-items:center;gap:4px;text-align:center}
        .footer-dot{opacity:.7}
      `}</style>
    </main>
  );
}
