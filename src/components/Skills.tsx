import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES, SkillItem } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(
    SKILL_CATEGORIES[0].skills[0]
  );

  const visibleCategories =
    selectedCategoryId === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === selectedCategoryId);

  return (
    <section
      id="skills"
      className="relative z-10 py-20 sm:py-24 border-t border-white/[0.06] bg-[#101522]/35"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header + Interactive Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="space-y-2">
            <p className="text-xs font-mono text-[#38BDF8] tracking-wider">
              02. Technical Capabilities
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight text-balance">
              Skills & Analytical Stack
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-[62ch]">
              Hover or select any capability below to inspect how it is applied across data wrangling, machine learning, and visualization workflows.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#080B12] border border-white/[0.08]"
            role="group"
            aria-label="Filter skills by category"
          >
            <button
              type="button"
              onClick={() => setSelectedCategoryId('all')}
              className={`interactive-btn px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#38BDF8] ${
                selectedCategoryId === 'all'
                  ? 'bg-[#38BDF8] text-[#080B12] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              All Domains ({SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)})
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`interactive-btn px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#38BDF8] ${
                  selectedCategoryId === cat.id
                    ? 'bg-[#38BDF8] text-[#080B12] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Live Skill Inspector Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          data-cursor-card="true"
          className="interactive-card rounded-2xl bg-[#101522] border border-[#38BDF8]/30 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
          aria-live="polite"
        >
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-[#38BDF8] font-semibold">
                {activeSkill.name}
              </span>
              <span aria-hidden="true" className="text-[#94A3B8]">·</span>
              <span className="text-[#94A3B8]">{activeSkill.category}</span>
            </div>
            <p className="text-sm sm:text-base text-[#F8FAFC] font-medium">
              {activeSkill.description}
            </p>
          </div>
          <div className="md:text-right shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-white/[0.06]">
            <div className="text-[11px] font-mono text-[#94A3B8]">
              Documented Application
            </div>
            <div className="text-xs font-medium text-[#38BDF8] mt-0.5">
              {activeSkill.appliedIn}
            </div>
          </div>
        </motion.div>

        {/* Grouped Skill Cards with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleCategories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.48,
                delay: catIdx * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-cursor-card="true"
              className={`interactive-card rounded-2xl bg-[#101522]/85 border border-white/[0.08] hover:border-[#38BDF8]/30 p-6 flex flex-col justify-between space-y-5 ${
                selectedCategoryId === 'all' && catIdx === 1
                  ? 'md:col-span-2 xl:col-span-1'
                  : ''
              }`}
            >
              <div className="space-y-4">
                <div className="border-b border-white/[0.06] pb-3.5 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-[#F8FAFC]">
                      {category.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      {category.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#94A3B8] tabular-nums">
                    {category.skills.length}
                  </span>
                </div>

                {/* Interactive Skill Items within Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {category.skills.map((skill) => {
                    const isFocused = activeSkill.name === skill.name;
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onMouseEnter={() => setActiveSkill(skill)}
                        onFocus={() => setActiveSkill(skill)}
                        onClick={() => setActiveSkill(skill)}
                        className={`group text-left p-3 rounded-xl border transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-[#38BDF8] ${
                          isFocused
                            ? 'bg-[#080B12] border-[#38BDF8]/60 shadow-sm'
                            : 'bg-[#080B12]/55 border-white/[0.06] hover:border-white/[0.18] hover:bg-[#080B12]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-sm font-semibold transition-colors ${
                              isFocused
                                ? 'text-[#38BDF8]'
                                : 'text-[#F8FAFC] group-hover:text-[#38BDF8]'
                            }`}
                          >
                            {skill.name}
                          </span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 shrink-0 ${
                              isFocused
                                ? 'bg-[#38BDF8] scale-125'
                                : 'bg-white/15 group-hover:bg-[#38BDF8]/60'
                            }`}
                          />
                        </div>
                        <p className="mt-1.5 text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                          {skill.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
