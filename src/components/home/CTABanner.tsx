"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section style={{ background: "transparent", padding: "0" }}>
      {/* M Stripe top */}
      <div className="m-stripe" />

      <div className="container-rianpedia" style={{ padding: "96px 1.5rem" }}>
        <div className="text-center max-w-3xl mx-auto">
          {/* Heading */}
          <h2 className="display-lg mb-6">
            SIAP MEMULAI PROYEK ANDA?
          </h2>
          <p className="body-md max-w-xl mx-auto mb-10" style={{ fontSize: "18px" }}>
            Coba AI Project Recommender kami dan dapatkan rekomendasi sistem, estimasi biaya, dan timeline dalam hitungan detik — gratis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <Link
              href="/ai-recommender"
              className="btn-primary w-full sm:w-auto"
            >
              AI RECOMMENDER
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="btn-outline w-full sm:w-auto"
            >
              HUBUNGI KAMI
            </Link>
          </div>
        </div>
      </div>

      {/* M Stripe bottom */}
      <div className="m-stripe" />
    </section>
  );
}
