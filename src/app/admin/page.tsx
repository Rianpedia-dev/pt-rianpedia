import { db } from "@/db";
import { users, projects, invoices, contactSubmissions, portfolios, services, testimonials } from "@/db/schema";
import { count, sum, eq } from "drizzle-orm";
import { Users, FolderKanban, Receipt, Mail, Briefcase, Wrench, MessageSquareQuote, TrendingUp } from "lucide-react";
import Link from "next/link";
export const dynamic = "force-dynamic";

async function getStats() {
  const [
    usersCount,
    projectsCount,
    invoicesResult,
    contactsCount,
    portfoliosCount,
    servicesCount,
    testimonialsCount,
  ] = await Promise.all([
    db.select({ count: count() }).from(users),
    db.select({ count: count() }).from(projects),
    db.select({ count: count(), total: sum(invoices.totalAmount) }).from(invoices),
    db.select({ count: count() }).from(contactSubmissions),
    db.select({ count: count() }).from(portfolios),
    db.select({ count: count() }).from(services),
    db.select({ count: count() }).from(testimonials),
  ]);

  return {
    users: usersCount[0]?.count || 0,
    projects: projectsCount[0]?.count || 0,
    invoices: invoicesResult[0]?.count || 0,
    revenue: invoicesResult[0]?.total || "0",
    contacts: contactsCount[0]?.count || 0,
    portfolios: portfoliosCount[0]?.count || 0,
    services: servicesCount[0]?.count || 0,
    testimonials: testimonialsCount[0]?.count || 0,
  };
}

async function getRecentContacts() {
  return db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt).limit(5);
}

async function getRecentProjects() {
  return db.select().from(projects).orderBy(projects.createdAt).limit(5);
}

export default async function AdminDashboardPage() {
  const stats = await getStats();
  const recentContacts = await getRecentContacts();
  const recentProjects = await getRecentProjects();

  const statCards = [
    {
      label: "Total Pengguna",
      value: stats.users,
      icon: Users,
      color: "#FF3B3B",
      href: "/admin/users",
    },
    {
      label: "Proyek",
      value: stats.projects,
      icon: FolderKanban,
      color: "#7C3AED",
      href: "/admin/projects",
    },
    {
      label: "Tagihan",
      value: stats.invoices,
      icon: Receipt,
      color: "#22D3EE",
      href: "/admin/invoices",
    },
    {
      label: "Kontak Masuk",
      value: stats.contacts,
      icon: Mail,
      color: "#F59E0B",
      href: "/admin/contacts",
    },
    {
      label: "Portofolio",
      value: stats.portfolios,
      icon: Briefcase,
      color: "#10B981",
      href: "/admin/portfolios",
    },
    {
      label: "Layanan",
      value: stats.services,
      icon: Wrench,
      color: "#EC4899",
      href: "/admin/services",
    },
    {
      label: "Testimoni",
      value: stats.testimonials,
      icon: MessageSquareQuote,
      color: "#8B5CF6",
      href: "/admin/testimonials",
    },
    {
      label: "Pendapatan",
      value: `Rp ${Number(stats.revenue).toLocaleString("id-ID")}`,
      icon: TrendingUp,
      color: "#FF3B3B",
      href: "/admin/invoices",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Ringkasan Dasbor</h2>
        <p className="text-[#9CA3AF] mt-1">Selamat datang di Rianpedia Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12] hover:shadow-[0_0_30px_rgba(255,59,59,0.08)]"
          >
            {/* Glow */}
            <div
              className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ background: stat.color }}
            />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                </p>
              </div>
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{
                  background: `${stat.color}15`,
                  border: `1px solid ${stat.color}30`,
                }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-[#7C3AED]" />
              Proyek Terbaru
            </h3>
            <Link
              href="/admin/projects"
              className="text-xs text-[#FF3B3B] hover:text-[#FF3B3B]/80 font-medium transition-colors"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentProjects.length === 0 ? (
              <div className="p-8 text-center text-[#9CA3AF] text-sm">
                Belum ada project
              </div>
            ) : (
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {project.title}
                    </p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      {new Date(project.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : project.status === "development"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : project.status === "inquiry"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-purple-500/20 text-purple-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#F59E0B]" />
              Kontak Masuk Terbaru
            </h3>
            <Link
              href="/admin/contacts"
              className="text-xs text-[#FF3B3B] hover:text-[#FF3B3B]/80 font-medium transition-colors"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentContacts.length === 0 ? (
              <div className="p-8 text-center text-[#9CA3AF] text-sm">
                Belum ada contact submission
              </div>
            ) : (
              recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="text-sm font-medium text-white truncate">
                      {contact.name}
                    </p>
                    <p className="text-xs text-[#9CA3AF] truncate mt-0.5">
                      {contact.email} — {contact.message?.substring(0, 50)}...
                    </p>
                  </div>
                  <span
                    className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
                      contact.isRead
                        ? "bg-white/[0.06] text-[#9CA3AF]"
                        : "bg-[#FF3B3B]/20 text-[#FF3B3B]"
                    }`}
                  >
                    {contact.isRead ? "Dibaca" : "Baru"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
