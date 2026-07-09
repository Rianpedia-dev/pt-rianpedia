"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message || "Login gagal. Cek email dan password Anda.");
        setIsLoading(false);
        return;
      }

      toast.success("Login berhasil! Mengalihkan...");
      
      // We check the role and redirect accordingly
      // Using any cast as a quick fix for the additional field role
      const user = data?.user as any;
      if (user?.role === "admin" || user?.role === "developer") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative" style={{ background: "var(--bg-primary)" }}>
      {/* Background Orbs */}
      <div className="absolute glow-orb" style={{ width: "500px", height: "500px", background: "radial-gradient(circle, rgba(255, 59, 59,0.15) 0%, transparent 70%)", top: "-10%", left: "-10%" }} />
      <div className="absolute glow-orb" style={{ width: "400px", height: "400px", background: "radial-gradient(circle, rgba(34, 211, 238,0.1) 0%, transparent 70%)", bottom: "-10%", right: "-10%" }} />
      
      {/* Grid */}
      <div className="ai-grid" style={{ opacity: 0.3 }} />

      <div className="w-full max-w-md relative z-10 animate-fade-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF3B3B, #22D3EE)", boxShadow: "0 0 20px rgba(255, 59, 59, 0.4)" }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight" style={{ background: "linear-gradient(135deg, #fff 0%, #a5a1ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Rianpedia
            </span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Selamat Datang Kembali</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Masuk ke client portal Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" style={{ color: "rgba(255,255,255,0.3)" }} />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-rianpedia pl-10"
                  placeholder="anda@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-white">Password</label>
                <a href="#" className="text-xs font-semibold hover:underline" style={{ color: "#a5a1ff" }}>Lupa Password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" style={{ color: "rgba(255,255,255,0.3)" }} />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-rianpedia pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              variant="default"
              size="lg"
              className="w-full mt-6"
            >
              {isLoading ? "SEDANG MASUK..." : "MASUK"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>

          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Belum punya akun klien?{" "}
              <Link href="/auth/register" className="font-semibold text-white hover:underline" style={{ color: "#a5a1ff" }}>
                Buat Akun
              </Link>
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8">
          <Link href="/" className="text-sm font-medium transition-colors" style={{ color: "rgba(255,255,255,0.4)" }} onMouseEnter={(e) => e.currentTarget.style.color="white"} onMouseLeave={(e) => e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
            ← Kembali ke Website
          </Link>
        </div>
      </div>
    </div>
  );
}
