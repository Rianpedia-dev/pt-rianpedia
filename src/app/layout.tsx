import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "700"],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { AppThemeProvider } from "@/components/app-theme-provider";
import { ThemeBackgroundDark } from "@/components/theme-background-dark";

if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("THREE.Clock") || args[0].includes("scroll-behavior"))
    ) {
      return;
    }
    originalWarn(...args);
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppThemeProvider>
          <ThemeBackgroundDark />
          <main className="relative z-10">
            {children}
          </main>
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                border: "1px solid #3c3c3c",
                color: "#fff",
                borderRadius: "0",
              },
            }}
          />
        </AppThemeProvider>
      </body>
    </html>
  );
}
