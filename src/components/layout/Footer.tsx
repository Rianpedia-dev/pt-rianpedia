"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Zap, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";

const services = [
  { label: "Custom Web Development", href: "/services#web" },
  { label: "System Development", href: "/services#system" },
  { label: "AI Integration", href: "/services#ai" },
  { label: "System Integration", href: "/services#integration" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "rgba(5, 5, 8, 0.98)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Main Footer */}
      <div className="container-rianpedia py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="hover:opacity-90 transition-opacity mb-5 inline-block">
              <Logo size="md" />
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              AI-Powered Digital Solution Company. Kami membangun website, sistem custom, dan integrasi AI untuk masa depan bisnis Anda.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255, 59, 59,0.2)";
                    el.style.borderColor = "rgba(255, 59, 59,0.4)";
                    el.style.color = "#FF3B3B";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255,255,255,0.05)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase" style={{ letterSpacing: "0.08em" }}>
              Services
            </h3>
            <ul className="space-y-3">
              {services.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FF3B3B")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase" style={{ letterSpacing: "0.08em" }}>
              Company
            </h3>
            <ul className="space-y-3">
              {company.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FF3B3B")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase" style={{ letterSpacing: "0.08em" }}>
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" style={{ color: "#FF3B3B" }} />
                <a
                  href="mailto:hello@rianpedia.id"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FF3B3B")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  hello@rianpedia.id
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "#9CA3AF" }} />
                <a
                  href="tel:+6281234567890"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FF3B3B")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#E50914" }} />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Jakarta, Indonesia
                </span>
              </li>
            </ul>

            {/* AI Recommender CTA */}
            <div
              className="mt-6 p-4 rounded-xl"
              style={{
                background: "rgba(255, 59, 59,0.08)",
                border: "1px solid rgba(255, 59, 59,0.2)",
              }}
            >
              <p className="text-xs font-semibold text-white mb-1">Mulai Proyek Anda</p>
              <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
                Dapatkan rekomendasi sistem dari AI kami secara gratis.
              </p>
              <Link
                href="/ai-recommender"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: "linear-gradient(135deg, #FF3B3B, #9CA3AF)",
                  color: "white",
                }}
              >
                🤖 Coba AI Recommender →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="container-rianpedia py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          © {new Date().getFullYear()} Rianpedia. All rights reserved.
        </p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          Built with{" "}
          <span className="neon-text-red" style={{ color: "#FF3B3B" }}>♦</span>{" "}
          by Rianpedia Team
        </p>
      </div>
    </footer>
  );
}
