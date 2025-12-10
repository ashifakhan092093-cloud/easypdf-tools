"use client";
import { useState } from "react";

export default function WordToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!file) {
      alert("Word file choose karo");
      return;
    }

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("http://127.0.0.1:8000/word-to-pdf", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        alert("API error");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "word_to_pdf.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Word to PDF (Demo)</h1>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleConvert} disabled={loading} style={{ marginTop: "8px" }}>
        {loading ? "Converting..." : "Convert"}
      </button>
    </div>
  );
}
