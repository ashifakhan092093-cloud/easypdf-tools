import Head from "next/head";
import Link from "next/link";

export default function CompressPdfOnline() {
  return (
    <>
      <Head>
        <title>Compress PDF Online – Reduce PDF Size Free | EasyPDF Tools</title>
        <meta
          name="description"
          content="Compress PDF online for free. Reduce PDF file size while maintaining quality. Fast, secure and easy PDF compression tool."
        />
      </Head>

      <main style={{ padding: 40, maxWidth: 900, margin: "0 auto", fontFamily: "system-ui" }}>
        <h1>Compress PDF Online</h1>

        <p>
          Compress PDF files online to reduce file size without losing quality.
          EasyPDF Tools lets you compress PDFs quickly, securely, and for free.
        </p>

        <h2>Why compress a PDF?</h2>
        <ul>
          <li>Smaller file size for easy sharing</li>
          <li>Faster uploads and downloads</li>
          <li>Email‑friendly PDF files</li>
        </ul>

        <h2>How to compress PDF</h2>
        <ol>
          <li>Upload your PDF file</li>
          <li>Click compress</li>
          <li>Download the optimized PDF</li>
        </ol>

        <p>
          👉 <Link href="/">Open EasyPDF Tools</Link>
        </p>
      </main>
    </>
  );
}
