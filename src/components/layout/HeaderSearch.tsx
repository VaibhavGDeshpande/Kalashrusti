'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, X, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from '@/context/ProductsContext';

const CATEGORY_OPTIONS = [
  { id: 'all', labelEn: 'All Categories', labelMr: 'सर्व विभाग' },
  { id: 'lamps', labelEn: 'Lamps & Divas', labelMr: 'पितळी व मातीचे दिवे' },
  { id: 'flowers', labelEn: 'Flowers & Torans', labelMr: 'फुले व तोरण' },
  { id: 'patches', labelEn: 'Rangoli Patches', labelMr: 'कुंदन रांगोळी' },
  { id: 'runners', labelEn: 'Table Runners', labelMr: 'रेशमी टेबल रनर' },
  { id: 'mats', labelEn: 'Pooja Mats', labelMr: 'पूजा आसने' },
  { id: 'hampers', labelEn: 'Diwali Hampers', labelMr: 'दिवाळी हॅम्पर्स' },
];

const POPULAR_SEARCH_TERMS = [
  { termEn: 'Brass Akhand Diya', termMr: 'अखंड पितळी दिवा' },
  { termEn: 'Marigold Toran', termMr: 'झेंडूचे तोरण' },
  { termEn: 'Kundan Rangoli', termMr: 'कुंदन रांगोळी' },
  { termEn: 'Paithani Runner', termMr: 'पैठणी रनर' },
];

