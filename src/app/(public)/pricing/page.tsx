import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Rianpedia",
  description: "Paket harga transparan Rianpedia. Milestone payment, estimasi biaya, dan proses kerja yang jelas dari awal hingga deployment.",
};

const pricingTiers = [
  {
    name: "Starter",
    emoji: "🌱",
    tagline: "Untuk bisnis yang baru memulai",
    price: "Mulai 5 Juta",
    priceNote: "tergantung scope",
    color: "#FF3B3B",
    popular: false,
    includes: [
      "Landing page / company profile",
      "Design UI/UX premium dark mode",
      "Responsif mobile & desktop",
      "SEO on-page dasar",
      "Deployment ke hosting",
      "1 bulan support gratis",
    ],
    notIncluded: [
      "Backend / database",
      "Custom fitur kompleks",
      "AI integration",
    ],
    cta: "Mulai Proyek",
  },
  {
    name: "Professional",
    emoji: "⚡",
    tagline: "Untuk bisnis yang ingin tumbuh",
    price: "Mulai 15 Juta",
    priceNote: "tergantung scope",
    color: "#22D3EE",
    popular: true,
    includes: [
      "Web app / sistem custom lengkap",
      "Backend + Database (Supabase/PostgreSQL)",
      "Autentikasi & role management",
      "Dashboard admin & user",
      "API integration dasar",
      "3 bulan support gratis",
      "Source code diserahkan",
    ],
    notIncluded: [
      "AI integration",
      "Mobile app",
    ],
    cta: "Pilih Professional",
  },
  {
    name: "Enterprise",
    emoji: "🚀",
    tagline: "Untuk bisnis skala besar",
    price: "Custom",
    priceNote: "sesuai kebutuhan",
    color: "#7C3AED",
    popular: false,
    includes: [
      "Solusi enterprise end-to-end",
      "AI integration & automation",
      "Multi-platform (Web + Mobile)",
      "Infrastruktur scalable",
      "Dedicated developer team",
      "SLA & maintenance kontrak",
      "Training tim internal",
      "Support prioritas 24/7",
    ],
    notIncluded: [],
    cta: "Diskusikan Kebutuhan",
  },
];

const milestones = [
  { phase: "DP", percentage: "30%", desc: "Pembayaran awal setelah kontrak ditandatangani dan briefing teknis selesai." },
  { phase: "Termin 1", percentage: "30%", desc: "Setelah design UI/UX disetujui dan prototype/wireframe selesai." },
  { phase: "Termin 2", percentage: "20%", desc: "Setelah pengembangan selesai dan staging siap untuk review klien." },
  { phase: "Pelunasan", percentage: "20%", desc: "Setelah revisi final, UAT, dan deployment ke server produksi." },
];

const faqs = [
  { q: "Berapa lama waktu pengerjaan?", a: "Tergantung complexity. Landing page: 1-2 minggu. Web app simple: 4-6 minggu. Sistem kompleks: 8-16 minggu. Timeline detail kami buat di proposal." },
  { q: "Apakah ada garansi?", a: "Ya. Kami memberikan garansi bug-fix selama masa support (1-3 bulan tergantung paket). Revisi desain: 2x gratis dalam fase design." },
  { q: "Siapa yang memegang source code?", a: "Anda sebagai klien. Semua source code diserahkan penuh setelah pelunasan. Tidak ada lock-in dengan Rianpedia." },
  { q: "Bisa minta meeting konsultasi dulu?", a: "Tentu! Konsultasi awal 30 menit gratis via Zoom/Google Meet. Silakan isi form di halaman Contact atau coba AI Recommender kami." },
  { q: "Apa yang membedakan dari freelancer biasa?", a: "Kami adalah tim (bukan freelancer solo): UI/UX designer, developer, dan QA tester. Plus AI-assisted tools yang mempercepat pengerjaan dan meningkatkan kualitas." },
];

export default function PricingPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="ai-grid" />
        <div className="container-rianpedia relative z-10 text-center max-w-3xl mx-auto">
          <div className="section-label mx-auto">💳 Pricing</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Harga{" "}
            <span style={{ background: "linear-gradient(135deg, #FF3B3B, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Transparan
            </span>
            , Tidak Ada Biaya Tersembunyi
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Kami percaya transparansi adalah fondasi kerjasama yang baik. Semua biaya jelas dari awal.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="pb-20">
        <div className="container-rianpedia">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map(({ name, emoji, tagline, price, priceNote, color, popular, includes, notIncluded, cta }) => (
              <div
                key={name}
                className={`glass-card p-8 flex flex-col relative ${popular ? "scale-105" : ""}`}
                style={popular ? { border: `1px solid ${color}50`, boxShadow: `0 0 40px ${color}20` } : {}}
              >
                {popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${color}, #7C3AED)`, color: "white" }}
                  >
                    ⭐ Paling Populer
                  </div>
                )}
                <div className="text-3xl mb-3">{emoji}</div>
                <h2 className="text-xl font-bold text-white mb-1">{name}</h2>
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>{tagline}</p>
                <div className="mb-6">
                  <span className="text-3xl font-black" style={{ color }}>{price}</span>
                  <span className="text-sm ml-2" style={{ color: "rgba(255,255,255,0.35)" }}>{priceNote}</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color }} /> {item}
                    </li>
                  ))}
                  {notIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm line-through" style={{ color: "rgba(255,255,255,0.25)" }}>
                      <span className="w-4 h-4 mt-0.5 shrink-0 text-center">✕</span> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={name === "Enterprise" ? "/contact" : "/ai-recommender"}
                  className="text-center text-sm font-semibold py-3 px-5 rounded-xl transition-all"
                  style={popular
                    ? { background: `linear-gradient(135deg, ${color}, #7C3AED)`, color: "white", boxShadow: `0 4px 20px ${color}40` }
                    : { background: `${color}18`, border: `1px solid ${color}30`, color }
                  }
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone Payment */}
      <section className="py-20" style={{ background: "rgba(8,8,20,0.8)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container-rianpedia">
          <div className="text-center mb-12">
            <div className="section-label mx-auto">🛡️ Milestone Payment</div>
            <h2 className="text-3xl font-bold text-white mb-3">Pembayaran Bertahap, Risiko Minimal</h2>
            <p className="text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
              Tidak perlu bayar lunas di awal. Kami pakai sistem milestone yang melindungi kedua belah pihak.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {milestones.map(({ phase, percentage, desc }, i) => (
              <div key={phase} className="glass-card p-6 text-center relative">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, #FF3B3B, #7C3AED)" }}
                >
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{phase}</h3>
                <div className="text-2xl font-black mb-3" style={{ background: "linear-gradient(135deg, #FF3B3B, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {percentage}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container-rianpedia max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto"><HelpCircle className="w-3.5 h-3.5" /> FAQ</div>
            <h2 className="text-3xl font-bold text-white">Pertanyaan Umum</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="glass-card p-6">
                <h3 className="text-base font-semibold text-white mb-2">❓ {q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>Masih ada pertanyaan lain?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl" style={{ background: "linear-gradient(135deg, #FF3B3B, #7C3AED)", color: "white" }}>
              Hubungi Kami <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
