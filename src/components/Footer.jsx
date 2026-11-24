import React from "react";
import { PERSONAL_INFO } from "../data/projects";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#121212] text-white/60 py-12 border-t border-white/10 font-mono text-xs">
      <div className="editorial-container flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Monogram & Studio Identity */}
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded-xs bg-[#A33A32] text-white font-bold text-[11px]">
            SB
          </span>
          <span className="font-sans font-bold text-sm text-white">
            {PERSONAL_INFO.name}
          </span>
          <span className="text-white/30">/</span>
          <span className="text-white/60">Creative Studio</span>
        </div>

        {/* Studio Specs */}
        <div className="text-center sm:text-right text-[11px] text-white/40">
          <div>© {currentYear} SRIMAN B. ALL RIGHTS RESERVED.</div>
          <div className="mt-1 text-white/50">
            Crafted with React · Vite · Motion · GSAP ScrollTrigger
          </div>
        </div>
      </div>
    </footer>
  );
}
