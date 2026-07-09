import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Harga — Rianpedia",
  description: "Paket harga transparan Rianpedia. Milestone payment, estimasi biaya, dan proses kerja yang jelas.",
};

const pricingTiers = [
  {
    name: "PEMULA",
    tagline: "Untuk bisnis yang baru memulai",
    price: "Mulai 5 Juta",
    priceNote: "tergantung scope",
    popular: false,
    includes: ["Landing page / company profile", "Design UI/UX premium", "Responsif mobile & desktop", "SEO on-page dasar", "Deployment ke hosting", "1 bulan support gratis"],
    notIncluded: ["Backend / database", "Custom fitur kompleks", "AI integration"],
    cta: "MULAI PROYEK",
  },
  {
    name: "PROFESSIONAL",
    tagline: "Untuk bisnis yang ingin tumbuh",
    price: "Mulai 15 Juta",
    priceNote: "tergantung scope",
    popular: true,
    includes: ["Web app / sistem custom lengkap", "Backend + Database", "Autentikasi & role management", "Dashboard admin & user", "API integration dasar", "3 bulan support gratis", "Source code diserahkan"],
    notIncluded: ["AI integration", "Mobile app"],
    cta: "PILIH PROFESSIONAL",
  },
  {
    name: "ENTERPRISE",
    tagline: "Untuk bisnis skala besar",
    price: "Custom",
    priceNote: "sesuai kebutuhan",
    popular: false,
    includes: ["Solusi enterprise end-to-end", "AI integration & automation", "Multi-platform (Web + Mobile)", "Infrastruktur scalable", "Dedicated developer team", "SLA & maintenance kontrak", "Training tim internal", "Support prioritas 24/7"],
    notIncluded: [],
    cta: "DISKUSIKAN KEBUTUHAN",
  },
];

const milestones = [
  { phase: "DP", percentage: "30%", desc: "Pembayaran awal setelah kontrak ditandatangani dan briefing teknis selesai." },
  { phase: "TERMIN 1", percentage: "30%", desc: "Setelah design UI/UX disetujui dan prototype selesai." },
  { phase: "TERMIN 2", percentage: "20%", desc: "Setelah pengembangan selesai dan staging siap untuk review." },
  { phase: "PELUNASAN", percentage: "20%", desc: "Setelah revisi final, UAT, dan deployment ke produksi." },
];

const faqs = [
  { q: "Berapa lama waktu pengerjaan?", a: "Tergantung complexity. Landing page: 1-2 minggu. Web app simple: 4-6 minggu. Sistem kompleks: 8-16 minggu." },
  { q: "Apakah ada garansi?", a: "Ya. Garansi bug-fix selama masa support (1-3 bulan tergantung paket). Revisi desain: 2x gratis dalam fase design." },
  { q: "Siapa yang memegang source code?", a: "Anda sebagai klien. Semua source code diserahkan penuh setelah pelunasan. Tidak ada lock-in." },
  { q: "Bisa minta meeting konsultasi dulu?", a: "Tentu! Konsultasi awal 30 menit gratis via Zoom/Google Meet." },
  { q: "Apa yang membedakan dari freelancer biasa?", a: "Kami adalah tim (bukan freelancer solo): UI/UX designer, developer, dan QA tester. Plus AI-assisted tools." },
];

export default function PricingPage() {
  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ paddingTop: "128px", paddingBottom: "64px" }}>
        <div className="container-rianpedia text-center max-w-3xl mx-auto">


          <h1 className="display-lg mb-6">HARGA TRANSPARAN, TIDAK ADA BIAYA TERSEMBUNYI</h1>
          <p className="body-md" style={{ fontSize: "18px" }}>
            Kami percaya transparansi adalah fondasi kerjasama yang baik. Semua biaya jelas dari awal.
          </p>
        </div>
      </section>

      <div className="m-stripe" />

      {/* Pricing Tiers */}
      <section style={{ padding: "96px 0" }}>
        <div className="container-rianpedia">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto">
            {pricingTiers.map(({ name, tagline, price, priceNote, popular, includes, notIncluded, cta }) => (
              <div
                key={name}
                className="flex flex-col relative"
                style={{
                  background: popular ? "#1a1a1a" : "#0d0d0d",
                  border: "1px solid #3c3c3c",
                  borderLeft: popular ? "1px solid #ffffff" : "1px solid #3c3c3c",
                  borderRight: popular ? "1px solid #ffffff" : "1px solid #3c3c3c",
                  padding: "40px 32px",
                  marginRight: "-1px",
                }}
              >
                {popular && (
                  <div
                    className="absolute -top-px left-0 right-0 h-[4px]"
                    style={{ background: "linear-gradient(90deg, #0066b1 0%, #0066b1 33%, #1c69d4 33%, #1c69d4 66%, #e22718 66%, #e22718 100%)" }}
                  />
                )}
                <h2 className="label-uppercase text-[16px] mb-1">{name}</h2>
                <p className="body-sm mb-6" style={{ color: "#7e7e7e" }}>{tagline}</p>
                <div className="mb-6">
                  <span className="display-sm">{price}</span>
                  <span className="body-sm ml-2">{priceNote}</span>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] font-light" style={{ color: "#bbbbbb" }}>
                      <span className="w-1 h-1 bg-white mt-2 shrink-0" /> {item}
                    </li>
                  ))}
                  {notIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] font-light line-through" style={{ color: "#3c3c3c" }}>
                      <span className="w-1 h-1 bg-current mt-2 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={name === "ENTERPRISE" ? "/contact" : "/ai-recommender"}
                  className={popular ? "btn-primary w-full" : "btn-outline w-full"}
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone Payment */}
      <section style={{ background: "transparent", borderTop: "1px solid #3c3c3c", borderBottom: "1px solid #3c3c3c", padding: "96px 0" }}>
        <div className="container-rianpedia">
          <div className="text-center mb-12">
            <div className="section-label mx-auto justify-center">PEMBAYARAN BERTAHAP</div>
            <h2 className="display-sm mb-3">PEMBAYARAN BERTAHAP, RISIKO MINIMAL</h2>
            <p className="body-md">Tidak perlu bayar lunas di awal. Sistem milestone yang melindungi kedua belah pihak.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 max-w-4xl mx-auto">
            {milestones.map(({ phase, percentage, desc }, i) => (
              <div key={phase} className="spec-cell text-center" style={{ border: "1px solid #3c3c3c", padding: "32px 24px", marginRight: "-1px" }}>
                <div className="label-uppercase text-[12px] mb-2" style={{ color: "#7e7e7e" }}>{i + 1}</div>
                <h3 className="text-[16px] font-bold text-white mb-2">{phase}</h3>
                <div className="display-sm mb-3">{percentage}</div>
                <p className="caption">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-rianpedia max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto justify-center">FAQ</div>
            <h2 className="display-sm">PERTANYAAN UMUM</h2>
          </div>
          <div className="space-y-0">
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ background: "#1a1a1a", border: "1px solid #3c3c3c", padding: "24px 32px", marginBottom: "-1px" }}>
                <h3 className="text-[16px] font-bold text-white mb-2">{q}</h3>
                <p className="body-sm">{a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="body-sm mb-6">Masih ada pertanyaan lain?</p>
            <Link href="/contact" className="btn-primary">
              HUBUNGI KAMI <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
