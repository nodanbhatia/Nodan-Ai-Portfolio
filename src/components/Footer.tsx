import React from 'react';
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../data/portfolioData';

interface FooterProps {
  onSocialClick: (platform: 'github' | 'linkedin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSocialClick }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 border-t border-white/[0.08] bg-[#080B12] py-10"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1">
          <div className="font-display text-base font-bold text-[#F8FAFC]">
            {PROFILE_DATA.displayName}
          </div>
          <div className="text-xs text-[#94A3B8]">{PROFILE_DATA.title}</div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-[#94A3B8]">
          <button
            type="button"
            onClick={() => onSocialClick('github')}
            className="interactive-link hover:text-[#38BDF8] transition-colors focus-visible:outline-2 focus-visible:outline-[#38BDF8] rounded-sm"
          >
            GitHub
          </button>
          <span aria-hidden="true" className="text-white/20">
            |
          </span>
          <button
            type="button"
            onClick={() => onSocialClick('linkedin')}
            className="interactive-link hover:text-[#38BDF8] transition-colors focus-visible:outline-2 focus-visible:outline-[#38BDF8] rounded-sm"
          >
            LinkedIn
          </button>
          <span aria-hidden="true" className="text-white/20">
            |
          </span>
          <a
            href={PROFILE_DATA.emailHref}
            className="interactive-link hover:text-[#38BDF8] transition-colors focus-visible:outline-2 focus-visible:outline-[#38BDF8] rounded-sm"
          >
            Email
          </a>
        </div>

        <div className="text-xs text-[#94A3B8] font-mono tabular-nums">
          © 2026 Nodan Bhatia
        </div>
      </div>
    </motion.footer>
  );
};
