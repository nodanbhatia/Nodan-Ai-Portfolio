import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Info, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSocialClick: (platform: 'github' | 'linkedin') => void;
}

function classifyIllustrativeText(input: string): {
  label: 'Positive' | 'Neutral' | 'Negative';
  matchedTokens: string[];
} {
  const lower = input.toLowerCase();
  const posWords = [
    'great',
    'excellent',
    'good',
    'helpful',
    'fast',
    'accurate',
    'love',
    'best',
    'improved',
    'clear',
    'insightful',
    'smooth',
    'impressive',
  ];
  const negWords = [
    'slow',
    'error',
    'bug',
    'bad',
    'fail',
    'broken',
    'poor',
    'crash',
    'issue',
    'delay',
    'worst',
    'timeout',
  ];

  const foundPos = posWords.filter((w) => lower.includes(w));
  const foundNeg = negWords.filter((w) => lower.includes(w));

  if (foundPos.length > foundNeg.length) {
    return { label: 'Positive', matchedTokens: foundPos };
  }
  if (foundNeg.length > foundPos.length) {
    return { label: 'Negative', matchedTokens: foundNeg };
  }
  return { label: 'Neutral', matchedTokens: [] };
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSocialClick,
}) => {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);
  const [customSentimentInput, setCustomSentimentInput] = useState<string>(
    'The interactive analytics dashboard provided clear and accurate insights for our team.'
  );

  useEffect(() => {
    setActiveWorkflowStep(0);
  }, [project?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  const demoSentimentResult = classifyIllustrativeText(customSentimentInput);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#101522] border border-white/[0.12] shadow-2xl p-6 sm:p-8 lg:p-10 space-y-8"
          >
            {/* Top Header & Close Button */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-6">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#38BDF8]">
                  <span>Case Study {project.index}</span>
                  <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                  <span className="text-[#94A3B8]">{project.subtitle}</span>
                </div>
                <h2
                  id="project-modal-title"
                  className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]"
                >
                  {project.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details modal"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#080B12] text-[#94A3B8] hover:text-[#F8FAFC] border border-white/[0.1] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* 1. OVERVIEW & DOCUMENTED RESULTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-3">
                <h3 className="text-xs font-mono text-[#38BDF8]">
                  01. Overview
                </h3>
                <p className="text-sm sm:text-base text-[#F8FAFC]/90 leading-relaxed">
                  {project.description}
                </p>
                <ul className="space-y-2 pt-2 text-sm text-[#94A3B8]">
                  {project.bulletPoints.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-[#38BDF8] mt-1 shrink-0">
                        •
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results / Disclaimer Panel */}
              <div className="lg:col-span-5">
                {project.documentedResult ? (
                  <div className="rounded-xl bg-[#080B12] border border-[#38BDF8]/35 p-5 space-y-3">
                    <div className="text-xs font-mono text-[#94A3B8]">
                      Documented Evaluation Result
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-3xl sm:text-4xl font-bold text-[#38BDF8] tabular-nums">
                        {project.documentedResult.primaryValue}
                      </span>
                      <span className="text-xs font-medium text-[#F8FAFC]">
                        {project.documentedResult.primaryLabel}
                      </span>
                    </div>
                    {project.documentedResult.secondaryValue && (
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                        <span className="font-mono text-[#F8FAFC] font-semibold">
                          {project.documentedResult.secondaryValue}
                        </span>
                        <span className="text-[#94A3B8]">
                          {project.documentedResult.secondaryLabel}
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-[#94A3B8] leading-relaxed pt-1">
                      {project.documentedResult.summaryText}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl bg-[#080B12] border border-amber-400/30 p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-200">
                      <Info className="w-4 h-4 text-amber-300" aria-hidden="true" />
                      <span>Scope & Research Notice</span>
                    </div>
                    <p className="text-xs text-[#F8FAFC]/90 leading-relaxed">
                      AI-assisted preliminary image classification system built with Python, Machine Learning, and Image Processing.
                    </p>
                    {project.disclaimer && (
                      <p className="text-xs text-[#94A3B8] leading-relaxed border-t border-white/[0.06] pt-2">
                        {project.disclaimer}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 2. TECHNOLOGY STACK & KEY CAPABILITIES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/[0.08]">
              <div className="space-y-2">
                <h3 className="text-xs font-mono text-[#38BDF8]">
                  02. Technology Stack
                </h3>
                <div className="p-4 rounded-xl bg-[#080B12] border border-white/[0.06] flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm font-mono text-[#F8FAFC]">
                  {project.technologies.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span className="text-[#38BDF8]">{tech}</span>
                      {idx < project.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-[#94A3B8]/50">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-mono text-[#38BDF8]">
                  03. Key Capabilities
                </h3>
                <div className="p-4 rounded-xl bg-[#080B12] border border-white/[0.06] flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-[#F8FAFC]/90">
                  {project.features.map((feat, idx) => (
                    <React.Fragment key={feat}>
                      <span>{feat}</span>
                      {idx < project.features.length - 1 && (
                        <span aria-hidden="true" className="text-[#94A3B8]/50">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. INTERACTIVE END-TO-END WORKFLOW PIPELINE */}
            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xs font-mono text-[#38BDF8]">
                  04. End-to-End Architecture & Workflow
                </h3>
                <span className="text-xs text-[#94A3B8]">
                  Select any stage to inspect implementation details
                </span>
              </div>

              {/* Workflow Step Buttons */}
              <div
                className="flex flex-wrap items-center gap-2"
                role="tablist"
                aria-label="Project workflow stages"
              >
                {project.workflow.map((stage, idx) => {
                  const isSelected = activeWorkflowStep === idx;
                  return (
                    <React.Fragment key={stage.step}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveWorkflowStep(idx)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-colors border focus-visible:outline-2 focus-visible:outline-[#38BDF8] ${
                          isSelected
                            ? 'bg-[#38BDF8] text-[#080B12] font-semibold border-[#38BDF8]'
                            : 'bg-[#080B12] text-[#94A3B8] hover:text-[#F8FAFC] border-white/[0.08]'
                        }`}
                      >
                        <span className="font-mono mr-1.5">{stage.step}.</span>
                        <span>{stage.title}</span>
                      </button>
                      {idx < project.workflow.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="text-xs font-mono text-[#94A3B8]/50"
                        >
                          →
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Selected Workflow Stage Detail */}
              <div className="p-5 rounded-xl bg-[#080B12] border border-white/[0.08] space-y-1.5">
                <div className="text-xs font-mono text-[#38BDF8]">
                  Stage {project.workflow[activeWorkflowStep]?.step} —{' '}
                  {project.workflow[activeWorkflowStep]?.title}
                </div>
                <p className="text-sm text-[#F8FAFC]/90 leading-relaxed">
                  {project.workflow[activeWorkflowStep]?.detail}
                </p>
              </div>
            </div>

            {/* 4. PROJECT-SPECIFIC INTERACTIVE ANALYTICAL VIEW */}
            {project.id === 'social-sentiment' && (
              <div className="space-y-4 pt-6 border-t border-white/[0.08]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs font-mono text-[#38BDF8]">
                    05. Interactive Sentiment Sandbox (Illustrative Demo)
                  </h3>
                  <span className="text-xs font-mono text-[#94A3B8]">
                    Documented Project Accuracy: 86%
                  </span>
                </div>
                <div className="p-5 rounded-xl bg-[#080B12] border border-white/[0.08] space-y-4">
                  <label
                    htmlFor="sentiment-demo-input"
                    className="block text-xs text-[#94A3B8]"
                  >
                    Test an illustrative user-generated post to inspect Positive / Neutral / Negative polarity classification:
                  </label>
                  <input
                    id="sentiment-demo-input"
                    type="text"
                    value={customSentimentInput}
                    onChange={(e) => setCustomSentimentInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#101522] border border-white/[0.12] text-sm text-[#F8FAFC] focus:outline-none focus:border-[#38BDF8]"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono">
                    <div>
                      <span className="text-[#94A3B8]">Predicted Class: </span>
                      <span className="text-[#38BDF8] font-semibold">
                        {demoSentimentResult.label}
                      </span>
                    </div>
                    <div className="text-[#94A3B8]">
                      {demoSentimentResult.matchedTokens.length > 0
                        ? `Key Polarity Signals: ${demoSentimentResult.matchedTokens.join(', ')}`
                        : 'Neutral / Informational Polarity'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer Actions */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  if (project.githubUrl) {
                    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                  } else {
                    onSocialClick('github');
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#080B12] hover:bg-white/[0.06] border border-white/[0.12] text-xs sm:text-sm font-medium text-[#F8FAFC] transition-colors focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
              >
                <Github className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                <span>View Source on GitHub</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#7DD3FC] text-xs sm:text-sm font-semibold text-[#080B12] transition-colors focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
              >
                Close Case Study
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
