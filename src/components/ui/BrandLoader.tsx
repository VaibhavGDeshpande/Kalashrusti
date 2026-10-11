'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RangoliDivider } from './RangoliDivider';

interface BrandLoaderProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export const BrandLoader: React.FC<BrandLoaderProps> = ({
  message = 'हस्तकला – आनंदाचा सागर',
  fullScreen = false,
  className = '',
}) => {
  const content = (
    <div className={`flex flex-col items-center justify-center p-6 text-center select-none w-full max-w-lg ${className}`}>
      <span className="font-sans tracking-[0.38em] uppercase text-xs sm:text-sm font-bold text-[#FFF8EC]">
        K A L A S H R U S H T I
      </span>

      <RangoliDivider theme="cream" className="opacity-70 my-4" loop={true} />

      {message && (
        <motion.p
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="font-devanagari text-sm text-[#F5A623] tracking-wide"
        >
          {message}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#6B1D2A] text-[#FFF8EC] px-4">
        {content}
      </div>
    );
  }

  return content;
};
