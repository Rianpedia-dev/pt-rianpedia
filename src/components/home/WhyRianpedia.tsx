import { Cpu, Shield, Zap, Users, Star, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Cpu,
    title: "AI-First Approach",
    description: "Setiap solusi yang kami bangun mengintegrasikan kecerdasan buatan untuk memberikan nilai lebih bagi bisnis Anda.",
    color: "#FF3B3B",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Keamanan data klien adalah prioritas utama. Enkripsi end-to-end, RBAC, dan proteksi dari ancaman modern.",
    color: "#22D3EE",
  },
  {
    icon: Zap,
    title: "Lightning Performance",
    description: "Load time di bawah 1.5 detik menggunakan SSR/SSG Next.js dan infrastruktur edge computing terkini.",
    color: "#7C3AED",
  },
  {
    icon: Users,
    title: "Client Dashboard Transparan",
    description: "Pantau progress proyek Anda secara real-time. Tidak ada yang tersembunyi — semua update langsung Anda lihat.",
    color: "#E50914",
  },
  {
    icon: Star,
    title: "Desain Premium",
    description: "UI/UX level enterprise dengan dark mode, glassmorphism, dan micro-animations yang membuat produk Anda tampil beda.",
    color: "#F59E0B",
  },
  {
    icon: TrendingUp,
    title: "Scalable & Modular",
    description: "Arsitektur yang dirancang untuk tumbuh bersama bisnis Anda — dari MVP hingga skala enterprise tanpa migrasi besar.",
    color: "#10B981",
  },
];

export function WhyRianpedia() {
  return (
    <section
      className="section-padding relative"
      style={{
        background: "linear-gradient(180deg, var(--bg-primary) 0%, rgba(10,10,26,0.9) 100%)",
      }}
    >
      {/* Grid background */}
      <div className="ai-grid" style={{ opacity: 0.5 }} />

      <div className="container-rianpedia relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-label mx-auto">
            <span>💡</span> Why Rianpedia
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Kenapa{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF3B3B, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Rianpedia
            </span>{" "}
            Berbeda?
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Bukan sekadar software house biasa. Kami adalah mitra teknologi yang berpikir dengan AI dan bergerak cepat seperti startup.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="glass-card p-6 group">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                  transition: "all 0.3s ease",
                }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
