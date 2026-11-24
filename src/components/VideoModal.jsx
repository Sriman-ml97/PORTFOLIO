import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Volume2, VolumeX, Maximize2 } from "lucide-react";

export default function VideoModal({ isOpen, onClose, videoData }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoData) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#121212] rounded-xs border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#181818]/80 text-[#F2F0E9]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2 py-0.5 rounded-xs bg-[#A33A32] text-white">
                {videoData.category || "CINEMA"}
              </span>
              <h3 className="font-sans font-semibold text-sm sm:text-base tracking-wide">
                {videoData.title}
              </h3>
            </div>
            
            <button
              onClick={onClose}
              data-cursor-hover="true"
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              aria-label="Close video player"
            >
              <X size={20} />
            </button>
          </div>

          {/* Video Player Container */}
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={videoData.videoSrc || "/videos/showreel.mp4"}
              poster={videoData.thumbnail || "/images/hero-poster.jpg"}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          </div>

          {/* Metadata Footer */}
          <div className="px-6 py-4 bg-[#181818] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-white/60">
            <div>
              <span className="text-white/40">SPECS: </span>
              <span className="text-white/80">{videoData.specs || "4K UHD · 24fps"}</span>
            </div>
            <div>
              <span className="text-white/40">ROLE: </span>
              <span className="text-[#A33A32] font-medium">{videoData.role || "Director / Editor"}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
