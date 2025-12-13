"use client";

import { useState } from "react";

const API_BASE_URL = "https://easypdf-tools.onrender.com";

export default function MergePDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    setFiles(selected);
    setError("");
    setDownloadUrl("");
  };

  const handleSubmit = async () => {
    if (!files.length) {
      setError("Please select at least two PDF files.");
      return;
    }
    if (files.length < 2) {
      setError("You need at least 2 PDFs to merge.");
      return;
    }

    setError("");
    setDownloadUrl("");
    setLoading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file)); // backend me field ka naam "files" hai

      const res = await fetch(`${API_BASE_URL}/merge-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to merge PDFs");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while merging the PDFs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Merge PDF</h2>
      <p className="text-sm text-gray-600 mb-4">
        Select multiple PDF files and we&apos;ll merge them into a single
        document.
      </p>

      <div className="mb-4">
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
        />
        {files.length > 0 && (
          <p className="mt-2 text-xs text-gray-500">
            Selected:{" "}
            <span className="font-medium">
              {files.map((f) => f.name).join(", ")}
            </span>
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
        disabled={loading || files.length < 2}
        className={`w-full inline-flex justify-center items-center rounded-lg px-4 py-2 font-semibold text-white ${
          loading || files.length < 2
            ? "bg-red-300 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {loading ? "Merging..." : "Merge PDFs"}
      </button>

      {downloadUrl && (
        <div className="mt-6 border-t pt-4">
          <p className="text-sm text-gray-700 mb-2">
            Your merged PDF is ready:
          </p>
          <a
            href={downloadUrl}
            download="merged.pdf"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-700 text-white"
          >
            Download Merged PDF
          </a>
        </div>
      )}
    </div>
  );
}
