import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "../data/projects";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["hero", "about", "work", "robotics", "visual-stories", "contact"];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run immediately on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Work", href: "#work", id: "work" },
    { name: "Robotics", href: "#robotics", id: "robotics" },
    { name: "Visual Stories", href: "#visual-stories", id: "visual-stories" },
    { name: "Contact", href: "#contact", id: "contact" }
  ];

  // Dark sections vs Light sections for adaptive contrast
  const isDark = activeSection === "hero" || activeSection === "robotics" || activeSection === "contact";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isDark
            ? scrolled
              ? "bg-[#06241B]/92 backdrop-blur-md py-4 border-b border-[#D4AF37]/25 shadow-lg text-white"
              : "bg-gradient-to-b from-[#041A13]/90 via-[#06241B]/50 to-transparent py-6 text-white"
            : "bg-[#F1F6F2]/92 backdrop-blur-md py-4 border-b border-[#09221A]/15 shadow-xs text-[#09221A]"
        }`}
      >
        <div className="editorial-container flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-3 text-inherit no-underline"
            data-cursor-hover="true"
            aria-label="Sriman B. Home"
          >
            <span
              className={`font-mono text-xs font-bold px-2 py-0.5 rounded-xs transition-colors duration-300 ${
                isDark
                  ? "bg-[#B82B2B] text-white border border-[#D4AF37]/40"
                  : "bg-[#09221A] text-[#F1F6F2] group-hover:bg-[#B82B2B]"
              }`}
            >
              SB
            </span>
            <span
              className={`font-sans font-bold text-lg tracking-wider transition-colors duration-500 ${
                isDark ? "text-white" : "text-[#09221A]"
              }`}
            >
              {PERSONAL_INFO.name}
            </span>
            <span
              className={`hidden sm:inline-block font-mono text-[11px] uppercase tracking-widest pl-2 border-l transition-colors duration-500 ${
                isDark
                  ? "text-[#D4AF37]/85 border-[#D4AF37]/30"
                  : "text-[#355447] border-[#09221A]/20"
              }`}
            >
              Creative Studio
            </span>
          </a>

          {/* Desktop Navigation Links with Adaptive Text Colors & Spring Transitions */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  data-cursor-hover="true"
                  className={`text-xs font-mono tracking-widest uppercase transition-colors duration-300 relative py-1 ${
                    isActive
                      ? "text-[#D4AF37] font-semibold"
                      : isDark
                      ? "text-white/80 hover:text-[#10B981]"
                      : "text-[#09221A]/80 hover:text-[#B82B2B]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#B82B2B]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Availability Indicator & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono transition-all duration-500 ${
                isDark
                  ? "border-[#10B981]/35 bg-[#0A3327]/70 text-white/90"
                  : "border-[#09221A]/15 bg-[#F8FBF8]/80 text-[#09221A]"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span>{PERSONAL_INFO.status}</span>
            </div>

            <a
              href="#contact"
              data-cursor-hover="true"
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium uppercase tracking-wider rounded-xs transition-colors duration-300 ${
                isDark
                  ? "bg-[#D4AF37] text-[#06241B] hover:bg-[#B82B2B] hover:text-white"
                  : "bg-[#09221A] text-[#F1F6F2] hover:bg-[#B82B2B]"
              }`}
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xs transition-colors focus:outline-hidden ${
              isDark
                ? "text-white hover:bg-white/10"
                : "text-[#09221A] hover:bg-[#09221A]/10"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 top-[73px] bg-[#06241B] text-white z-40 md:hidden flex flex-col px-6 py-8 border-b border-white/15 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 my-auto">
              {navLinks.map((link, idx) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-2xl font-sans font-bold text-white hover:text-[#B82B2B] py-2 border-b border-white/10"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#B82B2B]">0{idx + 1}</span>
                    {link.name}
                  </span>
                  <ArrowUpRight size={20} className="text-[#B82B2B]" />
                </a>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                <span className="h-2 w-2 rounded-full bg-[#B82B2B] inline-block animate-pulse"></span>
                <span>{PERSONAL_INFO.status} · {PERSONAL_INFO.location}</span>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-xs font-mono font-bold uppercase tracking-widest bg-[#B82B2B] hover:bg-[#D13838] text-white transition-colors rounded-xs"
              >
                Start a Conversation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
