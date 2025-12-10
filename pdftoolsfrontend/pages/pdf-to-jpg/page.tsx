"use client";








import { useState } from "react";

export default function PDFtoJPG() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleSubmit = async () => {
    if (!file) {
      alert("Select a PDF file!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/pdf-to-jpg", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    setDownloadUrl(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">PDF to JPG</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
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
            download="pdf_to_jpg.zip"
            className="text-blue-600 underline"
          >
            Download ZIP
          </a>
        </div>
      )}
    </div>
  );
}




