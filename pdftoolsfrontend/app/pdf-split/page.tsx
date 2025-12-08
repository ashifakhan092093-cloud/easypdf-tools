"use client";

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [fromPage, setFromPage] = useState("");
  const [toPage, setToPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }
    if (!fromPage || !toPage) {
      setError("Please enter from & to page numbers.");
      return;
    }

    setError("");
    setDownloadUrl("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("from_page", fromPage);
      formData.append("to_page", toPage);

      const res = await fetch(`${API_BASE_URL}/pdf-split`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to split PDF.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while splitting the PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Split PDF</h2>
      <p className="text-sm text-gray-600 mb-4">
        Select a PDF and choose page range to extract into a new PDF file.
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

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            From page
          </label>
          <input
            type="number"
            min={1}
            value={fromPage}
            onChange={(e) => setFromPage(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            To page
          </label>
          <input
            type="number"
            min={1}
            value={toPage}
            onChange={(e) => setToPage(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
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
        {loading ? "Splitting..." : "Split PDF"}
      </button>

      {downloadUrl && (
        <div className="mt-6 border-t pt-4">
          <p className="text-sm text-gray-700 mb-2">
            Your split PDF is ready:
          </p>
          <a
            href={downloadUrl}
            download="split.pdf"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-700 text-white"
          >
            Download Split PDF
          </a>
        </div>
      )}
    </div>
  );
}
