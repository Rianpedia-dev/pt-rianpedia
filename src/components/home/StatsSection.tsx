"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { number: 50, suffix: "+", label: "PROJECTS DELIVERED" },
  { number: 30, suffix: "+", label: "HAPPY CLIENTS" },
  { number: 3, suffix: "+", label: "YEARS EXPERIENCE" },
  { number: 99, suffix: "%", label: "CLIENT SATISFACTION" },
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
    <div ref={ref} className="display-sm">
      {count}{suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section style={{ background: "transparent" }}>
      {/* Top hairline */}
      <div className="m-stripe" />
      <div className="container-rianpedia" style={{ padding: "64px 1.5rem" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map(({ number, suffix, label }, idx) => (
            <div
              key={label}
              className="spec-cell"
              style={{
                borderRight: idx < stats.length - 1 ? "1px solid #3c3c3c" : "none",
                padding: "40px 24px",
              }}
            >
              <AnimatedNumber target={number} suffix={suffix} />
              <p className="spec-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
