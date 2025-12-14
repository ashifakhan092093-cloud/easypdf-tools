import Link from "next/link";

const tools = [
  {
    href: "/merge-pdf/page",
    name: "Merge PDF",
    desc: "Combine multiple PDFs into a single file.",
  },
  {
    href: "/compress-pdf/page",
    name: "Compress PDF",
    desc: "Reduce PDF size while keeping good quality.",
  },
  {
    href: "/pdf-split/page",
    name: "Split PDF",
    desc: "Extract specific pages into a new PDF.",
  },
  {
    href: "/pdf-to-word/page",
    name: "PDF to Word",
    desc: "Convert your PDF into an editable Word file.",
  },
  {
    href: "/word-to-pdf/page",
    name: "Word to PDF",
    desc: "Turn Word documents into PDFs.",
  },
  {
    href: "/jpg-to-pdf/page",
    name: "JPG to PDF",
    desc: "Convert images into a single PDF file.",
  },
  {
    href: "/pdf-to-jpg/page",
    name: "PDF to JPG",
    desc: "Turn each PDF page into an image.",
  },
  {
    href: "/excel-to-pdf/page",
    name: "Excel to PDF",
    desc: "Save spreadsheets as PDFs.",
  },
  {
    href: "/pdf-to-excel/page",
    name: "PDF to Excel",
    desc: "Convert tables from PDF to Excel.",
  },
  {
    href: "/ppt-to-pdf/page",
    name: "PPT to PDF",
    desc: "Export presentations as PDFs.",
  },
  {
    href: "/pdf-to-ppt/page",
    name: "PDF to PPT",
    desc: "Convert slides from PDF back to PPT.",
  },
  {
    href: "/protect-pdf/page",
    name: "Protect PDF",
    desc: "Add password protection to your PDF.",
  },
  {
    href: "/unlock-pdf/page",
    name: "Unlock PDF",
    desc: "Remove password from a PDF file.",
  },
  {
    href: "/rotate-pdf/page",
    name: "Rotate PDF",
    desc: "Rotate pages inside your PDF.",
  },
  {
    href: "/repair-pdf/page",
    name: "Repair PDF",
    desc: "Fix broken or corrupted PDFs.",
  },
  {
    href: "/watermark/page",
    name: "Watermark PDF",
    desc: "Add a text watermark to your PDF.",
  },
  {
    href: "/organize-pdf/page",
    name: "Organize PDF",
    desc: "Reorder, delete, or rearrange pages.",
  },
  {
    href: "/add-page-number/page",
    name: "Add Page Numbers",
    desc: "Add page numbers to every page.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              EasyPDF Tools
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              All‑in‑one PDF toolbox. Merge, compress, convert, protect and
              edit your PDFs directly from the browser.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="#tools"
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 shadow-sm"
            >
              Start using tools
            </a>
            <a
              href="https://easypdf-tools.onrender.com/docs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-white"
            >
              API docs
            </a>
          </div>
        </header>

        {/* Tools grid */}
        <section id="tools">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            PDF tools
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-red-300 transition duration-150"
              >
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-red-600">
                  {tool.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{tool.desc}</p>
                <span className="mt-3 inline-flex items-center text-xs font-semibold text-red-600 group-hover:text-red-700">
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
        <footer className="mt-10 border-t border-slate-200 pt-4 text-xs text-slate-500 flex flex-col sm:flex-row sm:justify-between gap-2">
          <span>© {new Date().getFullYear()} EasyPDF Tools</span>
          <span>Built with Next.js & FastAPI</span>
        </footer>
      </div>
    </main>
  );
}
