"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";

const services = [
  { label: "Pengembangan Web Kustom", href: "/services#web" },
  { label: "Pengembangan Sistem", href: "/services#system" },
  { label: "Integrasi AI", href: "/services#ai" },
  { label: "Integrasi Sistem", href: "/services#integration" },
];

const company = [
  { label: "Tentang Kami", href: "/about" },
  { label: "Portofolio", href: "/portfolio" },
  { label: "Harga", href: "/pricing" },
  { label: "Kontak", href: "/contact" },
];

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer style={{ background: "transparent", borderTop: "1px solid #3c3c3c" }}>
      {/* M Stripe */}
      <div className="m-stripe" />

      {/* Main Footer */}
      <div className="container-rianpedia" style={{ padding: "64px 1.5rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="hover:opacity-80 transition-opacity mb-5 inline-block">
              <Logo size="md" />
            </Link>
            <p className="body-sm mb-6" style={{ color: "#7e7e7e" }}>
              AI-Powered Digital Solution Company. Kami membangun website, sistem custom, dan integrasi AI untuk masa depan bisnis Anda.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "#1a1a1a",
                    border: "1px solid #3c3c3c",
                    color: "#7e7e7e",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="label-uppercase mb-5" style={{ color: "#e6e6e6" }}>
              Layanan
            </h3>
            <ul className="space-y-3">
              {services.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[14px] font-light transition-colors duration-200 hover:text-white"
                    style={{ color: "#7e7e7e" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="label-uppercase mb-5" style={{ color: "#e6e6e6" }}>
              Perusahaan
            </h3>
            <ul className="space-y-3">
              {company.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[14px] font-light transition-colors duration-200 hover:text-white"
                    style={{ color: "#7e7e7e" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="label-uppercase mb-5" style={{ color: "#e6e6e6" }}>
              Kontak
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" style={{ color: "#7e7e7e" }} />
                <a href="mailto:hello@rianpedia.id" className="text-[14px] font-light hover:text-white transition-colors" style={{ color: "#bbbbbb" }}>
                  hello@rianpedia.id
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "#7e7e7e" }} />
                <a href="tel:+6281234567890" className="text-[14px] font-light hover:text-white transition-colors" style={{ color: "#bbbbbb" }}>
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#7e7e7e" }} />
                <span className="text-[14px] font-light" style={{ color: "#bbbbbb" }}>
                  Jakarta, Indonesia
                </span>
              </li>
            </ul>

            {/* AI Recommender CTA */}
            <div className="mt-6 p-5" style={{ background: "#0d0d0d", border: "1px solid #3c3c3c" }}>
              <p className="label-uppercase mb-2" style={{ fontSize: "12px" }}>Mulai Proyek Anda</p>
              <p className="text-[12px] font-light mb-3" style={{ color: "#7e7e7e" }}>
                Dapatkan rekomendasi sistem dari AI kami secara gratis.
              </p>
              <Link
                href="/ai-recommender"
                className="text-link text-[12px]"
              >
                REKOMENDASI AI →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="container-rianpedia py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: "1px solid #262626" }}
      >
        <p className="caption">
          © {new Date().getFullYear()} Rianpedia. Hak cipta dilindungi undang-undang.
        </p>
        <p className="caption">
          Dibuat dengan presisi oleh Tim Rianpedia
        </p>
      </div>
    </footer>
  );
}
