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
  { name: "Add Page Numbers", href: "/add-page-number/page", desc: "Insert page numbers.", tag: "Edit PDF" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTools = TOOLS.filter(tool => {
    const matchesFilter = filter === "All" || tool.tag === filter;
    const matchesSearch =
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.desc.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500 text-white border-b border-emerald-300 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold shadow">
              PDF
            </div>
            <h1 className="text-lg font-extrabold tracking-tight">EasyPDF Tools</h1>
          </div>

          <span className="hidden sm:block text-xs bg-white/20 px-3 py-1 rounded-full">
            Fast • Free • Secure
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center mt-10 px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Work with your <span className="text-emerald-600">PDFs</span> effortlessly
        </h1>
        <p className="mt-4 text-slate-600">
          Professional tools to merge, split, compress, convert, rotate, unlock and watermark PDFs — all in one clean workspace.
        </p>
      </section>

      {/* Search + Filters */}
      <section className="max-w-6xl mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm border transition ${
                  filter === f
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white border-slate-300 hover:border-emerald-500 hover:text-emerald-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Search tool..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-slate-300 rounded-full py-2 pl-8 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 mt-10 pb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool, i) => (
          <Link
            href={tool.href}
            key={tool.name}
            className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all hover:-translate-y-1"
            style={{
              animation: `fadeUp 0.35s ease-out both`,
              animationDelay: `${i * 0.03}s`,
            }}
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold shadow">
                PDF
              </div>
              <div>
                <h3 className="text-sm font-semibold group-hover:text-emerald-600">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1">{tool.desc}</p>
              </div>
            </div>
            <div className="mt-4 text-[11px] text-slate-500 border-t pt-2 flex justify-between">
              <span>{tool.tag}</span>
              <span className="group-hover:text-emerald-600 font-semibold">Open →</span>
            </div>
          </Link>
        ))}
      </section>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
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
