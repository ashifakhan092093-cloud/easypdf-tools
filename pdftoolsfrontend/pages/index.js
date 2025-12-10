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
        {/* Baaki tools yaha */}
      </ul>
    </div>
  );
}
