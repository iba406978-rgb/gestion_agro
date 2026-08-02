import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestion Agro",
  description: "Application de gestion agricole",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}