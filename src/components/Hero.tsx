import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Download, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { DataNetwork3D } from './DataNetwork3D';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onDownloadResume: () => void;
  onPreviewResume: () => void;
  onSocialClick: (platform: 'github' | 'linkedin') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onDownloadResume,
  onPreviewResume,
  onSocialClick,
}) => {
  const nameWords = PROFILE_DATA.name.split(' ');

  return (
    <section
      id="home"
      className="relative z-10 pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28 overflow-hidden"
    >
      {/* Subtle architectural background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 w-[520px] h-[520px] rounded-full opacity-20 blur-[110px] animate-ambient-drift-slow"
        style={{
          background: 'linear-gradient(135deg, #38BDF8 0%, #8B5CF6 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Professional Identity & Primary Actions */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-wide"
            >
              <span>Python</span>
              <span aria-hidden="true" className="text-[#94A3B8]">·</span>
              <span>SQL</span>
              <span aria-hidden="true" className="text-[#94A3B8]">·</span>
              <span>Machine Learning</span>
              <span aria-hidden="true" className="text-[#94A3B8]">·</span>
              <span>Predictive Analytics</span>
              <span aria-hidden="true" className="text-[#94A3B8]">·</span>
              <span>NLP</span>
              <span aria-hidden="true" className="text-[#94A3B8]">·</span>
              <span>Data Visualization</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.08] text-balance">
                {nameWords.map((word, wIdx) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.52,
                      delay: 0.08 + wIdx * 0.09,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block mr-3 last:mr-0 hover:text-[#38BDF8] transition-colors duration-300"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#38BDF8] via-[#8B5CF6] to-[#38BDF8] bg-clip-text text-transparent animate-gradient-text">
                {PROFILE_DATA.title}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-[60ch]"
            >
              {PROFILE_DATA.heroTagline}
            </motion.p>

            {/* Primary CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                type="button"
                data-magnetic="true"
                onClick={() => onNavigate('projects')}
                className="group interactive-btn inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#080B12] bg-[#38BDF8] hover:bg-[#7DD3FC] rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                <span>View Projects</span>
                <ArrowDownRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                data-magnetic="true"
                onClick={onDownloadResume}
                className="group interactive-btn inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#F8FAFC] bg-[#101522] hover:bg-[#192134] border border-white/[0.12] hover:border-[#38BDF8]/40 rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                <Download
                  className="w-4 h-4 text-[#38BDF8] transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
                <span>Download Resume</span>
              </button>

              <button
                type="button"
                data-magnetic="true"
                onClick={() => onNavigate('contact')}
                className="group interactive-btn inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] bg-transparent hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.2] rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                <Mail
                  className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <span>Contact Me</span>
              </button>
            </motion.div>

            {/* Social & Direct Links Row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                type="button"
                onClick={() => onSocialClick('github')}
                aria-label="GitHub Profile"
                className="group interactive-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#101522]/80 hover:bg-[#161D2F] border border-white/[0.08] hover:border-[#38BDF8]/35 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
              >
                <Github
                  className="w-4 h-4 text-[#38BDF8] transition-transform duration-200 group-hover:rotate-6"
                  aria-hidden="true"
                />
                <span>GitHub</span>
              </button>

              <button
                type="button"
                onClick={() => onSocialClick('linkedin')}
                aria-label="LinkedIn Profile"
                className="group interactive-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#101522]/80 hover:bg-[#161D2F] border border-white/[0.08] hover:border-[#8B5CF6]/35 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
              >
                <Linkedin
                  className="w-4 h-4 text-[#8B5CF6] transition-transform duration-200 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <span>LinkedIn</span>
              </button>

              <button
                type="button"
                onClick={onPreviewResume}
                className="group interactive-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#101522]/80 hover:bg-[#161D2F] border border-white/[0.08] hover:border-[#38BDF8]/35 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
              >
                <FileText
                  className="w-4 h-4 text-[#38BDF8] transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>Read Formatted CV</span>
              </button>

              <a
                href={PROFILE_DATA.emailHref}
                className="interactive-link text-xs font-mono text-[#94A3B8] hover:text-[#38BDF8] transition-colors px-2 py-1"
              >
                {PROFILE_DATA.email}
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Data Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <DataNetwork3D />
          </motion.div>
        </div>

        {/* Documented Quantitative Proof Strip with Staggered Reveal */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROFILE_DATA.documentedHighlights.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-cursor-card="true"
              className="group space-y-1 p-3 -m-3 rounded-xl transition-colors duration-200 hover:bg-[#101522]/45"
            >
              <div className="font-mono text-2xl sm:text-3xl font-semibold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors tabular-nums">
                {item.metric}
              </div>
              <div className="text-sm font-medium text-[#F8FAFC]/90">
                {item.label}
              </div>
              <div className="text-xs text-[#94A3B8]">{item.context}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
