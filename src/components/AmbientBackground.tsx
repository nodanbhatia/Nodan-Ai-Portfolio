import React from 'react';

const FLOATING_NODES = [
  { id: 1, left: '12%', top: '18%', size: 'w-1.5 h-1.5', delay: '0s', duration: '18s', color: 'bg-[#38BDF8]/20' },
  { id: 2, left: '84%', top: '26%', size: 'w-1 h-1', delay: '3s', duration: '22s', color: 'bg-[#8B5CF6]/25' },
  { id: 3, left: '22%', top: '54%', size: 'w-1 h-1', delay: '6s', duration: '20s', color: 'bg-[#38BDF8]/15' },
  { id: 4, left: '76%', top: '64%', size: 'w-1.5 h-1.5', delay: '2s', duration: '24s', color: 'bg-[#8B5CF6]/20' },
  { id: 5, left: '46%', top: '38%', size: 'w-1 h-1', delay: '8s', duration: '19s', color: 'bg-[#38BDF8]/15' },
  { id: 6, left: '62%', top: '82%', size: 'w-1 h-1', delay: '4s', duration: '21s', color: 'bg-[#38BDF8]/20' },
];

/**
 * AmbientBackground
 * Purely CSS-driven, zero-JS-loop ambient background motion that sits behind all content.
 * Respects `prefers-reduced-motion` automatically via global CSS rules.
 */
export const AmbientBackground: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Slow-drifting soft cyan ambient glow */}
      <div
        className="absolute -top-32 -left-32 w-[460px] h-[460px] rounded-full opacity-[0.06] blur-[120px] animate-ambient-drift-slow"
        style={{
          background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)',
        }}
      />

      {/* Slow-drifting soft violet ambient glow */}
      <div
        className="absolute top-1/2 -right-36 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[130px] animate-ambient-drift-reverse"
        style={{
          background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
        }}
      />

      {/* Sparse floating micro data particles */}
      {FLOATING_NODES.map((node) => (
        <span
          key={node.id}
          style={{
            left: node.left,
            top: node.top,
            animationDelay: node.delay,
            animationDuration: node.duration,
          }}
          className={`absolute rounded-full ${node.size} ${node.color} animate-float-particle`}
        />
      ))}
    </div>
  );
};
