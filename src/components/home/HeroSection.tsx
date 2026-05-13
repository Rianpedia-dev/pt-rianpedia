"use client";

import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";


const typingWords = [
  "Intelligent Systems",
  "Custom Web Apps",
  "AI Integration",
  "Digital Solutions",
  "Smart Automation",
];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string;
    }[] = [];

    const colors = ["#FF3B3B", "#9CA3AF", "#4B5563", "#E50914"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      // Draw connections
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 59, 59, ${((120 - dist) / 120) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

function TypingText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = typingWords[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % typingWords.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex]);

  return (
    <span
      className="block"
      style={{
        background: "linear-gradient(135deg, #FF3B3B 0%, #E50914 50%, #9CA3AF 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        minHeight: "1.2em",
      }}
    >
      {displayed}
      <span
        className="inline-block w-0.5 ml-1 h-[0.9em] rounded-full align-middle animate-pulse"
        style={{ background: "#FF3B3B", verticalAlign: "middle" }}
      />
    </span>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* AI Grid */}
      <div className="ai-grid" />

      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* Glow Orbs */}
      <div
        className="glow-orb glow-orb-red"
        style={{ top: "-10%", left: "-5%", opacity: 0.25 }}
      />
      <div
        className="glow-orb glow-orb-grey"
        style={{ bottom: "10%", right: "-5%", opacity: 0.2 }}
      />
      <div
        className="glow-orb glow-orb-dark-red"
        style={{ top: "40%", right: "20%", opacity: 0.15 }}
      />

      {/* Content */}
      <div className="container-rianpedia relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight"
            style={{
              color: "white",
              animation: "fade-up 0.7s ease-out 0.1s forwards",
              opacity: 0,
            }}
          >
            Engineering the Future
            <br />
            with{" "}
            <TypingText />
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.55)",
              animation: "fade-up 0.7s ease-out 0.2s forwards",
              opacity: 0,
            }}
          >
            Kami membangun website, sistem custom, dan integrasi AI yang mengakselerasi pertumbuhan startup, UMKM, dan enterprise Anda ke level berikutnya.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{
              animation: "fade-up 0.7s ease-out 0.3s forwards",
              opacity: 0,
            }}
          >
            <Button
              asChild
              variant="default"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/ai-recommender">
                🤖 Coba AI Recommender
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-2" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/portfolio">
                <Play className="w-4 h-4 mr-2" />
                Lihat Portfolio
              </Link>
            </Button>

          </div>
        </div>

        {/* Floating Cards */}
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--bg-primary), transparent)",
        }}
      />
    </section>
  );
}
