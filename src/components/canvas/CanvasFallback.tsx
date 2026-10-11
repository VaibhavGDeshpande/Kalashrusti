'use client';

import React from 'react';
import Image from 'next/image';

export const CanvasFallback: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center overflow-hidden rounded-3xl bg-radial from-[#6B1D2A]/80 via-[#4A121C] to-[#2B0A11]">
      {/* Background warm festive radial shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,166,35,0.25)_0%,transparent_70%)] animate-pulse" />

      {/* Decorative brass diya static representation */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-72 h-72 sm:w-88 sm:h-88">
          <Image
            src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=800&q=80"
            alt="Kalashrushti Brass Diya"
            fill
            priority
            className="object-contain filter drop-shadow-[0_15px_30px_rgba(245,166,35,0.4)]"
          />
        </div>
      </div>

      {/* Drifting subtle golden flecks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[#F5A623] blur-xs animate-ping opacity-60" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-[#FFBD59] blur-xs animate-ping opacity-75" />
      </div>
    </div>
  );
};
