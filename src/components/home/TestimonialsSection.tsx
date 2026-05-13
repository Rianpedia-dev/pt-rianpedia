export function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  return (
    <section
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
      }}
    >
      <div className="container-rianpedia">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-label mx-auto">
            <span>⭐</span> Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Apa Kata{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF3B3B, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Klien Kami
            </span>
          </h2>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
            Kepercayaan klien adalah aset terbesar kami.
          </p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ id, name, role, avatar, content, rating, color }) => {
            const themeColor = color ?? "#FF3B3B";
            const stars = rating ?? 5;
            const initial = avatar || name.charAt(0);
            
            return (
              <div
                key={id}
                className="glass-card p-7 flex flex-col gap-5"
              >
                {/* Rating Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: stars }).map((_, i) => (
                    <span key={i} style={{ color: "#F59E0B", fontSize: "1rem" }}>★</span>
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                  &ldquo;{content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${themeColor}, ${themeColor}80)`,
                    }}
                  >
                    {initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
