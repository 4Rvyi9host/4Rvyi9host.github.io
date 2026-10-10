import type { Metadata, Viewport } from "next";
import { profile } from "@/data/portfolio";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? profile.portfolio;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rafi Saifuddin — Mobile App Developer",
    template: "%s · Rafi Saifuddin",
  },
  description:
    "Portofolio personal Muhammad Ar Rafi Saifuddin. Mahasiswa Sistem Informasi dengan pengalaman IT support, basis data, dan riset data mining; berfokus ke pengembangan aplikasi mobile.",
  applicationName: "Rafi Saifuddin Portfolio",
  authors: [{ name: "Muhammad Ar Rafi Saifuddin" }],
  keywords: ["Mobile App Developer", "Expo", "React Native", "Portofolio", "IT Support", "Data Mining"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Rafi Saifuddin",
    title: "Rafi Saifuddin — Mobile App Developer",
    description: "Pengalaman, riset, dan perjalanan menuju pengembangan aplikasi mobile.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafi Saifuddin — Mobile App Developer",
    description: "Pengalaman, riset, dan perjalanan menuju pengembangan aplikasi mobile.",
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
