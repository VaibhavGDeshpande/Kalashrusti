'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`relative inline-flex items-center gap-1.5 p-1 rounded-full bg-[#6B1D2A]/10 hover:bg-[#6B1D2A]/15 border border-[#C9A24B]/40 shadow-xs cursor-pointer select-none transition-all ${className}`}
      title={language === 'en' ? 'मराठीत भाषांतर करा (Translate to Marathi)' : 'Translate to English'}
      aria-label="Toggle language between English and Marathi"
    >
      <div className="flex items-center gap-1 px-1.5 text-xs text-[#6B1D2A]">
        <Globe size={13} className="text-[#C9A24B]" />
      </div>

      <div className="relative flex items-center text-xs font-semibold">
        {/* Active sliding background indicator */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`absolute inset-y-0 rounded-full bg-[#6B1D2A] shadow-xs ${
            language === 'en' ? 'left-0 w-8' : 'left-8 w-12'
          }`}
        />

        {/* English Label */}
        <span
          className={`relative z-10 px-2 py-0.5 text-[11px] rounded-full transition-colors ${
            language === 'en' ? 'text-[#FFF8EC] font-bold' : 'text-[#6B1D2A]/70 hover:text-[#6B1D2A]'
          }`}
        >
          EN
        </span>

        {/* Marathi Label */}
        <span
          className={`relative z-10 px-2 py-0.5 text-[11px] font-devanagari rounded-full transition-colors ${
            language === 'mr' ? 'text-[#FFF8EC] font-bold' : 'text-[#6B1D2A]/70 hover:text-[#6B1D2A]'
          }`}
        >
          मराठी
        </span>
      </div>
    </button>
  );
};
