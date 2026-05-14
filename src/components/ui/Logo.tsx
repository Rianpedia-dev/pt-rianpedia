"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animate?: boolean;
}

/**
 * Rianpedia Logo Component
 * BMW M Design System — clean, minimal, industrial precision.
 */
export function Logo({ 
  className, 
  size = "md", 
  showText = true,
  animate = true 
}: LogoProps) {
  
  const sizes = {
    sm: { box: "w-11 h-11", img: 128, text: "text-lg" },
    md: { box: "w-15 h-15", img: 192, text: "text-xl" },
    lg: { box: "w-20 h-20", img: 256, text: "text-2xl" },
    xl: { box: "w-28 h-28", img: 384, text: "text-5xl" },
  };

  return (
    <div className={cn("flex items-center gap-4 group", className)}>
      <div className={cn(sizes[size].box, "relative flex items-center justify-center p-1")}>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative z-10 w-full h-full flex items-center justify-center p-0.5">
            <Image
              src="/logo-rianpedia.png"
              alt="Rianpedia Logo"
              width={sizes[size].img}
              height={sizes[size].img}
              quality={100}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold tracking-[0.15em] select-none leading-none text-white",
              sizes[size].text
            )}
          >
            RIANPEDIA
          </span>
          {size !== "sm" && (
            <span className="text-[9px] tracking-[0.45em] uppercase mt-1.5 font-medium ml-0.5" style={{ color: "#7e7e7e" }}>
              Intelligent Systems
            </span>
          )}
        </div>
      )}
    </div>
  );
}
