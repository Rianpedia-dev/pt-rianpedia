export function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  return (
    <section className="section-padding" style={{ background: "transparent" }}>
      <div className="container-rianpedia">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <h2 className="display-md mb-4">
            APA KATA KLIEN KAMI
          </h2>
          <p className="body-md">
            Kepercayaan klien adalah aset terbesar kami.
          </p>
        </div>

        {/* Testimonial Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-0 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          {testimonials.map(({ id, name, role, avatar, content, rating }) => {
            const stars = rating ?? 5;
            const initial = avatar || name.charAt(0);
            
            return (
              <div
                key={id}
                className="flex flex-col gap-5 flex-none w-[85vw] max-w-[400px] md:max-w-none md:w-auto snap-center"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #3c3c3c",
                  padding: "32px",
                }}
              >
                {/* Rating Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: stars }).map((_, i) => (
                    <span key={i} style={{ color: "#f4b400", fontSize: "1rem" }}>★</span>
                  ))}
                </div>

                {/* Content */}
                <p className="body-sm flex-1" style={{ color: "#bbbbbb", fontStyle: "italic" }}>
                  &ldquo;{content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #262626" }}>
                  <div
                    className="w-10 h-10 flex items-center justify-center text-[14px] font-bold text-white shrink-0"
                    style={{ background: "#262626", border: "1px solid #3c3c3c" }}
                  >
                    {initial}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-white">{name}</p>
                    <p className="caption">{role}</p>
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
