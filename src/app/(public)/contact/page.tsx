"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ paddingTop: "128px", paddingBottom: "64px" }}>
        <div className="container-rianpedia text-center max-w-3xl mx-auto">


          <h1 className="display-lg mb-6">MARI DISKUSIKAN PROYEK ANDA</h1>
          <p className="body-md" style={{ fontSize: "18px" }}>
            Konsultasikan ide bisnis Anda dengan tim experts kami. Tinggalkan pesan dan kami akan merespons dalam waktu 1x24 jam.
          </p>
        </div>
      </section>

      <div className="m-stripe" />

      {/* Main Content */}
      <section style={{ padding: "96px 0" }}>
        <div className="container-rianpedia">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div className="lg:col-span-5" style={{ background: "rgba(13, 13, 13, 0.7)", border: "1px solid #3c3c3c", padding: "40px", backdropFilter: "blur(10px)" }}>
              <h3 className="title-lg mb-8">INFORMASI KONTAK</h3>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: "#1a1a1a", border: "1px solid #3c3c3c" }}>
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="label-uppercase text-[12px] mb-1" style={{ color: "#7e7e7e" }}>EMAIL</p>
                    <a href="mailto:hello@rianpedia.id" className="text-[16px] font-light text-white hover:underline">hello@rianpedia.id</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: "#1a1a1a", border: "1px solid #3c3c3c" }}>
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="label-uppercase text-[12px] mb-1" style={{ color: "#7e7e7e" }}>WHATSAPP</p>
                    <a href="tel:+6281234567890" className="text-[16px] font-light text-white hover:underline">+62 812 3456 7890</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: "#1a1a1a", border: "1px solid #3c3c3c" }}>
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="label-uppercase text-[12px] mb-1" style={{ color: "#7e7e7e" }}>LOKASI</p>
                    <p className="text-[16px] font-light text-white">Jakarta, Indonesia</p>
                    <p className="body-sm mt-1">Available for remote projects worldwide.</p>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #3c3c3c", paddingTop: "24px" }}>
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-white" />
                  <h3 className="text-[16px] font-bold text-white">BUTUH RESPONS CEPAT?</h3>
                </div>
                <p className="body-sm mb-4">Coba AI Project Recommender kami untuk estimasi proyek instan.</p>
                <Link href="/ai-recommender" className="text-link text-[12px]">AI RECOMMENDER →</Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7" style={{ background: "#1a1a1a", border: "1px solid #3c3c3c", borderLeft: "none", padding: "40px" }}>
              <div className="relative">
                {isSubmitted && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center" style={{ background: "rgba(0,0,0,0.9)" }}>
                    <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: "#0fa336", color: "white", fontSize: "20px" }}>✓</div>
                    <h3 className="display-sm mb-2">PESAN TERKIRIM!</h3>
                    <p className="body-sm text-center max-w-sm mb-6">Tim kami akan segera merespons ke email Anda.</p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline" size="sm">KIRIM PESAN LAINNYA</Button>
                  </div>
                )}
                
                <h3 className="title-lg mb-2">KIRIM PESAN</h3>
                <p className="body-sm mb-8">Punya pertanyaan atau ingin diskusi proyek? Kami siap membantu.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="label-uppercase text-[12px] block mb-2" style={{ color: "#e6e6e6" }}>NAMA LENGKAP *</label>
                      <input id="name" required type="text" className="input-rianpedia" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="label-uppercase text-[12px] block mb-2" style={{ color: "#e6e6e6" }}>EMAIL *</label>
                      <input id="email" required type="email" className="input-rianpedia" placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="label-uppercase text-[12px] block mb-2" style={{ color: "#e6e6e6" }}>PERUSAHAAN</label>
                      <input id="company" type="text" className="input-rianpedia" placeholder="PT. Bintang Kejora" />
                    </div>
                    <div>
                      <label htmlFor="service" className="label-uppercase text-[12px] block mb-2" style={{ color: "#e6e6e6" }}>LAYANAN</label>
                      <select id="service" defaultValue="" className="input-rianpedia appearance-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.5em 1.5em" }}>
                        <option value="" disabled>Pilih Layanan...</option>
                        <option value="web" className="text-black">Custom Web Development</option>
                        <option value="system" className="text-black">System Development</option>
                        <option value="ai" className="text-black">AI Integration</option>
                        <option value="other" className="text-black">Lainnya</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="label-uppercase text-[12px] block mb-2" style={{ color: "#e6e6e6" }}>DETAIL PROYEK *</label>
                    <textarea id="message" required rows={5} className="input-rianpedia resize-y" style={{ height: "auto" }} placeholder="Ceritakan tentang proyek, budget, dan timeline Anda..." />
                  </div>
                  <Button type="submit" disabled={isSubmitting} variant="default" size="lg" className="w-full">
                    {!isSubmitting && <Send className="w-4 h-4 mr-2" />}
                    {isSubmitting ? "MENGIRIM..." : "KIRIM PESAN"}
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
