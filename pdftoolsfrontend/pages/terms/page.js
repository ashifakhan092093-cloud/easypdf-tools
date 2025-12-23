import Head from "next/head";
import Link from "next/link";

export default function Terms() {
  return (
    <main style={styles.page}>
      <Head>
        <title>Terms & Conditions – EasyPDF Tools</title>
        <meta
          name="description"
          content="Terms and Conditions for EasyPDF Tools. Please read the terms before using our PDF tools."
        />
      </Head>

      <div style={styles.card}>
        <h1 style={styles.title}>Terms & Conditions</h1>

        <p style={styles.text}>
          Welcome to EasyPDF Tools. By using this website, you agree to these
          Terms & Conditions. If you do not agree, please do not use the site.
        </p>

        <h2 style={styles.heading}>1. Use of Service</h2>
        <p style={styles.text}>
          Our tools are provided “as is” and are intended for personal and
          business use. You agree not to misuse the service, attempt to break it,
          or use it for illegal activities.
        </p>

        <h2 style={styles.heading}>2. File Handling</h2>
        <p style={styles.text}>
          Files uploaded for processing are handled automatically. We aim to
          delete files shortly after processing. However, we cannot guarantee
          uninterrupted service or zero data loss in all situations.
        </p>

        <h2 style={styles.heading}>3. No Warranty</h2>
        <p style={styles.text}>
          We do not provide any warranty that the tools will always work
          perfectly or that results will be error‑free. Use at your own risk.
        </p>

        <h2 style={styles.heading}>4. Limitation of Liability</h2>
        <p style={styles.text}>
          EasyPDF Tools is not liable for any direct or indirect damages,
          including loss of data, business or profits, arising from the use of
          this website.
        </p>

        <h2 style={styles.heading}>5. Third‑Party Services</h2>
        <p style={styles.text}>
          We may use third‑party services like analytics or ads. They may collect
          data according to their own policies.
        </p>

        <h2 style={styles.heading}>6. Updates to Terms</h2>
        <p style={styles.text}>
          We may update these Terms at any time. Continued use of the website
          means you accept the updated Terms.
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
