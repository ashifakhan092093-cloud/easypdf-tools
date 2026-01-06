import Head from "next/head";
import Link from "next/link";

export default function PdfToJpgOnline() {
  return (
    <>
      <Head>
        <title>PDF to JPG Online – Convert PDF Pages to Images | EasyPDF Tools</title>
        <meta
          name="description"
          content="Convert PDF to JPG online. Turn each PDF page into high-quality JPG images instantly. Free and secure PDF to JPG converter."
        />
      </Head>

      <main style={{ padding: 40, maxWidth: 900, margin: "0 auto", fontFamily: "system-ui" }}>
        <h1>PDF to JPG Online</h1>

        <p>
          Convert PDF to JPG online and extract each page as an image.
          EasyPDF Tools helps you convert PDFs into JPG images quickly and securely.
        </p>

        <h2>Features</h2>
        <ul>
          <li>High‑quality JPG output</li>
          <li>Each PDF page converted separately</li>
          <li>ZIP download supported</li>
        </ul>

        <h2>How to convert PDF to JPG</h2>
        <ol>
          <li>Upload your PDF file</li>
          <li>Convert PDF to JPG</li>
          <li>Download images</li>
        </ol>

        <p>
          👉 <Link href="/">Go to EasyPDF Tools</Link>
        </p>
      </main>
    </>
  );
}
