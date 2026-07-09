"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/services", label: "Layanan" },
  { href: "/portfolio", label: "Portofolio" },
  { href: "/pricing", label: "Harga" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/contact", label: "Kontak" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0, 0, 0, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid #3c3c3c"
          : "1px solid rgba(255, 255, 255, 0.05)",
        height: "64px",
      }}
    >
      <div className="container-rianpedia h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size="sm" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-[14px] font-normal transition-all duration-300"
                style={{
                  color: pathname === link.href
                    ? "#ffffff"
                    : "#7e7e7e",
                  letterSpacing: "0.5px",
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px]"
                    style={{ background: "#ffffff" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/ai-recommender">
                REKOMENDASI AI
              </Link>
            </Button>
            
            <Button asChild variant="default" size="sm">
              <Link href="/auth/login">
                DASBOR
              </Link>
            </Button>
          </div>

          {/* Mobile Dashboard Icon */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="md:hidden p-2 min-w-0 h-10 w-10 flex items-center justify-center text-white/70 hover:text-white"
            aria-label="Dashboard"
          >
            <Link href="/auth/login">
              <User className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
