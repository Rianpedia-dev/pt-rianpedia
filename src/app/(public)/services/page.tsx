import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Settings, Bot, Plug, CheckCircle } from "lucide-react";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services — Rianpedia",
  description: "Layanan lengkap Rianpedia: Custom Web Development, System Development, AI Integration, dan System Integration untuk bisnis Anda.",
};

import { db } from "@/db";
import { services as servicesTable } from "@/db/schema";
import { asc } from "drizzle-orm";

const iconMap: Record<string, any> = {
  web: Globe,
  system: Settings,
  ai: Bot,
  integration: Plug,
};

export default async function ServicesPage() {
  const services = await db.select().from(servicesTable).orderBy(asc(servicesTable.order));

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="ai-grid" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 glow-orb"
          style={{ width: "600px", height: "400px", background: "radial-gradient(circle, rgba(255, 59, 59,0.2) 0%, transparent 70%)", top: "-100px" }}
        />
        <div className="container-rianpedia relative z-10 text-center max-w-3xl mx-auto">
          <div className="section-label mx-auto">⚡ Services</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Solusi Digital{" "}
            <span style={{ background: "linear-gradient(135deg, #FF3B3B, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              End-to-End
            </span>
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
            Dari konsep hingga live — kami tangani semuanya. Mulai dari website, sistem custom, AI integration, hingga ekosistem digital terintegrasi.
          </p>
          <Link
            href="/ai-recommender"
            className="inline-flex items-center gap-2 text-base font-semibold px-7 py-3.5 rounded-xl text-white"
            style={{ background: "linear-gradient(135deg, #FF3B3B, #7C3AED)", boxShadow: "0 4px 20px rgba(255, 59, 59,0.4)" }}
          >
            🤖 Dapatkan Rekomendasi AI <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Services Detail */}
      <section className="pb-24">
        <div className="container-rianpedia space-y-20">
          {services.map(({ id, title, subtitle, description, features, packages, color, gradient, emoji }, idx) => {
            const Icon = iconMap[id] || Globe;
            const themeColor = color ?? "#FF3B3B";
            
            return (
              <div
                key={id}
                id={id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Text Side */}
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full mb-5"
                    style={{ background: `${themeColor}18`, border: `1px solid ${themeColor}30`, color: themeColor }}
                  >
                    <span className="text-lg">{emoji}</span> {title}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">{subtitle}</h2>
                  <p className="text-base leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.55)" }}>{description}</p>
                  <ul className="space-y-3 mb-8">
                    {features?.map((f: string) => (
                      <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                        <CheckCircle className="w-4 h-4 shrink-0" style={{ color: themeColor }} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl"
                    style={{ background: `${themeColor}20`, border: `1px solid ${themeColor}40`, color: themeColor }}
                  >
                    Konsultasi Gratis <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Packages Side */}
                <div className={`space-y-4 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  {packages?.map(({ name, price, desc }) => (
                    <div
                      key={name}
                      className="p-6 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-1"
                      style={{ background: gradient ?? "rgba(255,255,255,0.03)", border: `1px solid ${themeColor}20` }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{name}</h3>
                        <span className="text-sm font-bold" style={{ color: themeColor }}>{price}</span>
                      </div>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{desc}</p>
                    </div>
                  ))}
                  <div
                    className="p-5 rounded-2xl text-center"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.1)" }}
                  >
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Tidak ada yang sesuai?{" "}
                      <Link href="/contact" style={{ color: themeColor }} className="font-semibold hover:underline">
                        Diskusikan kebutuhan Anda →
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
