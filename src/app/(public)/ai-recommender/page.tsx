"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, RefreshCw } from "lucide-react";
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
    setStep(5);
    try {
      const response = await fetch("/api/ai-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.data);
        setIsMockData(data.isMockData || false);
        setStep(6);
      } else {
        alert("Gagal menghubungi AI. Silakan coba lagi.");
        setStep(4);
      }
    } catch {
      alert("Terjadi kesalahan jaringan.");
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => { setResult(null); setStep(1); };

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ paddingTop: "128px", paddingBottom: "40px" }}>
        <div className="container-rianpedia text-center max-w-3xl mx-auto">


          <h1 className="display-lg mb-4">AI PROJECT RECOMMENDER</h1>
          <p className="body-md">
            Jawab 4 pertanyaan sederhana. Dapatkan arsitektur sistem, estimasi biaya, dan timeline secara instan.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ paddingBottom: "96px" }}>
        <div className="container-rianpedia max-w-3xl mx-auto">
          {/* Progress Bar */}
          {step <= 4 && (
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`label-uppercase text-[12px] ${step >= i ? "text-white" : ""}`} style={step < i ? { color: "#3c3c3c" } : {}}>STEP {i}</div>
                ))}
              </div>
              <div className="w-full h-[2px]" style={{ background: "#262626" }}>
                <div className="h-full transition-all duration-500 ease-out bg-white" style={{ width: `${(step / 4) * 100}%` }} />
              </div>
            </div>
          )}

          {/* Card Form */}
          <div style={{ background: "#1a1a1a", border: "1px solid #3c3c3c", padding: "40px", minHeight: "450px", position: "relative" }}>
            
            {/* Step 1 */}
            {step === 1 && (
              <div className="animate-fade-in flex flex-col h-full">
                <h2 className="display-sm mb-2">CERITAKAN TENTANG BISNIS ANDA</h2>
                <p className="body-sm mb-8">Informasi ini membantu AI kami memahami konteks proyek.</p>
                <div className="space-y-6 flex-1">
                  <div>
                    <label className="label-uppercase text-[12px] block mb-3">JENIS BISNIS</label>
                    <select className="input-rianpedia appearance-none" value={formData.businessType} onChange={(e) => setFormData({...formData, businessType: e.target.value})} style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1.5em 1.5em" }}>
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
                    <label className="label-uppercase text-[12px] block mb-3">TUJUAN UTAMA</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                      {["Meningkatkan penjualan online", "Automasi operasional internal", "Meningkatkan layanan pelanggan", "Membangun produk SaaS baru"].map(goal => (
                        <div key={goal} onClick={() => setFormData({...formData, systemGoal: goal})} className="cursor-pointer text-[14px] font-light transition-all" style={{ padding: "16px", border: "1px solid #3c3c3c", marginBottom: "-1px", marginRight: "-1px", background: formData.systemGoal === goal ? "#262626" : "transparent", color: formData.systemGoal === goal ? "white" : "#7e7e7e" }}>
                          {goal}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-8 mt-auto" style={{ borderTop: "1px solid #262626" }}>
                  <Button onClick={handleNext} variant="default" size="sm">LANJUT <ChevronRight className="w-4 h-4 ml-1" /></Button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="animate-fade-in flex flex-col h-full">
                <h2 className="display-sm mb-2">SKALA PENGGUNA</h2>
                <p className="body-sm mb-8">Arsitektur sistem bergantung pada traffic yang diharapkan.</p>
                <div className="space-y-0 flex-1">
                  {[
                    { label: "< 1.000 / bulan", desc: "Aplikasi internal kecil atau MVP" },
                    { label: "1.000 - 10.000 / bulan", desc: "Bisnis menengah atau platform standar" },
                    { label: "10.000 - 100.000 / bulan", desc: "Aplikasi populer dengan traffic stabil" },
                    { label: "> 100.000 / bulan", desc: "Enterprise dengan high-availability" },
                  ].map(scale => (
                    <div key={scale.label} onClick={() => setFormData({...formData, userScale: scale.label})} className="cursor-pointer transition-all" style={{ padding: "20px", border: "1px solid #3c3c3c", marginBottom: "-1px", background: formData.userScale === scale.label ? "#262626" : "transparent" }}>
                      <span className={`text-[16px] font-bold block mb-1 ${formData.userScale === scale.label ? "text-white" : "text-white/60"}`}>{scale.label}</span>
                      <span className="body-sm">{scale.desc}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-8 mt-auto" style={{ borderTop: "1px solid #262626" }}>
                  <Button onClick={handleBack} variant="outline" size="sm"><ChevronLeft className="w-4 h-4 mr-1" /> KEMBALI</Button>
                  <Button onClick={handleNext} variant="default" size="sm">LANJUT <ChevronRight className="w-4 h-4 ml-1" /></Button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="animate-fade-in flex flex-col h-full">
                <h2 className="display-sm mb-2">BUDGET & TIMELINE</h2>
                <p className="body-sm mb-8">Kami akan merekomendasikan solusi yang pas.</p>
                <div className="space-y-8 flex-1">
                  <div>
                    <label className="label-uppercase text-[12px] block mb-4">RANGE BUDGET (IDR)</label>
                    <div className="flex flex-wrap gap-0">
                      {["< Rp 15 Juta", "Rp 15 - 30 Juta", "Rp 30 - 75 Juta", "> Rp 75 Juta", "Belum tahu"].map(budget => (
                        <div key={budget} onClick={() => setFormData({...formData, budgetRange: budget})} className="cursor-pointer text-[14px] font-bold tracking-[1px] transition-all" style={{ padding: "12px 20px", border: "1px solid #3c3c3c", marginRight: "-1px", marginBottom: "-1px", background: formData.budgetRange === budget ? "#262626" : "transparent", color: formData.budgetRange === budget ? "white" : "#7e7e7e" }}>
                          {budget}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label-uppercase text-[12px] block mb-4">TARGET TIMELINE</label>
                    <div className="flex flex-wrap gap-0">
                      {["ASAP (< 1 bulan)", "Standar (1 - 3 bulan)", "Santai (> 3 bulan)"].map(tl => (
                        <div key={tl} onClick={() => setFormData({...formData, timeline: tl})} className="cursor-pointer text-[14px] font-bold tracking-[1px] transition-all" style={{ padding: "12px 20px", border: "1px solid #3c3c3c", marginRight: "-1px", background: formData.timeline === tl ? "#262626" : "transparent", color: formData.timeline === tl ? "white" : "#7e7e7e" }}>
                          {tl}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-8 mt-auto" style={{ borderTop: "1px solid #262626" }}>
                  <Button onClick={handleBack} variant="outline" size="sm"><ChevronLeft className="w-4 h-4 mr-1" /> KEMBALI</Button>
                  <Button onClick={handleNext} variant="default" size="sm">LANJUT <ChevronRight className="w-4 h-4 ml-1" /></Button>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="animate-fade-in flex flex-col h-full">
                <h2 className="display-sm mb-2">DETAIL AKHIR (OPSIONAL)</h2>
                <p className="body-sm mb-8">Ada fitur spesifik atau integrasi khusus?</p>
                <div className="flex-1">
                  <textarea className="input-rianpedia min-h-[150px] resize-y" style={{ height: "auto" }} placeholder="Contoh: integrasi payment gateway, AI customer support..." value={formData.additionalInfo} onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})} />
                  <p className="caption mt-3">Kosongkan jika tidak ada.</p>
                </div>
                <div className="flex justify-between pt-8 mt-auto" style={{ borderTop: "1px solid #262626" }}>
                  <Button onClick={handleBack} variant="outline" size="sm"><ChevronLeft className="w-4 h-4 mr-1" /> KEMBALI</Button>
                  <Button onClick={handleSubmit} variant="default" size="sm"><Sparkles className="w-4 h-4 mr-2" /> GENERATE</Button>
                </div>
              </div>
            )}

            {/* Step 5: Loading */}
            {step === 5 && (
              <div className="animate-fade-in flex flex-col justify-center items-center" style={{ minHeight: "300px" }}>
                <div className="w-12 h-12 relative mb-6">
                  <div className="absolute inset-0 border-2 border-t-white border-white/20 animate-spin" />
                </div>
                <h3 className="title-lg mb-2">AI SEDANG MERUMUSKAN...</h3>
                <p className="body-sm text-center max-w-xs">Menganalisis kebutuhan dan menyesuaikan rekomendasi.</p>
              </div>
            )}

            {/* Step 6: Result */}
            {step === 6 && result && (
              <div className="animate-fade-in text-left">
                {isMockData && (
                  <div className="mb-6 p-4 text-[12px] flex items-start gap-2" style={{ background: "#262626", border: "1px solid #3c3c3c", color: "#f4b400" }}>
                    <span>⚠️</span>
                    <span>Demo Mode: API Key belum dikonfigurasi. Ini adalah mock data.</span>
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-8 pb-4" style={{ borderBottom: "1px solid #3c3c3c" }}>
                  <div className="w-12 h-12 flex items-center justify-center" style={{ background: "#262626", border: "1px solid #3c3c3c" }}>
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="title-lg">PROPOSAL MINI ANDA</h2>
                    <p className="caption">Digenerate AI khusus untuk kebutuhan Anda.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="label-uppercase mb-3" style={{ color: "#7e7e7e" }}>REKOMENDASI ARSITEKTUR</h3>
                    <p className="body-md" style={{ color: "#e6e6e6" }}>{result.architecture}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {result.techStack?.map(t => (
                        <span key={t} className="text-[12px] font-bold uppercase tracking-[1px] px-3 py-1.5" style={{ background: "#262626", border: "1px solid #3c3c3c", color: "white" }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div style={{ background: "rgba(13, 13, 13, 0.7)", border: "1px solid #3c3c3c", padding: "24px", backdropFilter: "blur(10px)" }}>
                      <h3 className="label-uppercase text-[12px] mb-4 flex items-center gap-2" style={{ color: "#e6e6e6" }}>
                        <CheckCircle2 className="w-4 h-4" /> MUST HAVE
                      </h3>
                      <ul className="space-y-2.5">
                        {result.mustHaveFeatures?.map(f => (
                          <li key={f} className="flex items-start gap-2 text-[14px] font-light" style={{ color: "#bbbbbb" }}>
                            <span className="mt-1.5 w-1 h-1 bg-white shrink-0" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ background: "rgba(13, 13, 13, 0.7)", border: "1px solid #3c3c3c", borderLeft: "none", padding: "24px", backdropFilter: "blur(10px)" }}>
                      <h3 className="label-uppercase text-[12px] mb-4 flex items-center gap-2" style={{ color: "#e6e6e6" }}>
                        <Sparkles className="w-4 h-4" /> NICE TO HAVE
                      </h3>
                      <ul className="space-y-2.5">
                        {result.niceToHaveFeatures?.map(f => (
                          <li key={f} className="flex items-start gap-2 text-[14px] font-light" style={{ color: "#bbbbbb" }}>
                            <span className="mt-1.5 w-1 h-1 bg-white shrink-0" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="spec-cell" style={{ border: "1px solid #3c3c3c", textAlign: "left" }}>
                      <p className="caption">ESTIMASI TIMELINE</p>
                      <p className="text-[18px] font-bold text-white mt-1">{result.timeline}</p>
                    </div>
                    <div className="spec-cell" style={{ border: "1px solid #3c3c3c", borderLeft: "none", textAlign: "left" }}>
                      <p className="caption">ESTIMASI BIAYA</p>
                      <p className="text-[18px] font-bold text-white mt-1">{result.estimatedCost}</p>
                    </div>
                  </div>

                  <div style={{ background: "rgba(13, 13, 13, 0.7)", border: "1px solid #3c3c3c", padding: "24px", backdropFilter: "blur(10px)" }}>
                    <p className="body-sm italic" style={{ color: "#bbbbbb" }}>&ldquo;{result.summary}&rdquo;</p>
                  </div>
                </div>

                <div className="mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid #3c3c3c" }}>
                  <Button onClick={resetForm} variant="outline" size="sm"><RefreshCw className="w-4 h-4 mr-2" /> ULANGI</Button>
                  <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
                    <Link href="/contact">JADWALKAN MEETING <ArrowRight className="w-4 h-4 ml-2" /></Link>
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
