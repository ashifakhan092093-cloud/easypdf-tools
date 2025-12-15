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
    badge: "Merge",
    color: "bg-rose-500",
  },
  {
    name: "Split PDF",
    href: "/pdf-split/page",
    desc: "Split one PDF into multiple smaller files.",
    tag: "Organize PDF",
    badge: "Split",
    color: "bg-emerald-500",
  },
  {
    name: "Compress PDF",
    href: "/compress-pdf/page",
    desc: "Reduce file size while keeping document clear.",
    tag: "Optimize PDF",
    badge: "Compress",
    color: "bg-lime-500",
  },
  {
    name: "PDF to Word",
    href: "/pdf-to-word/page",
    desc: "Turn PDFs into editable DOCX documents.",
    tag: "Convert PDF",
    badge: "DOCX",
    color: "bg-sky-500",
  },
  {
    name: "Word to PDF",
    href: "/word-to-pdf/page",
    desc: "Convert DOC and DOCX files into ready‑to‑share PDFs.",
    tag: "Convert PDF",
    badge: "Word",
    color: "bg-blue-500",
  },
  {
    name: "PDF to PowerPoint",
    href: "/pdf-to-ppt/page",
    desc: "Create PPT slides from any PDF presentation.",
    tag: "Convert PDF",
    badge: "PPT",
    color: "bg-orange-500",
  },
  {
    name: "PowerPoint to PDF",
    href: "/ppt-to-pdf/page",
    desc: "Export presentations as lightweight PDFs.",
    tag: "Convert PDF",
    badge: "PPT",
    color: "bg-orange-500",
  },
  {
    name: "PDF to Excel",
    href: "/pdf-to-excel/page",
    desc: "Move table data from PDF into spreadsheets.",
    tag: "Convert PDF",
    badge: "XLSX",
    color: "bg-emerald-500",
  },
  {
    name: "Excel to PDF",
    href: "/excel-to-pdf/page",
    desc: "Save spreadsheets as clean, print‑ready PDFs.",
    tag: "Convert PDF",
    badge: "Excel",
    color: "bg-green-500",
  },
  {
    name: "Organize PDF",
    href: "/organize-pdf/page",
    desc: "Reorder, rotate or remove pages before saving.",
    tag: "Organize PDF",
    badge: "Pages",
    color: "bg-indigo-500",
  },
  {
    name: "Rotate PDF",
    href: "/rotate-pdf/page",
    desc: "Fix sideways pages in one or many PDFs.",
    tag: "Organize PDF",
    badge: "Rotate",
    color: "bg-purple-500",
  },
  {
    name: "Protect PDF",
    href: "/protect-pdf/page",
    desc: "Lock your PDF with a secure password.",
    tag: "PDF Security",
    badge: "Lock",
    color: "bg-rose-600",
  },
  {
    name: "Unlock PDF",
    href: "/unlock-pdf/page",
    desc: "Remove password from PDFs you own.",
    tag: "PDF Security",
    badge: "Unlock",
    color: "bg-amber-500",
  },
  {
    name: "Watermark PDF",
    href: "/watermark/page",
    desc: "Add logo or text watermark to every page.",
    tag: "Edit PDF",
    badge: "Mark",
    color: "bg-fuchsia-500",
  },
  {
    name: "Repair PDF",
    href: "/repair-pdf/page",
    desc: "Try to recover damaged or corrupted PDF files.",
    tag: "Workflows",
    badge: "Fix",
    color: "bg-slate-600",
  },
  {
    name: "Add Page Numbers",
    href: "/add-page-number/page",
    desc: "Number pages for reports and documents.",
    tag: "Edit PDF",
    badge: "#",
    color: "bg-violet-500",
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTools =
    activeFilter === "All"
      ? TOOLS
      : TOOLS.filter((t) => t.tag === activeFilter);

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-slate-50 to-slate-100 text-slate-900">
      {/* Top nav */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 sm:py-4">
          {/* Logo + brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-2xl leading-none">❤️</span>
              <span className="ml-1 text-xl font-extrabold tracking-tight text-slate-900">
                EasyPDF
              </span>
            </div>
            <span className="hidden sm:inline text-xs px-2 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
              Free & fast PDF tools
            </span>
          </div>

          {/* Simple nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link href="/merge-pdf/page" className="hover:text-rose-600">
              Merge PDF
            </Link>
            <Link href="/pdf-split/page" className="hover:text-rose-600">
              Split PDF
            </Link>
            <Link href="/compress-pdf/page" className="hover:text-rose-600">
              Compress PDF
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-rose-600">
                All PDF tools
                <span className="text-xs">▾</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs font-semibold px-3 py-1 rounded-full border border-slate-300 hover:border-rose-500 hover:text-rose-600">
                Log in
              </button>
              <button className="text-xs font-semibold px-4 py-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-500 shadow-sm">
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
            <span className="text-rose-600">PDFs</span> in one place
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Merge, split, compress, convert, rotate, unlock and watermark PDFs
            with a few clicks. Built for students, teams and professionals who
            want everything in a single clean workspace.
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
                    ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:border-rose-300 hover:text-rose-600")
                }
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Tools grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl bg-white border border-slate-200 hover:border-rose-400 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <div className="flex items-start gap-3 p-4 pb-5">
                {/* Icon corner */}
                <div
                  className={`mt-1 h-9 w-9 rounded-xl ${tool.color} text-white flex items-center justify-center text-[11px] font-semibold shadow-sm`}
                >
                  {tool.badge}
                </div>
                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-rose-600">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>
              <div className="px-4 pb-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{tool.tag}</span>
                <span className="group-hover:text-rose-600 font-semibold">
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
