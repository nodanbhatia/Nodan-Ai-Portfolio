import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/portfolioData';

export const DataWorkflow: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const currentStep = WORKFLOW_STEPS[activeIndex];

  return (
    <section
      aria-labelledby="workflow-heading"
      className="relative z-10 py-20 sm:py-24 border-t border-white/[0.06] bg-[#080B12]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="space-y-2">
            <p className="text-xs font-mono text-[#38BDF8] tracking-wider">
              03. End-to-End Methodology
            </p>
            <h2
              id="workflow-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight text-balance"
            >
              How I Work With Data
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-[64ch]">
              An end-to-end analytical pipeline connecting raw data collection and SQL/Pandas validation to supervised modeling and interactive dashboards.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? WORKFLOW_STEPS.length - 1 : prev - 1
                )
              }
              className="interactive-btn px-3 py-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] bg-[#101522] border border-white/[0.08] hover:border-white/[0.2] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
            >
              Previous Stage
            </button>
            <button
              type="button"
              data-magnetic="true"
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length)
              }
              className="group interactive-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#080B12] bg-[#38BDF8] hover:bg-[#7DD3FC] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
            >
              <span>Next Stage</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </motion.div>

        {/* Visual Pipeline Nodes & Animated Connecting Line */}
        <div className="relative">
          {/* Desktop horizontal connecting track */}
          <div
            className="hidden lg:block absolute top-7 left-6 right-6 h-[2px] bg-white/[0.08]"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]"
              initial={{ width: '0%' }}
              animate={{
                width: `${(activeIndex / (WORKFLOW_STEPS.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10"
            role="tablist"
            aria-label="Data Science Pipeline Stages"
          >
            {WORKFLOW_STEPS.map((step, index) => {
              const isSelected = index === activeIndex;
              const isCompleted = index <= activeIndex;
              return (
                <motion.button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex flex-col items-start lg:items-center text-left lg:text-center p-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[#38BDF8] ${
                    isSelected
                      ? 'bg-[#101522] border-[#38BDF8] shadow-sm'
                      : 'bg-[#101522]/55 border-white/[0.06] hover:border-white/[0.16] hover:bg-[#101522]'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-semibold mb-2.5 transition-all duration-200 tabular-nums ${
                      isSelected
                        ? 'bg-[#38BDF8] text-[#080B12] scale-110'
                        : isCompleted
                        ? 'bg-[#8B5CF6]/25 text-[#F8FAFC] border border-[#8B5CF6]/50'
                        : 'bg-[#080B12] text-[#94A3B8] border border-white/[0.1] group-hover:border-[#38BDF8]/50'
                    }`}
                  >
                    {step.stepNumber}
                  </div>
                  <div
                    className={`text-xs font-semibold leading-snug transition-colors ${
                      isSelected
                        ? 'text-[#38BDF8]'
                        : 'text-[#F8FAFC] group-hover:text-[#38BDF8]'
                    }`}
                  >
                    {step.title}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detail Panel */}
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          data-cursor-card="true"
          className="interactive-card rounded-2xl bg-[#101522]/85 border border-white/[0.08] hover:border-[#38BDF8]/30 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
        >
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
              <span>Stage {currentStep.stepNumber} of 08</span>
              <span aria-hidden="true" className="text-[#94A3B8]">·</span>
              <span>{currentStep.title}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">
              {currentStep.shortDesc}
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {currentStep.portfolioApplication}
            </p>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-white/[0.08] lg:pl-6 space-y-3">
            <div className="text-xs font-mono text-[#94A3B8]">
              Documented Tools & Techniques at this Stage
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm font-mono text-[#F8FAFC]">
              {currentStep.toolsUsed.map((tool, i) => (
                <React.Fragment key={tool}>
                  <span className="text-[#38BDF8] hover:text-[#F8FAFC] transition-colors">
                    {tool}
                  </span>
                  {i < currentStep.toolsUsed.length - 1 && (
                    <span aria-hidden="true" className="text-[#94A3B8]/50">
                      /
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
