/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar, NAV_ITEMS } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { DataWorkflow } from './components/DataWorkflow';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { CertificationsAndEducation } from './components/CertificationsAndEducation';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import {
  ResumePreviewModal,
  SocialConnectionModal,
} from './components/ResumeAndSocialModal';
import { CustomCursor } from './components/CustomCursor';
import { AmbientBackground } from './components/AmbientBackground';
import { ProjectItem, SOCIAL_LINKS_CONFIG } from './data/portfolioData';
import { triggerResumeDownload } from './utils/resumePdfGenerator';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [isResumePreviewOpen, setIsResumePreviewOpen] =
    useState<boolean>(false);
  const [activeSocialPlatform, setActiveSocialPlatform] = useState<
    'github' | 'linkedin' | null
  >(null);
  const [downloadToast, setDownloadToast] = useState<boolean>(false);

  // Track active section using IntersectionObserver for zero-jank scroll tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: 0.05,
      }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const handleDownloadResume = () => {
    triggerResumeDownload();
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 3200);
  };

  const handleSocialClick = (platform: 'github' | 'linkedin') => {
    const savedCustomUrl = localStorage.getItem(`nodan_social_${platform}`);
    const configuredUrl =
      savedCustomUrl ||
      (!SOCIAL_LINKS_CONFIG[platform].isPlaceholder
        ? SOCIAL_LINKS_CONFIG[platform].url
        : '');

    if (configuredUrl) {
      const anchor = document.createElement('a');
      anchor.href = configuredUrl;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      setActiveSocialPlatform(platform);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080B12] text-[#F8FAFC] flex flex-col selection:bg-[#38BDF8]/25 selection:text-[#38BDF8]">
      {/* Custom Interactive Cursor (Desktop only, pointer-events: none) */}
      <CustomCursor />

      {/* Subtle Ambient Background Motion (Behind content, pointer-events: none) */}
      <AmbientBackground />

      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#38BDF8] focus:text-[#080B12] focus:font-semibold"
      >
        Skip to content
      </a>

      {/* Sticky Top Bar Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onDownloadResume={handleDownloadResume}
        onPreviewResume={() => setIsResumePreviewOpen(true)}
      />

      {/* Main Single-Page Portfolio Content with Smooth Initial Load Entrance */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 relative z-10"
      >
        <Hero
          onNavigate={handleNavigate}
          onDownloadResume={handleDownloadResume}
          onPreviewResume={() => setIsResumePreviewOpen(true)}
          onSocialClick={handleSocialClick}
        />

        <About />

        <Skills />

        <DataWorkflow />

        <ExperienceTimeline />

        <ProjectsSection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onSocialClick={handleSocialClick}
        />

        <CertificationsAndEducation
          onDownloadResume={handleDownloadResume}
          onPreviewResume={() => setIsResumePreviewOpen(true)}
        />

        <ContactSection onSocialClick={handleSocialClick} />
      </motion.main>

      {/* Minimal Footer */}
      <Footer onSocialClick={handleSocialClick} />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSocialClick={handleSocialClick}
      />

      <ResumePreviewModal
        isOpen={isResumePreviewOpen}
        onClose={() => setIsResumePreviewOpen(false)}
        onDownloadResume={handleDownloadResume}
      />

      <SocialConnectionModal
        platform={activeSocialPlatform}
        onClose={() => setActiveSocialPlatform(null)}
      />

      {/* Subtle Download Confirmation Toast */}
      <AnimatePresence>
        {downloadToast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl bg-[#101522] border border-[#38BDF8]/45 shadow-xl flex items-center gap-3 text-xs font-mono text-[#F8FAFC]"
          >
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span>Downloading Nodan_Bhatia_Data_Scientist_Resume.pdf</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
