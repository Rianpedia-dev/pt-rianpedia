"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/login");
    } else if (!isPending && session) {
      const user = session.user as any;
      if (user?.role !== "admin" && user?.role !== "developer") {
        toast.error("Akses ditolak: Anda bukan Admin.");
        router.push("/");
      }
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FF3B3B]/20 border-t-[#FF3B3B] rounded-full animate-spin" />
          <p className="text-[#9CA3AF] animate-pulse">Memverifikasi Sesi...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;
  const user = session.user as any;
  if (user?.role !== "admin" && user?.role !== "developer") return null;

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content area - offset by sidebar width */}
      <div className="lg:pl-[260px] transition-all duration-300">
        <AdminTopbar onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="p-6">
          {/* Background decorations */}
          <div className="fixed top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.03]">
            <div className="w-full h-full bg-gradient-radial from-[#FF3B3B] to-transparent rounded-full blur-3xl" />
          </div>
          <div className="fixed bottom-0 left-1/2 w-[600px] h-[400px] pointer-events-none opacity-[0.02]">
            <div className="w-full h-full bg-gradient-radial from-[#7C3AED] to-transparent rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
