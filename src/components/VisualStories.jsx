import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Play, Film, Camera, Clapperboard, Sparkles, Eye, ArrowUpRight, Aperture, Video, Compass } from "lucide-react";
import { VISUAL_STORIES } from "../data/projects";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function CinematicGalleryCard({ item, index, onOpenVideo }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const getCategoryIcon = (category) => {
    if (category.includes("Cinematography")) return Film;
    if (category.includes("Photography")) return Camera;
    if (category.includes("Video Editing")) return Clapperboard;
    return Sparkles;
  };

  const Icon = getCategoryIcon(item.category);
  const isOdd = index % 2 !== 0;

  return (
    <div
      ref={cardRef}
      data-cinema-card={item.id}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenVideo(item)}
      className="cinema-glide-wrapper perspective-[1200px] cursor-pointer"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="group relative flex flex-col bg-[#FAF9F6] border border-[#171717]/15 rounded-xs p-3 hover:border-[#A33A32]/60 transition-all duration-300 shadow-sm hover:shadow-2xl"
      >
        {/* Media Container with 16:9 Aspect Ratio */}
        <div className="relative aspect-video overflow-hidden bg-black rounded-xs mb-4">
          <img
            src={item.thumbnail}
            alt={`${item.title} Visual Frame`}
            loading="lazy"
            className="cinema-scrub-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100"
          />

          {/* Film Grain & Letterbox simulation */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* 3D Play Button Icon on Hover (Z: 45px) */}
          <div
            style={{ transform: "translateZ(45px)" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-14 h-14 rounded-full bg-[#A33A32] text-white flex items-center justify-center transform scale-90 group-hover:scale-115 transition-transform duration-300 shadow-xl group-hover:bg-[#BF453B]">
              <Play size={20} className="ml-1 fill-current" />
            </div>
          </div>

          {/* Top Bar Indicators (Z: 30px) */}
          <div
            style={{ transform: "translateZ(30px)" }}
            className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90 pointer-events-none"
          >
            <span className="px-2 py-0.5 rounded-xs bg-black/60 backdrop-blur-xs border border-white/10 flex items-center gap-2">
              <span>REEL // {item.index}</span>
              <span className="text-[#A33A32] font-semibold text-[9px]">
                {item.imageType === "personal_actual" ? "★ ACTUAL ARCHIVE" : "CONCEPT VISUAL"}
              </span>
            </span>
            <span className="px-2 py-0.5 rounded-xs bg-[#A33A32] text-white font-medium">
              {item.duration}
            </span>
          </div>

          {/* Bottom Bar Indicators (Z: 30px) */}
          <div
            style={{ transform: "translateZ(30px)" }}
            className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/80 pointer-events-none"
          >
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-xs">
              <Icon size={12} className="text-[#A33A32]" />
              <span>{item.category}</span>
            </div>
            <span className="hidden sm:inline bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-xs text-white/60">
              {item.specs}
            </span>
          </div>
        </div>

        {/* Details Footer */}
        <div className="px-2 pb-2">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#171717] group-hover:text-[#A33A32] transition-colors">
              {item.title}
            </h3>
            <span className="font-mono text-xs text-[#A33A32] font-semibold shrink-0">
              {item.role}
            </span>
          </div>

          <p className="font-body text-[#5E5B55] text-sm leading-relaxed mb-3">
            {item.description}
          </p>

          <div className="pt-2 border-t border-[#171717]/10 flex items-center justify-between font-mono text-[11px] text-[#5E5B55]">
            <span>COLOR GRADE: 35mm EMULATION</span>
            <span className="text-[#171717] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold text-[#A33A32]">
              Launch Player &rarr;
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function VisualStories({ onOpenVideo }) {
  const sectionRef = useRef(null);

  const storytellingPillars = [
    { title: "Cinematography", icon: Film, detail: "Anamorphic 35mm framing, deliberate lighting ratios & optical lens textures." },
    { title: "Photography", icon: Camera, detail: "Medium format road essays, candid street vignettes & timeless portraits." },
    { title: "Video Editing", icon: Clapperboard, detail: "Cadence, match cutting, dynamic speed ramps & rhythmic storytelling." },
    { title: "Visual Storytelling", icon: Video, detail: "Translating unspoken human emotion into enduring visual narratives." },
    { title: "Creative Direction", icon: Compass, detail: "Comprehensive aesthetic cohesion across sound, image & technology." }
  ];

  // Stage 6 Cinematic Film Gallery Scroll Parallax
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = gsap.utils.toArray(".cinema-glide-wrapper");

    cards.forEach((card, index) => {
      const isOdd = index % 2 !== 0;
      const yDist = isOdd ? -100 : -60;
      const rotate = isOdd ? 2.5 : -2;

      // Scroll-scrubbed gallery glide & subtle tilt
      gsap.fromTo(
        card,
        {
          y: isOdd ? 80 : 40,
          rotation: isOdd ? -1.5 : 1.5,
          scale: 0.96
        },
        {
          y: yDist,
          rotation: rotate,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      // Color reveal
      const img = card.querySelector(".cinema-scrub-img");
      if (img) {
        gsap.fromTo(
          img,
          { filter: "grayscale(100%) contrast(1.15)" },
          {
            filter: "grayscale(0%) contrast(1)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "center 50%",
              scrub: 0.8
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && sectionRef.current?.contains(st.trigger)) {
          st.kill();
        }
      });
    };
  }, { scope: sectionRef });

  return (
    <section
      id="visual-stories"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#F2F0E9] text-[#171717] border-b border-[#171717]/10 overflow-hidden"
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#171717]/15 pb-8 mb-16">
          <div>
            <div className="editorial-kicker mb-3">
              04 // VISUAL STORIES
            </div>
            <h2 className="font-sans font-black tracking-tight uppercase text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.92] text-[#171717]">
              VISUAL STORIES.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-mono text-xs sm:text-sm text-[#5E5B55] mb-2">
              Framing human emotions across 24 frames per second. Direction, 35mm composition, color grading, and rhythmic sound design.
            </p>
            <span className="font-mono text-[11px] text-[#A33A32]">
              SCROLL FOR CINEMATIC REEL GLIDE · CLICK TO PLAY
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VISUAL ANCHOR: SRIMAN CINEMATOGRAPHER EDITORIAL BANNER   */}
        {/* ======================================================== */}
        <div className="mb-20 p-6 sm:p-10 bg-[#171717] text-[#F2F0E9] border border-[#171717]/20 rounded-xs shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#A33A32]/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Anchor Image: Sriman Holding Camera Cutout */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-56 sm:w-64 aspect-[9/16] flex items-end justify-center">
                <img
                  src="/images/sriman-cinematographer.png"
                  alt="Sriman B. with Camera — Visual Storyteller"
                  loading="lazy"
                  className="max-h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]"
                />
                <div className="absolute -bottom-1 font-mono text-[10px] bg-black/80 text-white/80 px-2 py-0.5 rounded-xs border border-white/10">
                  CAMERA OPERATOR // SRIMAN B.
                </div>
              </div>
            </div>

            {/* Right: Passions & Core Storytelling Pillars */}
            <div className="lg:col-span-8 flex flex-col justify-between gap-6">
              <div>
                <span className="font-mono text-xs text-[#A33A32] uppercase tracking-widest font-semibold block mb-2">
                  THE VISUAL ANCHOR
                </span>
                <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight mb-3">
                  CRAFTING STORIES THROUGH LIGHT, LENSES & MOTION
                </h3>
                <p className="font-body text-white/70 text-sm sm:text-base leading-relaxed">
                  Cinematography and video editing are not just technical crafts—they are the language through which I translate complex ideas and raw human sentiment into visceral, cinematic journeys.
                </p>
              </div>

              {/* 5 Storytelling Disciplines Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-white/10 font-mono">
                {storytellingPillars.map((p, idx) => {
                  const PillarIcon = p.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 bg-[#202020] border border-white/10 rounded-xs hover:border-[#A33A32]/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-xs text-[#A33A32] font-semibold mb-1">
                        <PillarIcon size={14} />
                        <span>{p.title}</span>
                      </div>
                      <p className="text-[11px] text-white/60 leading-normal font-sans">
                        {p.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Masonry / Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14">
          {VISUAL_STORIES.map((item, index) => (
            <CinematicGalleryCard
              key={item.id}
              item={item}
              index={index}
              onOpenVideo={onOpenVideo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
