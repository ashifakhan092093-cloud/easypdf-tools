import { useState } from "react";
import Link from "next/link";

const FILTERS = [
  "All",
  "Organize PDF",
  "Optimize PDF",
  "Convert PDF",
  "Edit PDF",
  "PDF Security",
];

const TOOLS = [
  { name: "Merge PDF", href: "/merge-pdf/page", desc: "Combine PDFs in the order you want.", tag: "Organize PDF" },
  { name: "Split PDF", href: "/pdf-split/page", desc: "Split a PDF into multiple files.", tag: "Organize PDF" },
  { name: "Compress PDF", href: "/compress-pdf/page", desc: "Reduce file size while keeping quality.", tag: "Optimize PDF" },
  { name: "PDF to Word", href: "/pdf-to-word/page", desc: "Convert PDF to DOCX editable files.", tag: "Convert PDF" },
  { name: "Word to PDF", href: "/word-to-pdf/page", desc: "Save Word documents as PDF.", tag: "Convert PDF" },
  { name: "PDF to Excel", href: "/pdf-to-excel/page", desc: "Turn PDF tables into Excel sheets.", tag: "Convert PDF" },
  { name: "Excel to PDF", href: "/excel-to-pdf/page", desc: "Convert Excel sheets into PDFs.", tag: "Convert PDF" },
  { name: "Rotate PDF", href: "/rotate-pdf/page", desc: "Fix sideways or flipped pages.", tag: "Organize PDF" },
  { name: "Protect PDF", href: "/protect-pdf/page", desc: "Lock PDFs with password protection.", tag: "PDF Security" },
  { name: "Unlock PDF", href: "/unlock-pdf/page", desc: "Remove password from PDFs.", tag: "PDF Security" },
  { name: "Watermark PDF", href: "/watermark/page", desc: "Add text or image watermarks.", tag: "Edit PDF" },
  { name: "Repair PDF", href: "/repair-pdf/page", desc: "Recover damaged PDF files.", tag: "Edit PDF" },
  { name: "Add Page Numbers", href: "/add-page-number/page", desc: "Insert page numbers in long documents.", tag: "Edit PDF" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTools = TOOLS.filter((tool) => {
    const matchesFilter = filter === "All" || tool.tag === filter;
    const q = query.toLowerCase();
    const matchesSearch =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.desc.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="page">
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
          <div className="header-pill">
            All tools for your everyday PDF work
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">
          Work with your <span className="hero-title-green">PDFs</span> effortlessly
        </h1>
        <p className="hero-desc">
          Professional tools to merge, split, compress, convert, rotate, unlock and watermark PDFs — all in one clean workspace.
        </p>
      </section>

      {/* FILTER + SEARCH */}
      <section className="toolbar">
        <div className="filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={
                "filter-btn" + (filter === f ? " filter-btn--active" : "")
              }
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search tool..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="tools-grid">
        {filteredTools.map((tool) => (
          <Link key={tool.name} href={tool.href} className="tool-card">
            <div className="tool-top">
              <div className="tool-icon">PDF</div>
              <div className="tool-texts">
                <div className="tool-name">{tool.name}</div>
                <div className="tool-desc">{tool.desc}</div>
              </div>
            </div>
            <div className="tool-bottom">
              <span>{tool.tag}</span>
              <span className="tool-open">Open →</span>
            </div>
          </Link>
        ))}
      </section>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #ffffff;
          color: #0f172a;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        /* HEADER */
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
          padding: 12px 16px;
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
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.25);
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
          display: none;
          padding: 4px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.18);
          font-size: 11px;
        }

        @media (min-width: 640px) {
          .header-pill {
            display: inline-flex;
          }
        }

        /* HERO */
        .hero {
          max-width: 880px;
          margin: 40px auto 0 auto;
          padding: 0 16px;
          text-align: center;
        }

        .hero-title {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        @media (min-width: 640px) {
          .hero-title {
            font-size: 40px;
          }
        }

        .hero-title-green {
          color: #059669;
        }

        .hero-desc {
          margin-top: 12px;
          font-size: 14px;
          line-height: 1.6;
          color: #4b5563;
        }

        /* TOOLBAR */
        .toolbar {
          max-width: 1120px;
          margin: 26px auto 0 auto;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .toolbar {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .filter-btn {
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 13px;
          border: 1px solid #e5e7eb;
          background-color: #ffffff;
          color: #374151;
          cursor: pointer;
          transition: all 0.15s ease-out;
        }

        .filter-btn:hover {
          border-color: #059669;
          color: #059669;
        }

        .filter-btn--active {
          background-color: #059669;
          border-color: #059669;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);
        }

        .search-wrapper {
          position: relative;
          width: 100%;
          max-width: 280px;
        }

        .search-input {
          width: 100%;
          padding: 8px 14px 8px 28px;
          border-radius: 999px;
          border: 1px solid #d1d5db;
          font-size: 13px;
          outline: none;
          transition: all 0.15s ease-out;
        }

        .search-input:focus {
          border-color: #059669;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 13px;
          color: #9ca3af;
          pointer-events: none;
        }

        /* TOOLS GRID */
        .tools-grid {
          max-width: 1120px;
          margin: 32px auto 48px auto;
          padding: 0 16px 32px 16px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .tools-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .tools-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .tool-card {
          background-color: #ffffff;
          border-radius: 18px;
          border: 1px solid #e5e7eb;
          padding: 18px 18px 12px 18px;
          box-shadow: 0 6px 14px rgba(15, 23, 42, 0.06);
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-decoration: none;
          color: inherit;
          transform: translateY(0);
          transition: transform 0.18s ease-out, box-shadow 0.18s ease-out,
            border-color 0.18s ease-out;
        }

        .tool-card:hover {
          transform: translateY(-4px);
          border-color: #059669;
          box-shadow: 0 12px 24px rgba(16, 185, 129, 0.25);
        }

        .tool-top {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .tool-icon {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          background-color: #059669;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
        }

        .tool-texts {
          flex: 1;
        }

        .tool-name {
          font-size: 14px;
          font-weight: 600;
        }

        .tool-desc {
          margin-top: 4px;
          font-size: 12px;
          color: #4b5563;
        }

        .tool-bottom {
          margin-top: 6px;
          padding-top: 8px;
          border-top: 1px solid #f3f4f6;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #6b7280;
        }

        .tool-open {
          font-weight: 600;
        }

        .tool-card:hover .tool-open {
          color: #059669;
        }
      `}</style>
    </main>
  );
}
