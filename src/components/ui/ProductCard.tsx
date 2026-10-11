'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Sparkles, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { language, t } = useLanguage();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, e);
  };

  const displayName = language === 'mr' ? product.marathiName : product.name;
  const displaySubtitle = language === 'mr' ? product.description : product.tagline;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative flex flex-col bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#C9A24B]/25 hover:border-[#C9A24B]/60 shadow-[0_4px_20px_rgba(107,29,42,0.06)] hover:shadow-[0_16px_36px_rgba(107,29,42,0.12)] transition-all duration-500"
    >
      {/* Image Container with Zoom Effect */}
      <Link href={`/shop/${product.slug}`} className="relative block aspect-4/3 w-full overflow-hidden bg-[#FFF8EC]">
        <Image
          src={product.images[0]}
          alt={displayName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Soft Golden Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#6B1D2A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.bestseller && (
            <Badge variant="marigold" icon={<Sparkles size={11} />}>
              {language === 'mr' ? 'लोकप्रिय' : 'Bestseller'}
            </Badge>
          )}
        </div>

        {/* Quick Action Floating Bar on Hover */}
        <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-[#F5A623] hover:bg-[#D4880D] text-[#231F20] font-semibold text-xs py-2.5 px-4 rounded-full flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag size={14} />
            {t('cart.quickAdd')}
          </button>
          <div className="bg-[#FFF8EC]/90 text-[#6B1D2A] p-2.5 rounded-full shadow hover:bg-white transition-all flex items-center justify-center">
            <Eye size={15} />
          </div>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        {/* Title */}
        <Link href={`/shop/${product.slug}`} className="group-hover:text-[#6B1D2A] transition-colors">
          <h3 className={`font-serif text-sm sm:text-lg font-bold text-[#231F20] leading-snug line-clamp-1 mb-1 ${
            language === 'mr' ? 'font-devanagari' : ''
          }`}>
            {displayName}
          </h3>
        </Link>

        {/* Description Snippet */}
        <p className="text-[11px] sm:text-xs text-[#231F20]/65 line-clamp-2 mb-2 sm:mb-3 leading-relaxed">
          {displaySubtitle}
        </p>

        {/* Bottom Price & Mobile Quick Action Bar */}
        <div className="mt-auto pt-2 sm:pt-3 border-t border-[#C9A24B]/15 flex items-center justify-between gap-1.5">
          <div className="flex items-baseline gap-1 sm:gap-2 min-w-0">
            <span className="font-serif text-sm sm:text-lg font-bold text-[#6B1D2A] truncate">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-[#231F20]/40 line-through truncate hidden xs:inline">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <div className="hidden sm:flex items-center gap-1 text-xs text-[#231F20]/75">
              <Star size={12} className="fill-[#F5A623] text-[#F5A623]" />
              <span className="font-medium">{product.rating}</span>
            </div>

            {/* Mobile Direct Add to Bag Icon Button */}
            <button
              onClick={handleQuickAdd}
              aria-label="Add to bag"
              className="sm:hidden p-1.5 rounded-full bg-[#F5A623] active:bg-[#D4880D] text-[#231F20] shadow-xs active:scale-90 transition-transform cursor-pointer"
            >
              <ShoppingBag size={13} className="stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
