import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  X,
} from 'lucide-react';
import {
  CERTIFICATIONS_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  PROFILE_DATA,
  PROJECTS_DATA,
  SKILL_CATEGORIES,
  SOCIAL_LINKS_CONFIG,
} from '../data/portfolioData';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadResume: () => void;
}

export const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
  isOpen,
  onClose,
  onDownloadResume,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#101522] border border-white/[0.12] shadow-2xl p-6 sm:p-8 lg:p-10 space-y-6"
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <h2
                  id="resume-modal-title"
                  className="font-display text-xl font-bold text-[#F8FAFC]"
                >
                  Curriculum Vitae — {PROFILE_DATA.displayName}
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Single-source-of-truth resume document
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onDownloadResume}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#080B12] bg-[#38BDF8] hover:bg-[#7DD3FC] rounded-xl transition-colors"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#080B12] text-[#94A3B8] hover:text-[#F8FAFC] border border-white/[0.1]"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Formatted Document Sheet */}
            <div className="rounded-xl bg-[#080B12] border border-white/[0.08] p-6 sm:p-8 space-y-6 text-sm">
              {/* Header */}
              <div className="text-center border-b border-white/[0.08] pb-5 space-y-1">
                <h3 className="font-display text-2xl font-bold text-[#F8FAFC] tracking-wide">
                  {PROFILE_DATA.name}
                </h3>
                <div className="text-sm font-semibold text-[#38BDF8]">
                  {PROFILE_DATA.roleShort}
                </div>
                <div className="text-xs font-mono text-[#94A3B8] pt-1">
                  {PROFILE_DATA.phone} | {PROFILE_DATA.email} | LinkedIn | GitHub
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider border-b border-white/[0.06] pb-1">
                  Summary
                </h4>
                <p className="text-xs sm:text-sm text-[#F8FAFC]/90 leading-relaxed">
                  {PROFILE_DATA.summary}
                </p>
              </div>

              {/* Technical Skills */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider border-b border-white/[0.06] pb-1">
                  Technical Skills
                </h4>
                <div className="space-y-1 text-xs sm:text-sm">
                  {SKILL_CATEGORIES.map((cat) => (
                    <div key={cat.id}>
                      <span className="font-semibold text-[#F8FAFC]">
                        {cat.title}:{' '}
                      </span>
                      <span className="text-[#94A3B8]">
                        {cat.skills.map((s) => s.name).join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider border-b border-white/[0.06] pb-1">
                  Experience
                </h4>
                {EXPERIENCE_DATA.map((exp) => (
                  <div key={exp.id} className="space-y-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-semibold text-[#F8FAFC]">
                        {exp.role} – {exp.organization}
                      </span>
                      <span className="font-mono text-xs text-[#38BDF8]">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-[#94A3B8]">
                      {exp.responsibilities.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider border-b border-white/[0.06] pb-1">
                  Projects
                </h4>
                {PROJECTS_DATA.map((proj) => (
                  <div key={proj.id} className="space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-semibold text-[#F8FAFC]">
                        {proj.title}
                      </span>
                      <span className="font-mono text-xs text-[#38BDF8]">
                        {proj.technologies.join(', ')}
                      </span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-xs sm:text-sm text-[#94A3B8]">
                      {proj.bulletPoints.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider border-b border-white/[0.06] pb-1">
                  Certifications & Achievements
                </h4>
                <div className="space-y-1 text-xs sm:text-sm">
                  {CERTIFICATIONS_DATA.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-baseline justify-between gap-2"
                    >
                      <span className="text-[#F8FAFC]">
                        <strong className="font-semibold">{c.title}</strong> –{' '}
                        {c.issuer}
                      </span>
                      <span className="font-mono text-xs text-[#94A3B8]">
                        {c.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-1">
                <h4 className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider border-b border-white/[0.06] pb-1">
                  Education
                </h4>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs sm:text-sm">
                  <span className="font-semibold text-[#F8FAFC]">
                    {EDUCATION_DATA.degree}
                  </span>
                  <span className="font-mono text-xs text-[#38BDF8]">
                    {EDUCATION_DATA.passout}
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs sm:text-sm">
                  <span className="text-[#94A3B8]">
                    {EDUCATION_DATA.institution}
                  </span>
                  <span className="font-mono font-semibold text-[#F8FAFC]">
                    CGPA: {EDUCATION_DATA.cgpa}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface SocialConnectionModalProps {
  platform: 'github' | 'linkedin' | null;
  onClose: () => void;
}

export const SocialConnectionModal: React.FC<SocialConnectionModalProps> = ({
  platform,
  onClose,
}) => {
  const [customUrl, setCustomUrl] = useState<string>('');
  const [savedNotice, setSavedNotice] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!platform) return;
    const saved = localStorage.getItem(`nodan_social_${platform}`) || '';
    setCustomUrl(saved || SOCIAL_LINKS_CONFIG[platform].url);
    setSavedNotice(false);
  }, [platform]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && platform) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [platform, onClose]);

  const handleSaveCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform) return;
    const trimmed = customUrl.trim();
    if (trimmed) {
      localStorage.setItem(`nodan_social_${platform}`, trimmed);
      setSavedNotice(true);
    } else {
      localStorage.removeItem(`nodan_social_${platform}`);
      setSavedNotice(true);
    }
  };

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard?.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!platform) return null;
  const config = SOCIAL_LINKS_CONFIG[platform];
  const activeUrl = customUrl.trim();

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="social-modal-title"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg rounded-2xl bg-[#101522] border border-white/[0.12] p-6 sm:p-7 space-y-5 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#080B12] border border-white/[0.1] flex items-center justify-center">
                {platform === 'github' ? (
                  <Github className="w-5 h-5 text-[#38BDF8]" />
                ) : (
                  <Linkedin className="w-5 h-5 text-[#8B5CF6]" />
                )}
              </div>
              <div>
                <h2
                  id="social-modal-title"
                  className="font-display text-lg font-bold text-[#F8FAFC]"
                >
                  {config.platform} — {PROFILE_DATA.displayName}
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Verified Profile & Direct Contact
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-lg bg-[#080B12] text-[#94A3B8] hover:text-[#F8FAFC] border border-white/[0.1] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Direct Verified Contact Info */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono text-[#38BDF8]">
              Verified Resume Contact Channels
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-[#080B12] border border-white/[0.08] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                  <span className="text-xs font-mono text-[#F8FAFC] truncate">
                    {PROFILE_DATA.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE_DATA.email, 'email')}
                  className="text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] shrink-0"
                >
                  {copiedKey === 'email' ? (
                    <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#080B12] border border-white/[0.08] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Phone className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                  <span className="text-xs font-mono text-[#F8FAFC] truncate">
                    {PROFILE_DATA.phone}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE_DATA.phone, 'phone')}
                  className="text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] shrink-0"
                >
                  {copiedKey === 'phone' ? (
                    <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Profile URL Configuration Box */}
          <form
            onSubmit={handleSaveCustomUrl}
            className="p-4 rounded-xl bg-[#080B12] border border-white/[0.08] space-y-3"
          >
            <div className="text-xs text-[#94A3B8] leading-relaxed">
              {config.configNote}
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="social-url-input"
                className="block text-xs font-mono text-[#F8FAFC]"
              >
                {config.platform} Profile URL:
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="social-url-input"
                  type="url"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    setSavedNotice(false);
                  }}
                  placeholder={
                    platform === 'github'
                      ? 'https://github.com/your-username'
                      : 'https://www.linkedin.com/in/your-profile'
                  }
                  className="flex-1 px-3 py-2 rounded-lg bg-[#101522] border border-white/[0.12] text-xs font-mono text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#38BDF8]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-[#38BDF8] hover:bg-[#7DD3FC] text-xs font-semibold text-[#080B12] transition-colors shrink-0"
                >
                  Save URL
                </button>
              </div>
              {savedNotice && (
                <p className="text-xs text-[#38BDF8] font-mono pt-1">
                  Saved {config.platform} URL for this session.
                </p>
              )}
            </div>

            {activeUrl && (
              <div className="pt-2 border-t border-white/[0.06] flex justify-end">
                <a
                  href={activeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:underline"
                >
                  <span>Open Configured {config.platform} Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
