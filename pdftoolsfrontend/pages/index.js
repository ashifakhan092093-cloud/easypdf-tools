import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

const FILTERS = [
  "All",
  "Organize PDF",
  "Optimize PDF",
  "Convert PDF",
  "Edit PDF",
  "PDF Security",
];

const TOOLS = [
  // ✅ WORKING
  {
    name: "Merge PDF",
    href: "/merge-pdf/page",
    desc: "Combine PDFs in the order you want.",
    tag: "Organize PDF",
  },
  {
    name: "Compress PDF",
    href: "/compress-pdf/page",
    desc: "Reduce file size while keeping quality.",
    tag: "Optimize PDF",
  },
  {
    name: "PDF to JPG",
    href: "/pdf-to-jpg/page",
    desc: "Convert each PDF page into JPG images (ZIP download).",
    tag: "Convert PDF",
  },
  {
    name: "JPG to PDF",
    href: "/jpg-to-pdf/page",
    desc: "Convert multiple JPG images into a single PDF.",
    tag: "Convert PDF",
  },

  // 🚧 COMING SOON (not working yet)
  {
    name: "Split PDF",
    href: "/coming-soon/page?tool=Split%20PDF",
    desc: "Split a PDF into multiple files.",
    tag: "Organize PDF",
  },
  {
    name: "PDF to Word",
    href: "/coming-soon/page?tool=PDF%20to%20Word",
    desc: "Convert PDF to DOCX editable files.",
    tag: "Convert PDF",
  },
  {
    name: "Word to PDF",
    href: "/coming-soon/page?tool=Word%20to%20PDF",
    desc: "Save Word documents as PDF.",
    tag: "Convert PDF",
  },
  {
    name: "PDF to Excel",
    href: "/coming-soon/page?tool=PDF%20to%20Excel",
    desc: "Turn PDF tables into Excel sheets.",
    tag: "Convert PDF",
  },
  {
    name: "Excel to PDF",
    href: "/coming-soon/page?tool=Excel%20to%20PDF",
    desc: "Convert Excel sheets into PDFs.",
    tag: "Convert PDF",
  },
  {
    name: "Rotate PDF",
    href: "/coming-soon/page?tool=Rotate%20PDF",
    desc: "Fix sideways or flipped pages.",
    tag: "Organize PDF",
  },
  {
    name: "Protect PDF",
    href: "/coming-soon/page?tool=Protect%20PDF",
    desc: "Lock PDFs with password protection.",
    tag: "PDF Security",
  },
  {
    name: "Unlock PDF",
    href: "/coming-soon/page?tool=Unlock%20PDF",
    desc: "Remove password from PDFs.",
    tag: "PDF Security",
  },
  {
    name: "Watermark PDF",
    href: "/coming-soon/page?tool=Watermark%20PDF",
    desc: "Add text or image watermarks.",
    tag: "Edit PDF",
  },
  {
    name: "Repair PDF",
    href: "/coming-soon/page?tool=Repair%20PDF",
    desc: "Recover damaged PDF files.",
    tag: "Edit PDF",
  },
  {
    name: "Add Page Numbers",
    href: "/coming-soon/page?tool=Add%20Page%20Numbers",
    desc: "Insert page numbers in long documents.",
    tag: "Edit PDF",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
  <main className={`page ${mounted ? "page--mounted" : ""}`}>

    <Head>
      <title>EasyPDF Tools – Free Online PDF Tools</title>
      <meta
        name="description"
        content="Free online PDF tools to merge, compress, convert PDF to JPG and JPG to PDF. Fast, secure and easy to use."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    {/* HEADER */}
    <header className="header">
      ...
    </header>
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            <div className="header-logo">PDF</div>
            <div className="header-texts">
              <div className="header-title">EasyPDF Tools</div>
              <div className="header-subtitle">Fast • Free • Secure</div>
            </div>
          </div>
          <button className="header-pill">
            All tools for your everyday PDF work
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">
          Work with your <span className="hero-title-green">PDFs</span>{" "}
          effortlessly
        </h1>
        <p className="hero-desc">
          Professional tools to merge, split, compress, convert, rotate, unlock
          and watermark PDFs — all in one clean workspace.
        </p>
      </section>

      {/* FILTER + SEARCH */}
      <section className="toolbar">
        <div className="filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={"filter-btn" + (filter === f ? " filter-btn--active" : "")}
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
        {filteredTools.map((tool, index) => (
          <Link key={tool.name} href={tool.href} className="tool-card">
            <div
              className="tool-card-inner"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
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
            </div>
          </Link>
        ))}
      </section>

      <footer className="footer">
  <div className="footer-inner">
    <span>© {new Date().getFullYear()} EasyPDF Tools</span>
    <span className="footer-dot">•</span>

    <Link href="/privacy-policy/page">Privacy Policy</Link>
    <span className="footer-dot">•</span>

    <Link href="/terms/page">Terms & Conditions</Link>
    <span className="footer-dot">•</span>

    <Link href="/about/page">About Us</Link>
  </div>
</footer>


      <style jsx>{`
        .page{min-height:100vh;background:#f3f4f6;color:#0f172a;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;opacity:0;transform:translateY(8px)}
        .page--mounted{animation:pageFadeIn .4s ease-out forwards}
        @keyframes pageFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

        .header{position:sticky;top:0;z-index:20;background:linear-gradient(90deg,#059669,#16a34a,#65a30d);color:#fff;border-bottom:1px solid rgba(22,163,74,.35);box-shadow:0 10px 30px rgba(15,118,110,.4)}
        .header-inner{max-width:1120px;margin:0 auto;padding:14px 16px;display:flex;align-items:center;justify-content:space-between}
        .header-left{display:flex;align-items:center;gap:12px}
        .header-logo{width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700}
        .header-texts{display:flex;flex-direction:column;gap:2px}
        .header-title{font-size:18px;font-weight:800;letter-spacing:-.03em}
        .header-subtitle{font-size:11px;opacity:.9}
        .header-pill{display:none;padding:6px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.2);font-size:11px;color:#fff;cursor:default;white-space:nowrap}
        @media(min-width:640px){.header-pill{display:inline-flex}}

        .hero{max-width:880px;margin:40px auto 0;padding:0 16px;text-align:center}
        .hero-title{font-size:32px;font-weight:800;letter-spacing:-.04em}
        @media(min-width:640px){.hero-title{font-size:42px}}
        .hero-title-green{color:#059669}
        .hero-desc{margin-top:14px;font-size:14px;line-height:1.6;color:#4b5563}

        .toolbar{max-width:1120px;margin:30px auto 0;padding:0 16px;display:flex;flex-direction:column;gap:14px}
        @media(min-width:768px){.toolbar{flex-direction:row;justify-content:space-between;align-items:center}}
        .filters{display:flex;flex-wrap:wrap;gap:8px}
        .filter-btn{border-radius:999px;padding:7px 16px;font-size:13px;border:1px solid #e5e7eb;background:#fff;color:#374151;cursor:pointer;transition:all .15s ease-out}
        .filter-btn:hover{border-color:#059669;color:#059669}
        .filter-btn--active{background:#059669;border-color:#059669;color:#fff;box-shadow:0 4px 12px rgba(16,185,129,.4)}

        .search-wrapper{position:relative;width:100%;max-width:280px}
        .search-input{width:100%;padding:8px 14px 8px 30px;border-radius:999px;border:1px solid #d1d5db;font-size:13px;outline:none;transition:all .15s ease-out;background:#fff}
        .search-input:focus{border-color:#059669;box-shadow:0 0 0 2px rgba(16,185,129,.25)}
        .search-icon{position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:13px;color:#9ca3af;pointer-events:none}

        .tools-grid{max-width:1120px;margin:32px auto 48px;padding:0 16px 40px;display:grid;grid-template-columns:1fr;gap:18px}
        @media(min-width:640px){.tools-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(min-width:1024px){.tools-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
        .tool-card{text-decoration:none;color:inherit}
        .tool-card-inner{background:#fff;border-radius:18px;border:1px solid #e5e7eb;padding:18px 18px 12px;box-shadow:0 8px 18px rgba(15,23,42,.06);display:flex;flex-direction:column;gap:10px;transform:translateY(6px);opacity:0;transition:transform .18s ease-out,box-shadow .18s ease-out,border-color .18s ease-out;animation:cardFadeUp .35s ease-out forwards}
        .tool-card:hover .tool-card-inner{transform:translateY(-2px);border-color:#059669;box-shadow:0 14px 28px rgba(16,185,129,.22)}
        @keyframes cardFadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .tool-top{display:flex;align-items:flex-start;gap:12px}
        .tool-icon{width:40px;height:40px;border-radius:14px;background:#059669;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700}
        .tool-texts{flex:1}
        .tool-name{font-size:14px;font-weight:600}
        .tool-desc{margin-top:4px;font-size:12px;color:#4b5563}
        .tool-bottom{margin-top:6px;padding-top:8px;border-top:1px solid #f3f4f6;display:flex;justify-content:space-between;font-size:11px;color:#6b7280}
        .tool-open{font-weight:600}
        .tool-card:hover .tool-open{color:#059669}

        .footer{border-top:1px solid #e5e7eb;background:#fff}
        .footer-inner{max-width:1120px;margin:0 auto;padding:14px 16px 20px;font-size:12px;color:#6b7280;display:flex;justify-content:center;align-items:center;gap:4px}
        .footer-dot{opacity:.7}
      `}</style>
    </main>
  );
}
