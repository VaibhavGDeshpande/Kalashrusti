'use client';

import React from 'react';
import { RangoliDivider } from './RangoliDivider';

interface DiyaLoaderProps {
  message?: string;
  className?: string;
}

export const DiyaLoader: React.FC<DiyaLoaderProps> = ({
  message = 'हस्तकला – आनंदाचा सागर',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 text-center select-none w-full max-w-lg mx-auto ${className}`}>
      <span className="font-sans tracking-[0.32em] uppercase text-xs font-bold text-[#6B1D2A]">
        K A L A S H R U S H T I
      </span>

      <RangoliDivider theme="maroon" className="opacity-75 my-3" loop={true} />

      {message && (
        <p className="font-devanagari text-xs text-[#806759] tracking-wide">
          {message}
        </p>
      )}
    </div>
  );
};
