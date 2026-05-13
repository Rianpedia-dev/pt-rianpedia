"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, RefreshCw, Play } from "lucide-react";
import { Button } from "@/components/ui/button";


interface AIResult {
  architecture: string;
  mustHaveFeatures: string[];
  niceToHaveFeatures: string[];
  timeline: string;
  techStack: string[];
  estimatedCost: string;
  summary: string;
}

export default function AIRecommenderPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [isMockData, setIsMockData] = useState(false);

  const [formData, setFormData] = useState({
    businessType: "E-Commerce / Retail",
    systemGoal: "Meningkatkan penjualan online",
    userScale: "1.000 - 10.000 / bulan",
    budgetRange: "Rp 25.000.000 - Rp 50.000.000",
    timeline: "As Soon As Possible (1-2 bulan)",
    additionalInfo: "",
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStep(5); // Loading step

    try {
      const response = await fetch("/api/ai-recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data.data);
        setIsMockData(data.isMockData || false);
        setStep(6); // Result step
      } else {
        alert("Gagal menghubungi AI. Silakan coba lagi.");
        setStep(4);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan jaringan.");
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setStep(1);
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="pt-32 pb-10 relative">
        <div className="ai-grid" />
        <div className="container-rianpedia relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: "rgba(255, 59, 59,0.15)", border: "1px solid rgba(255, 59, 59,0.3)", color: "#a5a1ff" }}>
            <Bot className="w-4 h-4" /> Rianpedia Core AI
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            AI Project <span style={{ background: "linear-gradient(135deg, #FF3B3B, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Recommender</span>
          </h1>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
            Jawab 4 pertanyaan sederhana. Dapatkan arsitektur sistem, estimasi biaya, dan timeline secara instan.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 relative z-10">
        <div className="container-rianpedia max-w-3xl mx-auto">
          {/* Progress Bar */}
          {step <= 4 && (
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`text-xs font-semibold ${step >= i ? "text-white" : "text-white/30"}`}>Step {i}</div>
                ))}
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${(step / 4) * 100}%`, background: "linear-gradient(90deg, #FF3B3B, #22D3EE)" }} 
                />
              </div>
            </div>
          )}

          {/* Card Form */}
          <div className="glass-card p-8 md:p-10 relative overflow-hidden" style={{ minHeight: "450px" }}>
            
            {/* Step 1: Bisnis & Tujuan */}
            {step === 1 && (
              <div className="animate-fade-in h-full flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-2">Ceritakan tentang bisnis Anda</h2>
                <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Informasi ini membantu AI kami memahami konteks proyek.</p>
                
                <div className="space-y-6 flex-1">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-white">Jenis Bisnis / Industri</label>
                    <select 
                      className="input-rianpedia appearance-none" 
                      value={formData.businessType}
                      onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1.5em 1.5em" }}
                    >
                      <option className="text-black">E-Commerce / Retail</option>
                      <option className="text-black">Kesehatan / Klinik</option>
                      <option className="text-black">Pendidikan / EdTech</option>
                      <option className="text-black">Manufaktur / Pabrik</option>
                      <option className="text-black">F&B / Restoran</option>
                      <option className="text-black">Agensi / Layanan B2B</option>
                      <option className="text-black">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3 text-white">Tujuan Utama Sistem</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "Meningkatkan penjualan online", 
                        "Automasi operasional internal", 
                        "Meningkatkan layanan pelanggan",
                        "Membangun produk SaaS baru"
                      ].map(goal => (
                        <div 
                          key={goal}
                          onClick={() => setFormData({...formData, systemGoal: goal})}
                          className="px-4 py-3 rounded-xl border text-sm cursor-pointer transition-all"
                          style={{ 
                            background: formData.systemGoal === goal ? "rgba(255, 59, 59,0.15)" : "transparent",
                            borderColor: formData.systemGoal === goal ? "#FF3B3B" : "rgba(255,255,255,0.1)",
                            color: formData.systemGoal === goal ? "white" : "rgba(255,255,255,0.6)"
                          }}
                        >
                          {goal}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-8 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <Button onClick={handleNext} variant="default" size="sm">
                    Lanjut
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

              </div>
            )}

            {/* Step 2: Skala & Pengguna */}
            {step === 2 && (
              <div className="animate-fade-in h-full flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-2">Skala Pengguna</h2>
                <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Arsitektur sistem bergantung pada seberapa banyak traffic yang diharapkan.</p>
                
                <div className="space-y-4 flex-1">
                  {[
                    { label: "< 1.000 / bulan", desc: "Aplikasi internal kecil atau MVP" },
                    { label: "1.000 - 10.000 / bulan", desc: "Bisnis menengah atau platform publik standar" },
                    { label: "10.000 - 100.000 / bulan", desc: "Aplikasi populer dengan traffic harian stabil" },
                    { label: "> 100.000 / bulan", desc: "Skala enterprise dengan kebutuhan high-availability" },
                  ].map(scale => (
                    <div 
                      key={scale.label}
                      onClick={() => setFormData({...formData, userScale: scale.label})}
                      className="p-4 rounded-xl border flex flex-col cursor-pointer transition-all"
                      style={{ 
                        background: formData.userScale === scale.label ? "rgba(255, 59, 59,0.15)" : "transparent",
                        borderColor: formData.userScale === scale.label ? "#FF3B3B" : "rgba(255,255,255,0.1)",
                      }}
                    >
                      <span className={`text-base font-semibold mb-1 ${formData.userScale === scale.label ? "text-white" : "text-white/80"}`}>
                        {scale.label}
                      </span>
                      <span className="text-xs" style={{ color: formData.userScale === scale.label ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)" }}>
                        {scale.desc}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-8 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <Button onClick={handleBack} variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Kembali
                  </Button>
                  <Button onClick={handleNext} variant="default" size="sm">
                    Lanjut
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

              </div>
            )}

            {/* Step 3: Budget & Timeline */}
            {step === 3 && (
              <div className="animate-fade-in h-full flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-2">Budget & Timeline</h2>
                <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Rianpedia akan merekomendasikan solusi yang pas dengan sumber daya Anda.</p>
                
                <div className="space-y-8 flex-1">
                  <div>
                    <label className="block text-sm font-medium mb-4 text-white">Range Budget (IDR)</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "< Rp 15 Juta", 
                        "Rp 15 - 30 Juta", 
                        "Rp 30 - 75 Juta",
                        "> Rp 75 Juta",
                        "Belum tahu"
                      ].map(budget => (
                        <div 
                          key={budget}
                          onClick={() => setFormData({...formData, budgetRange: budget})}
                          className="px-5 py-2.5 rounded-full border text-sm font-medium cursor-pointer transition-all"
                          style={{ 
                            background: formData.budgetRange === budget ? "rgba(34, 211, 238,0.15)" : "transparent",
                            borderColor: formData.budgetRange === budget ? "#22D3EE" : "rgba(255,255,255,0.1)",
                            color: formData.budgetRange === budget ? "#22D3EE" : "rgba(255,255,255,0.6)"
                          }}
                        >
                          {budget}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-4 text-white">Target Timeline</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "ASAP (< 1 bulan)", 
                        "Standar (1 - 3 bulan)", 
                        "Santai (> 3 bulan)"
                      ].map(timeline => (
                        <div 
                          key={timeline}
                          onClick={() => setFormData({...formData, timeline: timeline})}
                          className="px-5 py-2.5 rounded-full border text-sm font-medium cursor-pointer transition-all"
                          style={{ 
                            background: formData.timeline === timeline ? "rgba(124, 58, 237,0.15)" : "transparent",
                            borderColor: formData.timeline === timeline ? "#7C3AED" : "rgba(255,255,255,0.1)",
                            color: formData.timeline === timeline ? "#d8b4fe" : "rgba(255,255,255,0.6)"
                          }}
                        >
                          {timeline}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-8 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <Button onClick={handleBack} variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Kembali
                  </Button>
                  <Button onClick={handleNext} variant="default" size="sm">
                    Lanjut
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

              </div>
            )}

            {/* Step 4: Detail Tambahan */}
            {step === 4 && (
              <div className="animate-fade-in h-full flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-2">Detail Akhir (Opsional)</h2>
                <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>Ada fitur spesifik atau integrasi khusus yang Anda butuhkan?</p>
                
                <div className="flex-1">
                  <textarea 
                    className="input-rianpedia h-full min-h-[150px] resize-y" 
                    placeholder="Contoh: Saya butuh integrasi dengan payment gateway X, atau saya ingin ada AI yang bisa menjawab pertanyaan customer..."
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                  />
                  <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.4)" }}>Kosongkan jika tidak ada/belum tahu.</p>
                </div>

                <div className="flex justify-between pt-8 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <Button onClick={handleBack} variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Kembali
                  </Button>
                  <Button onClick={handleSubmit} variant="default" size="sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Rekomendasi
                  </Button>
                </div>

              </div>
            )}

            {/* Step 5: Loading State */}
            {step === 5 && (
              <div className="animate-fade-in h-48 sm:h-auto sm:absolute inset-0 z-20 flex flex-col justify-center items-center bg-transparent sm:bg-black/40 sm:backdrop-blur-sm mt-10 sm:mt-0">
                <div className="w-16 h-16 relative mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#FF3B3B] border-[#FF3B3B]/20 animate-spin" />
                  <div className="absolute inset-2 rounded-full border-4 border-b-[#22D3EE] border-[#22D3EE]/20 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Sedang Merumuskan...</h3>
                <p className="text-sm text-center max-w-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Menganalisis kebutuhan, mencocokkan architecture, dan menyesuaikan timeline budget.
                </p>
              </div>
            )}

            {/* Step 6: Result */}
            {step === 6 && result && (
              <div className="animate-fade-in text-left">
                {isMockData && (
                  <div className="mb-6 p-3 rounded-lg text-xs flex items-start gap-2" style={{ background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)", color: "#FBBF24" }}>
                    <span className="text-base">⚠️</span> 
                    <span>Demo Mode: API Key OpenAI belum dikonfigurasi. Ini adalah mock data, namun memberikan gambaran format proposal yang akan digenerate oleh AI Rianpedia.</span>
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-8 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF3B3B, #7C3AED)", boxShadow: "0 0 20px rgba(255, 59, 59,0.4)" }}>
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Proposal Mini Anda</h2>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Digenerate AI khusus untuk kebutuhan Anda.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Architecture */}
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#a5a1ff", letterSpacing: "0.1em" }}>🏗️ Rekomendasi Arsitektur</h3>
                    <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>{result.architecture}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {result.techStack?.map(t => (
                        <span key={t} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl" style={{ background: "rgba(255, 59, 59,0.05)", border: "1px solid rgba(255, 59, 59,0.2)" }}>
                      <h3 className="text-sm font-semibold mb-4 text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" style={{ color: "#FF3B3B" }} /> Must Have Features
                      </h3>
                      <ul className="space-y-2.5">
                        {result.mustHaveFeatures?.map(f => (
                          <li key={f} className="text-sm flex items-start gap-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "#FF3B3B" }} /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-5 rounded-2xl" style={{ background: "rgba(34, 211, 238,0.05)", border: "1px solid rgba(34, 211, 238,0.2)" }}>
                      <h3 className="text-sm font-semibold mb-4 text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4" style={{ color: "#22D3EE" }} /> Nice to Have (Fase 2)
                      </h3>
                      <ul className="space-y-2.5">
                        {result.niceToHaveFeatures?.map(f => (
                          <li key={f} className="text-sm flex items-start gap-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "#22D3EE" }} /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Estimation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-white/10 glass">
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Estimasi Timeline</p>
                      <p className="text-base font-semibold text-white mt-1">{result.timeline}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-white/10 glass" style={{ borderLeft: "2px solid #E50914" }}>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Estimasi Kasar Biaya</p>
                      <p className="text-base font-semibold text-white mt-1">{result.estimatedCost}</p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-5 rounded-2xl border border-white/10" style={{ background: "rgba(0,0,0,0.3)" }}>
                    <p className="text-sm leading-relaxed italic" style={{ color: "rgba(255,255,255,0.7)" }}>
                      &ldquo;{result.summary}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <Button onClick={resetForm} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Ulangi Recommender
                  </Button>
                  <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
                    <Link href="/contact">
                      Jadwalkan Meeting Sekarang
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>


              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
