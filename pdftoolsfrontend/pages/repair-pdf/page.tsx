"use client";

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function RepairPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    setError("");
    setLoading(true);
    setDownloadUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE_URL}/repair-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to repair PDF.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while repairing the PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Repair PDF</h2>
      <p className="text-sm text-gray-600 mb-4">
        Upload a PDF and we&apos;ll try to rebuild it into a clean file.
      </p>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      {error && (
        <p className="text-red-600 bg-red-50 p-2 rounded mb-3">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-2 rounded-lg text-white font-semibold ${
          loading ? "bg-red-300" : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {loading ? "Repairing..." : "Repair PDF"}
      </button>

      {downloadUrl && (
        <div className="mt-6 border-t pt-4">
          <a
            href={downloadUrl}
            download="repaired.pdf"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Download Repaired PDF
          </a>
        </div>
      )}
    </div>
  );
}
