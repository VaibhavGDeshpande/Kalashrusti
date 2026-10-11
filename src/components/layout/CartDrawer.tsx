'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/Button';

export const CartDrawer: React.FC = () => {
  const { items, removeFromCart, updateQuantity, subtotal, isCartOpen, setIsCartOpen } = useCart();
  const { language, t } = useLanguage();

  const giftThreshold = 1999;
  const progressPercent = Math.min(100, Math.round((subtotal / giftThreshold) * 100));
  const remainingForGift = Math.max(0, giftThreshold - subtotal);

  // Generate WhatsApp order message for @_kalashrushti_
  const generateWhatsAppUrl = () => {
    let text = language === 'mr' 
      ? `*नवीन ऑर्डर विचारणा (kalashrusti Order Inquiry)*\n\n`
      : `*New Order Inquiry (kalashrusti)*\n\n`;

    items.forEach((item, index) => {
      const name = language === 'mr' ? item.product.marathiName : item.product.name;
      text += `${index + 1}. *${name}*\n   Qty: ${item.quantity} x ₹${item.product.price} = ₹${item.quantity * item.product.price}\n`;
    });

    text += `\n*Subtotal:* ₹${subtotal}\n`;
    if (subtotal >= giftThreshold) {
      text += `🎁 *Special:* Free Handcrafted Brass Diya Qualified!\n`;
    }
    text += language === 'mr'
      ? `\nकृपया उपलब्धतेची पुष्टी करा आणि डिलिव्हरी तपशील सांगा. धन्यवाद!`
      : `\nPlease confirm availability and dispatch timeline. Thank you!`;

    return `https://wa.me/8149065483?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-[#231F20]/50 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col border-l border-[#C9A24B]/30"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#C9A24B]/20 bg-[#FFF8EC] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-[#6B1D2A] text-[#FFF8EC]">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h2 className={`font-serif text-lg font-bold text-[#6B1D2A] ${language === 'mr' ? 'font-devanagari' : ''}`}>
                      {t('cart.title')}
                    </h2>
                    <p className="text-xs text-[#231F20]/60">
                      {items.length} {t('cart.itemsCount')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-[#6B1D2A]/10 text-[#6B1D2A] transition-colors cursor-pointer"
                  aria-label="Close Bag"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Free Diya Gift Progress Bar */}
              <div className="px-5 py-3.5 bg-[#FFF4E0] border-b border-[#F5A623]/30">
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="flex items-center gap-1.5 text-[#6B1D2A]">
                    <Sparkles size={14} className="text-[#F5A623]" />
                    {subtotal >= giftThreshold ? (
                      <span className="font-bold text-[#231F20]">{t('cart.freeDiyaUnlocked')}</span>
                    ) : (
                      <span>{t('cart.freeDiyaProgress').replace('{amount}', remainingForGift.toString())}</span>
                    )}
                  </span>
                  <span className="font-bold text-[#D4880D]">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#F5A623]/20 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-[#F5A623] to-[#D4880D] h-full rounded-full"
                  />
                </div>
              </div>

              {/* Items Scroll List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4" data-lenis-prevent>
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#231F20]/60 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#FFF8EC] border-2 border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B]">
                      <ShoppingBag size={28} />
                    </div>
                    <p className={`font-serif text-base font-semibold text-[#6B1D2A] ${language === 'mr' ? 'font-devanagari' : ''}`}>
                      {t('cart.emptyTitle')}
                    </p>
                    <p className="text-xs max-w-xs text-[#231F20]/70">
                      {t('cart.emptyDesc')}
                    </p>
                    <Link href="/shop" onClick={() => setIsCartOpen(false)}>
                      <Button variant="festive" size="sm">
                        {t('cart.exploreBtn')}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 rounded-xl bg-[#FFF8EC]/60 border border-[#C9A24B]/20"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-white">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-sm font-bold text-[#231F20] line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[#6B1D2A]/50 hover:text-[#6B1D2A] p-1 transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#C9A24B] font-devanagari">
                            {item.product.marathiName}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-serif text-sm font-bold text-[#6B1D2A]">
                            ₹{item.product.price * item.quantity}
                          </span>

                          <div className="flex items-center border border-[#C9A24B]/30 rounded-full bg-white">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 px-2 text-[#6B1D2A] hover:bg-[#FFF8EC] rounded-l-full cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2 text-xs font-semibold text-[#231F20]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 px-2 text-[#6B1D2A] hover:bg-[#FFF8EC] rounded-r-full cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer Actions */}
              {items.length > 0 && (
                <div className="p-5 border-t border-[#C9A24B]/20 bg-[#FFF8EC] space-y-3">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-[#231F20]/70">{t('cart.subtotal')}</span>
                    <span className="font-serif text-xl font-bold text-[#6B1D2A]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#231F20]/60">
                    {t('cart.taxesNotice')}
                  </p>

                  <div className="space-y-2 pt-1">
                    <Link
                      href="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#6B1D2A] text-[#FFF8EC] font-semibold text-sm shadow hover:bg-[#4A121C] transition-all"
                    >
                      <span>{t('cart.checkoutBtn')}</span>
                      <ArrowRight size={15} />
                    </Link>

                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#25D366] text-white font-semibold text-xs shadow hover:brightness-105 transition-all"
                    >
                      <MessageCircle size={16} />
                      <span>{t('cart.whatsappBtn')}</span>
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
