import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { config } from "dotenv";
config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
    console.log("  - Cleaning existing data...");
    await db.delete(schema.services);
    await db.delete(schema.testimonials);
    await db.delete(schema.portfolios);

    // 1. Seed Services
    console.log("  - Seeding services...");
    const servicesData = [
      {
        id: "web",
        title: "Custom Web Development",
        subtitle: "Dari landing page hingga platform SaaS enterprise",
        description: "Kami membangun website dan web application dengan standar performa dan UI/UX terbaik. Setiap proyek dirancang custom sesuai kebutuhan bisnis Anda — bukan template biasa.",
        features: [
          "Next.js App Router + TypeScript untuk performa optimal",
          "UI/UX premium dengan dark mode & glassmorphism",
          "SEO-optimized dengan SSR/SSG",
          "Responsif di semua device",
          "Integrasi CMS headless",
          "A/B testing & analytics",
        ],
        packages: [
          { name: "Landing Page", price: "Mulai 3 Juta", desc: "1 halaman, CTA optimal, SEO-ready" },
          { name: "Company Profile", price: "Mulai 8 Juta", desc: "Multi-halaman, CMS, contact form" },
          { name: "Web App / SaaS", price: "Mulai 25 Juta", desc: "Dashboard, auth, database, API" },
        ],
        color: "#FF3B3B",
        gradient: "linear-gradient(135deg, rgba(255, 59, 59,0.15), rgba(255, 59, 59,0.05))",
        emoji: "💻",
        order: 1,
      },
      {
        id: "system",
        title: "System Development",
        subtitle: "Sistem yang mengautomasi operasional bisnis Anda",
        description: "Kami mengembangkan sistem internal yang mempercepat proses bisnis, mengurangi human error, dan memberikan visibilitas real-time terhadap operasional perusahaan.",
        features: [
          "Sistem ERP terintegrasi",
          "Absensi QR Code & GPS tracking",
          "Manajemen inventory & procurement",
          "Dashboard laporan real-time",
          "Manajemen SDM & penggajian",
          "Workflow automation",
        ],
        packages: [
          { name: "Absensi Digital", price: "Mulai 10 Juta", desc: "QR/GPS, laporan, multi-lokasi" },
          { name: "Sistem Manajemen", price: "Mulai 20 Juta", desc: "Inventory, workflow, dashboard" },
          { name: "ERP Enterprise", price: "Custom", desc: "Solusi end-to-end untuk enterprise" },
        ],
        color: "#22D3EE",
        gradient: "linear-gradient(135deg, rgba(34, 211, 238,0.12), rgba(34, 211, 238,0.03))",
        emoji: "⚙️",
        order: 2,
      },
      {
        id: "ai",
        title: "AI Integration",
        subtitle: "Implementasi kecerdasan buatan di bisnis Anda",
        description: "Integrasikan kekuatan AI seperti GPT-4, Gemini, dan model open-source ke dalam workflow Anda. Dari chatbot cerdas hingga sistem analisis data otomatis.",
        features: [
          "AI Chatbot bahasa Indonesia",
          "Sistem rekomendasi produk/konten",
          "Analisis sentimen & feedback pelanggan",
          "AI-powered report generation",
          "Automasi email & notifikasi cerdas",
          "Computer vision & OCR",
        ],
        packages: [
          { name: "AI Chatbot", price: "Mulai 15 Juta", desc: "NLP Indonesia, integrasi WhatsApp/Web" },
          { name: "AI Automation", price: "Mulai 20 Juta", desc: "Workflow otomatis berbasis AI" },
          { name: "AI System Full", price: "Custom", desc: "AI terintegrasi end-to-end" },
        ],
        color: "#7C3AED",
        gradient: "linear-gradient(135deg, rgba(124, 58, 237,0.15), rgba(124, 58, 237,0.03))",
        emoji: "🤖",
        order: 3,
      },
      {
        id: "integration",
        title: "System Integration",
        subtitle: "Sambungkan semua sistem dan layanan Anda",
        description: "Menghubungkan sistem yang sudah ada dengan layanan pihak ketiga, API eksternal, dan platform digital lainnya untuk menciptakan ekosistem yang terpadu.",
        features: [
          "Payment gateway (Midtrans, Mayar, Stripe)",
          "WhatsApp Business API",
          "Email marketing & CRM",
          "ERP & akuntansi integration",
          "Marketplace API (Tokopedia, Shopee)",
          "Government API (e-KTP, NPWP)",
        ],
        packages: [
          { name: "API Integration", price: "Mulai 5 Juta", desc: "Single API, dokumentasi, testing" },
          { name: "Multi Integration", price: "Mulai 12 Juta", desc: "3-5 integrasi, monitoring" },
          { name: "Ecosystem Full", price: "Custom", desc: "Seluruh ekosistem terintegrasi" },
        ],
        color: "#E50914",
        gradient: "linear-gradient(135deg, rgba(236,72,153,0.12), rgba(236,72,153,0.03))",
        emoji: "🔗",
        order: 4,
      },
    ];

    await db.insert(schema.services).values(servicesData);

    // 2. Seed Testimonials
    console.log("  - Seeding testimonials...");
    const testimonialsData = [
      {
        name: "Ahmad Rizky",
        role: "CEO, TechStartup ID",
        avatar: "AR",
        content: "Rianpedia tidak hanya membangun website — mereka membangun sistem yang benar-benar memahami kebutuhan bisnis kami. AI recommender mereka akurat dan menghemat banyak waktu diskusi awal.",
        rating: 5,
        color: "#FF3B3B",
        order: 1,
      },
      {
        name: "Siti Rahma",
        role: "HRD Manager, PT. Maju",
        avatar: "SR",
        content: "Sistem absensi yang dibangun Rianpedia luar biasa! QR scanning cepat, GPS tracking akurat, dan dashboard HR-nya sangat intuitif. Tim kami langsung bisa pakai tanpa training panjang.",
        rating: 5,
        color: "#22D3EE",
        order: 2,
      },
      {
        name: "Budi Santoso",
        role: "Owner, UD Santoso",
        avatar: "BS",
        content: "Platform B2B e-commerce dari Rianpedia meningkatkan order kami 3x lipat dalam 2 bulan pertama. Integrasinya sempurna dan support mereka responsif.",
        rating: 5,
        color: "#7C3AED",
        order: 3,
      },
    ];

    await db.insert(schema.testimonials).values(testimonialsData);

    // 3. Seed Portfolios
    console.log("  - Seeding portfolios...");
    const portfoliosData = [
      {
        title: "E-Absensi Karyawan",
        slug: "e-absensi",
        clientName: "PT. Maju Bersama",
        category: "System Development",
        year: "2024",
        problem: "Perusahaan dengan 500+ karyawan di 5 lokasi berbeda kesulitan memantau kehadiran secara akurat. Manipulasi absensi dan rekap manual memakan waktu 2 hari setiap bulannya.",
        solution: "Membangun sistem absensi digital berbasis QR Code dan GPS tracking dengan dashboard real-time. Dilengkapi fitur anti-cheating (location validation, face detection), dan laporan otomatis.",
        results: ["Efisiensi rekap absensi naik 90%", "Eliminasi manipulasi data kehadiran", "Laporan payroll otomatis dalam hitungan menit", "ROI positif dalam 3 bulan pertama"],
        techStack: ["Next.js", "Supabase", "PostgreSQL", "Drizzle ORM", "React Native"],
        color: "#FF3B3B",
        emoji: "📊",
        featured: true,
      },
      {
        title: "AI Customer Service Bot",
        slug: "ai-chatbot-fintech",
        clientName: "Startup FinTech (Confidential)",
        category: "AI Integration",
        year: "2024",
        problem: "Tim CS kewalahan menangani 500+ tiket/hari. Waktu respons rata-rata 4 jam, dan 80% pertanyaan adalah pertanyaan berulang seputar produk dan transaksi.",
        solution: "Implementasi AI chatbot berbasis GPT-4 yang terlatih dengan knowledge base produk. Integrasi ke WhatsApp Business, website, dan mobile app. Eskalasi otomatis ke agen manusia jika diperlukan.",
        results: ["80% pertanyaan ditangani AI tanpa manusia", "Waktu respons turun dari 4 jam ke <1 menit", "Kepuasan pelanggan (CSAT) naik 95%", "Biaya operasional CS turun 60%"],
        techStack: ["OpenAI GPT-4", "Next.js", "Supabase Realtime", "WhatsApp API", "Langchain"],
        color: "#22D3EE",
        emoji: "🤖",
        featured: true,
      },
      {
        title: "Platform E-Commerce B2B",
        slug: "b2b-ecommerce",
        clientName: "Distributor Nasional",
        category: "Custom Web Development",
        year: "2023",
        problem: "Proses pemesanan B2B masih via WhatsApp dan telepon. Tidak ada visibilitas stok real-time, harga tidak konsisten antar salesperson, dan invoice dibuat manual di Excel.",
        solution: "Platform pemesanan B2B dengan manajemen stok real-time, sistem harga bertingkat (tier pricing), otomatisasi invoice PDF, dan integrasi payment gateway.",
        results: ["Volume order naik 3x dalam 2 bulan", "Proses invoice dari 2 hari → 30 detik", "Salesperson efisiensi naik 200%", "Zero kesalahan harga antar customer"],
        techStack: ["Next.js", "Drizzle ORM", "PostgreSQL", "Midtrans", "React PDF"],
        color: "#7C3AED",
        emoji: "🛒",
        featured: true,
      },
      {
        title: "ERP Manufaktur Mini",
        slug: "erp-manufaktur",
        clientName: "Pabrik Garmen Lokal",
        category: "System Development",
        year: "2023",
        problem: "Pabrik garmen dengan 200 karyawan tidak memiliki sistem untuk melacak produksi, bahan baku, dan QC. Pencatatan masih manual sehingga sering terjadi kelebihan/kekurangan stok.",
        solution: "Sistem ERP mini yang mencakup manajemen bahan baku, tracking produksi per shift, quality control checklist digital, dan laporan manajemen.",
        results: ["Stok overrun turun 70%", "Visibilitas produksi real-time", "QC defect rate turun 45%", "Laporan keuangan otomatis"],
        techStack: ["Next.js", "Supabase", "PostgreSQL", "Recharts", "React"],
        color: "#E50914",
        emoji: "🏭",
        featured: false,
      },
      {
        title: "Portal Sekolah Digital",
        slug: "school-portal",
        clientName: "Yayasan Pendidikan",
        category: "Custom Web Development",
        year: "2024",
        problem: "Komunikasi antara sekolah, guru, dan orang tua masih via grup WhatsApp yang tidak terstruktur. Nilai rapor dibagi lewat foto buram.",
        solution: "Portal sekolah digital dengan fitur: absensi siswa, nilai & rapor digital, pengumuman, jadwal, tagihan SPP, dan komunikasi guru-orang tua.",
        results: ["300+ pengguna aktif sejak launch", "Komunikasi lebih terstruktur", "Tagihan SPP terbayar lebih cepat", "Kepuasan orang tua meningkat"],
        techStack: ["Next.js", "Supabase Auth", "PostgreSQL", "Midtrans", "Vercel"],
        color: "#10B981",
        emoji: "🎓",
        featured: false,
      },
      {
        title: "Integrasi API Logistik",
        slug: "api-integration-logistik",
        clientName: "Marketplace Regional",
        category: "System Integration",
        year: "2024",
        problem: "Marketplace harus melacak pengiriman dari 5 kurir berbeda secara manual. Admin perlu cek satu per satu website kurir, memakan waktu 3+ jam/hari.",
        solution: "Integrasi API tracking dari JNE, JT, SiCepat, Anteraja, dan Pos Indonesia ke dalam satu dashboard terpadu dengan notifikasi WhatsApp otomatis ke pembeli.",
        results: ["Tracking dari 5 kurir dalam 1 dashboard", "Notifikasi otomatis ke pembeli", "Admin efisiensi naik 90%", "Zero complaint tentang info pengiriman"],
        techStack: ["Next.js API Routes", "Kurir APIs", "WhatsApp API", "Redis", "Vercel"],
        color: "#F59E0B",
        emoji: "🚚",
        featured: false,
      },
    ];

    await db.insert(schema.portfolios).values(portfoliosData as any);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
