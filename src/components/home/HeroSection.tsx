"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const typingWords = [
  "Sistem Cerdas",
  "Aplikasi Web Kustom",
  "Integrasi AI",
  "Solusi Digital",
  "Otomatisasi Pintar",
];

function TypingText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = typingWords[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % typingWords.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex]);

  return (
    <span className="block text-white" style={{ minHeight: "1.2em" }}>
      {displayed}
      <span
        className="inline-block w-[3px] ml-1 h-[0.85em] align-middle animate-pulse"
        style={{ background: "#ffffff", verticalAlign: "middle" }}
      />
    </span>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Content */}
      <div className="container-rianpedia relative z-10 pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* M Stripe accent */}


          {/* Headline */}
          <h1
            className="display-xl mb-8"
            style={{
              animation: "fade-up 0.7s ease-out 0.1s forwards",
              opacity: 0,
            }}
          >
            MERANCANG MASA DEPAN
            <br />
            DENGAN{" "}
            <TypingText />
          </h1>

          {/* Subheadline */}
          <p
            className="body-md max-w-2xl mx-auto mb-12"
            style={{
              fontSize: "18px",
              animation: "fade-up 0.7s ease-out 0.2s forwards",
              opacity: 0,
            }}
          >
            Kami membangun website, sistem custom, dan integrasi AI yang mengakselerasi pertumbuhan startup, UMKM, dan enterprise Anda ke level berikutnya.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4"
            style={{
              animation: "fade-up 0.7s ease-out 0.3s forwards",
              opacity: 0,
            }}
          >
            <Button
              asChild
              variant="default"
              size="lg"
              className="w-full sm:w-auto min-h-[48px]"
            >
              <Link href="/ai-recommender" className="w-full flex items-center justify-center gap-2">
                REKOMENDASI AI
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-h-[48px]"
            >
              <Link href="/portfolio" className="w-full flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                LIHAT PORTOFOLIO
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "#3c3c3c" }}
      />
    </section>
  );
}
