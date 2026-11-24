import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Bot, Cpu, Navigation, Eye, Activity, ShieldCheck, ChevronRight, Terminal, Layers } from "lucide-react";
import { ROBOTICS_PROJECT } from "../data/projects";
import RoboticsExplodedView from "./RoboticsExplodedView";

export default function Robotics() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState("objectives");
  const [viewMode, setViewMode] = useState("exploded"); // "exploded" or "image"

  return (
    <section
      id="robotics"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#171717] text-[#F2F0E9] overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F2F0E9_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="editorial-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-16">
          <div>
            <div className="editorial-kicker text-[#A33A32] mb-3">
              STAGE 05 // INNOVATION & TECHNICAL DISASSEMBLY
            </div>
            <h2 className="font-sans font-black tracking-tight uppercase text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.92] text-white">
              AUTONOMOUS SYSTEMS.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-mono text-xs sm:text-sm text-white/60 mb-3">
              Engineering physical intelligence. Integrating ROS 2, computer vision, and behavior tree autonomy into service robotics.
            </p>
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 bg-[#202020] border border-white/15 rounded-xs font-mono text-xs">
              <button
                type="button"
                onClick={() => setViewMode("exploded")}
                className={`px-3 py-1 rounded-2xs transition-colors flex items-center gap-1.5 ${
                  viewMode === "exploded"
                    ? "bg-[#A33A32] text-white font-bold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Layers size={13} />
                <span>3D Exploded View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("image")}
                className={`px-3 py-1 rounded-2xs transition-colors flex items-center gap-1.5 ${
                  viewMode === "image"
                    ? "bg-[#A33A32] text-white font-bold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Eye size={13} />
                <span>Physical Unit Frame</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Hero Card: Guide Robot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch mb-16">
          {/* Main Visual Frame with Toggleable 3D Exploded View or Physical Stills Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            {viewMode === "exploded" ? (
              <RoboticsExplodedView scrollExplode={isInView ? 0.5 : 0} />
            ) : (
              <div className="flex flex-col justify-between p-3 bg-[#202020] border border-white/15 rounded-xs relative group shadow-2xl h-full">
                {/* Top HUD Telemetry */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#121212]/90 border-b border-white/10 text-[11px] font-mono text-white/70 mb-3 rounded-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A33A32] animate-pulse" />
                    <span className="text-white font-semibold">ROS 2 NODE: /guide_robot_core</span>
                  </div>
                  <span className="text-[#A33A32]">SLAM STATUS: ACTIVE</span>
                </div>

                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black rounded-xs">
                  <img
                    src={ROBOTICS_PROJECT.image}
                    alt="Guide Robot ROS 2 Showcase"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 contrast-105"
                  />

                  {/* LIDAR Overlay Grid Simulation */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Bottom Sensor Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white/80 bg-black/60 backdrop-blur-xs p-3 rounded-xs border border-white/10">
                    <div className="flex items-center gap-2">
                      <Navigation size={15} className="text-[#A33A32]" />
                      <span>Nav2 Pathfinding: Converged</span>
                    </div>
                    <div className="hidden sm:block text-[11px] text-white/60">
                      LIDAR Rate: 10 Hz · IMU: 100 Hz
                    </div>
                  </div>
                </div>

                {/* Bottom Specs Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-white/10 font-mono text-[11px]">
                  {ROBOTICS_PROJECT.specs.map((spec, i) => (
                    <div key={i} className="p-2 bg-[#181818] rounded-xs border border-white/5">
                      <div className="text-white/40 uppercase">{spec.label}</div>
                      <div className="text-white/90 font-medium truncate">{spec.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: Project Architecture & Technical Objectives */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-[#A33A32]/20 border border-[#A33A32]/40 text-[#A33A32] font-mono text-xs mb-4">
                <Bot size={14} />
                <span>PRIMARY ROBOTICS PLATFORM</span>
              </div>

              <h3 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight mb-2">
                {ROBOTICS_PROJECT.title}
              </h3>
              
              <p className="font-serif italic text-white/70 text-lg mb-4">
                {ROBOTICS_PROJECT.tagline}
              </p>

              <p className="font-body text-white/70 text-sm leading-relaxed mb-6">
                {ROBOTICS_PROJECT.overview}
              </p>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="bg-[#1F1F1F] p-1 rounded-xs border border-white/10 flex gap-1 font-mono text-xs">
              <button
                onClick={() => setActiveTab("objectives")}
                className={`flex-1 py-2 text-center rounded-xs transition-colors ${
                  activeTab === "objectives"
                    ? "bg-[#A33A32] text-white font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Key Objectives
              </button>
              <button
                onClick={() => setActiveTab("stack")}
                className={`flex-1 py-2 text-center rounded-xs transition-colors ${
                  activeTab === "stack"
                    ? "bg-[#A33A32] text-white font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                ROS 2 Architecture
              </button>
            </div>

            {/* Tab 1: Objectives List */}
            {activeTab === "objectives" && (
              <div className="flex flex-col gap-3">
                {ROBOTICS_PROJECT.objectives.map((obj) => (
                  <div
                    key={obj.step}
                    className="p-3.5 bg-[#202020] border border-white/10 rounded-xs hover:border-[#A33A32]/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-[#A33A32] font-semibold">
                        {obj.step}
                      </span>
                      <h4 className="font-sans font-semibold text-sm text-white">
                        {obj.title}
                      </h4>
                    </div>
                    <p className="font-body text-xs text-white/60 leading-normal">
                      {obj.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: ROS 2 Tech Stack */}
            {activeTab === "stack" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROBOTICS_PROJECT.techStack.map((tech, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#202020] border border-white/10 rounded-xs"
                  >
                    <div className="font-sans font-bold text-sm text-[#A33A32] mb-1">
                      {tech.name}
                    </div>
                    <div className="font-mono text-[11px] text-white/60">
                      {tech.role}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
