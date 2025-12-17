import { useState } from "react";
import Link from "next/link";

export default function MergePdfPage() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setError("");
    const selected = Array.from(e.target.files || []);
    setFiles(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!files.length) {
      setError("Please select at least one PDF file.");
      return;
    }

    try {
      setIsProcessing(true);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      // 👉 YAHAN APNA BACKEND URL DALNA HAI
     const res = await fetch("https://easypdf-tools.onrender.com/merge-pdf", {
  method: "POST",
  body: formData,
});
      if (!res.ok) {
        throw new Error("Merge failed. Please try again.");
      }

      // Response ko Blob (PDF file) me convert karte hain
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="page page--inner">
      {/* HEADER same as home */}
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

      {/* TOOL HERO */}
      <section className="hero">
        <h1 className="hero-title">
          Merge <span className="hero-title-green">PDF</span> files
        </h1>
        <p className="hero-desc">
          Combine multiple PDF files into a single document, in the exact order you want.
        </p>
      </section>

      {/* TOOL CONTENT CARD */}
      <section className="tool-wrapper">
        <div className="tool-main-card">
          <h2 className="tool-main-title">Upload your files</h2>
          <p className="tool-main-subtitle">
            Drag &amp; drop PDFs here, or click to select files from your device.
          </p>

          <form className="upload-form" onSubmit={handleSubmit}>
            <label className="dropzone">
              <input
                type="file"
                multiple
                accept="application/pdf"
                className="file-input"
                onChange={handleFileChange}
              />
              <div className="dropzone-inner">
                <div className="dropzone-icon">⬆</div>
                <div className="dropzone-text-main">Drop PDF files here</div>
                <div className="dropzone-text-sub">or click to browse</div>
              </div>
            </label>

            {files.length > 0 && (
              <div className="selected-info">
                {files.length} file(s) selected
              </div>
            )}

            <div className="options-row">
              <label className="checkbox-row">
                <input type="checkbox" defaultChecked />
                <span>Keep original file order</span>
              </label>

              <label className="checkbox-row">
                <input type="checkbox" />
                <span>Create compressed output</span>
              </label>
            </div>

            {error && <div className="error-text">{error}</div>}

            <button
              type="submit"
              className="primary-btn"
              disabled={isProcessing}
            >
              {isProcessing ? "Merging..." : "Merge PDF"}
            </button>
          </form>
        </div>

        {/* SIDE INFO CARD */}
        <aside className="side-card">
          <h3 className="side-title">Tips</h3>
          <ul className="side-list">
            <li>Upload multiple PDFs to join them into one.</li>
            <li>Files are processed securely on our servers.</li>
            <li>Merged file is deleted automatically after download.</li>
          </ul>
        </aside>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <span>© {new Date().getFullYear()} EasyPDF Tools</span>
          <span className="footer-dot">•</span>
          <span>Merge PDFs safely in your browser.</span>
        </div>
      </footer>

      {/* SAME DESIGN CSS (home jaisa) */}
      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #f3f4f6;
          color: #0f172a;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        .page--inner {
          display: flex;
          flex-direction: column;
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 20;
          background: linear-gradient(90deg, #059669, #16a34a, #65a30d);
          color: #ffffff;
          border-bottom: 1px solid rgba(22, 163, 74, 0.35);
          box-shadow: 0 10px 30px rgba(15, 118, 110, 0.4);
        }

        .header-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-logo {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
        }

        .header-texts {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .header-title {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .header-subtitle {
          font-size: 11px;
          opacity: 0.9;
        }

        .header-pill {
          display: inline-flex;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.2);
          font-size: 11px;
          color: #ffffff;
          text-decoration: none;
          white-space: nowrap;
        }

        .header-pill:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .hero {
          max-width: 880px;
          margin: 32px auto 0 auto;
          padding: 0 16px;
          text-align: center;
        }

        .hero-title {
          font-size: 30px;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        @media (min-width: 640px) {
          .hero-title {
            font-size: 38px;
          }
        }

        .hero-title-green {
          color: #059669;
        }

        .hero-desc {
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.6;
          color: #4b5563;
        }

        .tool-wrapper {
          max-width: 1120px;
          margin: 28px auto 40px auto;
          padding: 0 16px 32px 16px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }

        @media (min-width: 900px) {
          .tool-wrapper {
            grid-template-columns: minmax(0, 2.3fr) minmax(0, 1fr);
            align-items: flex-start;
          }
        }

        .tool-main-card {
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
          padding: 18px 18px 20px 18px;
        }

        .tool-main-title {
          font-size: 16px;
          font-weight: 600;
        }

        .tool-main-subtitle {
          margin-top: 4px;
          font-size: 13px;
          color: #6b7280;
        }

        .upload-form {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .dropzone {
          border: 2px dashed #d1d5db;
          border-radius: 14px;
          background: #f9fafb;
          cursor: pointer;
          transition: all 0.15s ease-out;
          display: block;
        }

        .dropzone:hover {
          border-color: #059669;
          background: #ecfdf5;
        }

        .file-input {
          display: none;
        }

        .dropzone-inner {
          padding: 18px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .dropzone-icon {
          width: 32px;
          height: 32px;
          border-radius: 999px;
          background: #059669;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          margin-bottom: 4px;
        }

        .dropzone-text-main {
          font-size: 14px;
          font-weight: 600;
        }

        .dropzone-text-sub {
          font-size: 12px;
          color: #6b7280;
        }

        .selected-info {
          font-size: 12px;
          color: #374151;
        }

        .options-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12px;
          color: #374151;
        }

        @media (min-width: 640px) {
          .options-row {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .error-text {
          font-size: 12px;
          color: #b91c1c;
        }

        .primary-btn {
          margin-top: 4px;
          align-self: flex-start;
          padding: 8px 18px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(90deg, #059669, #16a34a);
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.4);
          transition: all 0.15s ease-out;
        }

        .primary-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 16px 30px rgba(16, 185, 129, 0.5);
        }

        .primary-btn:disabled {
          opacity: 0.7;
          cursor: default;
          box-shadow: none;
        }

        .side-card {
          background: #f9fafb;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          padding: 16px 16px 14px 16px;
        }

        .side-title {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .side-list {
          list-style: disc;
          padding-left: 18px;
          margin: 0;
          font-size: 12px;
          color: #4b5563;
        }

        .side-list li + li {
          margin-top: 4px;
        }

        .footer {
          border-top: 1px solid #e5e7eb;
          background: #ffffff;
        }

        .footer-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 12px 16px 18px 16px;
          font-size: 12px;
          color: #6b7280;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          text-align: center;
        }

        .footer-dot {
          opacity: 0.7;
        }
      `}</style>
    </main>
  );
}
