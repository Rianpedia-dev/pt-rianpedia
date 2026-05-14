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
    <section className="section-padding" style={{ background: "transparent" }}>
      <div className="container-rianpedia">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <h2 className="display-md mb-4">
            SOLUSI DIGITAL LENGKAP & TERINTEGRASI
          </h2>
          <p className="body-md">
            Dari website hingga sistem AI — semua dalam satu atap dengan standar kualitas enterprise.
          </p>
        </div>

        {/* Services Grid */}
        <div className="flex md:grid md:grid-cols-2 gap-0 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          {services.map(({ id, title, description, features }, idx) => {
            const Icon = iconMap[id] || Globe;

            return (
              <Link
                key={id}
                href={`/services#${id}`}
                className="group block relative overflow-hidden flex-none w-[85vw] max-w-[400px] md:max-w-none md:w-auto snap-center"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #3c3c3c",
                  padding: "40px",
                  borderRight: idx % 2 === 0 ? "none" : "1px solid #3c3c3c",
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6"
                  style={{
                    background: "#262626",
                    border: "1px solid #3c3c3c",
                  }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="title-lg mb-3">{title}</h3>
                <p className="body-sm mb-6" style={{ color: "#bbbbbb" }}>
                  {description}
                </p>

                {/* Feature list snippet (first 3) */}
                <ul className="space-y-2 mb-6">
                  {features?.slice(0, 3).map((item: string) => (
                    <li key={item} className="flex items-center gap-3 text-[14px] font-light" style={{ color: "#bbbbbb" }}>
                      <span className="w-1 h-1 bg-white shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <div className="text-link text-[12px] group-hover:opacity-70">
                  EXPLORE →
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link href="/services" className="text-link">
            VIEW ALL SERVICES <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
