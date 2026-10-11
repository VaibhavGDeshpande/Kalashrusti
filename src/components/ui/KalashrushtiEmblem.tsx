'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface KalashrushtiEmblemProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  theme?: 'white' | 'maroon' | 'transparent';
}

/**
 * Authentic Star Mandala Icon from the Footer / RangoliDivider
 * Features continuous path-drawing animation and a clean white background.
 */
export const KalashrushtiEmblem: React.FC<KalashrushtiEmblemProps> = ({
  size = 80,
  className = '',
  animated = true,
  theme = 'white',
}) => {
  const isWhite = theme === 'white';
  const bgColor = isWhite ? 'bg-white' : theme === 'maroon' ? 'bg-[#6B1D2A]' : 'bg-transparent';
  const starStroke = isWhite ? '#6B1D2A' : '#FFF8EC';
  const dashedStroke = isWhite ? '#C9A24B' : '#DFC47F';
  const accentColor = '#F5A623';
  const innerDotColor = isWhite ? '#6B1D2A' : '#FFF8EC';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${bgColor} ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }}
    >
      {/* Soft warm golden ambient halo */}
      {animated && (
        <motion.div
          animate={{
            scale: [0.95, 1.2, 0.95],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 m-auto w-3/4 h-3/4 rounded-full bg-[#F5A623]/25 blur-lg pointer-events-none"
        />
      )}

      {/* Main Star SVG container with footer's rotation & scale animation */}
      <motion.div
        initial={{ rotate: -15, scale: 0.85, opacity: 0 }}
        animate={
          animated
            ? {
                rotate: [ -12, 0, 12, 0, -12 ],
                scale: [ 0.92, 1.04, 0.92 ],
                opacity: 1,
              }
            : { rotate: 0, scale: 1, opacity: 1 }
        }
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex items-center justify-center w-full h-full"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full shrink-0"
        >
          {/* Outer 6-Point Star (Exact path from footer RangoliDivider) */}
          <motion.path
            d="M50 5 L55 35 L85 30 L60 50 L85 70 L55 65 L50 95 L45 65 L15 70 L40 50 L15 30 L45 35 Z"
            stroke={starStroke}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={
              animated
                ? {
                    pathLength: [0, 1, 1, 0],
                    opacity: [0.6, 1, 1, 0.6],
                  }
                : { pathLength: 1, opacity: 1 }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Inner Dashed Ring (Exact circle from footer RangoliDivider) */}
          <motion.circle
            cx="50"
            cy="50"
            r="16"
            stroke={dashedStroke}
            strokeWidth="1.5"
            strokeDasharray="2 2"
            fill="none"
            initial={{ scale: 0 }}
            animate={
              animated
                ? {
                    scale: [0.85, 1.12, 0.85],
                    rotate: 360,
                  }
                : { scale: 1 }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '50px 50px' }}
          />

          {/* Center Lotus/Sun Core */}
          <motion.circle
            cx="50"
            cy="50"
            r="6"
            fill={accentColor}
            animate={
              animated
                ? {
                    scale: [0.88, 1.2, 0.88],
                  }
                : undefined
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '50px 50px' }}
          />
          <circle cx="50" cy="50" r="3" fill={innerDotColor} />

          {/* 4 Corner Accent Dots (from footer RangoliDivider) */}
          <motion.circle
            cx="50"
            cy="18"
            r="2"
            fill={starStroke}
            animate={animated ? { opacity: [0.4, 1, 0.4] } : undefined}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="50"
            cy="82"
            r="2"
            fill={starStroke}
            animate={animated ? { opacity: [0.4, 1, 0.4] } : undefined}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="18"
            cy="50"
            r="2"
            fill={starStroke}
            animate={animated ? { opacity: [0.4, 1, 0.4] } : undefined}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="82"
            cy="50"
            r="2"
            fill={starStroke}
            animate={animated ? { opacity: [0.4, 1, 0.4] } : undefined}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </div>
  );
};
