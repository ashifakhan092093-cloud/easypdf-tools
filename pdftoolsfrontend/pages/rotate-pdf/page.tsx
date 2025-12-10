"use client";

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function RotatePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);
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
      formData.append("angle", String(angle));

      const res = await fetch(`${API_BASE_URL}/rotate-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Rotate failed.");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError("Something went wrong while rotating PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Rotate PDF</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <select
        value={angle}
        onChange={(e) => setAngle(Number(e.target.value))}
        className="w-full border px-3 py-2 rounded mb-4"
      >
        <option value={90}>Rotate 90°</option>
        <option value={180}>Rotate 180°</option>
        <option value={270}>Rotate 270°</option>
      </select>

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
        {loading ? "Rotating..." : "Rotate PDF"}
      </button>

      {downloadUrl && (
        <div className="mt-6 border-t pt-4">
          <a
            href={downloadUrl}
            download="rotated.pdf"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Download Rotated PDF
          </a>
        </div>
      )}
    </div>
  );
}
