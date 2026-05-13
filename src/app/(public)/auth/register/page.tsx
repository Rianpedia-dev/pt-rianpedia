"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Sparkles, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", company: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (error) {
        toast.error(error.message || "Registrasi gagal.");
        setIsLoading(false);
        return;
      }

      toast.success("Registrasi berhasil! Silakan masuk.");
      router.push("/auth/login");
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
      <div className="absolute glow-orb" style={{ width: "500px", height: "500px", background: "radial-gradient(circle, rgba(124, 58, 237,0.15) 0%, transparent 70%)", top: "-10%", right: "-10%" }} />
      <div className="absolute glow-orb" style={{ width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255, 59, 59,0.1) 0%, transparent 70%)", bottom: "-10%", left: "-10%" }} />
      
      {/* Grid */}
      <div className="ai-grid" style={{ opacity: 0.3 }} />

      <div className="w-full max-w-lg relative z-10 animate-fade-up">
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

        {/* Register Card */}
        <div className="glass-card p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Buat Akun Klien</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Mulai perjalanan digital Anda bersama Rianpedia</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Nama Lengkap</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" style={{ color: "rgba(255,255,255,0.3)" }} />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-rianpedia pl-10"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Perusahaan (Opsional)</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="input-rianpedia"
                  placeholder="PT. Startup Inovasi"
                />
              </div>
            </div>

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
              <label className="block text-sm font-medium text-white mb-2">Password</label>
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
                  placeholder="Minimal 8 karakter"
                />
              </div>
              <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>Gunakan kombinasi huruf kapital, angka, dan simbol.</p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              variant="default"
              size="lg"
              className="w-full mt-6"
            >
              {isLoading ? "SEDANG MEMPROSES..." : "DAFTAR AKUN"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>

          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center flex flex-col gap-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            <p>
              Dengan mendaftar, Anda menyetujui{" "}
              <a href="#" className="underline hover:text-white transition-colors">Syarat & Ketentuan</a>{" "}
              serta <a href="#" className="underline hover:text-white transition-colors">Kebijakan Privasi</a> kami.
            </p>
            <p>
              Sudah punya akun?{" "}
              <Link href="/auth/login" className="font-semibold text-white hover:underline" style={{ color: "#a5a1ff" }}>
                Masuk di sini
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
