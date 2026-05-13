"use client";

import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";

export function CTABanner() {
  return (
    <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="container-rianpedia">
        <div
          className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255, 59, 59,0.15) 0%, rgba(156, 163, 175,0.08) 50%, rgba(229, 9, 20,0.12) 100%)",
            border: "1px solid rgba(255, 59, 59,0.25)",
          }}
        >
          {/* Background effects */}
          <div
            className="absolute top-0 left-1/4 glow-orb"
            style={{
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(255, 59, 59,0.3) 0%, transparent 70%)",
              top: "-100px",
              left: "10%",
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 glow-orb"
            style={{
              width: "250px",
              height: "250px",
              background: "radial-gradient(circle, rgba(156, 163, 175,0.2) 0%, transparent 70%)",
              bottom: "-80px",
              right: "10%",
            }}
          />

          {/* Grid inside */}
          <div className="ai-grid" style={{ opacity: 0.3 }} />

          {/* Content */}
          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: "rgba(255, 59, 59,0.2)",
                border: "1px solid rgba(255, 59, 59,0.4)",
                color: "#FF3B3B",
              }}
            >
              <Bot className="w-4 h-4" />
              AI-Powered
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 max-w-3xl mx-auto leading-tight">
              Siap Memulai{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FF3B3B, #9CA3AF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Proyek Anda?
              </span>
            </h2>
            <p
              className="text-lg max-w-xl mx-auto mb-10"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Coba AI Project Recommender kami dan dapatkan rekomendasi sistem, estimasi biaya, dan timeline dalam hitungan detik — gratis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/ai-recommender"
                className="group flex items-center gap-2.5 text-base font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #FF3B3B, #374151)",
                  color: "white",
                  boxShadow: "0 4px 30px rgba(255, 59, 59, 0.5)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(255, 59, 59, 0.7)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 30px rgba(255, 59, 59, 0.5)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                🤖 Coba AI Recommender Gratis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="text-base font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.8)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
