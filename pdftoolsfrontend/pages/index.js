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
  { name: "Split PDF", href: "/pdf-split/page", desc: "Split PDFs into separate files.", tag: "Organize PDF" },
  { name: "Compress PDF", href: "/compress-pdf/page", desc: "Reduce PDF file size while keeping quality.", tag: "Optimize PDF" },
  { name: "PDF to Word", href: "/pdf-to-word/page", desc: "Convert PDF into editable Word documents.", tag: "Convert PDF" },
  { name: "Word to PDF", href: "/word-to-pdf/page", desc: "Save Word files as clean PDF documents.", tag: "Convert PDF" },
  { name: "PDF to Excel", href: "/pdf-to-excel/page", desc: "Extract tables from PDF into Excel spreadsheets.", tag: "Convert PDF" },
  { name: "Excel to PDF", href: "/excel-to-pdf/page", desc: "Save spreadsheets as PDFs.", tag: "Convert PDF" },
  { name: "Rotate PDF", href: "/rotate-pdf/page", desc: "Fix upside‑down or rotated pages.", tag: "Organize PDF" },
  { name: "Organize PDF", href: "/organize-pdf/page", desc: "Reorder, remove or rotate pages.", tag: "Organize PDF" },
  { name: "Protect PDF", href: "/protect-pdf/page", desc: "Lock PDFs with password protection.", tag: "PDF Security" },
  { name: "Unlock PDF", href: "/unlock-pdf/page", desc: "Remove password from PDFs you own.", tag: "PDF Security" },
  { name: "Watermark PDF", href: "/watermark/page", desc: "Add text or image watermark.", tag: "Edit PDF" },
  { name: "Repair PDF", href: "/repair-pdf/page", desc: "Try to recover damaged PDF files.", tag: "Edit PDF" },
  { name: "Add Page Numbers", href: "/add-page-number/page", desc: "Add page numbers to long documents.", tag: "Edit PDF" },
];

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const normalizedQuery = query.toLowerCase().trim();

  const filteredTools = TOOLS.filter((tool) => {
    const matchesFilter = filter === "All" || tool.tag === filter;
    const matchesSearch =
      !normalizedQuery ||
      tool.name.toLowerCase().includes(normalizedQuery) ||
      tool.desc.toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* GREEN GRADIENT HEADER */}
      <header className="sticky top-0 z-30 border-b border-emerald-100 bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center text-xs font-bold">
              PDF
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-tight">
                EasyPDF Tools
              </span>
              <span className="text-[11px] text-emerald-50">
                All PDF tools in one clean place
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px]">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/30">
              Fast • Free • Secure
            </span>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Every tool you need to work with{" "}
          <span className="text-emerald-600">PDFs</span> in one place
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Merge, split, compress, convert, rotate, unlock and watermark PDFs
          with a few clicks. A simple, modern workspace for students,
          professionals and teams.
        </p>
      </section>

      {/* FILTERS + SEARCH */}
      <section className="max-w-6xl mx-auto px-4 mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Filter chips */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm border transition-all duration-150 " +
                (filter === f
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-white border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-600")
              }
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="w-full md:w-72">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search a PDF tool…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500 transition"
            />
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="max-w-6xl mx-auto px-4 mt-10 pb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool, index) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="group border border-slate-200 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-200 hover:-translate-y-1 flex flex-col"
            style={{
              animation: `fadeInUp 0.35s ease-out both`,
              animationDelay: `${index * 0.03}s`,
            }}
          >
            <div className="p-5 flex items-start gap-3">
              {/* Green Icon square */}
              <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold shadow-md">
                PDF
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600">
                  {tool.name}
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </div>
            <div className="px-5 pb-4 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>{tool.tag}</span>
              <span className="group-hover:text-emerald-600 font-semibold">
                Open tool →
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* SIMPLE KEYFRAMES FOR CARD ANIMATION */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
