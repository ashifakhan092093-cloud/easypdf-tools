import Head from "next/head";
import Link from "next/link";

export default function Contact() {
  return (
    <main style={styles.page}>
      <Head>
        <title>Contact Us – EasyPDF Tools</title>
        <meta
          name="description"
          content="Contact EasyPDF Tools for support, feedback or questions."
        />
      </Head>

      <div style={styles.card}>
        <h1 style={styles.title}>Contact Us</h1>

        <p style={styles.text}>
          If you have any questions, feedback, or need support, feel free to
          contact us.
        </p>

        <h2 style={styles.heading}>Email</h2>
        <p style={styles.text}>
          You can reach us at: <b>support@easypdftools.com</b>
        </p>

        <h2 style={styles.heading}>Support</h2>
        <p style={styles.text}>
          We usually respond within 24–48 hours.
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
    maxWidth: 800,
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
