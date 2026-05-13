# 📄 Product Requirements Document (PRD): Rianpedia

**Project Name:** Rianpedia  
**Document Version:** 1.0  
**Target Output:** Enterprise-Level Web Application  
**Core Positioning:** AI-Powered Digital Solution Company  

---

## 1. Executive Summary

**Rianpedia** adalah platform *AI-Powered Digital Solution Company* yang berfokus pada pengembangan website, sistem kustom, dan integrasi AI. Platform ini dirancang untuk menjembatani kebutuhan startup, UMKM, perusahaan menengah hingga *enterprise*, serta instansi pendidikan dan pemerintahan dengan solusi teknologi berbasis kecerdasan buatan. Platform ini bukan sekadar *company profile*, melainkan sistem interaktif yang dilengkapi dengan *AI Project Recommender*, *Client Dashboard*, dan sistem pembayaran terintegrasi.

**Tagline:** *"Engineering the Future with Intelligent Systems"*

---

## 2. System Architecture & Tech Stack

Sistem akan dibangun dengan arsitektur modern berbasis *serverless* dan *edge computing* untuk memastikan performa tinggi dan skalabilitas *enterprise*.

* **Framework Utama:** Next.js (App Router)
* **Styling & UI Components:** Tailwind CSS, Shadcn UI
* **Database & Auth:** PostgreSQL (via Supabase), Supabase Auth
* **ORM:** Drizzle ORM
* **AI Integration:** OpenAI API / OpenRouter (Terintegrasi via Route Handlers)
* **Payment Gateway:** Integrasi pihak ketiga (misal: Mayar.id, Midtrans, atau Stripe)
* **Infrastruktur Tambahan:** GitHub Actions (Automasi *Keep-Alive* untuk Supabase Database & CI/CD pipeline)

---

## 3. User Roles & Access Management

Sistem menggunakan *Role-Based Access Control* (RBAC) yang diatur melalui Supabase Row Level Security (RLS).

1.  **Guest (Unauthenticated User):** Akses landing page, portofolio, dan mencoba *AI Project Recommender* (dengan limitasi).
2.  **Client (Authenticated User):** Pemilik proyek yang memesan jasa. Memiliki akses ke *Client Dashboard* untuk memantau progress, melakukan pembayaran, dan berkomunikasi dengan tim developer.
3.  **Admin / Developer / Vendor:** Tim internal Rianpedia. Memiliki akses penuh untuk manajemen proyek, *update progress*, verifikasi pembayaran, dan merespons pesan klien.

---

## 4. Functional Requirements (Fitur Utama)

### 4.1. Interactive Public Interface (Front-facing)
* **Dynamic Hero Section:** Implementasi *particle* atau *AI grid animations* menggunakan Three.js atau Framer Motion untuk memperkuat kesan futuristik (*Web3/Cyberpunk aesthetic*).
* **Case Study Showcase:** Modul portofolio dinamis yang menampilkan masalah klien, solusi Rianpedia, dan hasil (metrik keberhasilan).
* **Pricing & Service Architecture:** Menampilkan layanan (Custom Web, ERP/Absensi, AI Chatbot, System Integration).

### 4.2. AI Project Recommender (Core USP)
* **Interactive Flow:** *Multi-step form* yang mengumpulkan data pengguna (Jenis Bisnis, Tujuan Sistem, Skala Pengguna, Range Budget).
* **AI Processing:** Mengirim data ke LLM untuk dianalisis.
* **Output Generation:** Menghasilkan proposal mini secara *real-time* berisi:
    * Rekomendasi arsitektur sistem (Monolith vs Microservices).
    * Fitur wajib (*Must-have*) & opsional (*Nice-to-have*).
    * Estimasi timeline pengerjaan (fase MVP hingga Final).
    * Estimasi biaya kasar (*Cost prediction*).

