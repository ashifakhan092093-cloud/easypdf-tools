import Link from "next/link";
import { useRouter } from "next/router";

export default function ComingSoon() {
  const router = useRouter();
  const tool = (router.query.tool as string) || "This tool";

  return (
    <main className="page">
      <div className="card">
        <div className="badge">🚧 Coming Soon</div>
        <h1 className="title">{tool}</h1>
        <p className="desc">
          Ye tool abhi development me hai. Jaldi live ho jayega.
        </p>

        <div className="btnRow">
          <Link href="/" className="btn">
            ← Back to all tools
          </Link>
        </div>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          font-family: system-ui;
          padding: 16px;
        }
        .card {
          width: 100%;
          max-width: 520px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          padding: 28px;
          text-align: center;
        }
        .badge {
          display: inline-flex;
          padding: 6px 12px;
          border-radius: 999px;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
          font-size: 12px;
          font-weight: 700;
        }
        .title {
          margin: 14px 0 6px 0;
          font-size: 24px;
          color: #059669;
          font-weight: 800;
        }
        .desc {
          margin: 0;
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
        }
        .btnRow {
          margin-top: 18px;
          display: flex;
          justify-content: center;
        }
        .btn {
          display: inline-flex;
          padding: 10px 18px;
          border-radius: 999px;
          background: #059669;
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 13px;
        }
        .btn:hover {
          background: #047857;
        }
      `}</style>
    </main>
  );
}
