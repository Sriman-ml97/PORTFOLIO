import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { Eye, Crosshair, Layers, Aperture, Compass, ShieldAlert, Sparkles } from "lucide-react";

export default function HeroDisassembly({ scrollProgress }) {
  const cardRef = useRef(null);
  const [manualExplode, setManualExplode] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll-linked disassembly transforms (driven by Hero scroll or fallback to manual)
  // When scroll progresses 0 -> 0.7, objects separate and float in 3D space
  const rawProgress = scrollProgress || useMotionValue(0);

  // Effective progress combines scroll and manual state
  const disassembleProgress = useTransform(rawProgress, [0, 0.65], [0, 1]);
  const smoothDisassemble = useSpring(disassembleProgress, { damping: 25, stiffness: 120 });

  // 3D Layer Transforms
  // Layer 1: Front Optical Reticle & Aperture (Pushes forward in Z, moves up-right, rotates)
  const layer1Z = useTransform(smoothDisassemble, [0, 1], [0, 160]);
  const layer1Y = useTransform(smoothDisassemble, [0, 1], [0, -45]);
  const layer1X = useTransform(smoothDisassemble, [0, 1], [0, 35]);
  const layer1RotateZ = useTransform(smoothDisassemble, [0, 1], [0, 22]);
  const layer1RotateX = useTransform(smoothDisassemble, [0, 1], [0, -15]);

  // Layer 2: HUD Data Frame & Sensor Metrics (Slides to left, tilts on Y)
  const layer2Z = useTransform(smoothDisassemble, [0, 1], [0, 90]);
  const layer2X = useTransform(smoothDisassemble, [0, 1], [0, -50]);
  const layer2Y = useTransform(smoothDisassemble, [0, 1], [0, 25]);
  const layer2RotateY = useTransform(smoothDisassemble, [0, 1], [0, -20]);

  // Layer 3: Base Film Chassis (Drops back in Z, rotates X)
  const layer3Z = useTransform(smoothDisassemble, [0, 1], [0, -90]);
  const layer3Y = useTransform(smoothDisassemble, [0, 1], [0, 40]);
  const layer3RotateX = useTransform(smoothDisassemble, [0, 1], [0, 15]);

  // Layer 4: Floating Corner Pins & Telemetry Labels (Explodes outward)
  const pinSpread = useTransform(smoothDisassemble, [0, 1], [0, 40]);
  const pinOpacity = useTransform(smoothDisassemble, [0, 0.2, 1], [0.4, 0.9, 1]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md mx-auto aspect-[4/3] perspective-[1200px] select-none"
    >
      {/* Interactive 3D Preserved Space */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
      >
        {/* ============================================================== */}
        {/* LAYER 3: BACK CHASSIS / STRUCTURAL SUB-PLATE (Z: -90px)       */}
        {/* ============================================================== */}
        <motion.div
          style={{
            z: layer3Z,
            y: layer3Y,
            rotateX: layer3RotateX,
            transformStyle: "preserve-3d"
          }}
          className="absolute inset-4 rounded-xs bg-[#181818]/90 border border-white/10 p-5 shadow-2xl flex flex-col justify-between"
        >
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
            <span>SUB-LAYER 03 // BASE CHASSIS</span>
            <span className="text-[#A33A32]">DEPTH: -90mm</span>
          </div>

          <div className="my-auto text-center font-mono">
            <div className="text-[11px] text-white/50 tracking-widest uppercase">
              CINEMATIC SENSOR MOUNT
            </div>
            <div className="text-xs font-semibold text-white/80 mt-1">
              FULL-FRAME 35mm SENSOR RIG
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-white/30 border-t border-white/10 pt-2">
            <span>CALIBRATION: PASSED</span>
            <span>AXIS: X/Y/Z</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* LAYER 2: MIDDLE HUD / TELEMETRY OVERLAY (Z: +90px)             */}
        {/* ============================================================== */}
        <motion.div
          style={{
            z: layer2Z,
            x: layer2X,
            y: layer2Y,
            rotateY: layer2RotateY,
            transformStyle: "preserve-3d"
          }}
          className="absolute inset-6 rounded-xs bg-[#202020]/75 backdrop-blur-md border border-[#A33A32]/40 p-4 shadow-xl flex flex-col justify-between pointer-events-none"
        >
          {/* Viewfinder Crosshair in Center */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <Crosshair size={64} className="text-[#A33A32]" />
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] z-10">
            <div className="flex items-center gap-1.5 text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A33A32] animate-ping" />
              <span>REC [00:24:16:08]</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-2xs bg-[#A33A32]/30 text-[#A33A32] text-[9px]">
              LAYER 02
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-white/70 z-10 border-y border-white/10 py-2">
            <div>
              <span className="text-white/30 block text-[8px]">SHUTTER</span>
              <span>180.0°</span>
            </div>
            <div>
              <span className="text-white/30 block text-[8px]">EXPOSURE</span>
              <span className="text-[#A33A32]">F/1.8</span>
            </div>
            <div>
              <span className="text-white/30 block text-[8px]">ISO</span>
              <span>800 NATIVE</span>
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-white/40 z-10">
            <span>FPS: 24.000</span>
            <span>COLOR: LOG-3G10</span>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* LAYER 1: FRONT OPTICAL ELEMENT & APERTURE RETICLE (Z: +160px)  */}
        {/* ============================================================== */}
        <motion.div
          style={{
            z: layer1Z,
            x: layer1X,
            y: layer1Y,
            rotateZ: layer1RotateZ,
            rotateX: layer1RotateX,
            transformStyle: "preserve-3d"
          }}
          className="absolute inset-10 rounded-xs border-2 border-white/40 p-4 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs shadow-2xl pointer-events-none"
        >
          {/* Circular Aperture Ring */}
          <div className="relative w-24 h-24 rounded-full border border-white/30 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#A33A32]"
            />
            <Aperture size={36} className="text-white/90" />
            <div className="absolute -bottom-5 font-mono text-[9px] text-white/80 tracking-widest">
              LENS // 35mm T1.5
            </div>
          </div>

          {/* Registration Crop Marks on Front Element */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#A33A32]" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#A33A32]" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#A33A32]" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#A33A32]" />
        </motion.div>

        {/* ============================================================== */}
        {/* LAYER 4: EXPLODED CORNER TELEMETRY PINS (Explodes Outward)     */}
        {/* ============================================================== */}
        <motion.div
          style={{
            x: useTransform(pinSpread, (v) => -v),
            y: useTransform(pinSpread, (v) => -v),
            opacity: pinOpacity,
            z: 200
          }}
          className="absolute -top-3 -left-3 font-mono text-[9px] bg-black/80 px-2 py-0.5 border border-white/20 text-[#A33A32] rounded-xs"
        >
          TL // OPTICAL_AXIS_01
        </motion.div>

        <motion.div
          style={{
            x: pinSpread,
            y: useTransform(pinSpread, (v) => -v),
            opacity: pinOpacity,
            z: 200
          }}
          className="absolute -top-3 -right-3 font-mono text-[9px] bg-black/80 px-2 py-0.5 border border-white/20 text-white/80 rounded-xs"
        >
          TR // DEPTH_PLANE_02
        </motion.div>

        <motion.div
          style={{
            x: useTransform(pinSpread, (v) => -v),
            y: pinSpread,
            opacity: pinOpacity,
            z: 200
          }}
          className="absolute -bottom-3 -left-3 font-mono text-[9px] bg-black/80 px-2 py-0.5 border border-white/20 text-white/80 rounded-xs"
        >
          BL // CHASSIS_Z_REF
        </motion.div>

        <motion.div
          style={{
            x: pinSpread,
            y: pinSpread,
            opacity: pinOpacity,
            z: 200
          }}
          className="absolute -bottom-3 -right-3 font-mono text-[9px] bg-black/80 px-2 py-0.5 border border-white/20 text-[#A33A32] rounded-xs"
        >
          BR // DISASSEMBLE_ACTIVE
        </motion.div>
      </motion.div>

      {/* Disassembly Status Label */}
      <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-between text-[10px] font-mono text-white/50 px-2">
        <span className="flex items-center gap-1.5">
          <Layers size={12} className="text-[#A33A32]" />
          <span>STAGE 02 // 3D OBJECT DISASSEMBLY</span>
        </span>
        <span className="text-white/40">SCROLL TO DISASSEMBLE / REASSEMBLE</span>
      </div>
    </div>
  );
}
