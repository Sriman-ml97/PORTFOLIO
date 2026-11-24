import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Bot, Cpu, Navigation, Eye, Activity, ShieldCheck, Layers, Radio, Crosshair } from "lucide-react";
import { ROBOTICS_PROJECT } from "../data/projects";

export default function RoboticsExplodedView({ scrollExplode = 0 }) {
  const containerRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState(null);
  const [exploded, setExploded] = useState(false);

  // 3D Tilt on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

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

  // Explode progress: driven by manual button or scroll scrub
  const isExplodedActive = exploded || scrollExplode > 0.3;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[16/11] sm:aspect-[16/10] perspective-[1400px] select-none p-2 sm:p-4 bg-[#181818] border border-white/15 rounded-xs shadow-2xl flex flex-col justify-between"
    >
      {/* Top HUD Status Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#121212]/90 border border-white/10 rounded-xs text-[11px] font-mono text-white/70 z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A33A32] animate-pulse" />
          <span className="text-white font-semibold">ROS 2 SUBSYSTEM EXPLODED VIEW</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setExploded(!exploded)}
            data-cursor-hover="true"
            className={`px-2.5 py-1 rounded-2xs font-mono text-[10px] uppercase tracking-wider transition-colors ${
              isExplodedActive
                ? "bg-[#A33A32] text-white font-bold"
                : "bg-white/10 hover:bg-white/20 text-white/80"
            }`}
          >
            {isExplodedActive ? "Reassemble Unit" : "Explode 3D Subsystems"}
          </button>
        </div>
      </div>

      {/* 3D Preserved Space for Exploded Layers */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d"
        }}
        className="relative my-auto w-full h-[85%] flex items-center justify-center transition-transform duration-100 ease-out"
      >
        {/* Layer 04: Mobility Base & Drive Wheels (Z: -80px, Y: +65px) */}
        <motion.div
          animate={
            isExplodedActive
              ? { z: -80, y: 70, rotateX: 12, opacity: 1 }
              : { z: 0, y: 0, rotateX: 0, opacity: 0.95 }
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setActiveLayer("base")}
          onMouseLeave={() => setActiveLayer(null)}
          style={{ transformStyle: "preserve-3d" }}
          className={`absolute w-[90%] h-[32%] -bottom-2 rounded-xs border p-3 flex flex-col justify-between cursor-pointer transition-colors ${
            activeLayer === "base"
              ? "bg-[#252525] border-[#A33A32]"
              : "bg-[#1C1C1C]/90 border-white/10"
          }`}
        >
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="text-[#A33A32] font-semibold">04 // MOBILITY DRIVE BASE</span>
            <span className="text-white/40">Z: -80mm · PWM MOTORS</span>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-white/80">
            <span>Dual High-Torque Brushless Hubs</span>
            <span className="text-white/50">Wheel Encoders (1024 CPR)</span>
          </div>
        </motion.div>

        {/* Layer 03: Main Structural Chassis & Battery (Z: 0px, Center) */}
        <motion.div
          animate={
            isExplodedActive
              ? { z: 0, y: 0, scale: 0.98, opacity: 1 }
              : { z: 0, y: 0, scale: 1, opacity: 0.95 }
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setActiveLayer("chassis")}
          onMouseLeave={() => setActiveLayer(null)}
          style={{ transformStyle: "preserve-3d" }}
          className={`absolute w-[92%] h-[40%] rounded-xs border p-3.5 flex flex-col justify-between cursor-pointer transition-colors ${
            activeLayer === "chassis"
              ? "bg-[#252525] border-[#A33A32]"
              : "bg-[#1E1E1E]/90 border-white/15"
          }`}
        >
          {/* Central Blueprint Grid Simulation */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#A33A32_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

          <div className="flex items-center justify-between font-mono text-[10px] z-10">
            <span className="text-white font-semibold">03 // ALUMINUM STRUCTURAL CHASSIS</span>
            <span className="text-white/40">48V 20Ah LiFePO4 BMS</span>
          </div>

          <div className="my-auto text-center font-mono z-10">
            <div className="text-xs text-white/90 font-medium">
              Hardware Failover Relays & Safety Circuit
            </div>
            <div className="text-[10px] text-white/40 mt-0.5">
              Payload Capacity: 45 kg · Center of Mass Stabilized
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-white/40 z-10 border-t border-white/10 pt-1.5">
            <span>EMERGENCY STOP: ACTIVE</span>
            <span>BUS: CAN / UART / ETHERNET</span>
          </div>
        </motion.div>

        {/* Layer 02: AI Compute & Logic Processor (Z: +90px, Y: -15px, X: -25px) */}
        <motion.div
          animate={
            isExplodedActive
              ? { z: 90, y: -20, x: -25, rotateY: -10, opacity: 1 }
              : { z: 0, y: 0, x: 0, rotateY: 0, opacity: 0.95 }
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setActiveLayer("compute")}
          onMouseLeave={() => setActiveLayer(null)}
          style={{ transformStyle: "preserve-3d" }}
          className={`absolute w-[86%] h-[34%] rounded-xs border p-3 flex flex-col justify-between cursor-pointer transition-colors shadow-xl ${
            activeLayer === "compute"
              ? "bg-[#272727] border-[#A33A32]"
              : "bg-[#222222]/95 border-white/20"
          }`}
        >
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="text-[#A33A32] font-semibold flex items-center gap-1.5">
              <Cpu size={12} />
              02 // AI NEURAL COMPUTE CORE
            </span>
            <span className="text-white/40">Z: +90mm</span>
          </div>

          <div className="flex items-center justify-between font-mono text-[11px] text-white/90">
            <span>NVIDIA Jetson Edge Inference</span>
            <span className="text-[#A33A32]">Nav2 Costmap: 50Hz</span>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-white/50 border-t border-white/10 pt-1">
            <span>RAM: 32GB LPDDR5</span>
            <span>ROS 2 HUMBLE DAEMON</span>
          </div>
        </motion.div>

        {/* Layer 01: Perception Head & 360° LIDAR (Z: +170px, Y: -65px, X: +25px) */}
        <motion.div
          animate={
            isExplodedActive
              ? { z: 170, y: -70, x: 25, rotateX: -14, rotateZ: 5, opacity: 1 }
              : { z: 0, y: 0, x: 0, rotateX: 0, rotateZ: 0, opacity: 0.95 }
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setActiveLayer("lidar")}
          onMouseLeave={() => setActiveLayer(null)}
          style={{ transformStyle: "preserve-3d" }}
          className={`absolute w-[88%] h-[32%] -top-2 rounded-xs border-2 p-3 flex flex-col justify-between cursor-pointer transition-colors shadow-2xl ${
            activeLayer === "lidar"
              ? "bg-[#2a2a2a] border-[#A33A32]"
              : "bg-[#202020]/95 border-white/30"
          }`}
        >
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="text-white font-bold flex items-center gap-1.5">
              <Navigation size={12} className="text-[#A33A32]" />
              01 // SENSOR & LIDAR SLAM TURRET
            </span>
            <span className="text-[#A33A32] font-bold">Z: +170mm</span>
          </div>

          <div className="flex items-center justify-between font-mono text-[11px] text-white/90">
            <span>360° Planar Laser + Stereo Depth</span>
            <span className="text-white/60">Range: 25 Meters</span>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-white/50 border-t border-white/10 pt-1">
            <span>SCAN FREQUENCY: 10 Hz</span>
            <span>SLAM ACCURACY: ±2.5 cm</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Telemetry Legend */}
      <div className="px-3 py-2 bg-[#121212] border-t border-white/10 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px] text-white/50 z-20">
        <div className="flex items-center gap-2">
          <Layers size={12} className="text-[#A33A32]" />
          <span>HOVER ANY SUBSYSTEM LAYER FOR ACTIVE BUS TELEMETRY</span>
        </div>
        <div className="text-[#A33A32] font-medium">
          {activeLayer
            ? `SELECTED: ${activeLayer.toUpperCase()} SUBSYSTEM ACTIVE`
            : isExplodedActive
            ? "ALL SUBSYSTEMS FULLY DISASSEMBLED"
            : "PRESS BUTTON OR SCROLL TO DISASSEMBLE"}
        </div>
      </div>
    </div>
  );
}
