'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RangoliDividerProps {
  className?: string;
  theme?: 'gold' | 'maroon' | 'cream';
}

export const RangoliDivider: React.FC<RangoliDividerProps> = ({
  className = '',
  theme = 'gold',
}) => {
  const strokeColor = theme === 'maroon' ? '#6B1D2A' : theme === 'cream' ? '#FFF8EC' : '#C9A24B';
  const accentColor = theme === 'cream' ? '#F5A623' : '#F5A623';

  return (
    <div className={`w-full flex items-center justify-center my-8 py-2 overflow-hidden ${className}`}>
      <div className="flex items-center gap-3 w-full max-w-4xl px-4">
        {/* Left flourish line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-[#C9A24B]" />

        {/* Central Rangoli Mandala SVG with subtle drawing animation */}
        <motion.div
          initial={{ rotate: -15, scale: 0.85, opacity: 0 }}
          whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            {/* Outer Petals / Stars */}
            <motion.path
              d="M50 5 L55 35 L85 30 L60 50 L85 70 L55 65 L50 95 L45 65 L15 70 L40 50 L15 30 L45 35 Z"
              stroke={strokeColor}
              strokeWidth="1.8"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            {/* Inner Ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="16"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeDasharray="2 2"
              fill="none"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
            {/* Center Lotus Core */}
            <circle cx="50" cy="50" r="6" fill={accentColor} />
            <circle cx="50" cy="50" r="3" fill="#6B1D2A" />

            {/* Corner Dots */}
            <circle cx="50" cy="18" r="2" fill={strokeColor} />
            <circle cx="50" cy="82" r="2" fill={strokeColor} />
            <circle cx="18" cy="50" r="2" fill={strokeColor} />
            <circle cx="82" cy="50" r="2" fill={strokeColor} />
          </svg>
        </motion.div>

        {/* Right flourish line */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C9A24B]/40 to-[#C9A24B]" />
      </div>
    </div>
  );
};
