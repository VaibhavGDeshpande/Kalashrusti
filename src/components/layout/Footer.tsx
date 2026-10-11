'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { RangoliDivider } from '@/components/ui/RangoliDivider';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#6B1D2A] text-[#FFF8EC] border-t-2 border-[#C9A24B]/40 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-[#F5A623]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Brand Statement */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF8EC]/10 border border-[#C9A24B]/30 mb-4">
            <Sparkles size={14} className="text-[#F5A623]" />
            <span className="text-xs uppercase tracking-widest text-[#DFC47F]">
              {t('footer.heritagePill')}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FFF8EC] mb-2">
            {language === 'mr' ? 'कालाश्रुष्टी' : 'kalashrusti'}
          </h2>
          <p className="font-devanagari text-lg sm:text-xl text-[#F5A623] mb-4">
            {language === 'mr' ? 'हस्तकला – आनंदाचा सागर' : 'Hastakala – Anandacha Sagar'}
          </p>
          <p className="text-xs sm:text-sm text-[#FFF8EC]/75 leading-relaxed">
            {t('footer.aboutDesc')}
          </p>
        </div>

        {/* Self-drawing Rangoli Divider */}
        <RangoliDivider theme="cream" className="opacity-70 my-4" />

        {/* 4 Column Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-10 border-b border-[#C9A24B]/20">
          {/* Col 1: Craft Categories */}
          <div>
            <h3 className="font-serif text-sm font-bold tracking-wider uppercase text-[#DFC47F] mb-4">
              {t('footer.craftsHeading')}
            </h3>
            <ul className="space-y-2.5 text-xs text-[#FFF8EC]/80">
              <li>
                <Link href="/shop?category=lamps" className="hover:text-[#F5A623] transition-colors">
                  {language === 'mr' ? 'पितळी व मातीचे दिवे' : 'Handcrafted Lamps & Divas'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=flowers" className="hover:text-[#F5A623] transition-colors">
                  {language === 'mr' ? 'हस्तनिर्मित फुले व तोरण' : 'Handmade Flowers & Torans'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=patches" className="hover:text-[#F5A623] transition-colors">
                  {language === 'mr' ? 'कुंदन रांगोळी पॅचेस' : 'Kundan Rangoli Patches'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=runners" className="hover:text-[#F5A623] transition-colors">
                  {language === 'mr' ? 'रेशमी व जरी टेबल रनर' : 'Paithani & Silk Table Runners'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=mats" className="hover:text-[#F5A623] transition-colors">
                  {language === 'mr' ? 'चांदेरी पूजा आसने' : 'Pooja Aasan Mats'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Festive Gifting */}
          <div>
            <h3 className="font-serif text-sm font-bold tracking-wider uppercase text-[#DFC47F] mb-4">
              {t('footer.giftingHeading')}
            </h3>
            <ul className="space-y-2.5 text-xs text-[#FFF8EC]/80">
              <li>
                <Link href="/hamper-builder" className="hover:text-[#F5A623] transition-colors font-medium text-[#F5A623]">
                  {language === 'mr' ? 'सानुकूल ३D भेटपेटी' : 'Custom 3D Hamper Builder'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=hampers" className="hover:text-[#F5A623] transition-colors">
                  {language === 'mr' ? 'दिवाळी स्पेशल हॅम्पर्स' : 'Curated Diwali Gift Boxes'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F5A623] transition-colors">
                  {language === 'mr' ? 'कॉर्पोरेट व लग्न सोहळा ऑर्डर्स' : 'Bulk & Corporate Gifting'}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#F5A623] transition-colors">
                  {language === 'mr' ? 'ऑर्डर स्थिती व विचारणा' : 'Order Status & Inquiry'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio & Artisans */}
          <div>
            <h3 className="font-serif text-sm font-bold tracking-wider uppercase text-[#DFC47F] mb-4">
              {t('footer.aboutHeading')}
            </h3>
            <ul className="space-y-2.5 text-xs text-[#FFF8EC]/80">
              <li>
                <Link href="/about" className="hover:text-[#F5A623] transition-colors">
                  {language === 'mr' ? 'आमची कहाणी' : 'The kalashrusti Story'}
                </Link>
              </li>
              <li>
                <Link href="/about#artisans" className="hover:text-[#F5A623] transition-colors">
                  {language === 'mr' ? 'कारागिरांचा सन्मान' : 'Our Hereditary Artisans'}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#F5A623] transition-colors text-[#DFC47F]/80">
                  {language === 'mr' ? 'कारागीर डॅशबोर्ड' : 'Artisan Admin Portal'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Instagram & Direct Connect */}
          <div>
            <h3 className="font-serif text-sm font-bold tracking-wider uppercase text-[#DFC47F] mb-4">
              {t('footer.contactHeading')}
            </h3>
            <div className="space-y-3 text-xs text-[#FFF8EC]/80">
              <a
                href="https://instagram.com/_kalashrushti_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFF8EC]/10 border border-[#C9A24B]/30 hover:bg-[#FFF8EC]/20 transition-all text-[#FFF8EC]"
              >
                <InstagramIcon size={18} className="text-[#F5A623]" />
                <div>
                  <div className="font-semibold">@_kalashrushti_</div>
                  <div className="text-[10px] text-[#DFC47F]">Follow us on Instagram for daily studio reels</div>
                </div>
              </a>

              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#C9A24B] shrink-0" />
                <span>{language === 'mr' ? 'पुणे, महाराष्ट्र, भारत' : 'Pune, Maharashtra, India'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#C9A24B] shrink-0" />
                <span>WhatsApp: +91 814965483</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#C9A24B] shrink-0" />
                <span>kalashrusti.crafts@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF8EC]/60 gap-4">
          <p>© 2026 kalashrusti. {t('footer.allRights')}</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart size={13} className="text-[#F5A623] fill-[#F5A623]" /> {t('footer.craftedWith')}
          </p>
        </div>
      </div>
    </footer>
  );
};
