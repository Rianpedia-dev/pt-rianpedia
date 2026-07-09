import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Heart, Target, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami — Rianpedia",
  description: "Kenali Rianpedia lebih dekat — filosofi, tim, dan visi kami sebagai AI-Powered Digital Solution Company.",
};

const values = [
  { icon: Zap, title: "KECEPATAN & KUALITAS", desc: "Dengan tools AI dan proses yang teruji, kami deliver lebih cepat tanpa kompromi kualitas." },
  { icon: Heart, title: "KLIEN UTAMA", desc: "Kepuasan klien adalah metric terpenting kami. Kami tidak berhenti sebelum proyek memenuhi kebutuhan bisnis Anda." },
  { icon: Target, title: "BERORIENTASI HASIL", desc: "Kami membangun solusi yang menghasilkan ROI nyata dan dampak bisnis yang terukur." },
  { icon: Lightbulb, title: "DIDORONG INOVASI", desc: "Selalu adopsi teknologi terbaru: AI, edge computing, real-time systems." },
];

const timeline = [
  { year: "2021", title: "AWAL PERJALANAN", desc: "Rianpedia dimulai sebagai freelance developer dengan spesialisasi Next.js dan React." },
  { year: "2022", title: "TIM TERBENTUK", desc: "Bergabungnya designer dan backend engineer. Project enterprise pertama berhasil diluncurkan." },
  { year: "2023", title: "AI INTEGRATION ERA", desc: "Mulai mengintegrasikan AI (GPT-4, Gemini) ke dalam setiap solusi klien." },
  { year: "2024", title: "SCALE UP", desc: "50+ proyek selesai, 30+ klien aktif. Rianpedia kini AI-Powered Digital Solution Company." },
];

const team = [
  { name: "Rian Akbar", role: "Founder & Lead Developer", avatar: "RA", expertise: "Full-Stack, AI Integration, Architecture" },
  { name: "Tim UI/UX", role: "Design Lead", avatar: "DL", expertise: "UI/UX, Branding, Prototyping" },
  { name: "Tim Backend", role: "Backend Engineer", avatar: "BE", expertise: "API, Database, DevOps, CI/CD" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ paddingTop: "128px", paddingBottom: "80px" }}>
        <div className="container-rianpedia max-w-4xl mx-auto text-center">


          <h1 className="display-lg mb-6 leading-tight">
            KAMI MEMBANGUN SISTEM, BUKAN SEKADAR WEBSITE
          </h1>
          <p className="body-md max-w-2xl mx-auto" style={{ fontSize: "18px" }}>
            Rianpedia lahir dari keyakinan bahwa setiap bisnis berhak mendapatkan solusi teknologi berkualitas enterprise dengan harga terjangkau.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ background: "transparent", borderTop: "1px solid #3c3c3c", borderBottom: "1px solid #3c3c3c" }}>
        <div className="m-stripe" />
        <div className="container-rianpedia max-w-3xl mx-auto text-center" style={{ padding: "64px 1.5rem" }}>
          <h2 className="display-sm mb-8">FILOSOFI DI BALIK NAMA &ldquo;RIANPEDIA&rdquo;</h2>
          <div className="flex flex-col sm:flex-row gap-0">
            <div style={{ background: "#1a1a1a", border: "1px solid #3c3c3c", padding: "32px", flex: 1 }}>
              <p className="display-sm mb-2">ZEN</p>
              <p className="body-sm">Kesederhanaan & keseimbangan. Sistem kompleks dibuat intuitif.</p>
            </div>
            <div style={{ background: "#1a1a1a", border: "1px solid #3c3c3c", borderLeft: "none", padding: "32px", flex: 1 }}>
              <p className="display-sm mb-2">MATRIX</p>
              <p className="body-sm">Teknologi & sistem. Membangun jaringan solusi yang saling terhubung.</p>
            </div>
          </div>
          <p className="body-md italic mt-8" style={{ color: "#7e7e7e" }}>
            &ldquo;Sistem kompleks dibuat menjadi sederhana dengan bantuan AI&rdquo;
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-rianpedia">
          <div className="text-center mb-12">
            <div className="section-label mx-auto justify-center">NILAI-NILAI</div>
            <h2 className="display-md">PRINSIP YANG MEMANDU KAMI</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-4xl mx-auto">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-5"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #3c3c3c",
                  padding: "32px",
                  marginBottom: "-1px",
                  marginRight: "-1px",
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center shrink-0"
                  style={{ background: "#262626", border: "1px solid #3c3c3c" }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-white mb-2 tracking-wide">{title}</h3>
                  <p className="body-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: "transparent", borderTop: "1px solid #3c3c3c", borderBottom: "1px solid #3c3c3c", padding: "96px 0" }}>
        <div className="container-rianpedia max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto justify-center">PERJALANAN</div>
            <h2 className="display-md">PERJALANAN RIANPEDIA</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: "#3c3c3c" }} />
            <div className="space-y-0">
              {timeline.map(({ year, title, desc }) => (
                <div key={year} className="flex gap-8 items-start mb-4">
                  <div className="w-32 shrink-0 text-right">
                    <span className="label-uppercase text-[14px]" style={{ color: "#e6e6e6" }}>{year}</span>
                  </div>
                  {/* Square dot - BMW M precision */}
                  <div
                    className="w-3 h-3 mt-1.5 shrink-0 relative z-10"
                    style={{ background: "#ffffff" }}
                  />
                  <div
                    style={{
                      background: "#1a1a1a",
                      border: "1px solid #3c3c3c",
                      padding: "24px",
                      flex: 1,
                    }}
                  >
                    <h3 className="text-[16px] font-bold text-white mb-1">{title}</h3>
                    <p className="body-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-rianpedia">
          <div className="text-center mb-12">
            <div className="section-label mx-auto justify-center">TIM</div>
            <h2 className="display-md">TIM DI BALIK RIANPEDIA</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-0">
            {team.map(({ name, role, avatar, expertise }) => (
              <div
                key={name}
                className="text-center w-64"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #3c3c3c",
                  padding: "40px 32px",
                  marginRight: "-1px",
                }}
              >
                {/* Square avatar - BMW M precision, not rounded */}
                <div
                  className="w-16 h-16 flex items-center justify-center text-[20px] font-bold text-white mx-auto mb-4"
                  style={{ background: "#262626", border: "1px solid #3c3c3c" }}
                >
                  {avatar}
                </div>
                <h3 className="text-[16px] font-bold text-white mb-1">{name}</h3>
                <p className="label-uppercase text-[12px] mb-3" style={{ color: "#e6e6e6" }}>{role}</p>
                <p className="caption">{expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: "1px solid #3c3c3c" }}>
        <div className="m-stripe" />
        <div className="container-rianpedia text-center" style={{ padding: "96px 1.5rem" }}>
          <h2 className="display-sm mb-4">BERGABUNGLAH BERSAMA KLIEN KAMI</h2>
          <p className="body-md mb-8">Mulai perjalanan digital Anda bersama Rianpedia hari ini.</p>
          <Link href="/ai-recommender" className="btn-primary">
            REKOMENDASI AI <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
