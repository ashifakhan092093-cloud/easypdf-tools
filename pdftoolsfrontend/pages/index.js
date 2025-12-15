import { useState } from "react";
import Link from "next/link";

const FILTERS = [
  "All",
  "Workflows",
  "Organize PDF",
  "Optimize PDF",
  "Convert PDF",
  "Edit PDF",
  "PDF Security",
];

const TOOLS = [
  {
    name: "Merge PDF",
    href: "/merge-pdf/page",
    desc: "Combine PDFs in the exact order you want.",
    tag: "Organize PDF",
  },
  {
    name: "Split PDF",
    href: "/pdf-split/page",
    desc: "Split one PDF into multiple smaller files.",
    tag: "Organize PDF",
  },
  {
    name: "Compress PDF",
    href: "/compress-pdf/page",
    desc: "Reduce file size while keeping document clear.",
    tag: "Optimize PDF",
  },
  {
    name: "PDF to Word",
    href: "/pdf-to-word/page",
    desc: "Turn PDFs into editable DOCX documents.",
    tag: "Convert PDF",
  },
  {
    name: "Word to PDF",
    href: "/word-to-pdf/page",
    desc: "Convert DOC and DOCX files into share‑ready PDFs.",
    tag: "Convert PDF",
  },
  {
    name: "PDF to PowerPoint",
    href: "/pdf-to-ppt/page",
    desc: "Create PPT slides from any PDF.",
    tag: "Convert PDF",
  },
  {
    name: "PowerPoint to PDF",
    href: "/ppt-to-pdf/page",
    desc: "Export presentations as lightweight PDFs.",
    tag: "Convert PDF",
  },
  {
    name: "PDF to Excel",
    href: "/pdf-to-excel/page",
    desc: "Move table data from PDF into spreadsheets.",
    tag: "Convert PDF",
  },
  {
    name: "Excel to PDF",
    href: "/excel-to-pdf/page",
    desc: "Save spreadsheets as clean PDFs.",
    tag: "Convert PDF",
  },
  {
    name: "Organize PDF",
    href: "/organize-pdf/page",
    desc: "Reorder, rotate or remove pages before saving.",
    tag: "Organize PDF",
  },
  {
    name: "Rotate PDF",
    href: "/rotate-pdf/page",
    desc: "Fix sideways pages in one or many PDFs.",
    tag: "Organize PDF",
  },
  {
    name: "Protect PDF",
    href: "/protect-pdf/page",
    desc: "Lock your PDF with a secure password.",
    tag: "PDF Security",
  },
  {
    name: "Unlock PDF",
    href: "/unlock-pdf/page",
    desc: "Remove password from PDFs you own.",
    tag: "PDF Security",
  },
  {
    name: "Watermark PDF",
    href: "/watermark/page",
    desc: "Add logo or text watermark to every page.",
    tag: "Edit PDF",
  },
  {
    name: "Repair PDF",
    href: "/repair-pdf/page",
    desc: "Try to recover damaged or corrupted PDFs.",
    tag: "Workflows",
  },
  {
    name: "Add Page Numbers",
    href: "/add-page-number/page",
    desc: "Number pages for reports and documents.",
    tag: "Edit PDF",
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTools =
    activeFilter === "All"
      ? TOOLS
      : TOOLS.filter((t) => t.tag === activeFilter);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Top nav */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 sm:py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-2xl leading-none text-green-600">❤</span>
              <span className="ml-1 text-xl font-extrabold tracking-tight text-slate-900">
                EasyPDF
              </span>
            </div>
            <span className="hidden sm:inline text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
              Free & fast PDF tools
            </span>
          </div>

          {/* Simple nav (dummy buttons) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link href="/merge-pdf/page" className="hover:text-green-600">
              Merge PDF
            </Link>
            <Link href="/pdf-split/page" className="hover:text-green-600">
              Split PDF
            </Link>
            <Link href="/compress-pdf/page" className="hover:text-green-600">
              Compress PDF
            </Link>
            <div className="flex items-center gap-2">
              <button className="text-xs font-semibold px-3 py-1 rounded-full border border-slate-300 hover:border-green-500 hover:text-green-600">
                Log in
              </button>
              <button className="text-xs font-semibold px-4 py-1.5 rounded-full bg-green-600 text-white hover:bg-green-500 shadow-sm">
                Sign up
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero + filters + grid */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-16">
        {/* Hero text */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Every tool you need to work with{" "}
            <span className="text-green-600">PDFs</span> in one place
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Merge, split, compress, convert, rotate, unlock and watermark PDFs
            with just a few clicks in a clean, distraction‑free workspace.
          </p>
        </div>

        {/* Filter chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={
                  "px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm border transition " +
                  (isActive
                    ? "bg-green-600 text-white border-green-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:border-green-400 hover:text-green-600")
                }
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* TOOLS GRID – iLovePDF style cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl bg-white border border-slate-200 hover:border-green-500 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <div className="flex items-start gap-3 p-4 pb-5">
                {/* Green icon box */}
                <div className="mt-1 h-9 w-9 rounded-xl bg-green-600 text-white flex items-center justify-center text-[11px] font-semibold shadow-sm">
                  PDF
                </div>

                {/* Title + description */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-green-600">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              {/* Bottom small line (like ilovepdf) */}
              <div className="px-4 pb-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{tool.tag}</span>
                <span className="group-hover:text-green-600 font-semibold">
                  Open tool →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
