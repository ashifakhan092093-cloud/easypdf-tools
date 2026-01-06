import Head from "next/head";
import Link from "next/link";

export default function JpgToPdfOnline() {
  return (
    <>
      <Head>
        <title>JPG to PDF Online – Convert Images to PDF | EasyPDF Tools</title>
        <meta
          name="description"
          content="Convert JPG to PDF online. Combine multiple images into a single PDF file. Free, fast and secure JPG to PDF converter."
        />
      </Head>

      <main style={{ padding: 40, maxWidth: 900, margin: "0 auto", fontFamily: "system-ui" }}>
        <h1>JPG to PDF Online</h1>

        <p>
          Convert JPG images to PDF online. Combine multiple JPG files into one
          clean PDF using EasyPDF Tools.
        </p>

        <h2>Why use JPG to PDF?</h2>
        <ul>
          <li>Create printable PDF documents</li>
          <li>Combine multiple images into one file</li>
          <li>Professional document format</li>
        </ul>

        <h2>How to convert JPG to PDF</h2>
        <ol>
          <li>Upload JPG images</li>
          <li>Arrange image order</li>
          <li>Download PDF</li>
        </ol>

        <p>
          👉 <Link href="/">Start with EasyPDF Tools</Link>
        </p>
      </main>
    </>
  );
}
