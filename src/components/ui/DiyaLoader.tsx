'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DiyaLoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DiyaLoader: React.FC<DiyaLoaderProps> = ({
  message = 'हस्तकला – आनंदाचा सागर',
  size = 'md',
}) => {
  const scale = size === 'sm' ? 'scale-75' : size === 'lg' ? 'scale-125' : 'scale-100';

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none">
      <div className={`relative flex items-center justify-center ${scale}`}>
        {/* Soft Golden Glow Ring */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-20 h-20 rounded-full bg-[#F5A623]/25 blur-xl pointer-events-none"
        />

        {/* Diya SVG */}
        <svg
          width="70"
          height="70"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flame */}
          <motion.path
            d="M50 15 C45 30 40 40 40 48 C40 55 44 60 50 60 C56 60 60 55 60 48 C60 40 55 30 50 15 Z"
            fill="url(#flameGradient)"
            animate={{
              scale: [1, 1.08, 0.96, 1.05, 1],
              x: [0, 1, -1, 0.5, 0],
              y: [0, -1, 1, -0.5, 0],
            }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Diya Base (Brass / Terracotta Clay) */}
          <path
            d="M20 58 C25 78 75 78 80 58 C70 65 30 65 20 58 Z"
            fill="url(#diyaGradient)"
            stroke="#A5802E"
            strokeWidth="1.5"
          />

          {/* Diya Rim */}
          <ellipse cx="50" cy="58" rx="30" ry="6" fill="#C9A24B" />
          <ellipse cx="50" cy="58" rx="27" ry="4" fill="#6B1D2A" />

          {/* Wick */}
          <line x1="50" y1="52" x2="50" y2="48" stroke="#231F20" strokeWidth="2" strokeLinecap="round" />

          <defs>
            <radialGradient id="flameGradient" cx="50%" cy="80%" r="70%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="35%" stopColor="#FFC059" />
              <stop offset="70%" stopColor="#F5A623" />
              <stop offset="100%" stopColor="#C45A38" />
            </radialGradient>
            <linearGradient id="diyaGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A5802E" />
              <stop offset="50%" stopColor="#F5A623" />
              <stop offset="100%" stopColor="#6B1D2A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 font-serif text-sm tracking-wide text-[#6B1D2A]/80 font-medium"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};
