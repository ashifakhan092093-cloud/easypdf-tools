"use client";

import { useState } from "react";

const API_BASE_URL = "https://easypdf-tools.onrender.com";

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setError(null);
    setDownloadUrl(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file); // backend param name: file

      const res = await fetch(`${API_BASE_URL}/compress-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", res.status, text);
        throw new Error("Failed to compress PDF.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while compressing the PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Compress PDF</h2>
      <p className="text-sm text-gray-600 mb-4">
        Upload a PDF file and we&apos;ll compress it while keeping the best
        possible quality.
      </p>

      <div className="mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
        />
        {file && (
          <p className="mt-2 text-xs text-gray-500">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

      {error && (
        <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !file}
        className={`w-full inline-flex justify-center items-center rounded-lg px-4 py-2 font-semibold text-white ${
          loading || !file
            ? "bg-red-300 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {loading ? "Compressing..." : "Compress PDF"}
      </button>

      {downloadUrl && (
        <div className="mt-6 border-t pt-4">
          <p className="text-sm text-gray-700 mb-2">
            Your compressed PDF is ready:
          </p>
          <a
            href={downloadUrl}
            download="compressed.pdf"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-700 text-white"
          >
            Download Compressed PDF
          </a>
        </div>
      )}
    </div>
  );
}
