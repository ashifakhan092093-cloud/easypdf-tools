export default function Home() {
  const tools = [
    { name: "Add Page Number", link: "/add-page-number" },
    { name: "Compress PDF", link: "/compress-pdf" },
    { name: "Excel to PDF", link: "/excel-to-pdf" },
    { name: "JPG to PDF", link: "/jpg-to-pdf" },
    { name: "Merge PDF", link: "/merge-pdf" },
    { name: "Organize PDF", link: "/organize-pdf" },
    { name: "Split PDF", link: "/pdf-split" },
    { name: "PDF to Excel", link: "/pdf-to-excel" },
    { name: "PDF to JPG", link: "/pdf-to-jpg" },
    { name: "PDF to PPT", link: "/pdf-to-ppt" },
    { name: "PDF to Word", link: "/pdf-to-word" },
    { name: "PPT to PDF", link: "/ppt-to-pdf" },
    { name: "Protect PDF", link: "/protect-pdf" },
    { name: "Repair PDF", link: "/repair-pdf" },
    { name: "Rotate PDF", link: "/rotate-pdf" },
    { name: "Unlock PDF", link: "/unlock-pdf" },
    { name: "Watermark PDF", link: "/watermark" },
    { name: "Word to PDF", link: "/word-to-pdf" },
  ];

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8">PDF Tools – iLovePDF Clone</h1>

      {tools.map((tool, i) => (
        <div key={i} className="border p-4 mb-4 rounded-lg">
          <h2 className="text-xl">{tool.name}</h2>
          <a href={tool.link} className="text-blue-600 underline">
            Open Tool →
          </a>
        </div>
      ))}
    </main>
  );
}
