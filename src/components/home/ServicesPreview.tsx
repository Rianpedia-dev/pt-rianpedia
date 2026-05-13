"use client";

import Link from "next/link";
import { ArrowRight, Globe, Settings, Bot, Plug } from "lucide-react";

const iconMap: Record<string, any> = {
  web: Globe,
  system: Settings,
  ai: Bot,
  integration: Plug,
};

export function ServicesPreview({ services }: { services: any[] }) {
  return (
    <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="container-rianpedia">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-label mx-auto">
            <span>⚡</span> Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Solusi Digital{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF3B3B, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Lengkap & Terintegrasi
            </span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Dari website hingga sistem AI — semua dalam satu atap dengan standar kualitas enterprise.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(({ id, title, description, features, color, gradient, emoji }) => {
            const Icon = iconMap[id] || Globe;
            const themeColor = color ?? "#FF3B3B";
            const glowColor = `${themeColor}4D`; // 30% opacity equivalent

            return (
              <Link
                key={id}
                href={`/services#${id}`}
                className="glass-card group block p-8 relative overflow-hidden"
              >
                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 50%, ${glowColor} 0%, transparent 60%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative"
                  style={{
                    background: `${themeColor}1F`, // ~12% opacity
                    border: `1px solid ${themeColor}4D`,
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: themeColor }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {description}
                </p>

                {/* Feature list snippet (first 3) */}
                <ul className="space-y-2 mb-6">
                  {features?.slice(0, 3).map((item: string) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: themeColor }} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <div
                  className="flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                  style={{ color: themeColor }}
                >
                  Pelajari lebih lanjut
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-xl transition-all"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Lihat semua layanan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
