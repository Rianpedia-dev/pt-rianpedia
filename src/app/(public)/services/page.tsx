import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Settings, Bot, Plug, CheckCircle } from "lucide-react";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services — Rianpedia",
  description: "Layanan lengkap Rianpedia: Custom Web Development, System Development, AI Integration, dan System Integration untuk bisnis Anda.",
};

import { db } from "@/db";
import { services as servicesTable } from "@/db/schema";
import { asc } from "drizzle-orm";

const iconMap: Record<string, any> = {
  web: Globe,
  system: Settings,
  ai: Bot,
  integration: Plug,
};

export default async function ServicesPage() {
  const services = await db.select().from(servicesTable).orderBy(asc(servicesTable.order));

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ paddingTop: "128px", paddingBottom: "64px" }}>
        <div className="container-rianpedia text-center max-w-3xl mx-auto">


          <h1 className="display-lg mb-6">
            SOLUSI DIGITAL END-TO-END
          </h1>
          <p className="body-md" style={{ fontSize: "18px" }}>
            Dari konsep hingga live — kami tangani semuanya. Mulai dari website, sistem custom, AI integration, hingga ekosistem digital terintegrasi.
          </p>
          <div className="mt-8">
            <Link href="/ai-recommender" className="btn-primary">
              AI RECOMMENDER <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* M Stripe */}
      <div className="m-stripe" />

      {/* Services Detail */}
      <section style={{ paddingBottom: "96px" }}>
        <div className="container-rianpedia" style={{ paddingTop: "96px" }}>
          <div className="space-y-0">
            {services.map(({ id, title, subtitle, description, features, packages, emoji }, idx) => {
              const Icon = iconMap[id] || Globe;
              
              return (
                <div
                  key={id}
                  id={id}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-0"
                  style={{ borderBottom: "1px solid #3c3c3c" }}
                >
                  {/* Text Side */}
                  <div
                    className={idx % 2 === 1 ? "lg:order-2" : ""}
                    style={{ padding: "64px 40px", background: idx % 2 === 0 ? "#000" : "#0d0d0d" }}
                  >
                    <div className="label-uppercase mb-5" style={{ color: "#7e7e7e" }}>
                      {emoji} {title}
                    </div>
                    <h2 className="display-sm mb-4">{subtitle}</h2>
                    <p className="body-md mb-8">{description}</p>
                    <ul className="space-y-3 mb-8">
                      {features?.map((f: string) => (
                        <li key={f} className="flex items-center gap-3 text-[14px] font-light" style={{ color: "#bbbbbb" }}>
                          <span className="w-1 h-1 bg-white shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="btn-outline">
                      KONSULTASI GRATIS <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>

                  {/* Packages Side */}
                  <div
                    className={idx % 2 === 1 ? "lg:order-1" : ""}
                    style={{ padding: "64px 40px", background: idx % 2 === 0 ? "#0d0d0d" : "#000" }}
                  >
                    <div className="space-y-0">
                      {packages?.map(({ name, price, desc }: { name: string; price: string; desc: string }) => (
                        <div
                          key={name}
                          style={{
                            padding: "24px",
                            background: "#1a1a1a",
                            border: "1px solid #3c3c3c",
                            marginBottom: "-1px",
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-[18px] font-bold text-white">{name}</h3>
                            <span className="label-uppercase text-[12px]" style={{ color: "#e6e6e6" }}>{price}</span>
                          </div>
                          <p className="body-sm">{desc}</p>
                        </div>
                      ))}
                      <div
                        style={{
                          padding: "20px 24px",
                          background: "transparent",
                          border: "1px dashed #3c3c3c",
                          textAlign: "center",
                        }}
                      >
                        <p className="body-sm">
                          Tidak ada yang sesuai?{" "}
                          <Link href="/contact" className="text-white font-bold hover:underline">
                            DISKUSIKAN KEBUTUHAN ANDA →
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
