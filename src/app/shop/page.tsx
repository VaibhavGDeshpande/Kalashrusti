'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Package, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import { useProducts } from '@/context/ProductsContext';
import { useLanguage } from '@/context/LanguageContext';
import { ProductCard } from '@/components/ui/ProductCard';
import { RangoliDivider } from '@/components/ui/RangoliDivider';
import { Product } from '@/types';

const CATEGORIES = [
  { id: 'all', label: 'All Crafts', mr: 'सर्व हस्तकला' },
  { id: 'lamps', label: 'Lamps & Divas', mr: 'पितळी व मातीचे दिवे' },
  { id: 'flowers', label: 'Flowers & Torans', mr: 'फुले व तोरण' },
  { id: 'patches', label: 'Rangoli Patches', mr: 'कुंदन रांगोळी' },
  { id: 'runners', label: 'Silk Runners', mr: 'रेशमी टेबल रनर' },
  { id: 'mats', label: 'Pooja Mats', mr: 'पूजा आसने' },
  { id: 'hampers', label: 'Diwali Hampers', mr: 'भेटपेट्या' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const { products } = useProducts();
  const { language, t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Sync category & search from URL params on load
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.some((c) => c.id === cat)) {
      setSelectedCategory(cat);
    }
    const q = searchParams.get('search');
    if (q) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  // Filter products
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesStock = !inStockOnly || prod.inStock;
    const matchesSearch =
      searchTerm.trim() === '' ||
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.marathiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesStock && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 4.5) - (a.rating || 4.5);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 text-xs font-semibold text-[#6B1D2A]">
            <Sparkles size={14} className="text-[#D4880D]" />
            <span>
              {language === 'mr'
                ? 'पुणे येथील हस्तकला कार्यशाळा'
                : 'Pune Handcrafted Artisan Studio'}
            </span>
          </div>

          <h1 className={`font-serif text-3xl sm:text-5xl font-bold text-[#6B1D2A] tracking-tight ${
            language === 'mr' ? 'font-devanagari' : ''
          }`}>
            {language === 'mr'
              ? 'हस्तनिर्मित सण संग्रह'
              : 'The Festive Handcraft Catalog'}
          </h1>

          <p className="text-sm sm:text-base text-[#231F20]/75">
            {language === 'mr'
              ? 'पारंपरिक कारागिरांनी घडवलेले अखंड दिवे, फुलांची तोरणे, कुंदन रांगोळी आणि रेशमी वस्त्रे.'
              : 'Explore heirloom brass divas, marigold torans, jewel-studded kundan patches, and pure silk weaves.'}
          </p>
        </div>

        <RangoliDivider theme="gold" className="my-4" />

        {/* Filter Toolbar */}
        <div className="bg-[#FFF8EC] rounded-2xl p-4 sm:p-5 border border-[#C9A24B]/30 shadow-xs space-y-4">
          {/* Category Chips Bar (Swipeable on Mobile) */}
          <div 
            className="flex overflow-x-auto no-scrollbar items-center gap-2 pb-1"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? products.length
                  : products.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#6B1D2A] text-[#FFF8EC] shadow-md border border-[#8E2737]'
                      : 'bg-white text-[#231F20]/75 border border-[#C9A24B]/30 hover:border-[#6B1D2A] hover:text-[#6B1D2A]'
                  }`}
                >
                  <span>{language === 'mr' ? cat.mr : cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#F5A623] text-[#231F20] font-bold' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search, Sort and Stock Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-3 border-t border-[#C9A24B]/20">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#231F20]/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === 'mr'
                    ? 'नाव किंवा प्रकार शोधा...'
                    : 'Search by craft name, keyword...'
                }
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#C9A24B]/30 focus:border-[#6B1D2A] outline-none text-xs sm:text-sm text-[#231F20]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort & Stock Filters */}
            <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#231F20]/80 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#6B1D2A] w-4 h-4 rounded"
                />
                <span>{language === 'mr' ? 'केवळ उपलब्ध' : 'In Stock Only'}</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#6B1D2A] whitespace-nowrap">
                  {language === 'mr' ? 'क्रमवारी:' : 'Sort by:'}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#C9A24B]/40 focus:border-[#6B1D2A] outline-none text-xs font-semibold text-[#231F20] cursor-pointer"
                >
                  <option value="featured">Featured / लोकप्रिय</option>
                  <option value="price-low">Price: Low to High (कमी ते जास्त)</option>
                  <option value="price-high">Price: High to Low (जास्त ते कमी)</option>
                  <option value="rating">Top Rated (उत्कृष्ट पुनरावलोकने)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter and Active Filter Tags */}
        <div className="flex items-center justify-between text-xs text-[#231F20]/70 px-1">
          <div>
            Showing <span className="font-bold text-[#6B1D2A]">{sortedProducts.length}</span> creations
            {selectedCategory !== 'all' && (
              <span> in <strong className="text-[#6B1D2A]">{activeCategoryObj.label}</strong></span>
            )}
            {searchTerm && <span> matching &ldquo;{searchTerm}&rdquo;</span>}
          </div>

          {(selectedCategory !== 'all' || searchTerm || inStockOnly) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
                setInStockOnly(false);
              }}
              className="inline-flex items-center gap-1 font-semibold text-[#6B1D2A] hover:underline cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Products Grid (2-Columns on Mobile for E-Commerce Comfort) */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {sortedProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#FFF8EC] rounded-3xl border border-[#C9A24B]/30 p-8 space-y-4">
            <Package size={48} className="mx-auto text-[#C9A24B]" />
            <h3 className="font-serif text-xl font-bold text-[#6B1D2A]">
              {language === 'mr' ? 'कोणतेही उत्पादन सापडले नाही' : 'No Handcrafted Creations Found'}
            </h3>
            <p className="text-xs sm:text-sm text-[#231F20]/70 max-w-md mx-auto">
              {language === 'mr'
                ? 'कृपया शोध शब्द बदला किंवा इतर श्रेणी तपासा.'
                : 'Try adjusting your search query, clearing filters, or browsing all crafts.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
                setInStockOnly(false);
              }}
              className="px-6 py-2.5 rounded-full bg-[#6B1D2A] text-[#FFF8EC] font-bold text-xs hover:bg-[#4A121C] shadow transition-colors cursor-pointer"
            >
              View All Crafts ({products.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <div className="w-10 h-10 border-4 border-[#C9A24B]/20 border-t-[#6B1D2A] rounded-full animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
