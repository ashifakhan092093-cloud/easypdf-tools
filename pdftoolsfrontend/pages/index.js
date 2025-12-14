import Link from "next/link";

const tools = [
  {
    href: "/merge-pdf/page",
    name: "Merge PDF",
    desc: "Combine multiple PDFs into one.",
  },
  {
    href: "/compress-pdf/page",
    name: "Compress PDF",
    desc: "Reduce file size while keeping good quality.",
  },
  {
    href: "/pdf-split/page",
    name: "Split PDF",
    desc: "Split or extract pages from a PDF.",
  },
  {
    href: "/pdf-to-word/page",
    name: "PDF to Word",
    desc: "Convert PDFs into editable Word files.",
  },
  {
    href: "/word-to-pdf/page",
    name: "Word to PDF",
    desc: "Turn DOC / DOCX into PDF.",
  },
  {
    href: "/jpg-to-pdf/page",
    name: "JPG to PDF",
    desc: "Turn images into PDFs.",
  },
  {
    href: "/pdf-to-jpg/page",
    name: "PDF to JPG",
    desc: "Export PDF pages as images.",
  },
  {
    href: "/excel-to-pdf/page",
    name: "Excel to PDF",
    desc: "Save spreadsheets as PDFs.",
  },
  {
    href: "/pdf-to-excel/page",
    name: "PDF to Excel",
    desc: "Extract tables from PDF to Excel.",
  },
  {
    href: "/ppt-to-pdf/page",
    name: "PPT to PDF",
    desc: "Export slides as PDF.",
  },
  {
    href: "/pdf-to-ppt/page",
    name: "PDF to PPT",
    desc: "Turn PDF back into slides.",
  },
  {
    href: "/protect-pdf/page",
    name: "Protect PDF",
    desc: "Add password protection.",
  },
  {
    href: "/unlock-pdf/page",
    name: "Unlock PDF",
    desc: "Remove password from PDF.",
  },
  {
    href: "/rotate-pdf/page",
    name: "Rotate PDF",
    desc: "Rotate pages 90° / 180°.",
  },
  {
    href: "/repair-pdf/page",
    name: "Repair PDF",
    desc: "Try to fix corrupted PDFs.",
  },
  {
    href: "/watermark/page",
    name: "Watermark PDF",
    desc: "Add text watermark to pages.",
  },
  {
    href: "/organize-pdf/page",
    name: "Organize PDF",
    desc: "Reorder or delete pages.",
  },
  {
    href: "/add-page-number/page",
    name: "Add Page Numbers",
    desc: "Number pages automatically.",
  },
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Top nav */}
      <nav className="border-b border-white/5 backdrop-blur-sm bg-slate-950/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-red-600 flex items-center justify-center text-xs font-bold">
              EP
            </div>
            <span className="font-semibold tracking-tight">
              EasyPDF Tools
            </span>
          </div>
          <span className="hidden sm:inline text-xs text-slate-400">
            Fast, simple, browser‑based PDF toolkit
          </span>
        </div>
      </nav>

      {/* Hero + tools */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] items-center mb-10">
          {/* Hero text */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Handle all your PDFs
              <span className="block text-red-400">
                in one simple place.
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl">
              Merge, compress, convert, secure, and edit PDFs in just a few
              clicks. No signup, no nonsense — just clean tools that work.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#tools"
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold bg-red-600 text-white hover:bg-red-500 shadow-md shadow-red-900/40"
              >
                Start now
                <span className="ml-1 text-lg leading-none">→</span>
              </a>
              <a
                href="https://easypdf-tools.onrender.com/docs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full px-4 py-2 text-xs sm:text-sm font-semibold border border-slate-600 text-slate-200 hover:bg-slate-900"
              >
                View API docs
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Runs on FastAPI backend · Frontend built with Next.js
            </p>
          </div>

          {/* Highlight card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 shadow-xl shadow-black/40">
            <h2 className="text-sm font-semibold text-slate-100 mb-3">
              Most used tools
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {tools.slice(0, 4).map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-red-400 p-3 flex flex-col justify-between transition"
                >
                  <span className="text-sm font-semibold text-slate-50 group-hover:text-red-300">
                    {tool.name}
                  </span>
                  <span className="mt-1 text-[11px] text-slate-400">
                    {tool.desc}
                  </span>
                  <span className="mt-2 text-[11px] font-semibold text-red-400 group-hover:text-red-300">
                    Open tool →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All tools grid */}
        <section id="tools">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm sm:text-base font-semibold text-slate-100">
              All PDF tools
            </h2>
            <span className="text-[11px] text-slate-500">
              {tools.length} tools available
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-red-500 p-4 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-50 group-hover:text-red-300">
                    {tool.name}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/40">
                    PDF
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{tool.desc}</p>
                <span className="mt-3 inline-flex items-center text-[11px] font-semibold text-red-400 group-hover:text-red-300">
                  Open tool
                  <span className="ml-1 group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-800 pt-4 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:justify-between gap-2">
          <span>© {year} EasyPDF Tools</span>
          <span>Made for fast everyday PDF work.</span>
        </footer>
      </div>
    </main>
  );
}
