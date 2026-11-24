import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, ExternalLink, Layers, Terminal, Sparkles, Cpu } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export default function FloatingProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion 3D Hover Tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 160 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Staggered title words
  const titleWords = project.title.split(" ");
  const isEven = index % 2 === 0;

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-scroll-item group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center perspective-[1200px]"
    >
      {/* Visual Image Frame Column (Moving Frame Target) */}
      <div className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        {/* GSAP scroll-driven animated frame wrapper */}
        <div
          data-project-frame={project.id}
          className="project-frame-wrapper relative transition-transform duration-300"
        >
          {/* Motion 3D Interactive Card */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            className="relative p-2.5 bg-[#F2F0E9] border border-[#171717]/15 rounded-xs shadow-md transition-shadow duration-500 group-hover:shadow-2xl group-hover:border-[#A33A32]/60"
          >
            {/* Viewfinder Registration Lines (Z: 40px) */}
            <div
              style={{ transform: "translateZ(40px)" }}
              className="absolute top-3 left-3 z-20 flex items-center gap-2 font-mono text-[10px] bg-[#171717]/85 text-[#F2F0E9] px-2.5 py-1 rounded-xs backdrop-blur-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#A33A32]" />
              <span>FRAME // {project.number}</span>
              <span className="text-white/40">|</span>
              <span className="text-white/70">{project.category}</span>
            </div>

            {/* Corner Crosshairs */}
            <div style={{ transform: "translateZ(30px)" }} className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#A33A32] z-20 pointer-events-none" />
            <div style={{ transform: "translateZ(30px)" }} className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#A33A32] z-20 pointer-events-none" />
            <div style={{ transform: "translateZ(30px)" }} className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#A33A32] z-20 pointer-events-none" />
            <div style={{ transform: "translateZ(30px)" }} className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#A33A32] z-20 pointer-events-none" />

            {/* Image Container with Scroll-Scrubbed Grayscale-to-Color Transition */}
            <div className="project-image-clip relative aspect-[16/10] overflow-hidden bg-[#171717] rounded-xs">
              <img
                src={project.image}
                alt={`${project.title} Preview Frame`}
                loading="lazy"
                className="project-scrub-img w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              />

              {/* Film Grain & Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Hover Metadata Curtain (Reveals on Hover) */}
              <div
                style={{ transform: "translateZ(50px)" }}
                className={`absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col justify-between p-6 transition-opacity duration-300 pointer-events-none ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs text-white/80">
                  <span className="text-[#A33A32] font-semibold">TECH TELEMETRY</span>
                  <span>{project.year} ARCHIVE</span>
                </div>

                <div className="text-center font-mono">
                  <div className="text-sm font-semibold text-white tracking-wider uppercase mb-1">
                    {project.metrics}
                  </div>
                  <div className="text-[11px] text-white/60">
                    High-throughput interactive architecture
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-[10px] text-white/50 border-t border-white/20 pt-2">
                  <span>SCALE: 16:10 ANAMORPHIC</span>
                  <span>STATUS: VERIFIED</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Details Column */}
      <div className={`lg:col-span-5 flex flex-col gap-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <div className="flex items-center justify-between font-mono text-xs text-[#5E5B55] border-b border-[#171717]/10 pb-3">
          <span className="text-[#A33A32] font-semibold tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A33A32]" />
            PROJECT {project.number}
          </span>
          <span className="uppercase">{project.category}</span>
          <span>{project.year}</span>
        </div>

        <div>
          {/* Staggered Animated Title Words */}
          <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#171717] tracking-tight group-hover:text-[#A33A32] transition-colors mb-3 flex flex-wrap gap-x-2">
            {titleWords.map((word, wIdx) => (
              <span key={wIdx} className="inline-block overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
                  {word}
                </span>
              </span>
            ))}
          </h3>

          <p className="font-body text-[#5E5B55] text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-mono tracking-wide bg-[#F2F0E9] border border-[#171717]/15 rounded-xs text-[#171717] group-hover:border-[#A33A32]/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Project Links / Actions */}
        <div className="flex items-center gap-5 pt-4 border-t border-[#171717]/10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover="true"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#171717] hover:text-[#A33A32] transition-colors group/link"
            >
              <GithubIcon size={16} />
              <span>Source Code</span>
              <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          )}

          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover="true"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#A33A32] hover:underline"
            >
              <ExternalLink size={15} />
              <span>Live Deployment</span>
            </a>
          ) : (
            <span className="font-mono text-[11px] text-[#8E8B83] italic">
              Deployment in Staging
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
