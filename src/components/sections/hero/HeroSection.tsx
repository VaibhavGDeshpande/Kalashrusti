'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="w-full bg-white select-none">
      {/* FULL-WIDTH SPLIT HERO BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-auto lg:min-h-[560px] w-full">
        
        {/* LEFT COLUMN: Warm Earthy Taupe / Brown Solid Banner Matching Reference Image */}
        <div className="bg-[#806759] text-white flex flex-col justify-center items-center text-center px-5 sm:px-12 lg:px-16 py-10 sm:py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md w-full flex flex-col items-center"
          >
            {/* Main Headline (Clean Sans-Serif Capitalized, Exactly Like Reference Image) */}
            <h1 className="font-sans text-2xl sm:text-5xl lg:text-[52px] font-normal tracking-[0.14em] uppercase text-white leading-tight">
              {language === 'mr' ? 'अस्सल हस्तकला' : 'SEEK UNIQUE'}
            </h1>

            {/* Subtle Centered Divider Line */}
            <div className="w-24 sm:w-36 h-[1px] bg-white/40 my-3.5 sm:my-5" />

            {/* Subtitle Paragraph */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-white/90 font-light leading-relaxed max-w-sm mb-5 sm:mb-7">
              {language === 'mr' ? (
                <>
                  हस्तकला – आनंदाचा सागर <br />
                  आपल्या घराला मांगल्याचे तेज देण्यासाठी पुण्यात घडवलेली हस्तकला
                </>
              ) : (
                <>
                  Handmade crafts, crafted to be <br />
                  anything but ordinary
                </>
              )}
            </p>

            {/* Outline Rounded-Full Pill Button (Exact Match) */}
            <Link
              href="/shop"
              className="inline-block rounded-full border border-white/90 text-white hover:bg-white hover:text-[#806759] px-7 sm:px-11 py-2 sm:py-3 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium transition-all shadow-xs active:scale-95"
            >
              {language === 'mr' ? 'हस्तकला खरेदी करा' : 'SHOP CRAFTS'}
            </Link>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: High-Resolution Lifestyle Flatlay Craft Photography */}
        <div className="relative min-h-[250px] sm:min-h-[440px] lg:min-h-[560px] w-full bg-[#E8E1D7] overflow-hidden">
          <Image
            src="/images/crafts/hero_handmade_craft.png"
            alt="Handmade Indian Craft Jewelry and Festive Art"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
};
