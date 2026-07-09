import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export function PortfolioPreview({ portfolios }: { portfolios: any[] }) {
  return (
    <section className="section-padding" style={{ background: "transparent" }}>
      <div className="container-rianpedia">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>

            <h2 className="display-md">
              CASE STUDIES PILIHAN
            </h2>
          </div>
          <Link href="/portfolio" className="text-link">
            LIHAT SEMUA <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* M Stripe */}
        <div className="m-stripe mb-12" />

        {/* Portfolio Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-0 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          {portfolios.map(({ id, title, clientName, category, description, results, techStack, emoji }) => (
            <div
              key={id}
              className="group flex flex-col flex-none w-[85vw] max-w-[400px] md:max-w-none md:w-auto snap-center"
              style={{
                background: "#1a1a1a",
                border: "1px solid #3c3c3c",
                padding: "32px",
              }}
            >
              {/* Category */}
              <div className="tag mb-5 self-start">
                {emoji} {category}
              </div>

              {/* Title & Client */}
              <h3 className="title-lg mb-1">{title}</h3>
              <p className="caption mb-4">
                {clientName}
              </p>
              <p className="body-sm mb-5 line-clamp-3">
                {description}
              </p>

              {/* Results snippet */}
              <ul className="space-y-2 mb-6">
                {results?.slice(0, 3).map((r: string) => (
                  <li key={r} className="flex items-center gap-3 text-[14px] font-light">
                    <span className="w-1 h-1 bg-white shrink-0" />
                    <span style={{ color: "#bbbbbb" }} className="line-clamp-1">{r}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-auto pt-4" style={{ borderTop: "1px solid #262626" }}>
                {techStack?.slice(0, 3).map((t: string) => (
                  <span
                    key={t}
                    className="text-[12px] font-bold uppercase tracking-[1px] px-3 py-1"
                    style={{
                      background: "#262626",
                      border: "1px solid #3c3c3c",
                      color: "#7e7e7e",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* View Project */}
              <Link
                href={`/portfolio#${id}`}
                className="text-link text-[12px] mt-5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" /> LIHAT DETAIL
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
