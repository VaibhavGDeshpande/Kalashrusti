'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gift, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

export const HamperBuilderCallout: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-[#FFF8EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#6B1D2A] via-[#4A121C] to-[#340B13] text-[#FFF8EC] p-8 sm:p-12 lg:p-16 border-2 border-[#C9A24B]/40 shadow-2xl">
          {/* Subtle Golden Pattern Background */}
          <div className="absolute inset-0 bg-maroon-pattern opacity-40 pointer-events-none" />

          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5A623]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 text-xs font-semibold text-[#F5A623]">
                <Gift size={14} />
                <span>{t('hamper.badge')}</span>
              </div>

              <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
                language === 'mr' ? 'font-devanagari' : ''
              }`}>
                {t('hamper.title1')} <br />
                <span className="gold-gradient-text">{t('hamper.title2')}</span>
              </h2>

              <p className="text-sm sm:text-base text-[#FFF8EC]/80 leading-relaxed max-w-xl">
                {t('hamper.desc')}
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#DFC47F]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#F5A623] shrink-0" />
                  <span>{t('hamper.f1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#F5A623] shrink-0" />
                  <span>{t('hamper.f2')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#F5A623] shrink-0" />
                  <span>{t('hamper.f3')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#F5A623] shrink-0" />
                  <span>{t('hamper.f4')}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/hamper-builder">
                  <Button
                    variant="festive"
                    size="lg"
                    icon={<ArrowRight size={17} />}
                    iconPosition="right"
                  >
                    {t('hamper.cta')}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <motion.div
                whileHover={{ rotate: 1, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border-2 border-[#C9A24B]/50 shadow-2xl"
              >
                <Image
                  src="/images/crafts/diwali_hamper.png"
                  alt="Kalashrushti Luxury Diwali Hamper"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231F20]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center p-3 rounded-xl bg-[#FFF8EC]/90 backdrop-blur-md text-[#6B1D2A] text-xs font-bold border border-[#C9A24B]/30">
                  🪔 आनंद आणि मांगल्याची परिपूर्ण भेट (The Gift of Light)
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
