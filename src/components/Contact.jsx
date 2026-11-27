import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUp, Mail, Copy, Check, ArrowUpRight, Send, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./SocialIcons";
import { PERSONAL_INFO } from "../data/projects";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Stage 7: Large Typography Kinetic Reveal on Scroll
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const titleLines = headingRef.current?.querySelectorAll(".kinetic-line");
    if (titleLines && titleLines.length > 0) {
      gsap.fromTo(
        titleLines,
        {
          y: "100%",
          opacity: 0,
          rotateX: -25
        },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, { scope: sectionRef });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#09221A] text-[#F1F6F2] overflow-hidden"
    >
      <div className="editorial-container">
        {/* Section Kicker */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-16">
          <div className="editorial-kicker text-[#B82B2B]">
            05 // CONTACT
          </div>
          <div className="font-mono text-xs text-white/50 uppercase tracking-wider">
            Initiate Contact
          </div>
        </div>

        {/* Big Editorial Headline with Kinetic Masking */}
        <div ref={headingRef} className="mb-16 sm:mb-24 overflow-hidden perspective-[1000px]">
          <div className="overflow-hidden">
            <h2 className="kinetic-line font-sans font-black tracking-tight uppercase text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.9] text-white">
              HAVE AN IDEA?
            </h2>
          </div>
          <div className="overflow-hidden mt-1">
            <h2 className="kinetic-line font-serif italic font-normal text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.9] text-[#B82B2B]">
              LET'S CREATE IT.
            </h2>
          </div>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Inquiries & Verified Socials */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            <div>
              <p className="font-body text-white/70 text-base sm:text-lg leading-relaxed mb-8">
                Whether you're developing autonomous robotics architectures, engineering a full-stack digital product, or directing a cinematic visual campaign — I am always open to exploring high-ambition collaborations.
              </p>

              {/* Email Direct Action Box */}
              <div className="p-6 bg-[#0D3D30] border border-white/10 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xs bg-[#B82B2B]/20 text-[#B82B2B]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                      DIRECT INBOX
                    </div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="font-mono text-sm sm:text-base font-medium text-white hover:text-[#B82B2B] transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  data-cursor-hover="true"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xs border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono text-white transition-colors"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verified Social Networks */}
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">
                DIGITAL CHANNELS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover="true"
                  className="flex items-center justify-between p-3.5 bg-[#0D3D30] border border-white/10 hover:border-[#B82B2B] rounded-xs text-white transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon size={16} />
                    GitHub
                  </span>
                  <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#B82B2B] transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover="true"
                  className="flex items-center justify-between p-3.5 bg-[#0D3D30] border border-white/10 hover:border-[#B82B2B] rounded-xs text-white transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon size={16} />
                    LinkedIn
                  </span>
                  <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#B82B2B] transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover="true"
                  className="flex items-center justify-between p-3.5 bg-[#0D3D30] border border-white/10 hover:border-[#B82B2B] rounded-xs text-white transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <InstagramIcon size={16} />
                    Instagram
                  </span>
                  <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#B82B2B] transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Box */}
          <div className="lg:col-span-6 bg-[#0D3D30] p-6 sm:p-8 rounded-xs border border-white/10 shadow-2xl">
            <h3 className="font-sans font-bold text-xl text-white mb-2">
              Send a Transmission
            </h3>
            <p className="font-mono text-xs text-white/50 mb-6">
              Fill out the message brief below to open a pre-addressed email draft.
            </p>

            {formSubmitted ? (
              <div className="p-6 bg-white/5 border border-[#B82B2B]/40 rounded-xs text-center font-mono">
                <Check size={28} className="text-[#B82B2B] mx-auto mb-2" />
                <h4 className="font-sans font-bold text-base text-white mb-1">Draft Ready</h4>
                <p className="text-xs text-white/70">
                  Your email client has been prepared. You can also reach me directly at {PERSONAL_INFO.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 font-mono text-xs">
                <div>
                  <label htmlFor="name" className="block text-white/60 mb-1 uppercase tracking-wider text-[11px]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 bg-[#082B20] border border-white/15 focus:border-[#B82B2B] rounded-xs text-white placeholder-white/20 outline-hidden transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white/60 mb-1 uppercase tracking-wider text-[11px]">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-3 bg-[#082B20] border border-white/15 focus:border-[#B82B2B] rounded-xs text-white placeholder-white/20 outline-hidden transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/60 mb-1 uppercase tracking-wider text-[11px]">
                    Project Brief / Idea
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about the concept, scope, and timeline..."
                    className="w-full px-4 py-3 bg-[#082B20] border border-white/15 focus:border-[#B82B2B] rounded-xs text-white placeholder-white/20 outline-hidden transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-cursor-hover="true"
                  className="mt-2 w-full py-3.5 bg-[#B82B2B] hover:bg-[#D13838] text-white font-semibold uppercase tracking-widest flex items-center justify-center gap-2 rounded-xs transition-colors"
                >
                  <span>Dispatch Message</span>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-20 pt-8 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={scrollToTop}
            data-cursor-hover="true"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#B82B2B] transition-colors">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
