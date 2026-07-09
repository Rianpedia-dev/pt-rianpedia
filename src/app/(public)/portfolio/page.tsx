import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portofolio — Rianpedia",
  description: "Case study dan portfolio proyek Rianpedia. Lihat bagaimana kami membantu klien mencapai tujuan bisnis mereka dengan solusi digital.",
};

import { db } from "@/db";
import { portfolios as portfoliosTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function PortfolioPage() {
  const portfolios = await db.select().from(portfoliosTable).orderBy(desc(portfoliosTable.createdAt));
  
  const categories = ["Semua", ...new Set(portfolios.map(p => p.category).filter(Boolean) as string[])];

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ paddingTop: "128px", paddingBottom: "64px" }}>
        <div className="container-rianpedia text-center max-w-3xl mx-auto">


          <h1 className="display-lg mb-6">
            PROYEK YANG BERBICARA SENDIRI
          </h1>
          <p className="body-md" style={{ fontSize: "18px" }}>
            Setiap case study adalah bukti nyata bagaimana kami mengubah tantangan bisnis menjadi solusi digital yang berdampak.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section style={{ borderTop: "1px solid #3c3c3c", borderBottom: "1px solid #3c3c3c" }}>
        <div className="container-rianpedia">
          <div className="flex flex-wrap gap-6 items-center justify-center py-4">
            {categories.map((cat) => (
              <span
                key={cat}
                className={cat === "Semua" ? "category-tab-active" : "category-tab"}
                style={cat === "Semua" ? {
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase" as const,
                  color: "#ffffff",
                  padding: "12px 0",
                  borderBottom: "2px solid #ffffff",
                  cursor: "pointer",
                } : undefined}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section style={{ padding: "96px 0" }}>
        <div className="container-rianpedia">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {portfolios.map(({ id, title, clientName, problem, solution, results, techStack, emoji, category, year }) => (
              <div
                key={id}
                className="group flex flex-col"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #3c3c3c",
                  padding: "40px",
                  marginBottom: "-1px",
                  marginRight: "-1px",
                }}
              >
                {/* Top */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="tag mb-3 self-start">
                      {emoji} {category}
                    </div>
                    <h2 className="title-lg">{title}</h2>
                    <p className="caption mt-1">
                      {clientName} · {year}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-white mt-1 shrink-0" />
                </div>

                {/* Problem → Solution */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="label-uppercase text-[12px] mb-2" style={{ color: "#7e7e7e" }}>
                      TANTANGAN
                    </p>
                    <p className="body-sm">{problem}</p>
                  </div>
                  <div>
                    <p className="label-uppercase text-[12px] mb-2" style={{ color: "#7e7e7e" }}>
                      SOLUSI
                    </p>
                    <p className="body-sm">{solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="mb-5">
                  <p className="label-uppercase text-[12px] mb-3" style={{ color: "#7e7e7e" }}>
                    HASIL
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {results?.map((r: string) => (
                      <div
                        key={r}
                        className="flex items-start gap-2 text-[12px] font-light p-3"
                        style={{ background: "#262626", border: "1px solid #3c3c3c" }}
                      >
                        <span className="w-1 h-1 bg-white mt-1.5 shrink-0" />
                        <span style={{ color: "#bbbbbb" }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 pt-4 mt-auto" style={{ borderTop: "1px solid #262626" }}>
                  {techStack?.map((t: string) => (
                    <span
                      key={t}
                      className="text-[12px] font-bold uppercase tracking-[1px] px-3 py-1"
                      style={{ background: "#262626", border: "1px solid #3c3c3c", color: "#7e7e7e" }}
                    >
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
      <section style={{ borderTop: "1px solid #3c3c3c" }}>
        <div className="m-stripe" />
        <div className="container-rianpedia text-center" style={{ padding: "96px 1.5rem" }}>
          <h2 className="display-sm mb-4">SIAP JADI CASE STUDY BERIKUTNYA?</h2>
          <p className="body-md mb-8">
            Mulai dengan AI Recommender kami untuk mendapatkan proposal mini dalam hitungan menit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ai-recommender" className="btn-primary">
              REKOMENDASI AI <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/contact" className="btn-outline">
              HUBUNGI TIM KAMI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
