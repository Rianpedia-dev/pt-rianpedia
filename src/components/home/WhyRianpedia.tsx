import { Cpu, Shield, Zap, Users, Star, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Cpu,
    title: "AI-FIRST APPROACH",
    description: "Setiap solusi yang kami bangun mengintegrasikan kecerdasan buatan untuk memberikan nilai lebih bagi bisnis Anda.",
  },
  {
    icon: Shield,
    title: "ENTERPRISE SECURITY",
    description: "Keamanan data klien adalah prioritas utama. Enkripsi end-to-end, RBAC, dan proteksi dari ancaman modern.",
  },
  {
    icon: Zap,
    title: "LIGHTNING PERFORMANCE",
    description: "Load time di bawah 1.5 detik menggunakan SSR/SSG Next.js dan infrastruktur edge computing terkini.",
  },
  {
    icon: Users,
    title: "CLIENT DASHBOARD TRANSPARAN",
    description: "Pantau progress proyek Anda secara real-time. Tidak ada yang tersembunyi — semua update langsung Anda lihat.",
  },
  {
    icon: Star,
    title: "DESAIN PREMIUM",
    description: "UI/UX level enterprise dengan dark mode dan micro-animations yang membuat produk Anda tampil beda.",
  },
  {
    icon: TrendingUp,
    title: "SCALABLE & MODULAR",
    description: "Arsitektur yang dirancang untuk tumbuh bersama bisnis Anda — dari MVP hingga skala enterprise tanpa migrasi besar.",
  },
];

export function WhyRianpedia() {
  return (
    <section className="section-padding" style={{ background: "transparent" }}>
      <div className="container-rianpedia">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <h2 className="display-md mb-4">
            KENAPA RIANPEDIA BERBEDA?
          </h2>
          <p className="body-md">
            Bukan sekadar software house biasa. Kami adalah mitra teknologi yang berpikir dengan AI dan bergerak cepat seperti startup.
          </p>
        </div>

        {/* M Stripe separator */}


        {/* Reasons Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-0 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          {reasons.map(({ icon: Icon, title, description }, idx) => (
            <div
              key={title}
              className="flex-none w-[85vw] max-w-[400px] md:max-w-none md:w-auto snap-center"
              style={{
                background: "#1a1a1a",
                border: "1px solid #3c3c3c",
                padding: "40px",
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-5"
                style={{ background: "#262626", border: "1px solid #3c3c3c" }}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[18px] font-bold text-white mb-3 tracking-wide">{title}</h3>
              <p className="body-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
