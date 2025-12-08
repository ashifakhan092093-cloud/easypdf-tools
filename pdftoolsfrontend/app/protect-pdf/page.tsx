"use client";

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function ProtectPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file || !password) {
      setError("Please select a PDF and enter a password.");
      return;
    }

    setError("");
    setLoading(true);
    setDownloadUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);

      const res = await fetch(`${API_BASE_URL}/protect-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to protect PDF.");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError("Error while protecting PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4">Protect PDF</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <input
        type="text"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
        {loading ? "Protecting..." : "Protect PDF"}
      </button>

      {downloadUrl && (
        <div className="mt-6 border-t pt-4">
          <a
            href={downloadUrl}
            download="protected.pdf"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Download Protected PDF
          </a>
        </div>
      )}
    </div>
  );
}
