"use client";

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function OrganizePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState(""); // e.g. "3,1,2"
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }
    if (!order.trim()) {
      setError("Please enter page order, e.g. 3,1,2");
      return;
    }

    setError("");
    setLoading(true);
    setDownloadUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("order", order); // backend expects 'order' string

      const res = await fetch(`${API_BASE_URL}/organize-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to organize PDF.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while organizing the PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Organize PDF</h2>
      <p className="text-sm text-gray-600 mb-4">
        Upload a PDF and enter the page order like <b>3,1,2,4</b> to reorder
        the pages.
      </p>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <input
        type="text"
        placeholder="Enter page order (e.g. 3,1,2,4)"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
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
        {loading ? "Organizing..." : "Organize PDF"}
      </button>

      {downloadUrl && (
        <div className="mt-6 border-t pt-4">
          <a
            href={downloadUrl}
            download="organized.pdf"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Download Organized PDF
          </a>
        </div>
      )}
    </div>
  );
}
