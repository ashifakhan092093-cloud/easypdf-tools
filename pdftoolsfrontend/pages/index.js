import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>EasyPDF Tools</h1>
      <p>Select a tool from the menu.</p>

      <ul>
        <li><Link href="/merge-pdf/page">Merge PDF</Link></li>
        <li><Link href="/compress-pdf/page">Compress PDF</Link></li>
        <li><Link href="/pdf-split/page">Split PDF</Link></li>
        <li><Link href="/pdf-to-word/page">PDF to Word</Link></li>
        <li><Link href="/word-to-pdf/page">Word to PDF</Link></li>

        {/* Baaki tools */}
        <li><Link href="/jpg-to-pdf/page">JPG to PDF</Link></li>
        <li><Link href="/pdf-to-jpg/page">PDF to JPG</Link></li>
        <li><Link href="/excel-to-pdf/page">Excel to PDF</Link></li>
        <li><Link href="/ppt-to-pdf/page">PPT to PDF</Link></li>
        <li><Link href="/pdf-to-ppt/page">PDF to PPT</Link></li>
        <li><Link href="/pdf-to-excel/page">PDF to Excel</Link></li>
        <li><Link href="/protect-pdf/page">Protect PDF</Link></li>
        <li><Link href="/unlock-pdf/page">Unlock PDF</Link></li>
        <li><Link href="/rotate-pdf/page">Rotate PDF</Link></li>
        <li><Link href="/repair-pdf/page">Repair PDF</Link></li>
        <li><Link href="/watermark/page">Watermark PDF</Link></li>
        <li><Link href="/organize-pdf/page">Organize PDF</Link></li>
        <li><Link href="/add-page-number/page">Add Page Number</Link></li>
      </ul>
    </div>
  );
}
