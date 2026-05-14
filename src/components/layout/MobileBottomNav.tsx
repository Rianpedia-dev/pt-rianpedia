"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Folder, Zap } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Grid },
  { href: "/portfolio", label: "Portfolio", icon: Folder },
  { href: "/ai-recommender", label: "AI", icon: Zap },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 px-2 relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_6px_rgba(226,39,24,0.6)]" : ""}`} />
              <span className="text-[10px] font-bold tracking-[1px] uppercase">{item.label}</span>
              {isActive && (
                <span className="absolute top-0 w-8 h-[2px] bg-white" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
