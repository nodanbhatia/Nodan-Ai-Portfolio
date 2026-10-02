import React, { useEffect, useRef, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

/**
 * CustomCursor
 * - Primary dot + smooth trailing ring using requestAnimationFrame interpolation
 * - Expands on interactive elements (buttons, links, cards, images/SVGs, nav items)
 * - Subtle magnetic pull on elements marked with `data-magnetic="true"`
 * - Click scale + expanding ripple animation
 * - Automatically disabled on touch/mobile/tablet devices and `prefers-reduced-motion`
 */
export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverKind, setHoverKind] = useState<'none' | 'interactive' | 'card'>('none');
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateAvailability = () => {
      const canUseCustomCursor =
        finePointerQuery.matches &&
        !reducedMotionQuery.matches &&
        window.innerWidth >= 1024;
      setEnabled(canUseCustomCursor);
    };

    updateAvailability();
    finePointerQuery.addEventListener('change', updateAvailability);
    reducedMotionQuery.addEventListener('change', updateAvailability);
    window.addEventListener('resize', updateAvailability, { passive: true });

    return () => {
      finePointerQuery.removeEventListener('change', updateAvailability);
      reducedMotionQuery.removeEventListener('change', updateAvailability);
      window.removeEventListener('resize', updateAvailability);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let rafId = 0;
    let activeMagneticEl: HTMLElement | null = null;

    const resetMagneticElement = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.transform = '';
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) {
        ring.x = e.clientX;
        ring.y = e.clientY;
        setIsVisible(true);
      }

      // Update primary dot immediately for zero-latency responsiveness
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }

      // Subtle magnetic effect for primary buttons marked with data-magnetic
      const target = e.target as HTMLElement | null;
      const magneticEl = target?.closest?.('[data-magnetic="true"]') as HTMLElement | null;

      if (magneticEl) {
        if (activeMagneticEl && activeMagneticEl !== magneticEl) {
          resetMagneticElement(activeMagneticEl);
        }
        activeMagneticEl = magneticEl;
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.18;
        const deltaY = (e.clientY - centerY) * 0.18;
        magneticEl.style.transform = `translate3d(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px, 0)`;
      } else if (activeMagneticEl) {
        resetMagneticElement(activeMagneticEl);
        activeMagneticEl = null;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'button, a, input, textarea, select, [role="button"], [role="tab"], [data-cursor="interactive"]'
      );
      if (interactiveEl) {
        setHoverKind('interactive');
        return;
      }

      const cardOrVisualEl = target.closest(
        'article, [data-cursor-card="true"], svg, img, canvas'
      );
      if (cardOrVisualEl) {
        setHoverKind('card');
        return;
      }

      setHoverKind('none');
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsPressed(true);
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 520);
    };

    const handleMouseUp = () => {
      setIsPressed(false);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
      resetMagneticElement(activeMagneticEl);
      activeMagneticEl = null;
    };

    const animateRing = () => {
      rafId = requestAnimationFrame(animateRing);
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x.toFixed(2)}px, ${ring.y.toFixed(2)}px, 0) translate(-50%, -50%)`;
      }
    };

    rafId = requestAnimationFrame(animateRing);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      cancelAnimationFrame(rafId);
      resetMagneticElement(activeMagneticEl);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [enabled, isVisible]);

  if (!enabled) return null;

  const ringSizeClass =
    hoverKind === 'interactive'
      ? 'w-12 h-12 border-[#38BDF8]/75 bg-[#38BDF8]/[0.08]'
      : hoverKind === 'card'
      ? 'w-10 h-10 border-[#8B5CF6]/65 bg-[#8B5CF6]/[0.05]'
      : 'w-7 h-7 border-[#38BDF8]/45 bg-transparent';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-[width,height,border-color,background-color,opacity] duration-200 ease-out will-change-transform ${ringSizeClass} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isPressed ? 'scale-90' : 'scale-100'}`}
      />

      {/* Primary Cursor Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full bg-[#38BDF8] transition-[width,height,opacity,background-color] duration-150 ease-out will-change-transform ${
          hoverKind === 'interactive'
            ? 'w-2 h-2 bg-[#F8FAFC]'
            : 'w-1.5 h-1.5 bg-[#38BDF8]'
        } ${isVisible ? 'opacity-100' : 'opacity-0'} ${
          isPressed ? 'scale-75' : 'scale-100'
        }`}
      />

      {/* Click Ripple Effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{ left: ripple.x, top: ripple.y }}
          className="fixed -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-[#38BDF8]/70 animate-cursor-ripple pointer-events-none"
        />
      ))}
    </div>
  );
};
