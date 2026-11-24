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
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "about", "work", "robotics", "visual-stories", "contact"];
      const scrollPos = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Work", href: "#work", id: "work" },
    { name: "Robotics", href: "#robotics", id: "robotics" },
    { name: "Visual Stories", href: "#visual-stories", id: "visual-stories" },
    { name: "Contact", href: "#contact", id: "contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F2F0E9]/90 backdrop-blur-md py-4 border-b border-[#171717]/10 shadow-xs"
            : "bg-transparent py-6"
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
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-sm bg-[#171717] text-[#F2F0E9] group-hover:bg-[#A33A32] transition-colors duration-200">
              SB
            </span>
            <span className="font-sans font-bold text-lg tracking-wider text-[#171717]">
              {PERSONAL_INFO.name}
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] text-[#5E5B55] uppercase tracking-widest pl-2 border-l border-[#171717]/20">
              Creative Studio
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                data-cursor-hover="true"
                className={`text-xs font-mono tracking-widest uppercase transition-colors relative py-1 ${
                  activeSection === link.id
                    ? "text-[#A33A32] font-semibold"
                    : "text-[#171717] hover:text-[#A33A32]"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#A33A32]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Availability Indicator & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#171717]/15 bg-[#FAF9F6]/80 text-[11px] font-mono text-[#171717]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A33A32] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A33A32]"></span>
              </span>
              <span>{PERSONAL_INFO.status}</span>
            </div>

            <a
              href="#contact"
              data-cursor-hover="true"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium uppercase tracking-wider bg-[#171717] text-[#F2F0E9] hover:bg-[#A33A32] transition-colors rounded-sm"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-sm text-[#171717] hover:bg-[#171717]/10 transition-colors focus:outline-hidden"
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
            className="fixed inset-0 top-[73px] bg-[#F2F0E9] z-40 md:hidden flex flex-col px-6 py-8 border-b border-[#171717]/15 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 my-auto">
              {navLinks.map((link, idx) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-2xl font-sans font-bold text-[#171717] hover:text-[#A33A32] py-2 border-b border-[#171717]/10"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[#A33A32]">0{idx + 1}</span>
                    {link.name}
                  </span>
                  <ArrowUpRight size={20} className="text-[#A33A32]" />
                </a>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#171717]/15 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5E5B55]">
                <span className="h-2 w-2 rounded-full bg-[#A33A32] inline-block animate-pulse"></span>
                <span>{PERSONAL_INFO.status} · {PERSONAL_INFO.location}</span>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-xs font-mono font-bold uppercase tracking-widest bg-[#171717] text-[#F2F0E9] hover:bg-[#A33A32] transition-colors rounded-sm"
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
