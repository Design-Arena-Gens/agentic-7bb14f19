import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DBT Proposal Assistant - AI Imaging Biobank",
  description: "Expert research assistant for preparing DBT proposals on AI-Enabled Imaging Biobank for Onco-pathology and Infectious Diseases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
