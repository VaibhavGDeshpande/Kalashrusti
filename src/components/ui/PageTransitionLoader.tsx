'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { RangoliDivider } from './RangoliDivider';

export const PageTransitionLoader: React.FC = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  // 1. Initial Page Load / Refresh Loader
  useEffect(() => {
    // Keep visible on refresh so the user can clearly see the animation
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  // 2. In between pages (route changes)
  useEffect(() => {
    // Intercept clicks on internal links to show loader in between pages
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      // Only internal route links, ignore hash anchors, external links, admin links
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('/#') &&
        !href.startsWith('/admin') &&
        href !== pathname &&
        target.target !== '_blank'
      ) {
        setIsNavigating(true);
      }
    };

    document.addEventListener('click', handleAnchorClick, true);
    return () => document.removeEventListener('click', handleAnchorClick, true);
  }, [pathname]);

  // When pathname changes (navigation completed)
  useEffect(() => {
    if (isNavigating) {
      // Allow enough time for the self-drawing animation to be visible
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [pathname, isNavigating]);

  const showLoader = isVisible || isNavigating;

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          key="page-transition-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#6B1D2A] text-[#FFF8EC] select-none px-4"
        >
          {/* Subtle warm festive glow matching the footer */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,166,35,0.2)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
            {/* Top Brand Title */}
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-sans tracking-[0.38em] uppercase text-xs sm:text-sm font-bold text-[#FFF8EC]"
            >
              K A L A S H R U S H T I
            </motion.span>

            {/* RangoliDivider with vibrant prominent size and loop */}
            <RangoliDivider theme="cream" size="lg" className="my-4" loop={true} />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="font-devanagari text-sm sm:text-base text-[#F5A623] tracking-wide"
            >
              हस्तकला – आनंदाचा सागर
            </motion.p>

            {/* Quick skip trigger */}
            <button
              onClick={() => {
                setIsVisible(false);
                setIsNavigating(false);
              }}
              className="mt-6 text-[10px] tracking-widest uppercase text-[#FFF8EC]/50 hover:text-[#FFF8EC] transition-colors"
            >
              Skip
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
