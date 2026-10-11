'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface CategoryItem {
  id: string;
  title: string;
  englishTitle: string;
  image: string;
  sublinks: { labelEn: string; labelMr: string; query: string }[];
}

const CATEGORIES_GRID: CategoryItem[] = [
  {
    id: 'lamps',
    title: 'पितळी व मातीचे दिवे',
    englishTitle: 'Lamps & Divas',
    image: '/images/crafts/brass_diya.png',
    sublinks: [
      { labelEn: 'Akhand Diya', labelMr: 'अखंड दिवा', query: 'akhand' },
      { labelEn: 'Peacock Brass', labelMr: 'मयूर पितळ', query: 'peacock' },
      { labelEn: 'Kuber Diya', labelMr: 'कुबेर दिवा', query: 'kuber' },
      { labelEn: 'Terracotta', labelMr: 'मातीचे दिवे', query: 'clay' },
    ],
  },
  {
    id: 'runners',
    title: 'रेशमी टेबल रनर व आसने',
    englishTitle: 'Home Decor & Mats',
    image: '/images/crafts/silk_runner.png',
    sublinks: [
      { labelEn: 'Silk Runners', labelMr: 'रेशमी रनर', query: 'runners' },
      { labelEn: 'Pooja Mats', labelMr: 'पूजा आसने', query: 'mats' },
      { labelEn: 'Paithani Zari', labelMr: 'पैठणी जरी', query: 'paithani' },
      { labelEn: 'Chanderi', labelMr: 'चांदेरी', query: 'chanderi' },
    ],
  },
  {
    id: 'flowers',
    title: 'तोरणे व फुले',
    englishTitle: 'Floral Decor & Torans',
    image: '/images/crafts/marigold_toran.png',
    sublinks: [
      { labelEn: 'Marigold Toran', labelMr: 'झेंडू तोरण', query: 'toran' },
      { labelEn: 'Sola Flowers', labelMr: 'शोला फुले', query: 'sola' },
      { labelEn: 'Door Hangings', labelMr: 'द्वार सजावट', query: 'door' },
      { labelEn: 'Garlands', labelMr: 'माळा', query: 'garland' },
    ],
  },
  {
    id: 'patches',
    title: 'कुंदन रांगोळी व हॅम्पर्स',
    englishTitle: 'Rangoli & Gift Hampers',
    image: '/images/crafts/rangoli_patches.png',
    sublinks: [
      { labelEn: 'Kundan Rangoli', labelMr: 'कुंदन रांगोळी', query: 'rangoli' },
      { labelEn: 'Diwali Hampers', labelMr: 'दिवाळी हॅम्पर्स', query: 'hampers' },
      { labelEn: 'Jewel Patches', labelMr: 'रत्न पॅचेस', query: 'patches' },
      { labelEn: 'Hamper Builder', labelMr: 'भेटपेटी बनवा', query: 'builder' },
    ],
  },
];

export const HorizontalCategoryGallery: React.FC = () => {
  const { language } = useLanguage();
  const isMarathi = language === 'mr';

  return (
    <section className="py-10 sm:py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading Matching Reference Screenshot Exactly */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-2">
          <h2 className="font-sans text-xl sm:text-3xl lg:text-[38px] font-normal text-neutral-900 tracking-tight leading-snug">
            {isMarathi 
              ? 'पुण्यातील कारागिरांचे अस्सल हस्तकला दालन' 
              : "Shop the World's Finest Authentic Handmade Crafts"}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-light">
            {isMarathi 
              ? 'आमचे सर्वाधिक पसंतीचे पारंपारिक हस्तकला विभाग' 
              : 'Explore our most-loved handmade categories'}
          </p>
        </div>

        {/* 2x2 Grid with Clean Rounded Cards, Centered Title & Underlined Sublinks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-14">
          {CATEGORIES_GRID.map((cat, idx) => {
            const displayTitle = isMarathi ? cat.title : cat.englishTitle;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center group"
              >
                {/* 1. Large Rounded Rectangular Image Container */}
                <Link
                  href={`/shop?category=${cat.id}`}
                  className="w-full aspect-16/10 sm:aspect-16/10 relative rounded-2xl overflow-hidden bg-[#F6F2EA] shadow-2xs hover:shadow-lg transition-all duration-300 block border border-neutral-200/60"
                >
                  <Image
                    src={cat.image}
                    alt={displayTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </Link>

                {/* 2. Centered Category Title */}
                <Link
                  href={`/shop?category=${cat.id}`}
                  className="mt-4 sm:mt-5 text-center block"
                >
                  <h3 className="text-base sm:text-lg font-medium text-neutral-900 group-hover:text-[#6B1D2A] transition-colors">
                    {displayTitle}
                  </h3>
                </Link>

                {/* 3. Horizontal Row of Underlined Sub-category Text Links */}
                <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-neutral-500 font-light">
                  {cat.sublinks.map((sub, sIdx) => {
                    const subLabel = isMarathi ? sub.labelMr : sub.labelEn;
                    const href = sub.query === 'builder' 
                      ? '/hamper-builder' 
                      : `/shop?category=${cat.id}&q=${encodeURIComponent(sub.query)}`;

                    return (
                      <Link
                        key={sIdx}
                        href={href}
                        className="underline underline-offset-3 decoration-neutral-300 hover:decoration-neutral-900 hover:text-neutral-900 transition-colors"
                      >
                        {subLabel}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
