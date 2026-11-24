import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Play, Film, Camera, Clapperboard, Sparkles } from "lucide-react";
import { VISUAL_STORIES } from "../data/projects";

export default function VisualStories({ onOpenVideo }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Cinematography": return Film;
      case "Photography": return Camera;
      case "Video Editing": return Clapperboard;
      default: return Sparkles;
    }
  };

  return (
    <section
      id="visual-stories"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#F2F0E9] text-[#171717] border-b border-[#171717]/10"
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#171717]/15 pb-8 mb-16">
          <div>
            <div className="editorial-kicker mb-3">
              03 // VISUAL DIRECTION & CINEMA
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
              CLICK ANY CARD TO PLAY / PREVIEW VIDEO
            </span>
          </div>
        </div>

        {/* Editorial Masonry / Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {VISUAL_STORIES.map((item, index) => {
            const Icon = getCategoryIcon(item.category);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col bg-[#FAF9F6] border border-[#171717]/15 rounded-xs p-3 hover:border-[#A33A32]/50 transition-all duration-300 shadow-xs cursor-pointer"
                onClick={() => onOpenVideo(item)}
                data-cursor-hover="true"
              >
                {/* Media Container with 16:9 / 2.39:1 Aspect Ratio */}
                <div className="relative aspect-video overflow-hidden bg-black rounded-xs mb-4">
                  <img
                    src={item.thumbnail}
                    alt={`${item.title} Visual Frame`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  />

                  {/* Film Grain & Letterbox simulation */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                  {/* Play Button Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#A33A32] text-white flex items-center justify-center transform scale-90 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play size={20} className="ml-1 fill-current" />
                    </div>
                  </div>

                  {/* Top Bar Indicators */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                    <span className="px-2 py-0.5 rounded-xs bg-black/60 backdrop-blur-xs border border-white/10">
                      INDEX // {item.index}
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-[#A33A32] text-white font-medium">
                      {item.duration}
                    </span>
                  </div>

                  {/* Bottom Bar Indicators */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/80">
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
                    <span>REPLACEABLE: /public/images/{item.thumbnail.split("/").pop()}</span>
                    <span className="text-[#171717] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold">
                      Watch Reel &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
