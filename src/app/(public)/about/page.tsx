import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Heart, Target, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Rianpedia",
  description: "Kenali Rianpedia lebih dekat — filosofi, tim, dan visi kami sebagai AI-Powered Digital Solution Company.",
};

const values = [
  { icon: Zap, title: "Speed & Quality", desc: "Dengan tools AI dan proses yang teruji, kami deliver lebih cepat tanpa kompromi kualitas.", color: "#FF3B3B" },
  { icon: Heart, title: "Client First", desc: "Kepuasan klien adalah metric terpenting kami. Kami tidak berhenti sebelum proyek memenuhi kebutuhan bisnis Anda.", color: "#E50914" },
  { icon: Target, title: "Results-Oriented", desc: "Kami membangun solusi yang menghasilkan ROI nyata dan dampak bisnis yang terukur.", color: "#22D3EE" },
  { icon: Lightbulb, title: "Innovation Driven", desc: "Selalu adopsi teknologi terbaru: AI, edge computing, real-time systems.", color: "#7C3AED" },
];

const timeline = [
  { year: "2021", title: "Awal Perjalanan", desc: "Rianpedia dimulai sebagai freelance developer dengan spesialisasi Next.js dan React." },
  { year: "2022", title: "Tim Terbentuk", desc: "Bergabungnya designer dan backend engineer. Project enterprise pertama berhasil diluncurkan." },
  { year: "2023", title: "AI Integration Era", desc: "Mulai mengintegrasikan AI (GPT-4, Gemini) ke dalam setiap solusi klien." },
  { year: "2024", title: "Scale Up", desc: "50+ proyek selesai, 30+ klien aktif. Rianpedia kini AI-Powered Digital Solution Company." },
];

const team = [
  { name: "Rian Akbar", role: "Founder & Lead Developer", avatar: "RA", color: "#FF3B3B", expertise: "Full-Stack, AI Integration, Architecture" },
  { name: "Tim UI/UX", role: "Design Lead", avatar: "DL", color: "#22D3EE", expertise: "UI/UX, Branding, Prototyping" },
  { name: "Tim Backend", role: "Backend Engineer", avatar: "BE", color: "#7C3AED", expertise: "API, Database, DevOps, CI/CD" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div className="ai-grid" />
        <div className="absolute glow-orb" style={{ width: "600px", height: "400px", background: "radial-gradient(circle, rgba(255, 59, 59,0.2) 0%, transparent 70%)", top: "-80px", left: "30%" }} />
        <div className="container-rianpedia relative z-10 max-w-4xl mx-auto text-center">
          <div className="section-label mx-auto">🧬 About</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Kami Membangun Sistem,{" "}
            <span style={{ background: "linear-gradient(135deg, #FF3B3B, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Bukan Sekadar Website
            </span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
            Rianpedia lahir dari keyakinan bahwa setiap bisnis berhak mendapatkan solusi teknologi berkualitas enterprise dengan harga terjangkau.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16" style={{ background: "rgba(8,8,20,0.8)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container-rianpedia max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Filosofi di Balik Nama &ldquo;Rianpedia&rdquo;</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="glass-card p-6 flex-1">
              <p className="text-2xl font-black mb-2" style={{ color: "#FF3B3B" }}>Zen</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Kesederhanaan & keseimbangan. Sistem kompleks dibuat intuitif.</p>
            </div>
            <div className="glass-card p-6 flex-1">
              <p className="text-2xl font-black mb-2" style={{ color: "#22D3EE" }}>Matrix</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>Teknologi & sistem. Membangun jaringan solusi yang saling terhubung.</p>
            </div>
          </div>
          <p className="text-base italic mt-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            &ldquo;Sistem kompleks dibuat menjadi sederhana dengan bantuan AI&rdquo;
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container-rianpedia">
          <div className="text-center mb-12">
            <div className="section-label mx-auto">💎 Values</div>
            <h2 className="text-3xl font-bold text-white">Prinsip yang Memandu Kami</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="glass-card p-7 flex gap-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{ background: "rgba(8,8,20,0.6)" }}>
        <div className="container-rianpedia max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto">📅 Journey</div>
            <h2 className="text-3xl font-bold text-white">Perjalanan Rianpedia</h2>
          </div>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: "rgba(255, 59, 59,0.2)" }} />
            <div className="space-y-8">
              {timeline.map(({ year, title, desc }) => (
                <div key={year} className="flex gap-8 items-start">
                  <div className="w-32 shrink-0 text-right"><span className="text-sm font-bold" style={{ color: "#FF3B3B" }}>{year}</span></div>
                  <div className="w-3 h-3 rounded-full mt-1.5 shrink-0 relative z-10" style={{ background: "#FF3B3B", boxShadow: "0 0 12px rgba(255, 59, 59,0.6)" }} />
                  <div className="glass-card p-5 flex-1">
                    <h3 className="text-base font-bold text-white mb-1">{title}</h3>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container-rianpedia">
          <div className="text-center mb-12">
            <div className="section-label mx-auto">👥 Team</div>
            <h2 className="text-3xl font-bold text-white">Tim di Balik Rianpedia</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {team.map(({ name, role, avatar, color, expertise }) => (
              <div key={name} className="glass-card p-7 text-center w-64">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white mx-auto mb-4" style={{ background: `linear-gradient(135deg, ${color}, ${color}80)`, boxShadow: `0 4px 20px ${color}40` }}>
                  {avatar}
                </div>
                <h3 className="text-base font-bold text-white mb-1">{name}</h3>
                <p className="text-sm mb-3" style={{ color }}>{role}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-rianpedia text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Bergabunglah Bersama Klien Kami</h2>
          <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Mulai perjalanan digital Anda bersama Rianpedia hari ini.</p>
          <Link href="/ai-recommender" className="inline-flex items-center gap-2 text-base font-semibold px-8 py-4 rounded-xl text-white" style={{ background: "linear-gradient(135deg, #FF3B3B, #7C3AED)", boxShadow: "0 4px 25px rgba(255, 59, 59,0.4)" }}>
            🤖 Coba AI Recommender <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
