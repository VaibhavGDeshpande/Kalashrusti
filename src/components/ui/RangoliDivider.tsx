'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RangoliDividerProps {
  className?: string;
  theme?: 'gold' | 'maroon' | 'cream';
  loop?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RangoliDivider: React.FC<RangoliDividerProps> = ({
  className = '',
  theme = 'gold',
  loop = false,
  size = 'md',
}) => {
  const strokeColor = theme === 'maroon' ? '#6B1D2A' : theme === 'cream' ? '#FFF8EC' : '#C9A24B';
  const accentColor = theme === 'cream' ? '#F5A623' : '#F5A623';
  const svgDimension = size === 'lg' ? 76 : size === 'sm' ? 44 : 58;

  return (
    <div className={`w-full flex items-center justify-center my-6 py-2 overflow-hidden ${className}`}>
      <div className="flex items-center gap-3 w-full max-w-4xl px-4">
        {/* Left flourish line with self-drawing reveal */}
        <motion.div
          initial={{ scaleX: 0, originX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A24B]/60 to-[#C9A24B]"
        />

        {/* Central Rangoli Mandala SVG with vibrant, visible drawing animation */}
        <motion.div
          initial={{ rotate: -15, scale: 0.85, opacity: 0 }}
          animate={
            loop
              ? {
                  rotate: [-10, 0, 10, 0, -10],
                  scale: [0.96, 1.06, 0.96],
                  opacity: 1,
                }
              : undefined
          }
          whileInView={!loop ? { rotate: 0, scale: 1, opacity: 1 } : undefined}
          viewport={{ once: true, margin: '-50px' }}
          transition={
            loop
              ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.4, ease: 'easeOut' }
          }
          className="flex items-center justify-center shrink-0"
        >
          <svg
            width={svgDimension}
            height={svgDimension}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 drop-shadow-[0_2px_8px_rgba(245,166,35,0.4)]"
          >
            {/* Outer Petals / Stars - Crisp & Fast Self-Drawing */}
            <motion.path
              d="M50 5 L55 35 L85 30 L60 50 L85 70 L55 65 L50 95 L45 65 L15 70 L40 50 L15 30 L45 35 Z"
              stroke={strokeColor}
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={
                loop
                  ? {
                      pathLength: [0, 1, 1, 0],
                      opacity: [0.7, 1, 1, 0.7],
                    }
                  : undefined
              }
              whileInView={!loop ? { pathLength: 1 } : undefined}
              viewport={{ once: true }}
              transition={
                loop
                  ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.5, ease: 'easeInOut' }
              }
            />
            {/* Inner Ring with Fast Dynamic Rotation */}
            <motion.circle
              cx="50"
              cy="50"
              r="16"
              stroke={strokeColor}
              strokeWidth="1.8"
              strokeDasharray="3 3"
              fill="none"
              initial={{ scale: 0 }}
              animate={
                loop
                  ? {
                      scale: [0.88, 1.14, 0.88],
                      rotate: 360,
                    }
                  : undefined
              }
              whileInView={!loop ? { scale: 1 } : undefined}
              viewport={{ once: true }}
              transition={
                loop
                  ? { duration: 1.4, repeat: Infinity, ease: 'linear' }
                  : { duration: 0.35, delay: 0.1 }
              }
              style={{ transformOrigin: '50px 50px' }}
            />
            {/* Center Lotus Core - Vivid Amber Pulse */}
            <motion.circle
              cx="50"
              cy="50"
              r="6.5"
              fill={accentColor}
              animate={
                loop
                  ? {
                      scale: [0.85, 1.3, 0.85],
                    }
                  : undefined
              }
              transition={
                loop
                  ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
                  : undefined
              }
              style={{ transformOrigin: '50px 50px' }}
            />
            <circle cx="50" cy="50" r="3" fill="#6B1D2A" />

            {/* 4 Corner Accent Dots */}
            <motion.circle
              cx="50"
              cy="18"
              r="2.5"
              fill={strokeColor}
              animate={loop ? { scale: [0.8, 1.3, 0.8] } : undefined}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="50"
              cy="82"
              r="2.5"
              fill={strokeColor}
              animate={loop ? { scale: [0.8, 1.3, 0.8] } : undefined}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="18"
              cy="50"
              r="2.5"
              fill={strokeColor}
              animate={loop ? { scale: [0.8, 1.3, 0.8] } : undefined}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="82"
              cy="50"
              r="2.5"
              fill={strokeColor}
              animate={loop ? { scale: [0.8, 1.3, 0.8] } : undefined}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        {/* Right flourish line with self-drawing reveal */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#C9A24B]/60 to-[#C9A24B]"
        />
      </div>
    </div>
  );
};
