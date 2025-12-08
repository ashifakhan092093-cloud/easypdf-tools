import "./globals.css";

export const metadata = {
  title: "PDF Tools – iLovePDF Clone",
  description: "All in one PDF toolkit – Merge, Split, Compress and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-red-600 text-white py-4 shadow-lg">
          <h1 className="text-center text-2xl font-bold">
            PDF Tools – iLovePDF Style
          </h1>
        </header>

        <main className="max-w-5xl mx-auto py-8 px-4">{children}</main>

        <footer className="text-center py-6 text-gray-500 text-sm">
          Built by Hesam026 © 2025
        </footer>
      </body>
    </html>
  );
}