### 4.3. Client Dashboard (User Panel)
* **Project Tracking:** Visualisasi *Kanban* atau *Gantt Chart* sederhana untuk memantau status proyek (*Planning, Design, Development, Testing, Deployment*).
* **Communication Center:** Fitur *live chat* antara klien dan developer (menggunakan Supabase Realtime).
* **Asset Management:** Repositori untuk menyimpan dokumen *requirement*, aset desain, dan *source code* (integrasi *cloud storage* / Supabase Storage).
* **Revision Ticketing:** Sistem pengajuan revisi dengan status (*Pending, In Progress, Resolved*).

### 4.4. Smart Payment & Escrow System
* **Milestone Payments:** Pembayaran dibagi berdasarkan *milestone* proyek (DP, termin 1, termin 2, pelunasan).
* **Invoice Generation:** Pembuatan *invoice* otomatis dalam format PDF.
* **Automated Verification:** Pembaruan status pembayaran secara *real-time* via Webhook dari *Payment Gateway*.

### 4.5. Admin / Vendor Panel
* **CRM (Customer Relationship Management):** Manajemen data klien dan prospek.
* **Project Board:** Pengelolaan semua proyek aktif, alokasi *resource* developer, dan pembaruan persentase progres.
* **Financial Dashboard:** Rekapitulasi pendapatan, *outstanding invoice*, dan performa bisnis.

---

## 5. Non-Functional Requirements

* **Security:** Enkripsi data sensitif klien, perlindungan dari serangan SQL Injection dan XSS (ditangani otomatis oleh Drizzle dan Next.js), serta *Rate Limiting* untuk API AI guna mencegah *abuse*.
* **Performance:** Waktu *load* awal di bawah 1.5 detik menggunakan *Server-Side Rendering* (SSR) dan *Static Site Generation* (SSG) dari Next.js.
* **Design System:** Konsistensi desain menggunakan Shadcn UI. Elemen visual difokuskan pada *dark mode*, *neon gradients* (biru, ungu, cyan), dan efek *glassmorphism* (*frosted glass*).

---

## 6. High-Level Database Schema (Drizzle ORM Context)

Berikut adalah struktur entitas utama yang akan diimplementasikan pada PostgreSQL:

* **`users`**: `id`, `email`, `role`, `created_at`
* **`client_profiles`**: `user_id`, `company_name`, `contact_number`, `industry`
* **`projects`**: `id`, `client_id`, `title`, `description`, `status`, `total_budget`, `start_date`, `end_date`
* **`project_milestones`**: `id`, `project_id`, `title`, `percentage`, `status`, `due_date`
* **`invoices`**: `id`, `project_id`, `milestone_id`, `amount`, `payment_status`, `payment_url`
* **`messages`**: `id`, `project_id`, `sender_id`, `content`, `created_at`
* **`ai_recommendation_logs`**: `id`, `user_id` (optional), `input_data` (JSON), `generated_response` (JSON), `created_at`

---

## 7. Development Phases (Roadmap)

### Phase 1: Foundation & Public Facing (Minggu 1-2)
* Inisialisasi Next.js, Tailwind, Shadcn, dan setup Supabase + Drizzle ORM.
* Penyelesaian UI/UX *Landing Page*, *Services*, *Portfolio*, dan *About*.
* Setup *dark mode* dan *glassmorphism components*.

### Phase 2: Core Logic & AI Integration (Minggu 3-4)
* Implementasi formulir interaktif untuk *AI Recommender*.
* Integrasi LLM API (*prompt engineering* untuk *output* yang terstruktur).
* Sistem autentikasi pengguna menggunakan Supabase Auth.

### Phase 3: Dashboard & Project Management (Minggu 5-6)
* Pengembangan *Client Dashboard* dan *Admin Panel*.
* Implementasi sistem *tracking* proyek dan manajemen file.
* Integrasi Supabase Realtime untuk fitur obrolan.

### Phase 4: Payment & Final Polish (Minggu 7-8)
* Integrasi *Payment Gateway* dan *Webhook*.
* Sistem pembuatan otomatis untuk *invoice*.
* UAT (*User Acceptance Testing*), perbaikan *bug*, dan optimasi SEO.
* *Deployment* ke produksi.

