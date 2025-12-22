"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://easypdf-tools.onrender.com";

type ImgItem = { file: File; id: string; url: string };

export default function JpgToPdfPage() {
  const [items, setItems] = useState<ImgItem[]>([]);
  const [pageSize, setPageSize] = useState<"a4" | "letter">("a4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const totalFiles = items.length;

  const acceptFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const list: ImgItem[] = [];
    for (const f of Array.from(files)) {
      const isImg =
        f.type === "image/jpeg" ||
        f.type === "image/jpg" ||
        f.type === "image/png" ||
        f.name.toLowerCase().endsWith(".jpg") ||
        f.name.toLowerCase().endsWith(".jpeg") ||
        f.name.toLowerCase().endsWith(".png");

      if (!isImg) continue;

      list.push({
        file: f,
        id: `${f.name}-${f.size}-${crypto.randomUUID()}`,
        url: URL.createObjectURL(f),
      });
    }

    if (list.length === 0) {
      setError("Please select JPG/PNG images only.");
      return;
    }

    setError("");
    setSuccessMsg("");
    setDownloadUrl("");
    setItems((prev) => [...prev, ...list]);
  };

  const removeOne = (id: string) => {
    setItems((prev) => {
      const found = prev.find((x) => x.id === id);
      if (found) URL.revokeObjectURL(found.url);
      return prev.filter((x) => x.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach((x) => URL.revokeObjectURL(x.url));
    setItems([]);
    setDownloadUrl("");
    setError("");
    setSuccessMsg("");
  };

  const move = (id: string, dir: -1 | 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((x) => x.id === id);
      if (idx < 0) return prev;
      const next = [...prev];
      const swapWith = idx + dir;
      if (swapWith < 0 || swapWith >= next.length) return prev;
      [next[idx], next[swapWith]] = [next[swapWith], next[idx]];
      return next;
    });
  };

  const settingsLabel = useMemo(
    () =>
      `${pageSize.toUpperCase()} • ${
        orientation === "portrait" ? "Portrait" : "Landscape"
      }`,
    [pageSize, orientation]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setDownloadUrl("");

    if (items.length === 0) {
      setError("Please select at least 1 image.");
      return;
    }

    try {
      setIsProcessing(true);

      const formData = new FormData();
      // backend usually expects multiple files. Use "files" (most common).
      items.forEach((x) => formData.append("files", x.file));

      // optional settings (backend ignore kare to bhi ok)
      formData.append("page_size", pageSize);
      formData.append("orientation", orientation);

      const res = await fetch(`${API_BASE}/jpg-to-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Failed to convert JPG to PDF.");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);

      // AUTO DOWNLOAD
      const a = document.createElement("a");
      a.href = url;
      a.download = "images.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setSuccessMsg("✅ PDF downloaded. Check your Downloads folder.");
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
          JPG to <span className="hero-title-green">PDF</span>
        </h1>
        <p className="hero-desc">
          Convert multiple images into a single PDF (auto download + button).
        </p>
      </section>

      {/* CONTENT */}
      <section className="tool-wrapper">
        <div className="tool-main-card">
          <div className="top-row">
            <div>
              <h2 className="tool-main-title">Upload images</h2>
              <p className="tool-main-subtitle">
                Select JPG/PNG files, arrange order, then convert.
              </p>
            </div>

            {totalFiles > 0 && (
              <button type="button" className="ghost-btn" onClick={clearAll}>
                Clear
              </button>
            )}
          </div>

          <form className="upload-form" onSubmit={handleSubmit}>
            <label className="dropzone">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                multiple
                className="file-input"
                onChange={(e) => acceptFiles(e.target.files)}
              />
              <div className="dropzone-inner">
                <div className="dropzone-icon">⬆</div>
                <div className="dropzone-text-main">Drop images here</div>
                <div className="dropzone-text-sub">or click to browse</div>
              </div>
            </label>

            {totalFiles > 0 && (
              <div className="selected-info">
                Selected: <b>{totalFiles}</b> file(s) • Settings:{" "}
                <b>{settingsLabel}</b>
              </div>
            )}

            {/* SETTINGS */}
            <div className="level-card">
              <div className="level-title">PDF settings</div>
              <div className="settings-grid">
                <div className="field">
                  <label className="field-label">Page size</label>
                  <div className="pill-row">
                    <button
                      type="button"
                      className={`pill ${pageSize === "a4" ? "active" : ""}`}
                      onClick={() => setPageSize("a4")}
                    >
                      A4
                    </button>
                    <button
                      type="button"
                      className={`pill ${
                        pageSize === "letter" ? "active" : ""
                      }`}
                      onClick={() => setPageSize("letter")}
                    >
                      Letter
                    </button>
                  </div>
                </div>

                <div className="field">
                  <label className="field-label">Orientation</label>
                  <div className="pill-row">
                    <button
                      type="button"
                      className={`pill ${
                        orientation === "portrait" ? "active" : ""
                      }`}
                      onClick={() => setOrientation("portrait")}
                    >
                      Portrait
                    </button>
                    <button
                      type="button"
                      className={`pill ${
                        orientation === "landscape" ? "active" : ""
                      }`}
                      onClick={() => setOrientation("landscape")}
                    >
                      Landscape
                    </button>
                  </div>
                </div>
              </div>
              <div className="level-note">
                Note: Agar backend settings use nahi karta, safely ignore ho
                jayega.
              </div>
            </div>

            {/* PREVIEW / ORDER */}
            {totalFiles > 0 && (
              <div className="preview-card">
                <div className="preview-title">Order / Preview</div>
                <div className="preview-grid">
                  {items.map((x, idx) => (
                    <div key={x.id} className="thumb">
                      <div className="thumb-img-wrap">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="thumb-img" src={x.url} alt={x.file.name} />
                        <div className="thumb-badge">{idx + 1}</div>
                      </div>

                      <div className="thumb-name" title={x.file.name}>
                        {x.file.name}
                      </div>

                      <div className="thumb-actions">
                        <button
                          type="button"
                          className="mini"
                          onClick={() => move(x.id, -1)}
                          disabled={idx === 0}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className="mini"
                          onClick={() => move(x.id, 1)}
                          disabled={idx === items.length - 1}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          className="mini danger"
                          onClick={() => removeOne(x.id)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && <div className="error-text">{error}</div>}
            {successMsg && <div className="success-text">{successMsg}</div>}

            <button
              type="submit"
              className="primary-btn"
              disabled={isProcessing || totalFiles === 0}
            >
              {isProcessing ? "Converting..." : "Convert to PDF"}
            </button>

            {/* Backup manual download button */}
            {downloadUrl && (
              <div className="download-box">
                <div className="download-title">Your PDF is ready:</div>
                <a href={downloadUrl} download="images.pdf" className="download-btn">
                  Download PDF
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
            <li>Up/Down buttons se order set karo.</li>
            <li>PNG bhi supported hai.</li>
            <li>PDF auto-download hota hai + manual button bhi hai.</li>
          </ul>
        </aside>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <span>© {new Date().getFullYear()} EasyPDF Tools</span>
          <span className="footer-dot">•</span>
          <span>Convert images safely in your browser.</span>
        </div>
      </footer>

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
        .top-row{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
        .tool-main-title{font-size:16px;font-weight:600}
        .tool-main-subtitle{margin-top:4px;font-size:13px;color:#6b7280}
        .ghost-btn{border:1px solid #e5e7eb;background:#fff;border-radius:12px;padding:8px 12px;font-size:12px;cursor:pointer}
        .ghost-btn:hover{border-color:#059669;color:#059669}

        .upload-form{margin-top:16px;display:flex;flex-direction:column;gap:14px}
        .dropzone{border:2px dashed #d1d5db;border-radius:14px;background:#f9fafb;cursor:pointer;transition:all .15s ease-out;display:block}
        .dropzone:hover{border-color:#059669;background:#ecfdf5}
        .file-input{display:none}
        .dropzone-inner{padding:18px 14px;display:flex;flex-direction:column;align-items:center;gap:4px}
        .dropzone-icon{width:32px;height:32px;border-radius:999px;background:#059669;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:4px}
        .dropzone-text-main{font-size:14px;font-weight:600}
        .dropzone-text-sub{font-size:12px;color:#6b7280}
        .selected-info{font-size:12px;color:#374151}

        .level-card{border:1px solid #e5e7eb;border-radius:14px;background:#f9fafb;padding:12px}
        .level-title{font-size:12px;font-weight:700;color:#374151;margin-bottom:10px}
        .settings-grid{display:grid;grid-template-columns:1fr;gap:12px}
        @media(min-width:640px){.settings-grid{grid-template-columns:1fr 1fr}}
        .field-label{display:block;font-size:11px;color:#6b7280;margin-bottom:6px}
        .pill-row{display:flex;gap:8px;flex-wrap:wrap}
        .pill{border:1px solid #e5e7eb;background:#fff;border-radius:999px;padding:8px 12px;font-size:12px;cursor:pointer}
        .pill.active{border-color:#059669;box-shadow:0 0 0 3px rgba(16,185,129,.18)}
        .level-note{margin-top:10px;font-size:11px;color:#6b7280}

        .preview-card{border:1px solid #e5e7eb;border-radius:14px;background:#fff;padding:12px}
        .preview-title{font-size:12px;font-weight:700;color:#374151;margin-bottom:10px}
        .preview-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
        @media(min-width:640px){.preview-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
        @media(min-width:900px){.preview-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
        .thumb{border:1px solid #e5e7eb;border-radius:12px;padding:10px;background:#f9fafb}
        .thumb-img-wrap{position:relative;border-radius:10px;overflow:hidden;background:#fff;border:1px solid #e5e7eb}
        .thumb-img{width:100%;height:110px;object-fit:cover;display:block}
        .thumb-badge{position:absolute;top:8px;left:8px;background:#059669;color:#fff;border-radius:999px;padding:3px 8px;font-size:11px;font-weight:700}
        .thumb-name{margin-top:8px;font-size:11px;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .thumb-actions{margin-top:8px;display:flex;gap:6px}
        .mini{flex:1;border:1px solid #e5e7eb;background:#fff;border-radius:10px;padding:6px 0;font-size:12px;cursor:pointer}
        .mini:disabled{opacity:.5;cursor:not-allowed}
        .mini.danger{border-color:#fecaca;background:#fff}
        .mini.danger:hover{background:#fef2f2}

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
