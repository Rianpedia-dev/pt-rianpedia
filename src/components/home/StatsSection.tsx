"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { number: 50, suffix: "+", label: "Projects Delivered" },
  { number: 30, suffix: "+", label: "Happy Clients" },
  { number: 3, suffix: "+", label: "Years Experience" },
  { number: 99, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1500;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat-number">
      {count}{suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section
      className="py-16 relative"
      style={{
        background: "rgba(8, 8, 20, 0.8)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="container-rianpedia">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ number, suffix, label }) => (
            <div
              key={label}
              className="stat-card glass-card"
              style={{ padding: "1.5rem" }}
            >
              <AnimatedNumber target={number} suffix={suffix} />
              <p className="stat-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
