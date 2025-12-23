import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <main style={styles.page}>
      <Head>
        <title>About Us – EasyPDF Tools</title>
        <meta
          name="description"
          content="About EasyPDF Tools – simple, fast and secure online PDF tools."
        />
      </Head>

      <div style={styles.card}>
        <h1 style={styles.title}>About Us</h1>

        <p style={styles.text}>
          EasyPDF Tools is a simple web app that helps you work with PDFs quickly
          and easily. Our goal is to provide fast, clean and user‑friendly tools
          for everyday PDF tasks.
        </p>

        <h2 style={styles.heading}>What we offer</h2>
        <p style={styles.text}>
          We provide tools like PDF merge, compress, PDF to JPG and JPG to PDF,
          and we are adding more tools soon.
        </p>

        <h2 style={styles.heading}>Privacy & security</h2>
        <p style={styles.text}>
          We respect user privacy. Our aim is to process files automatically and
          avoid storing them permanently.
        </p>

        <h2 style={styles.heading}>Contact</h2>
        <p style={styles.text}>
          For support or feedback, email us at: <b>support@easypdftools.com</b>
        </p>

        <Link href="/" style={styles.back}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: 20,
    display: "flex",
    justifyContent: "center",
    fontFamily: "system-ui",
  },
  card: {
    width: "100%",
    maxWidth: 900,
    background: "#ffffff",
    padding: 30,
    borderRadius: 16,
    border: "1px solid #e5e7eb",
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: "#059669",
    marginBottom: 16,
  },
  heading: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 700,
  },
  text: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "#374151",
  },
  back: {
    display: "inline-block",
    marginTop: 24,
    color: "#059669",
    fontWeight: 700,
    textDecoration: "none",
  },
};
