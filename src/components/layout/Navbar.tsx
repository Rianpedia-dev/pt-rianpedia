"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(5, 5, 8, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="container-rianpedia">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo size="sm" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg"
                style={{
                  color: pathname === link.href
                    ? "#FF3B3B"
                    : "rgba(255,255,255,0.6)",
                  background: pathname === link.href
                    ? "rgba(255, 59, 59,0.1)"
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) {
                    (e.target as HTMLElement).style.color = "rgba(255,255,255,0.9)";
                    (e.target as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) {
                    (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                    (e.target as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(135deg, #FF3B3B, #9CA3AF)" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="px-4 h-9 min-w-0"
            >
              <Link href="/ai-recommender">
                🤖 AI Recommender
              </Link>
            </Button>
            
            <Button
              asChild
              variant="default"
              size="sm"
              className="px-5 h-9 min-w-0"
            >
              <Link href="/auth/login">
                Dashboard
              </Link>
            </Button>
          </div>


          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden p-2 min-w-0 h-10 w-10 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden pb-4"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <nav className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium rounded-lg transition-all"
                  style={{
                    color: pathname === link.href ? "#FF3B3B" : "rgba(255,255,255,0.7)",
                    background: pathname === link.href ? "rgba(255, 59, 59,0.1)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <Link href="/ai-recommender" onClick={() => setMobileOpen(false)}>
                    🤖 AI Recommender
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="default"
                  className="w-full"
                >
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
              </div>

            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
