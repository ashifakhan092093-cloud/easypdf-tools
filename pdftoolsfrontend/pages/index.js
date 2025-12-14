import Link from "next/link";

const toolCategories = [
  {
    title: "Convert",
    caption: "Change formats without losing quality.",
    tools: [
      { href: "/pdf-to-word/page", name: "PDF to Word" },
      { href: "/word-to-pdf/page", name: "Word to PDF" },
      { href: "/jpg-to-pdf/page", name: "JPG to PDF" },
      { href: "/pdf-to-jpg/page", name: "PDF to JPG" },
      { href: "/excel-to-pdf/page", name: "Excel to PDF" },
      { href: "/pdf-to-excel/page", name: "PDF to Excel" },
      { href: "/ppt-to-pdf/page", name: "PPT to PDF" },
      { href: "/pdf-to-ppt/page", name: "PDF to PPT" },
    ],
  },
  {
    title: "Organize",
    caption: "Control pages exactly how you want.",
    tools: [
      { href: "/merge-pdf/page", name: "Merge PDF" },
      { href: "/pdf-split/page", name: "Split PDF" },
      { href: "/organize-pdf/page", name: "Organize PDF" },
      { href: "/rotate-pdf/page", name: "Rotate PDF" },
      { href: "/add-page-number/page", name: "Add Page Numbers" },
    ],
  },
  {
    title: "Secure",
    caption: "Protect sensitive documents in one click.",
    tools: [
      { href: "/protect-pdf/page", name: "Protect PDF" },
      { href: "/unlock-pdf/page", name: "Unlock PDF" },
      { href: "/watermark/page", name: "Watermark PDF" },
      { href: "/repair-pdf/page", name: "Repair PDF" },
    ],
  },
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top nav */}
      <nav className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-red-500 to-rose-400 flex items-center justify-center text-xs font-black tracking-tight shadow-lg shadow-red-900/40">
              EP
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold tracking-tight text-sm sm:text-base">
                EasyPDF Tools
              </span>
              <span className="text-[10px] text-slate-400">
                Pro‑grade PDF workspace
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
            <span className="px-3 py-1 rounded-full border border-slate-700/80 bg-slate-900/70">
              No install • Works in browser
            </span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-red-300/80 mb-3">
              PDF SUITE
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              One place for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200">
                every PDF task
              </span>
              .
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl">
              Merge, compress, convert and secure PDFs with a clean, focused
              interface. Built for people who handle documents all day and
              don&apos;t have time for complicated tools.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#tools"
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-900/40"
              >
                Start with Merge PDF
                <span className="ml-1 text-lg leading-none">→</span>
              </a>
              <Link
                href="/compress-pdf/page"
                className="inline-flex items-center rounded-full px-4 py-2 text-xs sm:text-sm font-semibold border border-slate-700/80 text-slate-100 hover:bg-slate-900"
              >
                Try Compress PDF
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-[11px] text-slate-400">
              <span>⚡ FastAPI backend</span>
              <span>·</span>
              <span>Next.js frontend</span>
              <span>·</span>
              <span>No signup • Free to use</span>
            </div>
          </div>

          {/* Right side highlight */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-br from-red-500/40 via-transparent to-purple-500/40 blur-2xl opacity-60" />
            <div className="relative rounded-[28px] border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-200">
                  Quick actions
                </span>
                <span className="text-[10px] text-slate-500">
                  Pick a tool to begin
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "/merge-pdf/page",
                  "/compress-pdf/page",
                  "/pdf-split/page",
                  "/protect-pdf/page",
                ].map((href) => {
                  const tool =
                    toolCategories
                      .flatMap((c) => c.tools)
                      .find((t) => t.href === href) ?? null;
                  if (!tool) return null;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="group rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-red-300 p-3 flex flex-col justify-between transition"
                    >
                      <span className="text-xs font-semibold text-slate-50 group-hover:text-red-200">
                        {tool.name}
                      </span>
                      <span className="mt-1 text-[11px] text-slate-400 line-clamp-2">
                        {tool.name.includes("Merge")
                          ? "Combine multiple PDFs into a clean single file."
                          : tool.name.includes("Compress")
                          ? "Shrink file size while keeping it readable."
                          : tool.name.includes("Split")
                          ? "Extract or split pages from any PDF."
                          : "Secure important PDFs with a password."}
                      </span>
                      <span className="mt-2 text-[11px] font-semibold text-red-300 group-hover:text-red-200">
                        Open tool →
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 text-[10px] text-slate-500">
                Tip: You can open any tool directly from the cards below.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools by category */}
      <section id="tools" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm sm:text-base font-semibold text-slate-100">
            All tools
          </h2>
          <span className="text-[11px] text-slate-500">
            {toolCategories.reduce((sum, c) => sum + c.tools.length, 0)} PDF
            tools · Organized by workflow
          </span>
        </div>

        <div className="space-y-8">
          {toolCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/40"
            >
              <div className="flex items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    {category.title}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {category.caption}
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-400/80 p-3 flex flex-col justify-between transition hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-50 group-hover:text-red-200">
                        {tool.name}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/30">
                        PDF
                      </span>
                    </div>
                    <span className="mt-2 text-[11px] text-slate-400 line-clamp-2">
                      {category.title} · {category.caption}
                    </span>
                    <span className="mt-2 text-[11px] font-semibold text-red-300 group-hover:text-red-200">
                      Open tool →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-10 border-t border-slate-800 pt-4 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:justify-between gap-2">
          <span>© {year} EasyPDF Tools</span>
          <span>Designed for people who live in PDFs all day.</span>
        </footer>
      </section>
    </main>
  );
}
