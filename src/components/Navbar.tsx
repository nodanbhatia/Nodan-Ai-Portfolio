import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Download, Menu, X } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onDownloadResume: () => void;
  onPreviewResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onDownloadResume,
  onPreviewResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#080B12]/90 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-[#080B12]/70 backdrop-blur-sm border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand wordmark */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="font-display text-lg font-bold tracking-tight text-[#F8FAFC] hover:text-[#38BDF8] transition-all duration-200 hover:translate-x-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#38BDF8] rounded-sm"
        >
          Nodan Bhatia
        </a>

        {/* Zone 2: Clean typographic navigation links with smooth hover & active indicators */}
        <nav
          aria-label="Primary Portfolio Navigation"
          onMouseLeave={() => setHoveredId(null)}
          className="hidden lg:flex items-center gap-5 xl:gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#38BDF8] rounded-sm ${
                  isActive
                    ? 'text-[#F8FAFC]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {item.label}

                {/* Subtle hover underline indicator */}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full transition-transform duration-200 origin-left ${
                    isHovered && !isActive
                      ? 'bg-white/30 scale-x-100'
                      : 'bg-transparent scale-x-0'
                  }`}
                />

                {/* Smooth spring active indicator */}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#38BDF8]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Resume Actions & Mobile Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onPreviewResume}
            className="interactive-btn hidden sm:inline-flex items-center px-3 py-2 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors whitespace-nowrap rounded-lg focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
          >
            View CV
          </button>
          <button
            type="button"
            data-magnetic="true"
            onClick={onDownloadResume}
            className="group interactive-btn inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#080B12] bg-[#38BDF8] hover:bg-[#7DD3FC] transition-colors rounded-lg whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          >
            <Download
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
            <span>Download Resume</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="interactive-btn lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#F8FAFC] hover:bg-[#101522] border border-white/[0.08] transition-colors focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation-menu"
            aria-label="Mobile Portfolio Navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#101522] border-b border-white/[0.08] px-4 pt-2 pb-4"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.04]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPreviewResume();
                }}
                className="w-full py-2 px-3 text-xs font-medium text-[#F8FAFC] bg-white/[0.05] hover:bg-white/[0.1] rounded-lg transition-colors text-center"
              >
                Preview Full Resume
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
