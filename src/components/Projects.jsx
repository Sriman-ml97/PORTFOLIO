import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, ExternalLink, Layers, Terminal } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { PROJECTS } from "../data/projects";

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#E8E5DD] text-[#171717] border-b border-[#171717]/10"
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#171717]/15 pb-8 mb-16">
          <div>
            <div className="editorial-kicker mb-3">
              02 // ENGINEERING & CODE
            </div>
            <h2 className="font-sans font-black tracking-tight uppercase text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.92] text-[#171717]">
              THINGS I'VE BUILT.
            </h2>
          </div>

          <p className="font-mono text-xs sm:text-sm text-[#5E5B55] max-w-md">
            Architected for performance, visual precision and fault tolerance. Exploring distributed edge systems, WebGL pipelines, and modern web applications.
          </p>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-20 sm:gap-28">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Visual Image Frame (Alternate order for editorial rhythm) */}
                <div className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative p-2 bg-[#F2F0E9] border border-[#171717]/15 rounded-xs overflow-hidden shadow-sm transition-all duration-300 group-hover:border-[#A33A32]/40">
                    {/* Viewfinder Registration Lines */}
                    <div className="absolute top-2 left-2 z-10 font-mono text-[10px] bg-[#171717]/80 text-[#F2F0E9] px-2 py-0.5 rounded-xs">
                      FRAME // {project.number}
                    </div>

                    <div className="relative aspect-[16/10] overflow-hidden bg-[#171717] rounded-xs">
                      <img
                        src={project.image}
                        alt={`${project.title} Preview Frame`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Hover Overlay Hint */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="font-mono text-xs uppercase tracking-widest text-white px-4 py-2 border border-white/30 backdrop-blur-xs rounded-xs">
                          {project.metrics}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Column */}
                <div className={`lg:col-span-5 flex flex-col gap-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="flex items-center justify-between font-mono text-xs text-[#5E5B55] border-b border-[#171717]/10 pb-3">
                    <span className="text-[#A33A32] font-semibold tracking-wider">
                      PROJECT {project.number}
                    </span>
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  <div>
                    <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#171717] tracking-tight group-hover:text-[#A33A32] transition-colors mb-3">
                      {project.title}
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
                        className="px-2.5 py-1 text-[11px] font-mono tracking-wide bg-[#F2F0E9] border border-[#171717]/15 rounded-xs text-[#171717]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Links / Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-[#171717]/10">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover="true"
                        className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#171717] hover:text-[#A33A32] transition-colors"
                      >
                        <GithubIcon size={15} />
                        <span>Source Code</span>
                        <ArrowUpRight size={13} />
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
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
