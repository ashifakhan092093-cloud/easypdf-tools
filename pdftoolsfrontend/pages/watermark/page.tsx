"use client";

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function WatermarkPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file || !text) {
      setError("Please upload a PDF and enter watermark text.");
      return;
    }

    setError("");
    setLoading(true);
    setDownloadUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("text", text);

      const res = await fetch(`${API_BASE_URL}/watermark`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Watermark failed.");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError("Something went wrong while adding watermark.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4">Add Watermark</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <input
        type="text"
        placeholder="Enter watermark text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
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
        {loading ? "Adding..." : "Add Watermark"}
      </button>

      {downloadUrl && (
        <div className="mt-6 border-t pt-4">
          <a
            href={downloadUrl}
            download="watermarked.pdf"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Download Watermarked PDF
          </a>
        </div>
      )}
    </div>
  );
}
