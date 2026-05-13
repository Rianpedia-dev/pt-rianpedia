import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export function PortfolioPreview({ portfolios }: { portfolios: any[] }) {
  return (
    <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="container-rianpedia">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="section-label">
              <span>🚀</span> Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Case Studies{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FF3B3B, #9CA3AF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Pilihan
              </span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "#FF3B3B" }}
          >
            Lihat semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolios.map(({ id, title, clientName, category, description, results, techStack, color, emoji }) => {
            const themeColor = color ?? "#FF3B3B";
            
            return (
              <div
                key={id}
                className="glass-card p-7 group flex flex-col"
              >
                {/* Category */}
                <div
                  className="tag mb-5 self-start"
                  style={{
                    background: `${themeColor}15`,
                    borderColor: `${themeColor}30`,
                    color: themeColor,
                  }}
                >
                  {emoji} {category}
                </div>

                {/* Title & Client */}
                <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {clientName}
                </p>
                <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {description}
                </p>

                {/* Results snippet */}
                <ul className="space-y-1.5 mb-6">
                  {results?.slice(0, 3).map((r: string) => (
                    <li key={r} className="flex items-center gap-2 text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: themeColor }}
                      />
                      <span className="line-clamp-1" style={{ color: "rgba(255,255,255,0.65)" }}>{r}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {techStack?.slice(0, 3).map((t: string) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* View Project */}
                <Link
                  href={`/portfolio#${id}`}
                  className="flex items-center gap-1.5 text-sm font-medium mt-5 transition-all opacity-0 group-hover:opacity-100"
                  style={{ color: themeColor }}
                >
                  <ExternalLink className="w-4 h-4" /> Lihat Detail
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
