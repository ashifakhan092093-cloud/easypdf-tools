import Head from "next/head";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main style={styles.page}>
      <Head>
        <title>Privacy Policy – EasyPDF Tools</title>
        <meta
          name="description"
          content="Privacy Policy for EasyPDF Tools. Learn how we handle files, data and user privacy."
        />
      </Head>

      <div style={styles.card}>
        <h1 style={styles.title}>Privacy Policy</h1>

        <p style={styles.text}>
          At EasyPDF Tools, your privacy is important to us. This Privacy Policy
          explains how we handle your data when you use our website.
        </p>

        <h2 style={styles.heading}>1. File Privacy</h2>
        <p style={styles.text}>
          All uploaded files are processed automatically and are not stored
          permanently on our servers. Files are deleted shortly after processing.
        </p>

        <h2 style={styles.heading}>2. Information We Collect</h2>
        <p style={styles.text}>
          We do not collect personal information such as name, email or phone
          number. We may collect anonymous usage data to improve our services.
        </p>

        <h2 style={styles.heading}>3. Cookies</h2>
        <p style={styles.text}>
          We may use cookies to enhance user experience and analyze traffic.
          Cookies do not contain personal information.
        </p>

        <h2 style={styles.heading}>4. Third‑Party Services</h2>
        <p style={styles.text}>
          Third‑party services like analytics or advertising partners may use
          cookies or similar technologies according to their own privacy
          policies.
        </p>

        <h2 style={styles.heading}>5. Updates</h2>
        <p style={styles.text}>
          This policy may be updated from time to time. Any changes will be
          posted on this page.
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
