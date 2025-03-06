import "./globals.css";
export const metadata = {
  title: "Font Finder - Identify Fonts from Text and Images",
  description: "Upload images or paste text to identify fonts using Gemini AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
