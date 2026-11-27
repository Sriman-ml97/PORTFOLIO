import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown, Play } from "lucide-react";
import { PERSONAL_INFO } from "../data/projects";
import CinematographerHeroCutout from "./CinematographerHeroCutout";

export default function Hero({ onOpenReel }) {
  const containerRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Motion variants for staggered text reveals
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const titleWordVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] lg:h-[100dvh] flex items-center justify-center overflow-hidden bg-[#121212] text-[#F2F0E9]"
    >
      {/* Background Video with Subtle Parallax */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none z-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={PERSONAL_INFO.heroPoster}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoFailed(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-75" : "opacity-0"
          }`}
        >
          <source src={PERSONAL_INFO.heroVideo} type="video/mp4" />
        </video>

        {/* Video Poster Fallback if video is loading or unsupported */}
        {(!videoLoaded || videoFailed) && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url(${PERSONAL_INFO.heroPoster})` }}
          />
        )}

        {/* Dark Cinematic Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-[#121212]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,18,18,0.8)_85%)]" />

        {/* Subtle Anamorphic Light Leak Optical Texture */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-15 pointer-events-none"
          style={{ backgroundImage: "url('/images/textures/anamorphic-light-leak.jpg')" }}
        />
      </motion.div>

      {/* Hero Content Overlay */}
      <motion.div
        style={{ y: yContent, opacity: opacityContent }}
        className="relative z-10 editorial-container w-full h-full pt-20 lg:pt-24 pb-6 lg:pb-8 flex flex-col justify-between min-h-[100dvh] lg:min-h-0"
      >
        {/* Top Header Label */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 border-b border-white/10 pb-3 lg:pb-4">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A33A32]" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/80">
              {PERSONAL_INFO.role}
            </span>
          </div>

          <div className="font-mono text-[11px] text-white/50 tracking-widest uppercase flex items-center gap-4">
            <span>SRIMAN B. STUDIO // 2026</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hidden md:inline">{PERSONAL_INFO.location}</span>
          </div>
        </div>

        {/* Central Kinetic Typography & Portrait Composition */}
        <div className="my-auto py-4 lg:py-2 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Name, Tagline & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center z-20">
              {/* Main Name Header */}
              <motion.div
                variants={titleContainerVariants}
                initial="hidden"
                animate="visible"
                className="overflow-hidden mb-3"
              >
                <div className="overflow-hidden">
                  <motion.h1
                    variants={titleWordVariants}
                    className="font-sans font-black tracking-tighter text-white uppercase text-[clamp(2.5rem,6.2vw,5.75rem)] leading-[0.9] select-none"
                  >
                    {PERSONAL_INFO.name}
                  </motion.h1>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-serif italic font-normal text-white/90 text-[clamp(1.5rem,3.4vw,3.1rem)] leading-[1.08] tracking-tight">
                  {PERSONAL_INFO.tagline}
                </p>
                
                {/* Supporting Text: FULL STACK × AI × ROBOTICS × VISUAL STORYTELLING */}
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="inline-block px-2.5 py-1 text-[11px] font-mono tracking-widest bg-white/10 text-white/90 border border-white/15 rounded-xs">
                    {PERSONAL_INFO.supportingText}
                  </span>
                </div>

                {/* Reel Quick-Play Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => onOpenReel({
                      title: "Sriman B. — Cinematic Showreel",
                      category: "SHOWREEL",
                      videoSrc: PERSONAL_INFO.heroVideo,
                      thumbnail: PERSONAL_INFO.heroPoster,
                      specs: "4K UHD · 24fps · Color Grading & Systems",
                      role: "Creative Technologist / Filmmaker"
                    })}
                    data-cursor-hover="true"
                    className="group flex items-center gap-4 px-5 py-2.5 rounded-xs border border-white/20 bg-white/5 hover:bg-[#A33A32] hover:border-[#A33A32] transition-all duration-300 shadow-xl"
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-[#121212] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={14} className="ml-0.5 fill-current" />
                    </div>
                    <div className="text-left font-mono">
                      <div className="text-xs uppercase font-semibold text-white tracking-wider">
                        Watch Showreel
                      </div>
                      <div className="text-[10px] text-white/50 group-hover:text-white/80">
                        Systems & Visual Narrative
                      </div>
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Sriman Cutout Prominently Positioned Inside Cinematic Scene */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              <CinematographerHeroCutout scrollProgress={scrollYProgress} />
            </motion.div>
          </div>
        </div>

        {/* Bottom Hero Bar / Scroll Indicator */}
        <motion.div
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-white/60"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#A33A32] animate-pulse" />
            <span>NOW EXPLORING: ROS 2 + EMBEDDED VISION & GENERATIVE DESIGN</span>
          </div>

          <a
            href="#about"
            data-cursor-hover="true"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <span className="tracking-widest uppercase text-[11px]">SCROLL TO EXPLORE</span>
            <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
