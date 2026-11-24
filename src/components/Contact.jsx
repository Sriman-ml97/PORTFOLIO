import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUp, Mail, Copy, Check, ArrowUpRight, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./SocialIcons";
import { PERSONAL_INFO } from "../data/projects";

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

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
    // Open user's default email client pre-filled
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#171717] text-[#F2F0E9] overflow-hidden"
    >
      <div className="editorial-container">
        {/* Section Kicker */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-16">
          <div className="editorial-kicker text-[#A33A32]">
            04 // CONNECT & COLLABORATE
          </div>
          <div className="font-mono text-xs text-white/50 uppercase tracking-wider">
            Initiate Contact
          </div>
        </div>

        {/* Big Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-24"
        >
          <h2 className="font-sans font-black tracking-tight uppercase text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.9] text-white">
            HAVE AN IDEA?
            <br />
            <span className="font-serif italic font-normal text-[#A33A32]">
              LET'S CREATE IT.
            </span>
          </h2>
        </motion.div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Inquiries & Verified Socials */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            <div>
              <p className="font-body text-white/70 text-base sm:text-lg leading-relaxed mb-8">
                Whether you're developing autonomous robotics architectures, engineering a full-stack digital product, or directing a cinematic visual campaign — I am always open to exploring high-ambition collaborations.
              </p>

              {/* Email Direct Action Box */}
              <div className="p-6 bg-[#202020] border border-white/10 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xs bg-[#A33A32]/20 text-[#A33A32]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                      DIRECT INBOX
                    </div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="font-mono text-sm sm:text-base font-medium text-white hover:text-[#A33A32] transition-colors"
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
                  className="flex items-center justify-between p-3.5 bg-[#202020] border border-white/10 hover:border-[#A33A32] rounded-xs text-white transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon size={16} />
                    GitHub
                  </span>
                  <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#A33A32] transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover="true"
                  className="flex items-center justify-between p-3.5 bg-[#202020] border border-white/10 hover:border-[#A33A32] rounded-xs text-white transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon size={16} />
                    LinkedIn
                  </span>
                  <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#A33A32] transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover="true"
                  className="flex items-center justify-between p-3.5 bg-[#202020] border border-white/10 hover:border-[#A33A32] rounded-xs text-white transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <InstagramIcon size={16} />
                    Instagram
                  </span>
                  <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#A33A32] transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Box */}
          <div className="lg:col-span-6 bg-[#202020] p-6 sm:p-8 rounded-xs border border-white/10">
            <h3 className="font-sans font-bold text-xl text-white mb-2">
              Send a Transmission
            </h3>
            <p className="font-mono text-xs text-white/50 mb-6">
              Fill out the message brief below to open a pre-addressed email draft.
            </p>

            {formSubmitted ? (
              <div className="p-6 bg-white/5 border border-[#A33A32]/40 rounded-xs text-center font-mono">
                <Check size={28} className="text-[#A33A32] mx-auto mb-2" />
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
                    className="w-full px-4 py-3 bg-[#181818] border border-white/15 focus:border-[#A33A32] rounded-xs text-white placeholder-white/20 outline-hidden transition-colors"
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
                    className="w-full px-4 py-3 bg-[#181818] border border-white/15 focus:border-[#A33A32] rounded-xs text-white placeholder-white/20 outline-hidden transition-colors"
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
                    className="w-full px-4 py-3 bg-[#181818] border border-white/15 focus:border-[#A33A32] rounded-xs text-white placeholder-white/20 outline-hidden transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-cursor-hover="true"
                  className="mt-2 w-full py-3.5 bg-[#A33A32] hover:bg-[#BF453B] text-white font-semibold uppercase tracking-widest flex items-center justify-center gap-2 rounded-xs transition-colors"
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
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#A33A32] transition-colors">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
