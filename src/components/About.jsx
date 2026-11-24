import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Compass, Cpu, Film, Terminal, MapPin, Camera, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "../data/projects";

export default function About() {
  const containerRef = useRef(null);
  const portraitWrapperRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Subtle scroll-based parallax on portrait
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const disciplineIcons = {
    "01": Terminal,
    "02": Cpu,
    "03": Film,
    "04": Compass
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 bg-[#F2F0E9] text-[#171717] border-b border-[#171717]/10 overflow-hidden"
    >
      <div className="editorial-container">
        {/* Section Index & Kicker */}
        <div className="flex items-center justify-between border-b border-[#171717]/15 pb-4 mb-14">
          <div className="editorial-kicker">
            01 // PHILOSOPHY & IDENTITY
          </div>
          <div className="font-mono text-xs text-[#5E5B55] uppercase tracking-wider">
            Identity & Vision
          </div>
        </div>

        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Professional Portrait Frame */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Large Portrait Image with Thin Editorial Border & Clip-Path Reveal */}
            <motion.div
              ref={portraitWrapperRef}
              initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0, y: 30 }}
              animate={
                isInView
                  ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, y: 0 }
                  : { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0, y: 30 }
              }
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group p-2 bg-[#FAF9F6] border border-[#171717]/15 rounded-xs shadow-md hover:shadow-2xl hover:border-[#A33A32]/40 transition-all duration-500"
            >
              {/* Registration Corner Marks */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#A33A32] z-20 pointer-events-none" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#A33A32] z-20 pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#A33A32] z-20 pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#A33A32] z-20 pointer-events-none" />

              {/* Parallax Container */}
              <div className="relative aspect-[2/3] overflow-hidden bg-[#121212] rounded-xs">
                {/* User's Actual Portrait: sriman-portrait.jpg */}
                <motion.img
                  style={{ y: yParallax }}
                  src="/images/sriman-portrait.jpg"
                  alt="Sriman B. — Professional Portrait"
                  loading="lazy"
                  className="w-full h-[112%] -top-[6%] relative object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 filter grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100"
                />

                {/* Film Watermark Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 bg-black/75 backdrop-blur-xs rounded-xs text-[10px] font-mono text-white/90 border border-white/10 z-10">
                  <span className="font-semibold text-white">SRIMAN B.</span>
                  <span className="text-[#A33A32]">STUDIO PORTRAIT</span>
                </div>
              </div>
            </motion.div>

            {/* Studio Info Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-6 bg-[#FAF9F6] border border-[#171717]/10 rounded-xs flex flex-col gap-4 font-mono text-xs text-[#5E5B55]"
            >
              <div className="flex items-center justify-between border-b border-[#171717]/10 pb-3">
                <span className="uppercase text-[#171717] font-semibold">Location</span>
                <span className="flex items-center gap-1.5 text-[#171717]">
                  <MapPin size={14} className="text-[#A33A32]" />
                  {PERSONAL_INFO.location}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-[#171717]/10 pb-3">
                <span className="uppercase text-[#171717] font-semibold">Focus Areas</span>
                <span className="text-right text-[#171717]">Full Stack · AI · ROS 2 · Cinema</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="uppercase text-[#171717] font-semibold">Status</span>
                <span className="text-[#A33A32] font-semibold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#A33A32] inline-block animate-ping" />
                  Available for Select Projects
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Typography & Exact Requested Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Exact Requested Header & Subtitle */}
              <div className="mb-8 pb-6 border-b border-[#171717]/15">
                <h3 className="font-sans font-black uppercase text-3xl sm:text-4xl text-[#171717] tracking-tight mb-2">
                  SRIMAN B.
                </h3>
                <div className="font-mono text-sm sm:text-base text-[#A33A32] font-semibold tracking-wider uppercase mb-4">
                  Creative Technologist / Visual Storyteller.
                </div>
                <p className="font-sans text-lg sm:text-xl font-medium text-[#171717] leading-relaxed">
                  I explore the intersection of technology and creativity through Full Stack Development, AI, Robotics, Video Editing and Cinematography.
                </p>
              </div>

              <h2 className="font-sans font-extrabold uppercase text-[clamp(2rem,4.5vw,4.25rem)] leading-[0.95] tracking-tight text-[#171717] mb-6">
                CURIOUS BY NATURE.
                <br />
                <span className="font-serif italic font-normal text-[#A33A32]">
                  CREATIVE BY DESIGN.
                </span>
              </h2>

              <p className="font-sans text-lg font-medium text-[#171717]/90 leading-relaxed mb-6">
                {PERSONAL_INFO.bioPhilosophy.subheading}
              </p>

              <div className="flex flex-col gap-4 font-body text-[#5E5B55] text-base leading-relaxed">
                {PERSONAL_INFO.bioPhilosophy.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>

            {/* Disciplines Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 pt-6 border-t border-[#171717]/15"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#5E5B55] mb-6">
                CORE CAPABILITIES & SPECIALIZATIONS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PERSONAL_INFO.bioPhilosophy.disciplines.map((item) => {
                  const Icon = disciplineIcons[item.id] || Terminal;
                  return (
                    <div
                      key={item.id}
                      className="group p-5 bg-[#FAF9F6] border border-[#171717]/10 hover:border-[#A33A32]/40 rounded-xs transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs text-[#A33A32] font-semibold">
                          {item.id}
                        </span>
                        <Icon size={18} className="text-[#171717]/60 group-hover:text-[#A33A32] transition-colors" />
                      </div>
                      <h4 className="font-sans font-bold text-base text-[#171717] mb-1">
                        {item.name}
                      </h4>
                      <p className="font-mono text-xs text-[#5E5B55]">
                        {item.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
