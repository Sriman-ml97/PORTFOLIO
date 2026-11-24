import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Robotics from "./components/Robotics";
import VisualStories from "./components/VisualStories";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import VideoModal from "./components/VideoModal";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function App() {
  const mainRef = useRef(null);
  const [modalVideo, setModalVideo] = useState({ isOpen: false, data: null });

  const handleOpenVideo = (videoData) => {
    setModalVideo({ isOpen: true, data: videoData });
  };

  const handleCloseVideo = () => {
    setModalVideo({ isOpen: false, data: null });
  };

  // GSAP ScrollTrigger Subtle Global Enhancements
  useGSAP(() => {
    // Avoid running heavy animations if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Smooth subtle section separator fades
    const sections = gsap.utils.toArray("section");
    sections.forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top 85%",
        onEnter: () => sec.classList.add("section-entered"),
        once: true
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#F2F0E9] text-[#171717] selection:bg-[#A33A32] selection:text-[#F2F0E9]">
      {/* Film Grain Subtle Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Custom Viewfinder Cursor */}
      <CustomCursor />

      {/* Global Minimal Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Cinematic Hero */}
        <Hero onOpenReel={handleOpenVideo} />

        {/* Editorial About */}
        <About />

        {/* Full-Stack Projects */}
        <Projects />

        {/* Autonomous Guide Robot Showcase */}
        <Robotics />

        {/* Visual Stories & Cinematography Gallery */}
        <VisualStories onOpenVideo={handleOpenVideo} />

        {/* Contact & Transmission Form */}
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Video Playback Modal Overlay */}
      <VideoModal
        isOpen={modalVideo.isOpen}
        onClose={handleCloseVideo}
        videoData={modalVideo.data}
      />
    </div>
  );
}
