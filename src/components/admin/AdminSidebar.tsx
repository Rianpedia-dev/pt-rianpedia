"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Receipt,
  Briefcase,
  Wrench,
  MessageSquareQuote,
  Mail,
  MessagesSquare,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";

const menuItems = [
  { label: "Dasbor", href: "/admin", icon: LayoutDashboard },
  { label: "Pengguna", href: "/admin/users", icon: Users },
  { label: "Proyek", href: "/admin/projects", icon: FolderKanban },
  { label: "Tagihan", href: "/admin/invoices", icon: Receipt },
  { label: "Portofolio", href: "/admin/portfolios", icon: Briefcase },
  { label: "Layanan", href: "/admin/services", icon: Wrench },
  { label: "Testimoni", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Kontak Masuk", href: "/admin/contacts", icon: Mail },
  { label: "Pesan Chat", href: "/admin/messages", icon: MessagesSquare },
  { label: "Log AI", href: "/admin/ai-logs", icon: BrainCircuit },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Berhasil keluar.");
    router.push("/auth/login");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300 ease-in-out",
        "bg-[#0A0A0F]/95 backdrop-blur-xl border-r border-white/[0.06]",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-white/[0.06]">
        <Link href="/admin" className="flex items-center hover:opacity-90 transition-opacity">
          <Logo size="sm" showText={!collapsed} animate={true} />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "text-white bg-gradient-to-r from-[#FF3B3B]/20 to-transparent"
                  : "text-[#9CA3AF] hover:text-white hover:bg-white/[0.04]"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b from-[#FF3B3B] to-[#7C3AED] shadow-[0_0_12px_rgba(255,59,59,0.6)]" />
              )}

              <item.icon
                className={cn(
                  "flex-shrink-0 w-5 h-5 transition-colors duration-200",
                  isActive
                    ? "text-[#FF3B3B] drop-shadow-[0_0_8px_rgba(255,59,59,0.6)]"
                    : "text-[#9CA3AF] group-hover:text-white"
                )}
              />

              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}

              {/* Hover glow */}
              {isActive && !collapsed && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF3B3B]/5 to-transparent pointer-events-none" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse & Logout buttons */}
      <div className="p-3 border-t border-white/[0.06] space-y-2">
        {!collapsed && (
          <Button
            onClick={handleSignOut}
            variant="destructive"
            size="sm"
            className="w-full justify-start px-3 h-10 border-red-500/10 min-w-0"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Keluar
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full h-9 min-w-0"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-[#9CA3AF]" />
          )}
        </Button>
      </div>

      {/* Bottom glow decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#FF3B3B]/[0.03] to-transparent" />
    </aside>
  );
}
