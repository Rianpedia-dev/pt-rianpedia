"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const routeTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/users": "Kelola Users",
  "/admin/projects": "Kelola Projects",
  "/admin/invoices": "Kelola Invoices",
  "/admin/portfolios": "Kelola Portfolios",
  "/admin/services": "Kelola Services",
  "/admin/testimonials": "Kelola Testimonials",
  "/admin/contacts": "Contact Submissions",
  "/admin/messages": "Messages",
  "/admin/ai-logs": "AI Recommendation Logs",
};

interface AdminTopbarProps {
  onMenuToggle?: () => void;
}

export function AdminTopbar({ onMenuToggle }: AdminTopbarProps) {
  const pathname = usePathname();
  const title = routeTitles[pathname] || "Admin";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b border-white/[0.06] bg-[#0A0A0F]/80 backdrop-blur-xl">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="lg:hidden text-[#9CA3AF]"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div>
          <h1 className="text-lg font-semibold text-white">{title}</h1>
          <p className="text-xs text-[#9CA3AF]">
            Rianpedia Admin Panel
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <Input
            placeholder="Cari..."
            className="w-[220px] pl-9 h-9 bg-white/[0.04] border-white/[0.08] text-sm"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-[#9CA3AF]">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF3B3B] shadow-[0_0_8px_rgba(255,59,59,0.6)]" />
        </Button>

        {/* Avatar */}
        <div className="flex items-center gap-3 pl-3 border-l border-white/[0.06]">
          <Avatar className="h-8 w-8 ring-2 ring-[#FF3B3B]/30">
            <AvatarFallback className="bg-gradient-to-br from-[#FF3B3B] to-[#7C3AED] text-white text-xs font-bold">
              ZA
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white leading-none">Admin</p>
            <p className="text-xs text-[#9CA3AF]">Rianpedia</p>
          </div>
        </div>
      </div>
    </header>
  );
}
