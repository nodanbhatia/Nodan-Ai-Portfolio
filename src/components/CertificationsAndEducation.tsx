import React from 'react';
import { motion } from 'motion/react';
import { Download, FileText } from 'lucide-react';
import { CERTIFICATIONS_DATA, EDUCATION_DATA } from '../data/portfolioData';

interface CertificationsAndEducationProps {
  onDownloadResume: () => void;
  onPreviewResume: () => void;
}

export const CertificationsAndEducation: React.FC<CertificationsAndEducationProps> = ({
  onDownloadResume,
  onPreviewResume,
}) => {
  return (
    <div className="relative z-10 bg-[#101522]/30 border-t border-white/[0.06]">
      {/* CERTIFICATIONS SECTION */}
      <section
        id="certifications"
        className="py-20 sm:py-24 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 max-w-2xl"
        >
          <p className="text-xs font-mono text-[#38BDF8] tracking-wider">
            06. Credentials & Continuous Learning
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight text-balance">
            Certifications & Achievements
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Verified industry job simulations and foundational credentials in Data Science, Analytics, Generative AI, and Python.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-cursor-card="true"
              className="group interactive-card rounded-2xl bg-[#101522] border border-white/[0.08] hover:border-[#38BDF8]/35 transition-colors p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                  <span className="text-[#38BDF8] tabular-nums transition-transform duration-200 group-hover:translate-x-0.5">
                    0{index + 1}
                  </span>
                  <span className="tabular-nums">{cert.date}</span>
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-[#38BDF8]">{cert.issuer}</p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] text-xs text-[#94A3B8]">
                {cert.domainFocus}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EDUCATION & RESUME DOWNLOAD SECTION */}
      <section
        id="education"
        className="py-20 sm:py-24 border-t border-white/[0.06] bg-[#080B12]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2 max-w-2xl"
          >
            <p className="text-xs font-mono text-[#38BDF8] tracking-wider">
              07. Academic Foundation
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight text-balance">
              Education & Academic Excellence
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Main Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              data-cursor-card="true"
              className="interactive-card lg:col-span-8 rounded-2xl bg-[#101522] border border-white/[0.08] hover:border-[#38BDF8]/30 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div className="space-y-1.5">
                  <div className="text-xs font-mono text-[#38BDF8]">
                    {EDUCATION_DATA.institution}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                    {EDUCATION_DATA.degree}
                  </h3>
                </div>

                <div className="font-mono text-xs sm:text-sm text-[#F8FAFC] bg-[#080B12] px-3.5 py-2 rounded-xl border border-white/[0.08] whitespace-nowrap self-start tabular-nums">
                  {EDUCATION_DATA.passout}
                </div>
              </div>

              <ul className="space-y-2.5 text-sm sm:text-base text-[#94A3B8]">
                {EDUCATION_DATA.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className="font-mono text-xs text-[#38BDF8] mt-1 shrink-0 tabular-nums"
                      aria-hidden="true"
                    >
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Prominent CGPA & Resume Download Card */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              data-cursor-card="true"
              className="interactive-card lg:col-span-4 rounded-2xl bg-[#101522] border border-[#38BDF8]/35 hover:border-[#38BDF8]/65 p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#94A3B8]">
                  Academic Standing
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-4xl sm:text-5xl font-bold text-[#38BDF8] tabular-nums">
                    9.1
                  </span>
                  <span className="font-mono text-xl text-[#94A3B8] tabular-nums">
                    / 10 CGPA
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] pt-1">
                  B.Tech. Computer Science Engineering — Data Science ({EDUCATION_DATA.passout})
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.08] space-y-3">
                <div className="text-xs font-medium text-[#F8FAFC]">
                  Curriculum Vitae (Single-Source PDF)
                </div>
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    data-magnetic="true"
                    onClick={onDownloadResume}
                    className="group interactive-btn w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-[#080B12] bg-[#38BDF8] hover:bg-[#7DD3FC] rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    <Download
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span>Download Resume (PDF)</span>
                  </button>
                  <button
                    type="button"
                    onClick={onPreviewResume}
                    className="group interactive-btn w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#F8FAFC] bg-[#080B12] hover:bg-white/[0.06] border border-white/[0.1] hover:border-[#38BDF8]/35 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
                  >
                    <FileText
                      className="w-3.5 h-3.5 text-[#38BDF8] transition-transform duration-200 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <span>Preview Resume in Browser</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
