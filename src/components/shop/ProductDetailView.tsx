'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  ChevronRight
} from 'lucide-react';
import { useProducts } from '@/context/ProductsContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { ProductCard } from '@/components/ui/ProductCard';
import { RangoliDivider } from '@/components/ui/RangoliDivider';

export function ProductDetailView({ slug }: { slug: string }) {
  const { products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();
  const { language } = useLanguage();

  const product = products.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] py-20 px-4 text-center">
        <h1 className="font-serif text-2xl font-bold text-[#6B1D2A] mb-4">
          Craft Creation Not Found
        </h1>
        <p className="text-sm text-[#231F20]/70 mb-6">
          The requested product may have been archived or updated.
        </p>
        <Link
          href="/shop"
          className="px-6 py-2.5 rounded-full bg-[#6B1D2A] text-[#FFF8EC] font-bold text-xs"
        >
          Return to Shop Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setIsCartOpen(true);
    }, 400);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const waMessage = encodeURIComponent(
    `Namaskar Kalashrushti! I am interested in ordering "${product.name}" (₹${product.price}) from your handmade collection. Please let me know the availability and delivery details to Pune.`
  );

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-6 sm:py-10 pb-24 sm:pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#231F20]/60">
          <Link href="/" className="hover:text-[#6B1D2A]">
            Home
          </Link>
          <ChevronRight size={13} />
          <Link href="/shop" className="hover:text-[#6B1D2A]">
            Catalog
          </Link>
          <ChevronRight size={13} />
          <Link
            href={`/shop?category=${product.category}`}
            className="capitalize hover:text-[#6B1D2A]"
          >
            {product.category}
          </Link>
          <ChevronRight size={13} />
          <span className="text-[#6B1D2A] font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#FFF8EC] border-2 border-[#C9A24B]/30 shadow-lg">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.bestseller && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#F5A623] text-[#231F20] shadow">
                    Bestseller
                  </span>
                )}
                {product.festivalSpecial && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#6B1D2A] text-[#FFF8EC] shadow">
                    Festive Edition
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImage === idx
                        ? 'border-[#6B1D2A] scale-105 shadow-md'
                        : 'border-[#C9A24B]/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Craft Details & Purchase Controls */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest text-[#B87005] font-bold px-2.5 py-0.5 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/30">
                  {product.category}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1 text-xs text-[#A5802E] font-semibold">
                    <Star size={13} className="fill-[#F5A623] text-[#F5A623]" />
                    <span>{product.rating}</span>
                    <span className="text-[#231F20]/40">({product.reviewCount || 12} reviews)</span>
                  </div>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#6B1D2A] leading-tight">
                {product.name}
              </h1>

              <div className="text-base sm:text-lg text-[#A5802E] font-devanagari mt-1 font-semibold">
                {product.marathiName}
              </div>

              <p className="text-xs sm:text-sm text-[#231F20]/75 mt-2">
                {product.tagline}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-[#FFF8EC] border border-[#C9A24B]/30 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-[#6B1D2A]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-[#231F20]/40 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`}
              />
              <span className="font-bold text-[#231F20]">
                {product.inStock ? 'Handmade In Stock & Ready to Ship' : 'Currently Made to Order (Allow 3-5 days)'}
              </span>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-[#C9A24B]/40 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-sm font-bold text-[#6B1D2A] hover:bg-[#FFF8EC] rounded-l-full cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#231F20]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-sm font-bold text-[#6B1D2A] hover:bg-[#FFF8EC] rounded-r-full cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 rounded-full bg-[#6B1D2A] hover:bg-[#4A121C] text-[#FFF8EC] text-xs sm:text-sm font-bold shadow-md transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={16} className="text-[#F5A623]" />
                  <span>{addedAnimation ? 'Added to Bag!' : `Add ${quantity} to Festive Cart`}</span>
                </button>
              </div>

              {/* Direct WhatsApp Ordering */}
              <a
                href={`https://wa.me/8149065483?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon size={16} />
                <span>Inquire &amp; Order on WhatsApp</span>
              </a>
            </div>

            {/* Specifications Cards */}
            <div className="space-y-3 pt-4 border-t border-[#E8DFC8]">
              <h3 className="font-serif text-base font-bold text-[#6B1D2A]">
                Craft Description &amp; Heritage
              </h3>
              <p className="text-xs sm:text-sm text-[#231F20]/80 leading-relaxed">
                {product.description}
              </p>

              {product.artisanNote && (
                <div className="p-3 rounded-xl bg-[#FFF8EC] border-l-4 border-[#C9A24B] text-xs text-[#A5802E]">
                  <strong className="block text-[#6B1D2A] mb-0.5">Artisan Heritage Note:</strong>
                  {product.artisanNote}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                {product.material && (
                  <div className="p-3 rounded-xl bg-white border border-[#E8DFC8]">
                    <span className="text-[10px] uppercase font-bold text-[#231F20]/50 block">
                      Material
                    </span>
                    <span className="font-semibold text-[#6B1D2A]">{product.material}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="p-3 rounded-xl bg-white border border-[#E8DFC8]">
                    <span className="text-[10px] uppercase font-bold text-[#231F20]/50 block">
                      Dimensions
                    </span>
                    <span className="font-semibold text-[#6B1D2A]">{product.dimensions}</span>
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              {product.careInstructions && product.careInstructions.length > 0 && (
                <div className="pt-2 text-xs space-y-1">
                  <span className="font-bold text-[#6B1D2A]">Care Instructions:</span>
                  <ul className="list-disc list-inside text-[#231F20]/75 space-y-0.5">
                    {product.careInstructions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E8DFC8] text-center text-[10px] sm:text-[11px] text-[#231F20]/70">
              <div className="p-2 rounded-xl bg-[#FFF8EC]">
                <ShieldCheck size={18} className="mx-auto text-[#6B1D2A] mb-1" />
                <span className="font-bold block">100% Authentic</span>
                <span>Handcrafted in Pune</span>
              </div>
              <div className="p-2 rounded-xl bg-[#FFF8EC]">
                <Truck size={18} className="mx-auto text-[#6B1D2A] mb-1" />
                <span className="font-bold block">Safe Packaging</span>
                <span>Zero-breakage boxes</span>
              </div>
              <div className="p-2 rounded-xl bg-[#FFF8EC]">
                <RotateCcw size={18} className="mx-auto text-[#6B1D2A] mb-1" />
                <span className="font-bold block">Direct Support</span>
                <span>Local artisan families</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Creations from this category (2-col on mobile) */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 sm:pt-16 space-y-6">
            <div className="text-center">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#6B1D2A]">
                More Creations in {product.category.toUpperCase()}
              </h2>
              <p className="text-xs text-[#231F20]/60 mt-1">
                Complementary festive decor from our Pune workshop
              </p>
            </div>
            <RangoliDivider theme="gold" className="my-2" />
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((rel, idx) => (
                <ProductCard key={rel.id} product={rel} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Add to Bag Floating Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-t border-neutral-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">Price</div>
          <div className="font-serif text-base font-bold text-[#6B1D2A] leading-tight">
            ₹{(product.price * quantity).toLocaleString('en-IN')}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 max-w-[220px] py-2.5 px-4 rounded-full bg-[#6B1D2A] active:bg-[#4A121C] text-[#FFF8EC] text-xs font-bold shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
        >
          <ShoppingBag size={14} className="text-[#F5A623]" />
          <span>{addedAnimation ? 'Added!' : 'Add to Bag'}</span>
        </button>
      </div>
    </div>
  );
}