export const HeaderSearch: React.FC<{ isMobile?: boolean; onCloseMobile?: () => void }> = ({
  isMobile = false,
  onCloseMobile,
}) => {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { products } = useProducts();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close results / dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setResultsOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products based on selected category and query
  const filteredProducts: Product[] = query.trim()
    ? products.filter((prod) => {
        const matchesCat = selectedCategory === 'all' || prod.category === selectedCategory;
        const q = query.toLowerCase();
        const matchesQuery =
          prod.name.toLowerCase().includes(q) ||
          prod.marathiName.toLowerCase().includes(q) ||
          prod.tagline.toLowerCase().includes(q) ||
          prod.description.toLowerCase().includes(q) ||
          prod.material.toLowerCase().includes(q);
        return matchesCat && matchesQuery;
      })
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResultsOpen(false);
    if (onCloseMobile) onCloseMobile();
    const catParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
    router.push(`/shop?search=${encodeURIComponent(query.trim())}${catParam}`);
  };

  const handleSelectPopular = (term: string) => {
    setQuery(term);
    const catParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
    router.push(`/shop?search=${encodeURIComponent(term)}${catParam}`);
    setResultsOpen(false);
    if (onCloseMobile) onCloseMobile();
  };

  const currentCategoryLabel =
    CATEGORY_OPTIONS.find((c) => c.id === selectedCategory)?.[
      language === 'mr' ? 'labelMr' : 'labelEn'
    ] || t('search.all');

  return (
    <div
      ref={containerRef}
      className={`relative ${isMobile ? 'w-full' : 'w-full max-w-md lg:max-w-lg xl:max-w-xl'}`}
    >
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex items-center h-10 sm:h-11 rounded-full bg-[#FFFDF9] border border-[#C9A24B]/40 hover:border-[#C9A24B] shadow-2xs focus-within:border-[#6B1D2A] focus-within:ring-2 focus-within:ring-[#F5A623]/30 transition-all overflow-hidden"
      >
        {/* Category Dropdown Trigger */}
        <div ref={dropdownRef} className="relative h-full shrink-0">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="h-full px-3 sm:px-3.5 bg-[#FFF8EC] border-r border-[#C9A24B]/30 hover:bg-[#F5E8D0]/60 text-[#6B1D2A] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors select-none"
            title="Filter by category"
          >
            <span className="max-w-[85px] sm:max-w-[110px] truncate">
              {currentCategoryLabel}
            </span>
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 text-[#C9A24B] ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Category Dropdown Menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 top-full mt-1.5 w-56 rounded-xl bg-[#FFFDF9] border border-[#C9A24B]/35 shadow-xl py-1.5 z-50 text-xs"
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#C9A24B] tracking-wider border-b border-[#C9A24B]/15">
                  {t('search.allCategories')}
                </div>
                {CATEGORY_OPTIONS.map((cat) => {
                  const label = language === 'mr' ? cat.labelMr : cat.labelEn;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-[#F5A623]/15 transition-colors cursor-pointer ${
                        isSelected
                          ? 'font-bold text-[#6B1D2A] bg-[#FFF8EC]'
                          : 'text-[#231F20]/80'
                      }`}
                    >
                      <span>{label}</span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Input Box */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setResultsOpen(true);
          }}
          onFocus={() => setResultsOpen(true)}
          placeholder={t('search.placeholder')}
          className="flex-1 h-full px-3.5 text-xs sm:text-sm text-[#231F20] placeholder-[#231F20]/45 bg-transparent border-none outline-none"
        />

        {/* Clear query button */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-1 text-[#231F20]/40 hover:text-[#6B1D2A] mr-1 cursor-pointer"
            aria-label="Clear Search Input"
          >
            <X size={14} />
          </button>
        )}

        {/* Search Action Submit Button */}
        <button
          type="submit"
          className="h-full px-3.5 sm:px-4 bg-[#6B1D2A] text-[#FFF8EC] hover:bg-[#4A121C] flex items-center justify-center transition-colors cursor-pointer shrink-0"
          aria-label="Submit Search"
        >
          <Search size={16} className="text-[#F5A623]" />
        </button>
      </form>

      {/* Live Search Instant Results Modal / Dropdown */}
      <AnimatePresence>
        {resultsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 bg-[#FFFDF9] rounded-2xl border border-[#C9A24B]/30 shadow-2xl overflow-hidden z-50 max-h-[420px] flex flex-col"
          >
            {query.trim().length > 0 ? (
              // Active Query Results View
              <div className="overflow-y-auto p-3 space-y-2">
                <div className="px-2 py-1 text-xs text-[#231F20]/60 flex items-center justify-between border-b border-[#C9A24B]/15 pb-2">
                  <span>
                    "{query}" • <b>{filteredProducts.length}</b> {t('search.resultsCount')}
                  </span>
                  {selectedCategory !== 'all' && (
                    <span className="text-[11px] font-semibold text-[#C9A24B]">
                      {currentCategoryLabel}
                    </span>
                  )}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#231F20]/60 space-y-2">
                    <p className="font-serif text-sm font-semibold text-[#6B1D2A]">
                      {t('search.noResults')}
                    </p>
                    <p className="text-[11px] text-[#231F20]/50">
                      Try searching for "diya", "marigold", "rangoli", or "hamper"
                    </p>
                  </div>
                ) : (
                  filteredProducts.slice(0, 5).map((prod) => {
                    const prodName = language === 'mr' ? prod.marathiName : prod.name;
                    return (
                      <Link
                        key={prod.id}
                        href={`/shop/${prod.slug}`}
                        onClick={() => {
                          setResultsOpen(false);
                          if (onCloseMobile) onCloseMobile();
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FFF8EC] border border-transparent hover:border-[#C9A24B]/30 transition-all group"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#FFF8EC]">
                          <Image
                            src={prod.images[0]}
                            alt={prodName}
                            fill
                            sizes="48px"
                            className="object-cover group-hover:scale-108 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-serif font-bold text-[#231F20] group-hover:text-[#6B1D2A] truncate">
                            {prodName}
                          </h4>
                          <p className="text-[11px] text-[#231F20]/60 truncate">
                            {prod.material}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-serif text-xs sm:text-sm font-bold text-[#6B1D2A]">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </Link>
                    );
                  })
                )}

                {filteredProducts.length > 0 && (
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-[#FFF8EC] hover:bg-[#F5A623]/20 text-[#6B1D2A] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{t('search.viewAll')}</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            ) : (
              // Empty Query State: Show Popular Searches & Category Shortcuts
              <div className="p-4 space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#C9A24B] uppercase tracking-wider mb-2.5">
                    <Sparkles size={12} className="text-[#F5A623]" />
                    <span>{t('search.popularSearches')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCH_TERMS.map((item, idx) => {
                      const term = language === 'mr' ? item.termMr : item.termEn;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectPopular(term)}
                          className="px-3 py-1.5 rounded-full bg-[#FFF8EC] hover:bg-[#F5A623]/20 border border-[#C9A24B]/30 text-xs font-medium text-[#6B1D2A] transition-colors cursor-pointer"
                        >
                          {term}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#C9A24B]/15">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#C9A24B] uppercase tracking-wider mb-2">
                    <Tag size={12} className="text-[#D4880D]" />
                    <span>{t('search.allCategories')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-[#231F20]/80">
                    {CATEGORY_OPTIONS.slice(1).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setResultsOpen(false);
                          if (onCloseMobile) onCloseMobile();
                          router.push(`/shop?category=${cat.id}`);
                        }}
                        className="text-left py-1 px-2 rounded-lg hover:bg-[#FFF8EC] hover:text-[#6B1D2A] transition-colors truncate cursor-pointer"
                      >
                        • {language === 'mr' ? cat.labelMr : cat.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
