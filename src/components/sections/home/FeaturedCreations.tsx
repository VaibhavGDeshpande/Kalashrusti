'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from '@/context/ProductsContext';

export const FeaturedCreations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'lamps' | 'flowers' | 'patches' | 'runners' | 'mats' | 'hampers'
  >('all');
  const { t, language } = useLanguage();
  const { products } = useProducts();

  const tabs = [
    { id: 'all', label: t('feat.tabAll') },
    { id: 'lamps', label: t('feat.tabLamps') },
    { id: 'flowers', label: t('feat.tabFlowers') },
    { id: 'patches', label: t('feat.tabRangoli') },
    { id: 'runners', label: language === 'mr' ? 'टेबल रनर' : 'Runners' },
    { id: 'mats', label: language === 'mr' ? 'पूजा आसने' : 'Mats' },
    { id: 'hampers', label: t('feat.tabHampers') },
  ];

  const filteredProducts =
    activeTab === 'all'
      ? products.filter((p) => p.featured || true).slice(0, 8)
      : products.filter((p) => p.category === activeTab);

  return (
    <section className="py-14 sm:py-24 bg-[#FFF8EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 text-xs font-semibold text-[#6B1D2A] mb-3">
            <Sparkles size={14} className="text-[#D4880D]" />
            <span>{t('feat.badge')}</span>
          </div>

          <h2 className={`font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#6B1D2A] tracking-tight mb-2 sm:mb-3 ${
            language === 'mr' ? 'font-devanagari' : ''
          }`}>
            {t('feat.title')}
          </h2>
          <p className="text-xs sm:text-base text-[#231F20]/75">
            {t('feat.subtitle')}
          </p>

          {/* Category Filter Chips (Swipeable on Mobile) */}
          <div 
            className="flex overflow-x-auto no-scrollbar items-center justify-start sm:justify-center gap-2 mt-6 sm:mt-8 pb-1 sm:pb-0 px-1"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#6B1D2A] text-[#FFF8EC] shadow-md border border-[#8E2737]'
                      : 'bg-[#FFFDF9] text-[#231F20]/75 border border-[#C9A24B]/30 hover:border-[#6B1D2A] hover:text-[#6B1D2A]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid with 2-Columns on Mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA to Shop */}
        <div className="mt-16 text-center">
          <Link href="/shop">
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight size={17} />}
              iconPosition="right"
            >
              {t('feat.browseShop')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
