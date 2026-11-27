import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "../data/projects";
import FloatingProjectCard from "./FloatingProjectCard";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Projects() {
  const containerRef = useRef(null);

  // Requirement 2: Moving Frame Animation While Scrolling (GSAP ScrollTrigger scrub)
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = gsap.utils.toArray(".project-scroll-item");

    items.forEach((item, index) => {
      const frame = item.querySelector(".project-frame-wrapper");
      const img = item.querySelector(".project-scrub-img");
      const isEven = index % 2 === 0;

      // Differential parallax distance & subtle rotation
      const yOffset = isEven ? -80 : -130;
      const xOffset = isEven ? -25 : 25;
      const rotation = isEven ? -2.2 : 2.5;

      // 1. Moving Frame Timeline (Scrubbed to scroll progress)
      if (frame) {
        gsap.fromTo(
          frame,
          {
            y: 70,
            x: isEven ? 20 : -20,
            rotation: isEven ? 1.5 : -1.5,
            scale: 0.95
          },
          {
            y: yOffset,
            x: xOffset,
            rotation: rotation,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2
            }
          }
        );
      }

      // 2. Monochrome to Full Color Transition + Clipping expansion
      if (img) {
        gsap.fromTo(
          img,
          {
            filter: "grayscale(100%) contrast(1.15) brightness(0.9)",
            clipPath: "inset(5% 3% 5% 3%)"
          },
          {
            filter: "grayscale(0%) contrast(1) brightness(1)",
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "center 45%",
              scrub: 0.8
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && containerRef.current?.contains(st.trigger)) {
          st.kill();
        }
      });
    };
  }, { scope: containerRef });

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 bg-[#E3EDE6] text-[#09221A] border-b border-[#09221A]/10 overflow-hidden"
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#09221A]/15 pb-8 mb-16">
          <div>
            <div className="editorial-kicker mb-3">
              02 // SELECTED WORKS
            </div>
            <h2 className="font-sans font-black tracking-tight uppercase text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.92] text-[#09221A]">
              THINGS I'VE BUILT.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-mono text-xs sm:text-sm text-[#355447] mb-2">
              Architected for performance, visual precision and fault tolerance. Exploring distributed edge systems, WebGL pipelines, and modern web applications.
            </p>
            <span className="font-mono text-[11px] text-[#B82B2B]">
              Full Stack Systems & AI Telemetry
            </span>
          </div>
        </div>

        {/* Floating Projects List */}
        <div className="flex flex-col gap-24 sm:gap-36">
          {PROJECTS.map((project, index) => (
            <FloatingProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
