import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Eye, Github, Info } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onSocialClick: (platform: 'github' | 'linkedin') => void;
}

const SAMPLE_SENTIMENT_POSTS = [
  {
    id: 'post-1',
    text: 'The new interactive dashboard makes weekly reporting much faster and clearer for our entire analytics team.',
    sentiment: 'Positive' as const,
    engagementTier: 'High Engagement',
    tokens: ['interactive', 'faster', 'clearer'],
  },
  {
    id: 'post-2',
    text: 'Platform update scheduled for Tuesday at 03:00 UTC. Standard maintenance window applies.',
    sentiment: 'Neutral' as const,
    engagementTier: 'Baseline Reach',
    tokens: ['update', 'scheduled', 'standard'],
  },
  {
    id: 'post-3',
    text: 'Data export timed out twice during peak hours before the query index was updated.',
    sentiment: 'Negative' as const,
    engagementTier: 'Elevated Replies',
    tokens: ['timed out', 'twice', 'peak'],
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onSocialClick,
}) => {
  // Interactive state for Project 1 (Walmart Sales) card visual
  const [walmartView, setWalmartView] = useState<'fit' | 'metrics'>('fit');

  // Interactive state for Project 2 (Sentiment NLP) card visual
  const [selectedPostIdx, setSelectedPostIdx] = useState<number>(0);

  // Interactive state for Project 3 (AI Skin Specialist) CV pipeline stage
  const [cvStage, setCvStage] = useState<'raw' | 'preprocessed' | 'segmented'>('preprocessed');

  return (
    <section
      id="projects"
      className="relative z-10 py-20 sm:py-28 border-t border-white/[0.06] bg-[#080B12]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-mono text-[#38BDF8] tracking-wider">
              05. Featured Case Studies
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight text-balance">
              End-to-End Data Science & Machine Learning Projects
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Production-oriented analytical systems demonstrating data wrangling, exploratory data analysis, feature engineering, model evaluation, and interactive visualization.
            </p>
          </div>

          <div className="text-xs font-mono text-[#94A3B8]">
            Select <span className="text-[#F8FAFC]">View Details</span> on any project for full pipeline architecture
          </div>
        </motion.div>

        {/* Project Cards Stack */}
        <div className="space-y-10">
          {PROJECTS_DATA.map((project, projIdx) => {
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.55,
                  delay: projIdx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                data-cursor-card="true"
                className="interactive-card rounded-2xl bg-[#101522]/90 border border-white/[0.09] hover:border-[#38BDF8]/35 transition-colors overflow-hidden"
              >
                <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left 7 Columns: Project Narrative, Capabilities, Stack & Actions */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Kicker & Title */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#38BDF8]">
                        <span>Project {project.index}</span>
                        <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                        <span className="text-[#94A3B8]">{project.subtitle}</span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
                        {project.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#F8FAFC]/90 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Documented Resume Bullet Points */}
                    <ul className="space-y-2.5 text-sm text-[#94A3B8] leading-relaxed">
                      {project.bulletPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span
                            className="font-mono text-xs text-[#38BDF8] mt-1 shrink-0 tabular-nums"
                            aria-hidden="true"
                          >
                            —
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Mandatory Educational Disclaimer for Project 3 */}
                    {project.disclaimer && (
                      <div className="p-4 rounded-xl bg-[#080B12] border border-amber-400/30 flex items-start gap-3">
                        <Info
                          className="w-4 h-4 text-amber-300 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-amber-200">
                            AI-Assisted Preliminary Image Classification Disclaimer
                          </div>
                          <p className="text-xs text-[#94A3B8] leading-relaxed">
                            {project.disclaimer}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Technologies & Key Capabilities (Unboxed Clean Typography) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.07]">
                      <div>
                        <div className="text-xs font-mono text-[#94A3B8] mb-1.5">
                          Technologies Used
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#38BDF8]">
                          {project.technologies.map((tech, i) => (
                            <React.Fragment key={tech}>
                              <span className="hover:text-[#F8FAFC] transition-colors">
                                {tech}
                              </span>
                              {i < project.technologies.length - 1 && (
                                <span aria-hidden="true" className="text-[#94A3B8]/50">
                                  ·
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-mono text-[#94A3B8] mb-1.5">
                          Key Capabilities
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#F8FAFC]/85">
                          {project.features.map((feat, i) => (
                            <React.Fragment key={feat}>
                              <span>{feat}</span>
                              {i < project.features.length - 1 && (
                                <span aria-hidden="true" className="text-[#94A3B8]/50">
                                  ·
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        data-magnetic="true"
                        onClick={() => onSelectProject(project)}
                        className="group interactive-btn inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#080B12] bg-[#38BDF8] hover:bg-[#7DD3FC] rounded-xl transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                      >
                        <Eye
                          className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                          aria-hidden="true"
                        />
                        <span>View Details</span>
                      </button>

                      <button
                        type="button"
                        data-magnetic="true"
                        onClick={() => {
                          if (project.githubUrl) {
                            window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                          } else {
                            onSocialClick('github');
                          }
                        }}
                        className="group interactive-btn inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#F8FAFC] bg-[#080B12] hover:bg-white/[0.06] border border-white/[0.12] hover:border-[#38BDF8]/35 rounded-xl transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
                      >
                        <Github
                          className="w-4 h-4 text-[#38BDF8] transition-transform duration-200 group-hover:rotate-6"
                          aria-hidden="true"
                        />
                        <span>GitHub</span>
                      </button>

                      {/* Only render Live Demo button if a real live URL exists */}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group interactive-btn inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#38BDF8] border border-[#38BDF8]/30 rounded-xl hover:bg-[#38BDF8]/10 transition-colors whitespace-nowrap"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight
                            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right 5 Columns: Prominent Documented Metric + Interactive Analytical Workbench */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* PROJECT 1: Walmart Sales Intelligence System Visual */}
                    {project.id === 'walmart-sales' && project.documentedResult && (
                      <div className="rounded-xl bg-[#080B12] border border-white/[0.08] p-5 space-y-5">
                        {/* Prominent 82% R² Metric Header */}
                        <div className="grid grid-cols-2 gap-3 pb-4 border-b border-white/[0.08]">
                          <div className="p-3.5 rounded-lg bg-[#101522] border border-[#38BDF8]/35 transition-transform duration-200 hover:-translate-y-0.5">
                            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#38BDF8] tabular-nums">
                              82% R²
                            </div>
                            <div className="text-xs font-medium text-[#F8FAFC] mt-0.5">
                              Test Set Score
                            </div>
                            <div className="text-[11px] text-[#94A3B8]">
                              Random Forest Regression
                            </div>
                          </div>
                          <div className="p-3.5 rounded-lg bg-[#101522]/70 border border-white/[0.07] transition-transform duration-200 hover:-translate-y-0.5">
                            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#F8FAFC] tabular-nums">
                              10,000+
                            </div>
                            <div className="text-xs font-medium text-[#F8FAFC] mt-0.5">
                              Sales Records
                            </div>
                            <div className="text-[11px] text-[#94A3B8]">
                              Evaluated: MAE · RMSE · R²
                            </div>
                          </div>
                        </div>

                        {/* Interactive Toggle for Illustrative Streamlit Preview */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-mono text-[#94A3B8]">
                              Illustrative Model & KPI Representation
                            </span>
                            <div className="flex items-center gap-1 bg-[#101522] p-0.5 rounded-lg border border-white/[0.06]">
                              <button
                                type="button"
                                onClick={() => setWalmartView('fit')}
                                className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors ${
                                  walmartView === 'fit'
                                    ? 'bg-[#38BDF8]/20 text-[#38BDF8]'
                                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                                }`}
                              >
                                Regression Fit
                              </button>
                              <button
                                type="button"
                                onClick={() => setWalmartView('metrics')}
                                className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors ${
                                  walmartView === 'metrics'
                                    ? 'bg-[#38BDF8]/20 text-[#38BDF8]'
                                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                                }`}
                              >
                                Evaluation Suite
                              </button>
                            </div>
                          </div>

                          {walmartView === 'fit' ? (
                            <div className="group p-3.5 rounded-xl bg-[#101522]/60 border border-white/[0.06] space-y-2 overflow-hidden">
                              <svg
                                viewBox="0 0 320 130"
                                className="w-full h-32 transition-transform duration-300 group-hover:scale-[1.03]"
                                role="img"
                                aria-label="Illustrative chart showing Random Forest predicted vs actual sales trajectory"
                              >
                                {/* Grid lines */}
                                <line x1="20" y1="25" x2="305" y2="25" stroke="rgba(255,255,255,0.06)" />
                                <line x1="20" y1="65" x2="305" y2="65" stroke="rgba(255,255,255,0.06)" />
                                <line x1="20" y1="105" x2="305" y2="105" stroke="rgba(255,255,255,0.06)" />
                                {/* Actual trajectory */}
                                <polyline
                                  fill="none"
                                  stroke="#94A3B8"
                                  strokeWidth="1.5"
                                  strokeDasharray="3 3"
                                  points="25,95 65,78 105,84 145,52 185,60 225,36 265,44 300,22"
                                />
                                {/* Random Forest Predicted trajectory */}
                                <polyline
                                  fill="none"
                                  stroke="#38BDF8"
                                  strokeWidth="2.5"
                                  points="25,92 65,80 105,81 145,56 185,58 225,39 265,42 300,25"
                                />
                                <g fill="#38BDF8">
                                  <circle cx="25" cy="92" r="3" />
                                  <circle cx="105" cy="81" r="3" />
                                  <circle cx="185" cy="58" r="3" />
                                  <circle cx="265" cy="42" r="3" />
                                  <circle cx="300" cy="25" r="3.5" fill="#8B5CF6" />
                                </g>
                              </svg>
                              <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                                <span>Solid: RF Prediction (R² = 0.82)</span>
                                <span>Dashed: Actual Test Set</span>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3.5 rounded-xl bg-[#101522]/60 border border-white/[0.06] space-y-2.5 text-xs">
                              <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
                                <span className="font-mono text-[#38BDF8]">R² Score</span>
                                <span className="font-mono text-[#F8FAFC] font-semibold tabular-nums">
                                  82% (Documented Test Set)
                                </span>
                              </div>
                              <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
                                <span className="font-mono text-[#38BDF8]">MAE</span>
                                <span className="text-[#94A3B8]">
                                  Mean Absolute Error Evaluation
                                </span>
                              </div>
                              <div className="flex items-center justify-between py-1.5">
                                <span className="font-mono text-[#38BDF8]">RMSE</span>
                                <span className="text-[#94A3B8]">
                                  Root Mean Squared Error Validation
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* PROJECT 2: Social Media Sentiment & Engagement Analytics Visual */}
                    {project.id === 'social-sentiment' && project.documentedResult && (
                      <div className="rounded-xl bg-[#080B12] border border-white/[0.08] p-5 space-y-5">
                        {/* Prominent 86% Accuracy Metric Header */}
                        <div className="grid grid-cols-2 gap-3 pb-4 border-b border-white/[0.08]">
                          <div className="p-3.5 rounded-lg bg-[#101522] border border-[#8B5CF6]/40 transition-transform duration-200 hover:-translate-y-0.5">
                            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#38BDF8] tabular-nums">
                              86% Accuracy
                            </div>
                            <div className="text-xs font-medium text-[#F8FAFC] mt-0.5">
                              Sentiment Classification
                            </div>
                            <div className="text-[11px] text-[#94A3B8]">
                              Evaluated Dataset Result
                            </div>
                          </div>
                          <div className="p-3.5 rounded-lg bg-[#101522]/70 border border-white/[0.07] transition-transform duration-200 hover:-translate-y-0.5">
                            <div className="font-mono text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                              3 Classes
                            </div>
                            <div className="text-xs font-medium text-[#F8FAFC] mt-1">
                              Polarity Distribution
                            </div>
                            <div className="text-[11px] text-[#94A3B8]">
                              Positive · Neutral · Negative
                            </div>
                          </div>
                        </div>

                        {/* Interactive Illustrative Sentiment Demo */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                            <span>Illustrative — Representative Demo Data</span>
                            <span className="text-[#38BDF8]">NLP Classifier</span>
                          </div>

                          {/* Sample Selector Buttons */}
                          <div className="flex items-center gap-1.5" role="group" aria-label="Select illustrative social media post">
                            {SAMPLE_SENTIMENT_POSTS.map((post, idx) => (
                              <button
                                key={post.id}
                                type="button"
                                onClick={() => setSelectedPostIdx(idx)}
                                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono transition-all duration-200 border ${
                                  selectedPostIdx === idx
                                    ? 'bg-[#101522] text-[#38BDF8] border-[#38BDF8]/40'
                                    : 'bg-[#101522]/40 text-[#94A3B8] border-white/[0.06] hover:text-[#F8FAFC]'
                                }`}
                              >
                                Sample #{idx + 1} ({post.sentiment})
                              </button>
                            ))}
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#101522]/75 border border-white/[0.06] space-y-2.5">
                            <p className="text-xs text-[#F8FAFC] italic leading-relaxed">
                              “{SAMPLE_SENTIMENT_POSTS[selectedPostIdx].text}”
                            </p>
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06] text-xs font-mono">
                              <span className="text-[#38BDF8]">
                                Class: {SAMPLE_SENTIMENT_POSTS[selectedPostIdx].sentiment}
                              </span>
                              <span className="text-[#94A3B8]">
                                {SAMPLE_SENTIMENT_POSTS[selectedPostIdx].engagementTier}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PROJECT 3: AI Skin Specialist – Multimodal AI Assistant Visual */}
                    {project.id === 'ai-skin-specialist' && (
                      <div className="rounded-xl bg-[#080B12] border border-white/[0.08] p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                          <div>
                            <div className="text-xs font-semibold text-[#F8FAFC]">
                              Computer Vision Preprocessing Interface
                            </div>
                            <div className="text-[11px] text-[#94A3B8]">
                              AI-assisted preliminary image classification workflow
                            </div>
                          </div>
                          <span className="font-mono text-[11px] text-[#38BDF8]">
                            CV Pipeline
                          </span>
                        </div>

                        {/* Interactive Stage Switcher */}
                        <div
                          className="grid grid-cols-3 gap-1.5 bg-[#101522] p-1 rounded-lg border border-white/[0.06]"
                          role="group"
                          aria-label="Inspect computer vision preprocessing stages"
                        >
                          {(
                            [
                              { id: 'raw', label: '1. Input Frame' },
                              { id: 'preprocessed', label: '2. Normalized' },
                              { id: 'segmented', label: '3. Feature ROI' },
                            ] as const
                          ).map((st) => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => setCvStage(st.id)}
                              className={`py-1.5 px-2 text-[11px] font-mono rounded-md transition-colors whitespace-nowrap ${
                                cvStage === st.id
                                  ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30'
                                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                              }`}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>

                        {/* Visual Inspection Mockup Canvas */}
                        <div className="group relative h-40 rounded-xl bg-[#101522] border border-white/[0.06] flex items-center justify-center overflow-hidden p-4">
                          <svg
                            viewBox="0 0 280 120"
                            className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]"
                            role="img"
                            aria-label="Illustrative computer vision region-of-interest analysis diagram"
                          >
                            {/* Measurement reticle grid */}
                            <g stroke="rgba(148,163,184,0.12)" strokeWidth="1">
                              <line x1="0" y1="30" x2="280" y2="30" />
                              <line x1="0" y1="60" x2="280" y2="60" />
                              <line x1="0" y1="90" x2="280" y2="90" />
                              <line x1="70" y1="0" x2="70" y2="120" />
                              <line x1="140" y1="0" x2="140" y2="120" />
                              <line x1="210" y1="0" x2="210" y2="120" />
                            </g>

                            {/* Region of interest contour */}
                            <ellipse
                              cx="140"
                              cy="60"
                              rx={cvStage === 'raw' ? 42 : 45}
                              ry={cvStage === 'raw' ? 30 : 32}
                              fill={
                                cvStage === 'segmented'
                                  ? 'rgba(56, 189, 248, 0.16)'
                                  : 'rgba(139, 92, 246, 0.1)'
                              }
                              stroke={cvStage === 'raw' ? '#94A3B8' : '#38BDF8'}
                              strokeWidth="1.75"
                              strokeDasharray={cvStage === 'segmented' ? '4 2' : undefined}
                            />

                            {/* Bounding Box & Keypoints in Normalized / Segmented modes */}
                            {cvStage !== 'raw' && (
                              <g>
                                <rect
                                  x="86"
                                  y="22"
                                  width="108"
                                  height="76"
                                  fill="none"
                                  stroke="#8B5CF6"
                                  strokeWidth="1.2"
                                  strokeDasharray="3 3"
                                />
                                <circle cx="140" cy="60" r="3" fill="#38BDF8" />
                                <circle cx="122" cy="52" r="2" fill="#38BDF8" />
                                <circle cx="158" cy="66" r="2" fill="#38BDF8" />
                              </g>
                            )}
                          </svg>

                          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                            <span>
                              {cvStage === 'raw'
                                ? 'Stage: Raw Image Acquisition'
                                : cvStage === 'preprocessed'
                                ? 'Stage: Noise & Contrast Normalization'
                                : 'Stage: ROI Feature Extraction → ML Classifier'}
                            </span>
                            <span className="text-[#38BDF8]">Research Mode</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
