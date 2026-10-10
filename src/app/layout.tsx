import type { Metadata, Viewport } from "next";
import { profile } from "@/data/portfolio";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? profile.portfolio;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rafi Saifuddin — Mahasiswa Sistem Informasi",
    template: "%s · Rafi Saifuddin",
  },
  description:
    "Portofolio Muhammad Ar Rafi Saifuddin, mahasiswa Sistem Informasi dengan pengalaman IT Support, sertifikasi Database Administrator, dan publikasi riset data mining.",
  applicationName: "Rafi Saifuddin Portfolio",
  authors: [{ name: "Muhammad Ar Rafi Saifuddin" }],
  keywords: ["Mahasiswa Sistem Informasi", "IT Support", "Database Administrator", "MySQL", "Laravel", "Data Mining", "Portofolio"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Rafi Saifuddin",
    title: "Rafi Saifuddin — Sistem Informasi, IT Support & Data",
    description: "Pengalaman IT Support, kompetensi basis data, dan publikasi riset data mining.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafi Saifuddin — Sistem Informasi, IT Support & Data",
    description: "Pengalaman IT Support, kompetensi basis data, dan publikasi riset data mining.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b1117" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8f4" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
