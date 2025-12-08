"use client";
import { useState } from "react";

export default function PdfToExcel() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!file) {
      alert("PDF choose karo");
      return;
    }

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("http://127.0.0.1:8000/pdf-to-excel", {
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
      a.download = "pdf_to_excel.txt";
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
      <h1>PDF to Excel (Text Demo)</h1>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleConvert} disabled={loading} style={{ marginTop: "8px" }}>
        {loading ? "Converting..." : "Convert"}
      </button>
    </div>
  );
}
