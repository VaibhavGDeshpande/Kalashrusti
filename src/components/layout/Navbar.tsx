'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Gift, 
  User, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from '@/context/ProductsContext';

const NAV_CATEGORIES = [
  { id: 'lamps', labelEn: 'Lamps & Divas', labelMr: 'पितळी व मातीचे दिवे' },
  { id: 'flowers', labelEn: 'Handmade Flowers', labelMr: 'हस्तनिर्मित फुले व तोरण' },
  { id: 'patches', labelEn: 'Rangoli Patches', labelMr: 'कुंदन रांगोळी' },
  { id: 'runners', labelEn: 'Table Runners', labelMr: 'रेशमी टेबल रनर' },
  { id: 'mats', labelEn: 'Pooja Mats', labelMr: 'पूजा आसने' },
  { id: 'hampers', labelEn: 'Diwali Hampers', labelMr: 'दिवाळी भेटपेट्या' },
  { id: 'new', labelEn: 'New Arrivals', labelMr: 'नवीन हस्तकला' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { products } = useProducts();

  // Dropdown states
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search input & results states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Click outside listener for popups
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchActive(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for search bar dropdown
  const filteredProducts = searchQuery.trim()
    ? products.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.marathiName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchActive(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/80 shadow-2xs">
      {/* 1. TOP BAR: Categories | About Us | Logo (Center) | Account | Language | Cart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 flex items-center justify-between gap-4">
          
          {/* Top Left: Categories Dropdown & About Us */}
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-neutral-800 hover:text-[#6B1D2A] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Categories Dropdown (Desktop) */}
            <div className="relative hidden md:block" ref={categoriesRef}>
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-neutral-800 hover:text-black transition-colors cursor-pointer select-none"
              >
                <span>{language === 'mr' ? 'विभाग' : 'Categories'}</span>
                <ChevronDown 
                  size={14} 
                  className={`text-neutral-500 transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50 overflow-hidden"
                  >
                    <div className="px-3.5 py-1.5 text-[10px] uppercase font-bold tracking-widest text-neutral-400 border-b border-neutral-100">
                      {language === 'mr' ? 'हस्तकला संग्रह' : 'Curated Collections'}
                    </div>
                    {NAV_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={cat.id === 'new' ? '/shop?featured=true' : `/shop?category=${cat.id}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2.5 text-xs text-neutral-700 hover:bg-[#FFF8EC] hover:text-[#6B1D2A] font-medium transition-colors"
                      >
                        <span>{language === 'mr' ? cat.labelMr : cat.labelEn}</span>
                        {cat.id === 'hampers' && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#F5A623]/20 text-[#6B1D2A] font-bold">
                            3D
                          </span>
                        )}
                      </Link>
                    ))}
                    <div className="border-t border-neutral-100 mt-1 pt-1">
                      <Link
                        href="/shop"
                        onClick={() => setCategoriesOpen(false)}
                        className="flex items-center gap-1 px-3.5 py-2 text-xs text-[#6B1D2A] hover:bg-[#FFF8EC] font-bold"
                      >
                        <span>{language === 'mr' ? 'सर्व हस्तकला दालन पाहा' : 'View All Crafts'}</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Us Link (Desktop) */}
            <Link
              href="/about"
              className="hidden md:inline-block text-xs sm:text-[13px] font-medium text-neutral-800 hover:text-black transition-colors"
            >
              {language === 'mr' ? 'आमच्याबद्दल' : 'About Us'}
            </Link>

            {/* 3D Hamper Builder Quick Link (Desktop) */}
            <Link
              href="/hamper-builder"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-[#6B1D2A] transition-colors"
            >
              <Gift size={13} className="text-[#C9A24B]" />
              <span>{language === 'mr' ? '३D भेटपेटी' : 'Hamper Builder'}</span>
            </Link>
          </div>

          {/* Top Center: Logo (K A A L A S H R U S T I • C R A F T S) */}
          <div className="flex-1 text-center select-none px-2">
            <Link 
              href="/" 
              className="inline-block font-sans font-bold tracking-[0.26em] sm:tracking-[0.38em] uppercase text-xs sm:text-sm md:text-base text-neutral-900 hover:text-[#6B1D2A] transition-colors"
            >
              {language === 'mr' ? (
                <span>का ला श्रु ष्टी &nbsp;•&nbsp; ह स्त क ला</span>
              ) : (
                <span>K A L A S H R U S H T I &nbsp;•&nbsp; C R A F T S</span>
              )}
            </Link>
          </div>

          {/* Top Right: Account Dropdown | Language Switcher | Cart Icon */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Account Dropdown */}
            <div className="relative hidden sm:block" ref={accountRef}>
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-1 text-xs sm:text-[13px] font-medium text-neutral-800 hover:text-black transition-colors cursor-pointer select-none"
              >
                <span>{language === 'mr' ? 'खाते' : 'Account'}</span>
                <ChevronDown 
                  size={14} 
                  className={`text-neutral-500 transition-transform duration-200 ${accountOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50 overflow-hidden text-xs"
                  >
                    <div className="px-3.5 py-1.5 text-[10px] uppercase font-bold tracking-widest text-neutral-400 border-b border-neutral-100">
                      Studio &amp; Orders
                    </div>
                    <Link
                      href="/admin"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2.5 text-neutral-700 hover:bg-[#FFF8EC] hover:text-[#6B1D2A] font-medium transition-colors"
                    >
                      <User size={14} className="text-[#6B1D2A]" />
                      <span>{language === 'mr' ? 'प्रशासक पॅनेल (Admin)' : 'Admin Studio'}</span>
                    </Link>
                    <Link
                      href="/admin/orders"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2.5 text-neutral-700 hover:bg-[#FFF8EC] hover:text-[#6B1D2A] font-medium transition-colors"
                    >
                      <ShieldCheck size={14} className="text-[#C9A24B]" />
                      <span>{language === 'mr' ? 'ऑर्डर व्यवस्थापन' : 'Order Tracker'}</span>
                    </Link>
                    <div className="border-t border-neutral-100 my-1" />
                    <a
                      href="https://wa.me/91814965483"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 text-emerald-700 hover:bg-emerald-50 font-semibold transition-colors"
                    >
                      <span>WhatsApp Support</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Switcher Pill */}
            <div className="flex items-center text-[11px] font-bold border border-neutral-200 rounded-full p-0.5 bg-neutral-50 select-none">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  language === 'mr'
                    ? 'bg-[#6B1D2A] text-white shadow-2xs'
                    : 'text-neutral-500 hover:text-[#6B1D2A]'
                }`}
              >
                मराठी
              </button>
            </div>

            {/* Shopping Bag Icon Button / Cart Link */}
            <Link
              href="/cart"
              className="relative p-1.5 text-neutral-800 hover:text-[#6B1D2A] transition-colors cursor-pointer"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag size={21} className="stroke-[1.6]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#6B1D2A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE ROW: Centered Pill Search Input */}
      <div className="max-w-2xl mx-auto px-4 pb-2 pt-1 relative" ref={searchContainerRef}>
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchActive(true);
            }}
            onFocus={() => setSearchActive(true)}
            placeholder={
              language === 'mr'
                ? 'अस्सल हस्तकला, पितळी दिवे, तोरणे, रांगोळी शोधा...'
                : 'Seek unique handmade crafts, brass divas, torans...'
            }
            className="w-full rounded-full border border-neutral-300/90 bg-[#FAFAFA] hover:bg-white focus:bg-white focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200/50 pl-5 pr-11 py-2 text-xs sm:text-[13px] text-neutral-900 placeholder:text-neutral-400 outline-none transition-all shadow-2xs"
          />
          <button
            type="submit"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search size={16} />
          </button>
        </form>

        {/* Live Search Autocomplete Results Dropdown */}
        <AnimatePresence>
          {searchActive && searchQuery.trim().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute left-4 right-4 top-full mt-1.5 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-50 overflow-hidden"
            >
              {filteredProducts.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                    {language === 'mr' ? 'जुळणारी उत्पादने' : 'Matching Creations'}
                  </div>
                  {filteredProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/shop/${p.slug}`}
                      onClick={() => setSearchActive(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FFF8EC] transition-colors group"
                    >
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-neutral-900 group-hover:text-[#6B1D2A] truncate">
                          {language === 'mr' ? p.marathiName : p.name}
                        </p>
                        <p className="text-[11px] text-neutral-500 capitalize">
                          {p.category}
                        </p>
                      </div>
                      <div className="text-xs font-bold text-[#6B1D2A] shrink-0">
                        ₹{p.price}
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-neutral-100 mt-1 pt-1.5 px-2">
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full text-center py-1.5 text-xs font-semibold text-[#6B1D2A] hover:underline"
                    >
                      {language === 'mr' ? 'सर्व परिणाम पाहा' : `View all results for "${searchQuery}"`}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-neutral-500">
                  {language === 'mr' ? 'काहीही सापडले नाही.' : `No handmade crafts found for "${searchQuery}".`}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. BOTTOM ROW: Centered Horizontal Category Sub-Navigation */}
      <div className="border-t border-neutral-100/90 bg-white">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <nav className="flex items-center justify-start sm:justify-center gap-5 sm:gap-8 py-2 min-w-max">
            {NAV_CATEGORIES.map((cat) => {
              const href = cat.id === 'new' ? '/shop?featured=true' : `/shop?category=${cat.id}`;
              const isActive = pathname.includes(cat.id);
              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={`text-[11px] sm:text-xs font-medium tracking-wide transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#6B1D2A] font-bold border-b-2 border-[#6B1D2A] pb-0.5'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {language === 'mr' ? cat.labelMr : cat.labelEn}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* MOBILE SLIDE-OUT MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-neutral-200 bg-white px-5 py-4 space-y-4 shadow-lg overflow-hidden"
          >
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                {language === 'mr' ? 'विभाग' : 'Categories'}
              </div>
              {NAV_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.id === 'new' ? '/shop?featured=true' : `/shop?category=${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-xs font-semibold text-neutral-800 hover:text-[#6B1D2A]"
                >
                  {language === 'mr' ? cat.labelMr : cat.labelEn}
                </Link>
              ))}
            </div>

            <div className="border-t border-neutral-100 pt-3 space-y-2 text-xs">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 text-neutral-700 font-medium"
              >
                {language === 'mr' ? 'आमच्याबद्दल (About Us)' : 'About Us'}
              </Link>
              <Link
                href="/hamper-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 text-[#6B1D2A] font-bold"
              >
                🎁 {language === 'mr' ? '३D दिवाळी भेटपेटी बनवा' : '3D Hamper Builder'}
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 text-neutral-700 font-medium"
              >
                ⚙️ {language === 'mr' ? 'प्रशासक पॅनेल (Admin Studio)' : 'Admin Studio'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
