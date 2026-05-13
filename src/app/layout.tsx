import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rianpedia — Engineering the Future with Intelligent Systems",
    template: "%s | Rianpedia",
  },
  description:
    "Rianpedia adalah AI-Powered Digital Solution Company yang membangun website, sistem custom, dan integrasi AI untuk startup, UMKM, enterprise, dan instansi pendidikan.",
  keywords: [
    "AI company",
    "web development Indonesia",
    "sistem custom",
    "integrasi AI",
    "digital solution",
    "software house",
    "Next.js",
    "Rianpedia",
  ],
  authors: [{ name: "Rianpedia Team" }],
  creator: "Rianpedia",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Rianpedia — Engineering the Future with Intelligent Systems",
    description:
      "AI-Powered Digital Solution Company: Website, Sistem Custom, dan Integrasi AI.",
    siteName: "Rianpedia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rianpedia — AI-Powered Digital Solution",
    description: "Engineering the Future with Intelligent Systems",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(10, 10, 26, 0.95)",
              border: "1px solid rgba(255, 59, 59, 0.3)",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
