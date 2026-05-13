"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  animate?: boolean;
}

/**
 * Rianpedia Logo Component
 * Menggunakan logo-rianpedia.png dengan animasi profesional menggunakan framer-motion.
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

  const containerVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className={cn("flex items-center gap-4 group", className)}>
      <motion.div
        variants={animate ? containerVariants : {}}
        initial="initial"
        animate="animate"
        whileHover={{ 
          scale: 1.15, 
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        className={cn(
          sizes[size].box,
          "relative flex items-center justify-center p-1"
        )}
      >
        {/* Rotating Container with Masking */}
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div 
            className="relative z-10 w-full h-full flex items-center justify-center p-0.5"
            animate={animate ? {
              filter: [
                "drop-shadow(0 0 6px rgba(255, 59, 59, 0.4))",
                "drop-shadow(0 0 14px rgba(255, 59, 59, 0.6))",
                "drop-shadow(0 0 6px rgba(255, 59, 59, 0.4))"
              ],
              rotateY: [0, 180, 360],
            } : {}}
            transition={{
              filter: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotateY: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }
            }}
            style={{ 
              perspective: "1000px",
              WebkitMaskImage: "url(/logo-rianpedia.png)",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: "url(/logo-rianpedia.png)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          >
            <Image
              src="/logo-rianpedia.png"
              alt="Rianpedia Logo"
              width={sizes[size].img}
              height={sizes[size].img}
              quality={100}
              className="object-contain w-full h-full"
              priority
            />

            {/* Glossy Shine Effect - NEW - Now perfectly masked by parent */}
            {animate && (
              <motion.div
                animate={{
                  left: ["-150%", "250%"],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 50%, transparent)",
                  transform: "skewX(-25deg)",
                }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>

      {showText && (
        <motion.div
          initial={animate ? { opacity: 0, x: -10 } : {}}
          animate={animate ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          <motion.span
            className={cn(
              "font-heading font-bold tracking-[0.15em] select-none leading-none",
              sizes[size].text
            )}
            animate={animate ? {
              backgroundPosition: ["-200% 0", "200% 0"],
            } : {}}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(90deg, #FF3B3B 0%, #fff 25%, #fff 50%, #fff 75%, #FF3B3B 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 15px rgba(255, 59, 59, 0.3))",
            }}
          >
            RIANPEDIA
          </motion.span>
          {size !== "sm" && (
            <span className="text-[9px] tracking-[0.45em] uppercase text-[#9CA3AF] mt-1.5 font-medium ml-0.5">
              Intelligent Systems
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}
