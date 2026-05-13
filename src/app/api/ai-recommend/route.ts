import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_api_key_for_build',
  // Use OpenRouter or standard OpenAI URL if configured
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
});

// Route segment config
export const maxDuration = 60; // Set max duration for Vercel/Next.js edge/serverless functions
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { businessType, systemGoal, userScale, budgetRange, timeline, additionalInfo } = body;

    // Build the prompt based on user inputs
    const prompt = `
      Anda adalah Chief Technology Officer (CTO) AI yang bekerja di "Rianpedia", sebuah perusahaan solusi digital (Web & AI) kelas enterprise dari Indonesia.
      Seorang calon klien baru saja meminta rekomendasi teknis untuk proyek mereka dengan detail berikut:
      
      - Jenis Bisnis: ${businessType}
      - Tujuan Sistem: ${systemGoal}
      - Estimasi Skala Pengguna: ${userScale}
      - Range Budget (Rupiah): ${budgetRange}
      - Target Timeline: ${timeline}
      - Info Tambahan: ${additionalInfo || 'Tidak ada'}
      
      Tugas Anda:
      Hasilkan proposal teknis (mini proposal) yang ringkas, profesional, modern, dan informatif. 
      Gunakan bahasa Indonesia yang profesional namun tidak kaku (sedikit modern tech-savvy).
      
      Struktur yang HARUS Anda return DALAM FORMAT JSON SAJA (tanpa markdown blok):
      {
        "architecture": "Deskripsi singkat (1-2 paragraf) tentang arsitektur sistem yang direkomendasikan (misal: Monolith Next.js, Microservices, dll) dan alasannya.",
        "mustHaveFeatures": ["Fitur utama 1", "Fitur utama 2", "Fitur utama 3", "Fitur utama 4"],
        "niceToHaveFeatures": ["Fitur opsional 1", "Fitur opsional 2"],
        "timeline": "Estimasi fase pengerjaan (misal: 2 minggu design, 4 minggu dev, dll)",
        "techStack": ["Next.js", "PostgreSQL", "dll"],
        "estimatedCost": "Estimasi kasar biaya (contoh: Rp 50.000.000 - Rp 75.000.000) - sesuaikan realistis dengan input budget mereka. Jika budget mereka dirasa kurang, sarankan MVP/Fase 1.",
        "summary": "1 Paragraf kesimpulan mengapa solusi ini tepat untuk mereka dan kenapa Rianpedia adalah partner terbaik."
      }
      
      Pastikan response Anda HANYA berupa JSON valid yang bisa di-parse. Jangan tambahkan \`\`\`json.
    `;

    // Attempt to call OpenAI
    try {
      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Anda adalah sistem rekomendasi arsitektur AI yang mengembalikan output HANYA dalam format JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });

      const resultText = response.choices[0]?.message?.content || '{}';
      const parsedResult = JSON.parse(resultText);

      return NextResponse.json({ success: true, data: parsedResult });
    } catch (apiError: any) {
      console.error('OpenAI API Error:', apiError);
      
      // Fallback if API key is invalid or request fails (Mock Data for Demo)
      // This is helpful if the user hasn't set up OPENAI_API_KEY yet 
      return NextResponse.json({
        success: true,
        data: {
          architecture: "Arsitektur Serverless Modern menggunakan Next.js App Router (Fullstack). Pendekatan ini dipilih karena memberikan keseimbangan terbaik antara kecepatan development, SEO-readiness, dan skalabilitas (mampu menangani lonjakan traffic otomatis). Database akan menggunakan PostgreSQL dengan Drizzle ORM.",
          mustHaveFeatures: [
            "Autentikasi & Manajemen Pengguna (Role-based)",
            "Dashboard Admin Real-time",
            "Sistem Database Terpusat",
            "Keamanan Enterprise & Backup Otomatis"
          ],
          niceToHaveFeatures: [
            "Integrasi Chatbot AI (Tanya-Jawab Otomatis)",
            "Notifikasi WhatsApp/Email Terintegrasi",
            "Modul Analitik & Reporting Canggih"
          ],
          timeline: "Fase 1 (MVP): 4-6 Minggu. Fase 2 (Full Feature): +4 Minggu. Total pengerjaan estimasi 2.5 hingga 3 bulan.",
          techStack: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Supabase", "OpenAI"],
          estimatedCost: budgetRange !== "Belum tahu" ? `Sesuai budget Anda (${budgetRange}), disarankan mulai dari MVP dengan estimasi Rp 35.000.000 - Rp 50.000.000` : "Mulai dari Rp 25.000.000 untuk versi Minimum Viable Product (MVP)",
          summary: "Sistem yang kami rekomendasikan dirancang agar scalable dan future-proof. Melalui pendekatan MVP (Minimum Viable Product), Anda bisa meluncurkan core feature lebih cepat dan menghemat biaya, sembari mengumpulkan feedback dari pengguna nyata. Tim Rianpedia siap mendampingi eksekusi sistem dari fase perencanaan konsep hingga pasca-peluncuran."
        },
        isMockData: true 
      });
    }
  } catch (error) {
    console.error('AI Recommender Error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat memproses permintaan Anda' },
      { status: 500 }
    );
  }
}
