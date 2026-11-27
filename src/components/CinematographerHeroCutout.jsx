import React, { useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "motion/react";
import { Camera, Crosshair, Aperture, Sparkles, Film, Eye } from "lucide-react";

export default function CinematographerHeroCutout({ scrollProgress }) {
  const containerRef = useRef(null);

  // Mouse tilt tracking for subtle interactive depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 160 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll parallax effect
  const rawProgress = scrollProgress || useMotionValue(0);
  const yParallax = useTransform(rawProgress, [0, 1], ["0%", "22%"]);
  const rotateParallax = useTransform(rawProgress, [0, 1], [0, -4]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md mx-auto h-[360px] sm:h-[420px] lg:h-[clamp(360px,56vh,540px)] flex items-end justify-center select-none perspective-[1200px]"
    >
      {/* 3D Preserved Layered Space */}
      <motion.div
        style={{
          y: yParallax,
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full h-full flex items-end justify-center"
      >
        {/* ========================================================= */}
        {/* BACKGROUND LAYER: EDITORIAL VIEWFINDER FRAME (Z: -60px)   */}
        {/* ========================================================= */}
        <div
          style={{ transform: "translateZ(-60px)" }}
          className="absolute inset-x-4 top-4 bottom-4 rounded-xs border border-[#D4AF37]/25 bg-gradient-to-b from-[#10B981]/10 via-transparent to-[#041A13]/60 pointer-events-none p-4 flex flex-col justify-between"
        >
          {/* Top Camera Metadata */}
          <div className="flex items-center justify-between font-mono text-[10px] text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B82B2B] animate-ping" />
              <span className="text-white font-semibold">CAM A // LIVE VIEW</span>
            </div>
            <span className="text-[#D4AF37]/80">ANAMORPHIC 2.39:1</span>
          </div>

          {/* Center Reticle */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <Crosshair size={110} className="text-[#D4AF37]" />
          </div>

          {/* Bottom Viewfinder Indices */}
          <div className="flex items-center justify-between font-mono text-[9px] text-white/40 border-t border-[#D4AF37]/20 pt-2">
            <span>SHUTTER: 180°</span>
            <span className="text-[#10B981]">FOCAL LENGTH: 35mm T1.5</span>
            <span>ISO 800</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* AMBIENT LIGHTING / SOFT RIM GLOW BACKDROP                 */}
        {/* ========================================================= */}
        <div className="absolute bottom-6 w-3/4 h-3/4 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.22)_0%,rgba(212,175,55,0.1)_45%,transparent_70%)] blur-2xl pointer-events-none" />

        {/* ========================================================= */}
        {/* HERO CUTOUT: SRIMAN HOLDING PROFESSIONAL CAMERA           */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 18,
            delay: 0.35
          }}
          className="relative z-10 w-full h-[92%] flex items-end justify-center"
        >
          {/* Subtle Ambient Breathing / Floating Movement */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5.5,
              ease: "easeInOut"
            }}
            className="relative w-full h-full flex items-end justify-center"
          >
            {/* The Actual User Photograph: sriman-cinematographer.png */}
            <img
              src="/images/sriman-portrait.jpg"
              alt="Sriman B. — Cinematographer & Creative Technologist"
              loading="eager"
              className="max-w-full max-h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] drop-shadow-[0_0_40px_rgba(163,58,50,0.2)] transition-all duration-300"
            />

            {/* Natural Ground Contact Shadow */}
            <div className="absolute -bottom-2 inset-x-12 h-6 bg-black/80 blur-md rounded-full pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* ========================================================= */}
        {/* FLOATING EDITORIAL BADGES (Z: +50px)                      */}
        {/* ========================================================= */}
        <motion.div
          style={{ transform: "translateZ(50px)" }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="absolute left-2 bottom-12 z-20 font-mono text-[10px] bg-[#06241B]/90 backdrop-blur-md px-3 py-2 border border-[#D4AF37]/35 text-white/90 rounded-xs shadow-xl hidden sm:flex flex-col gap-1"
        >
          <div className="flex items-center gap-1.5 text-[#D4AF37] font-semibold text-[9px] uppercase tracking-wider">
            <Camera size={11} />
            <span>OPERATOR // SRIMAN B.</span>
          </div>
          <div className="text-[10px] text-white/80">
            Cinematographer & Systems Architect
          </div>
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(50px)" }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="absolute right-2 top-16 z-20 font-mono text-[10px] bg-[#06241B]/90 backdrop-blur-md px-3 py-1.5 border border-[#10B981]/35 text-white/85 rounded-xs shadow-xl hidden md:flex items-center gap-2"
        >
          <Aperture size={12} className="text-[#10B981]" />
          <span>REAL-TIME FRAMING ACTIVE</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
