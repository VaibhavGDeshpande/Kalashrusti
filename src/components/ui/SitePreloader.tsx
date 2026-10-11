'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KalashrushtiEmblem } from './KalashrushtiEmblem';

export const SitePreloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if shown in this session
    const hasSeenIntro = sessionStorage.getItem('kalashrushti_intro_seen');
    if (hasSeenIntro) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('kalashrushti_intro_seen', 'true');
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="site-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-[#231F20] select-none"
        >
          {/* Subtle warm center radial shimmer */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,166,35,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center px-4 text-center">
            {/* Animated Star Icon (from footer) */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <KalashrushtiEmblem size={96} animated={true} theme="white" />
            </motion.div>

            {/* Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-5 font-sans tracking-[0.38em] uppercase text-xs sm:text-sm font-bold text-[#6B1D2A]"
            >
              K A L A S H R U S H T I
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-1.5 font-devanagari text-sm sm:text-base text-[#806759] tracking-wide"
            >
              हस्तकला – आनंदाचा सागर
            </motion.p>

            {/* Subtle Progress Bar */}
            <div className="w-24 h-0.5 bg-neutral-100 rounded-full overflow-hidden mt-5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#6B1D2A] to-[#C9A24B]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </div>

            {/* Skip button for quick dismiss */}
            <button
              onClick={() => setLoading(false)}
              className="mt-4 text-[10px] tracking-widest uppercase text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              Skip
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
