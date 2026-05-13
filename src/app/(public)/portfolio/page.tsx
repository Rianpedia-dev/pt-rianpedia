import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio — Rianpedia",
  description: "Case study dan portfolio proyek Rianpedia. Lihat bagaimana kami membantu klien mencapai tujuan bisnis mereka dengan solusi digital.",
};

import { db } from "@/db";
import { portfolios as portfoliosTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function PortfolioPage() {
  const portfolios = await db.select().from(portfoliosTable).orderBy(desc(portfoliosTable.createdAt));
  
  const categories = ["Semua", ...new Set(portfolios.map(p => p.category).filter(Boolean) as string[])];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="ai-grid" />
        <div
          className="absolute glow-orb"
          style={{ width: "500px", height: "400px", background: "radial-gradient(circle, rgba(124, 58, 237,0.2) 0%, transparent 70%)", top: "-100px", right: "10%" }}
        />
        <div className="container-rianpedia relative z-10 text-center max-w-3xl mx-auto">
          <div className="section-label mx-auto">🚀 Portfolio</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Proyek yang{" "}
            <span style={{ background: "linear-gradient(135deg, #FF3B3B, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Berbicara Sendiri
            </span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Setiap case study adalah bukti nyata bagaimana kami mengubah tantangan bisnis menjadi solusi digital yang berdampak.
          </p>
        </div>
      </section>

      {/* Filter pills */}
      <section className="pb-8">
        <div className="container-rianpedia">
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <Filter className="w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-sm px-4 py-2 rounded-full cursor-pointer transition-all"
                style={
                  cat === "Semua"
                    ? { background: "rgba(255, 59, 59,0.2)", border: "1px solid rgba(255, 59, 59,0.4)", color: "#a5a1ff" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }
                }
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-24">
        <div className="container-rianpedia">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portfolios.map(({ id, title, clientName, problem, solution, results, techStack, color, emoji, category, year }) => (
              <div
                key={id}
                className="glass-card p-8 group flex flex-col"
              >
                {/* Top */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div
                      className="tag mb-3 self-start"
                      style={{ background: `${color ?? "#FF3B3B"}15`, borderColor: `${color ?? "#FF3B3B"}30`, color: color ?? "#FF3B3B" }}
                    >
                      {emoji} {category}
                    </div>
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {clientName} · {year}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: color ?? "#FF3B3B", marginTop: "4px", flexShrink: 0 }} />
                </div>

                {/* Problem → Solution */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                      🔴 Tantangan
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                      🟢 Solusi Rianpedia
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                    📈 Hasil
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {results?.map((r: string) => (
                      <div
                        key={r}
                        className="flex items-start gap-2 text-xs p-2.5 rounded-lg"
                        style={{ background: `${color ?? "#FF3B3B"}10`, border: `1px solid ${color ?? "#FF3B3B"}20` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: color ?? "#FF3B3B" }} />
                        <span style={{ color: "rgba(255,255,255,0.65)" }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 pt-4 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {techStack?.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-rianpedia text-center">
          <div
            className="inline-block p-10 rounded-3xl"
            style={{ background: "rgba(255, 59, 59,0.08)", border: "1px solid rgba(255, 59, 59,0.2)" }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">Siap Jadi Case Study Berikutnya?</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              Mulai dengan AI Recommender kami untuk mendapatkan proposal mini dalam hitungan menit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ai-recommender" className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl text-white" style={{ background: "linear-gradient(135deg, #FF3B3B, #7C3AED)" }}>
                🤖 Coba AI Recommender <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                Hubungi Tim Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
