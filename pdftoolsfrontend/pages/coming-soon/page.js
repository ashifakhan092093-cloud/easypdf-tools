import Link from "next/link";
import { useRouter } from "next/router";

export default function ComingSoon() {
  const router = useRouter();
  const tool = router.query.tool || "This tool";

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>🚧 Coming Soon</div>

        <h1 style={styles.title}>{tool}</h1>

        <p style={styles.desc}>
          Ye tool abhi development me hai. Jaldi live ho jayega.
        </p>

        <Link href="/" style={styles.btn}>
          ← Back to all tools
        </Link>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#f3f4f6",
    fontFamily: "system-ui",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 520,
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
    padding: 28,
    textAlign: "center",
  },
  badge: {
    display: "inline-flex",
    padding: "6px 12px",
    borderRadius: 999,
    background: "#ecfdf5",
    border: "1px solid #a7f3d0",
    color: "#065f46",
    fontSize: 12,
    fontWeight: 700,
  },
  title: {
    margin: "14px 0 6px",
    fontSize: 24,
    color: "#059669",
    fontWeight: 800,
  },
  desc: {
    margin: 0,
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 1.6,
  },
  btn: {
    display: "inline-flex",
    marginTop: 18,
    padding: "10px 18px",
    borderRadius: 999,
    background: "#059669",
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 13,
  },
};
