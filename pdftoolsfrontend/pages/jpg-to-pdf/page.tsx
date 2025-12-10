"use client";

import { useState } from "react";

export default function JPGtoPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleSubmit = async () => {
    if (files.length < 1) {
      alert("Select at least 1 image!");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await fetch("http://localhost:8000/jpg-to-pdf", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    setDownloadUrl(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">JPG to PDF</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
        className="mb-4"
      />

      <button
        onClick={handleSubmit}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
      >
        {loading ? "Converting..." : "Convert"}
      </button>

      {downloadUrl && (
        <div className="mt-4">
          <a
            href={downloadUrl}
            download="converted.pdf"
            className="text-blue-600 underline"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
