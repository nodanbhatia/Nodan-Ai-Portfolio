import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../data/portfolioData';

const ANALYTICAL_LAYERS = [
  {
    id: 'ingestion',
    stage: '01. Ingestion & Querying',
    tech: 'Python · SQL · MongoDB · Excel',
    detail:
      'Extracting, filtering, and validating structured records across multi-organization and retail datasets.',
    signal: [24, 38, 52, 68, 76, 84, 92],
  },
  {
    id: 'exploration',
    stage: '02. Wrangling, EDA & Feature Design',
    tech: 'Pandas · NumPy · Statistical Analysis',
    detail:
      'Cleaning raw records, analyzing distributions, and engineering high-leverage predictive attributes.',
    signal: [35, 58, 49, 74, 81, 88, 94],
  },
  {
    id: 'modeling',
    stage: '03. Machine Learning & NLP',
    tech: 'Scikit-learn · Random Forest · NLP · Image Processing',
    detail:
      'Training regression, sentiment classification, and preliminary image-analysis pipelines validated with MAE, RMSE, R², and Accuracy.',
    signal: [42, 64, 78, 82, 85, 86, 91],
  },
  {
    id: 'delivery',
    stage: '04. Interactive Dashboards & Decision Insights',
    tech: 'Streamlit · Plotly · Power BI · Tableau',
    detail:
      'Delivering end-to-end interactive web applications and executive reports for real-world problem solving.',
    signal: [50, 69, 77, 84, 89, 93, 97],
  },
];

export const About: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  return (
    <section
      id="about"
      className="relative z-10 py-20 sm:py-24 border-t border-white/[0.06] bg-[#080B12]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Structured Professional Profile */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-mono text-[#38BDF8] tracking-wider">
                01. Professional Profile
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight text-balance">
                Translating Complex Datasets into Validated Models & Interactive Intelligence
              </h2>
            </div>

            <p className="text-base text-[#94A3B8] leading-relaxed max-w-[68ch]">
              {PROFILE_DATA.summary}
            </p>

            {/* Core Foundation Grid (Unboxed architectural cells with staggered entrance) */}
            <div className="pt-2">
              <h3 className="text-xs font-mono text-[#94A3B8] mb-3">
                Core Technical Foundation
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-white/[0.08]">
                {PROFILE_DATA.corePillars.map((pillar, idx) => (
                  <motion.div
                    key={pillar}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    data-cursor-card="true"
                    className="group p-3.5 border-r border-b border-white/[0.08] bg-[#101522]/40 hover:bg-[#101522] transition-all duration-200"
                  >
                    <div className="font-mono text-[11px] text-[#38BDF8] tabular-nums transition-transform duration-200 group-hover:translate-x-0.5">
                      0{idx + 1}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors">
                      {pillar}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Real-World Orientation Summary */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/[0.08]">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-sm font-semibold text-[#F8FAFC]">
                  End-to-End Analytical Execution
                </h3>
                <p className="mt-1.5 text-sm text-[#94A3B8] leading-relaxed">
                  From SQL validation and Pandas data wrangling to Random Forest regression and interactive Streamlit deployment, every workflow is structured for reproducibility and measurable outcomes.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-sm font-semibold text-[#F8FAFC]">
                  Applied Multi-Domain Experience
                </h3>
                <p className="mt-1.5 text-sm text-[#94A3B8] leading-relaxed">
                  Backed by AI Data Analyst internship experience at InAmigos Foundation and projects spanning retail forecasting, NLP sentiment analytics, and computer vision.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Animated Interactive Data/AI Architecture Visual */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div
              data-cursor-card="true"
              className="interactive-card rounded-2xl bg-[#101522]/80 border border-white/[0.08] hover:border-[#38BDF8]/30 p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div>
                  <h3 className="text-sm font-semibold text-[#F8FAFC]">
                    Analytical Stack Architecture
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Select a layer to inspect how data flows into decisions
                  </p>
                </div>
                <span className="font-mono text-xs text-[#38BDF8] tabular-nums">
                  4 Layers
                </span>
              </div>

              {/* Interactive Layer Stack */}
              <div className="space-y-2.5" role="tablist" aria-label="Analytical Stack Layers">
                {ANALYTICAL_LAYERS.map((layer, index) => {
                  const isSelected = activeLayer === index;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveLayer(index)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-[#38BDF8] ${
                        isSelected
                          ? 'bg-[#080B12] border-[#38BDF8]/50 shadow-sm'
                          : 'bg-[#080B12]/40 border-white/[0.06] hover:border-white/[0.15]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[#F8FAFC]">
                          {layer.stage}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full transition-transform duration-200 ${
                            isSelected
                              ? 'bg-[#38BDF8] scale-125'
                              : 'bg-[#94A3B8]/40'
                          }`}
                        />
                      </div>
                      <div className="mt-1 text-[11px] font-mono text-[#38BDF8]">
                        {layer.tech}
                      </div>
                      {isSelected && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 text-xs text-[#94A3B8] leading-relaxed"
                        >
                          {layer.detail}
                        </motion.p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Animated SVG Signal Telemetry Graphic */}
              <div className="pt-3 border-t border-white/[0.06]">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-2">
                  <span>Pipeline Signal Propagation</span>
                  <span className="text-[#8B5CF6]">
                    {ANALYTICAL_LAYERS[activeLayer].stage.split('.')[1]}
                  </span>
                </div>
                <div className="h-16 w-full bg-[#080B12] rounded-xl border border-white/[0.06] px-4 py-2.5 flex items-end justify-between gap-2">
                  {ANALYTICAL_LAYERS[activeLayer].signal.map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
                    >
                      <motion.div
                        initial={{ height: '20%' }}
                        animate={{ height: `${val}%` }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full rounded-sm bg-gradient-to-t from-[#38BDF8]/40 to-[#8B5CF6]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
