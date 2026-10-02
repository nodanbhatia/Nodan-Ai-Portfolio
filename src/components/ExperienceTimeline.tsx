import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative z-10 py-20 sm:py-24 border-t border-white/[0.06] bg-[#101522]/30"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 max-w-2xl"
        >
          <p className="text-xs font-mono text-[#38BDF8] tracking-wider">
            04. Professional Experience
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight text-balance">
            Real-World Data Analytics & SQL Optimization
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8]">
            Applying data research, SQL validation, and statistical reporting within organizational operations.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10">
          {/* Animated Vertical Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-2 sm:left-3.5 top-2 bottom-2 w-[2px] origin-top bg-gradient-to-b from-[#38BDF8] via-[#8B5CF6] to-white/[0.08]"
            aria-hidden="true"
          />

          {EXPERIENCE_DATA.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Timeline Node Marker */}
              <div
                className="absolute -left-[21px] sm:-left-[31px] top-2 w-4 h-4 rounded-full bg-[#080B12] border-2 border-[#38BDF8] shadow-sm transition-transform duration-300 hover:scale-125"
                aria-hidden="true"
              />

              <div
                data-cursor-card="true"
                className="interactive-card rounded-2xl bg-[#101522] border border-white/[0.08] hover:border-[#38BDF8]/30 p-6 sm:p-8 lg:p-10 space-y-8"
              >
                {/* Top Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#38BDF8]">
                      <span>{exp.organization}</span>
                      <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                      <span className="text-[#94A3B8]">{exp.durationSummary}</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="font-mono text-sm text-[#F8FAFC] bg-[#080B12] px-4 py-2 rounded-xl border border-white/[0.08] whitespace-nowrap self-start md:self-auto tabular-nums">
                    {exp.period}
                  </div>
                </div>

                {/* Main Content Grid: Responsibilities + Prominent Documented Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left 7 Cols: Documented Responsibilities */}
                  <div className="lg:col-span-7 space-y-5">
                    <h4 className="text-xs font-mono text-[#94A3B8]">
                      Documented Responsibilities & Execution
                    </h4>

                    <ul className="space-y-3.5 text-sm sm:text-base text-[#F8FAFC]/90 leading-relaxed">
                      {exp.responsibilities.map((item, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.08 + idx * 0.07,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="flex items-start gap-3"
                        >
                          <span
                            className="font-mono text-xs text-[#38BDF8] mt-1 shrink-0 tabular-nums"
                            aria-hidden="true"
                          >
                            0{idx + 1}.
                          </span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Unboxed Clean Typographic Metadata List */}
                    <div className="pt-4 border-t border-white/[0.06]">
                      <div className="text-xs font-mono text-[#94A3B8] mb-2">
                        Core Methods Applied
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#38BDF8]">
                        {exp.capabilityTags.map((tag, i) => (
                          <React.Fragment key={tag}>
                            <span className="hover:text-[#F8FAFC] transition-colors">
                              {tag}
                            </span>
                            {i < exp.capabilityTags.length - 1 && (
                              <span aria-hidden="true" className="text-[#94A3B8]/50">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right 5 Cols: Documented Impact Metrics */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Primary 20% Metric Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                      data-cursor-card="true"
                      className="interactive-card rounded-xl bg-[#080B12] border border-[#38BDF8]/35 hover:border-[#38BDF8]/65 p-6 space-y-2"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-mono text-3xl sm:text-4xl font-bold text-[#38BDF8] tabular-nums">
                          {exp.primaryMetric.value}
                        </span>
                        <span className="text-xs font-mono text-[#94A3B8]">
                          SQL Query Optimization
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-[#F8FAFC]">
                        {exp.primaryMetric.label}
                      </div>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        “{exp.primaryMetric.detail}”
                      </p>
                    </motion.div>

                    {/* Secondary 10 Organizations Metric Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      data-cursor-card="true"
                      className="interactive-card rounded-xl bg-[#080B12]/75 border border-white/[0.08] hover:border-[#8B5CF6]/45 p-6 space-y-2"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-mono text-2xl sm:text-3xl font-bold text-[#F8FAFC] tabular-nums">
                          {exp.secondaryMetric.value} Organizations
                        </span>
                        <span className="text-xs font-mono text-[#8B5CF6]">
                          Validated Datasets
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-[#F8FAFC]">
                        {exp.secondaryMetric.label}
                      </div>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        {exp.secondaryMetric.detail}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
