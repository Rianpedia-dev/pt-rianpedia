"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulasi pengiriman data
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="ai-grid" />
        <div
          className="absolute glow-orb"
          style={{ width: "600px", height: "400px", background: "radial-gradient(circle, rgba(124, 58, 237,0.2) 0%, transparent 70%)", top: "-50px", left: "20%" }}
        />
        <div className="container-rianpedia relative z-10 text-center max-w-3xl mx-auto">
          <div className="section-label mx-auto">💬 Contact</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Mari{" "}
            <span style={{ background: "linear-gradient(135deg, #FF3B3B, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Diskusikan
            </span>{" "}
            Proyek Anda
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            Konsultasikan ide bisnis Anda dengan tim experts kami. Tinggalkan pesan dan kami akan merespons dalam waktu 1x24 jam.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 relative z-10">
        <div className="container-rianpedia">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-white mb-6">Informasi Kontak</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255, 59, 59,0.15)", border: "1px solid rgba(255, 59, 59,0.3)" }}>
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Email</p>
                      <a href="mailto:hello@rianpedia.id" className="text-base font-medium text-white hover:underline" style={{ color: "rgba(255,255,255,0.9)" }}>hello@rianpedia.id</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(34, 211, 238,0.15)", border: "1px solid rgba(34, 211, 238,0.3)" }}>
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Telepon / WhatsApp</p>
                      <a href="tel:+6281234567890" className="text-base font-medium text-white hover:underline" style={{ color: "rgba(255,255,255,0.9)" }}>+62 812 3456 7890</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(124, 58, 237,0.15)", border: "1px solid rgba(124, 58, 237,0.3)" }}>
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Lokasi</p>
                      <p className="text-base font-medium text-white" style={{ color: "rgba(255,255,255,0.9)" }}>Jakarta, Indonesia</p>
                      <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>Available for remote projects worldwide.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6" style={{ background: "linear-gradient(135deg, rgba(255, 59, 59,0.1) 0%, rgba(34, 211, 238,0.05) 100%)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-5 h-5" style={{ color: "#22D3EE" }} />
                  <h3 className="font-bold text-white">Butuh respons cepat?</h3>
                </div>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Coba AI Project Recommender kami untuk mendaptkan estimasi proyek instan.
                </p>
                <a href="/ai-recommender" className="inline-flex items-center text-sm font-semibold hover:underline" style={{ color: "#a5a1ff" }}>
                  Mulai AI Recommender →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-card p-8 md:p-10 relative overflow-hidden">
                {isSubmitted && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">✓</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Pesan Terkirim!</h3>
                    <p className="text-center max-w-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Terima kasih The telah menghubungi kami. Tim kami akan segera merespons ke email Anda.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      size="sm"
                      className="min-w-0"
                    >
                      Kirim Pesan Lainnya
                    </Button>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2">Kirim Pesan</h3>
                <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Punya pertanyaan atau ingin diskusi proyek? Kami siap membantu.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>Nama Lengkap *</label>
                      <input id="name" required type="text" className="input-rianpedia" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>Email Promosi *</label>
                      <input id="email" required type="email" className="input-rianpedia" placeholder="john@company.com" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>Nama Perusahaan</label>
                      <input id="company" type="text" className="input-rianpedia" placeholder="PT. Bintang Kejora" />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>Layanan yang diminati</label>
                      <select id="service" defaultValue="" className="input-rianpedia appearance-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.5em 1.5em" }}>
                        <option value="" disabled>Pilih Layanan...</option>
                        <option value="web" className="text-black">Custom Web Development</option>
                        <option value="system" className="text-black">System Development</option>
                        <option value="ai" className="text-black">AI Integration</option>
                        <option value="other" className="text-black">Lainnya / Belum yakin</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>Detail Proyek / Pesan *</label>
                    <textarea 
                      id="message" 
                      required 
                      rows={5} 
                      className="input-rianpedia resize-y" 
                      placeholder="Ceritakan secara singkat tentang proyek, budget, dan timeline Anda..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="default"
                    size="lg"
                    className="w-full"
                  >
                    {!isSubmitting && <Send className="w-4 h-4 mr-2" />}
                    {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                </form>

              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
