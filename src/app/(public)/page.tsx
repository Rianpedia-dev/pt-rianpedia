import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhyRianpedia } from "@/components/home/WhyRianpedia";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTABanner } from "@/components/home/CTABanner";
import { db } from "@/db";
import { portfolios, services, testimonials } from "@/db/schema";
import { desc, asc, eq } from "drizzle-orm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Rianpedia — Engineering the Future with Intelligent Systems",
  description:
    "Platform AI-Powered Digital Solution Company Indonesia. Kami membangun website, sistem custom, dan integrasi AI yang mengubah bisnis Anda.",
};

export default async function HomePage() {
  const [portfoliosData, servicesData, testimonialsData] = await Promise.all([
    db.select().from(portfolios).where(eq(portfolios.featured, true)).limit(6).orderBy(desc(portfolios.createdAt)),
    db.select().from(services).orderBy(asc(services.order)).limit(4),
    db.select().from(testimonials).orderBy(asc(testimonials.order)).limit(3),
  ]);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview services={servicesData} />
      <WhyRianpedia />
      <PortfolioPreview portfolios={portfoliosData} />
      <TestimonialsSection testimonials={testimonialsData} />
      <CTABanner />
    </>
  );
}
