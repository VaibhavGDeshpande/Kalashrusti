'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const DICTIONARY: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', mr: 'Home' },
  'nav.shop': { en: 'Shop', mr: 'Shop' },
  'nav.hamper': { en: 'Hamper Builder', mr: 'Hamper Builder' },
  'nav.about': { en: 'About Us', mr: 'About Us' },
  'nav.contact': { en: 'Contact', mr: 'Contact' },
  'nav.buildHamperCta': { en: 'Custom Hamper', mr: 'Custom Hamper' },
  'nav.tagline': { en: 'Hastakala – Anandacha Sagar • Diwali Pre-Orders Live', mr: 'हस्तकला – आनंदाचा सागर • दिवाळी पूर्वनोंदणी सुरू' },
  'nav.heritage': { en: 'Pune • Heritage Craft Studio', mr: 'पुणे • हस्तकलेचा वारसा' },

  // Search & Categories Dropdown
  'search.all': { en: 'All', mr: 'All' },
  'search.allCategories': { en: 'All Categories', mr: 'All Categories' },
  'search.placeholder': { en: 'Search handcrafted divas, torans, rangoli...', mr: 'Search handcrafted divas, torans, rangoli...' },
  'search.noResults': { en: 'No matching crafts found', mr: 'No matching crafts found' },
  'search.resultsCount': { en: 'crafts found', mr: 'crafts found' },
  'search.viewAll': { en: 'View all results in Shop', mr: 'View all results in Shop' },
  'search.popularSearches': { en: 'Popular Searches', mr: 'Popular Searches' },

  // Hero
  'hero.badge': { en: 'Diwali Special Collection 2026', mr: 'Diwali Special Collection 2026' },
  'hero.subbadge': { en: 'Authentic Indian Handicrafts', mr: 'Authentic Indian Handicrafts' },
  'hero.titleLine1': { en: 'Hastakala –', mr: 'हस्तकला –' },
  'hero.titleLine2': { en: 'Anandacha Sagar', mr: 'आनंदाचा सागर' },
  'hero.subtitle': {
    en: 'Handmade sola wood flowers, cast brass akhand divas, kundan rangoli editions, and artisanal silk runners. Handcrafted in Pune to infuse your home with sacred light, warmth, and joy.',
    mr: 'नैसर्गिक वनस्पतीची झेंडूची फुले, अखंड पितळी दिवे, कुंदन रांगोळी आणि रेशमी टेबल रनर. आपल्या घराला मांगल्याचे तेज आणि आनंदाची ऊब देण्यासाठी पुण्यात घडवलेली हस्तकला.'
  },
  'hero.exploreBtn': { en: 'Explore Creations', mr: 'संग्रह पाहा' },
  'hero.hamperBtn': { en: 'Hamper Builder', mr: 'भेटपेटी बनवा' },
  'hero.trust1Title': { en: '100% Handcrafted', mr: '१००% हस्तकला' },
  'hero.trust1Desc': { en: 'Artisan Made', mr: 'अस्सल निर्मिती' },
  'hero.trust2Title': { en: 'Virgin Brass', mr: 'शुद्ध पितळ' },
  'hero.trust2Desc': { en: 'Lifetime Durability', mr: 'दीर्घकाळ टिकणारे' },
  'hero.trust3Title': { en: 'Calligraphy Card', mr: 'हस्तलिखित पत्र' },
  'hero.trust3Desc': { en: 'Personalised Note', mr: 'वैयक्तिक शुभेच्छा' },
  'hero.interactive3d': { en: 'Handcrafted Festive Crafts', mr: 'हस्तनिर्मित विशेष निर्मिती' },

  // Categories
  'cat.tag': { en: 'Explore By Category', mr: 'हस्तकलेचे प्रकार' },
  'cat.title': { en: 'Curated Craft Collections', mr: 'आमचे हस्तकला विभाग' },
  'cat.viewAll': { en: 'View All Crafts', mr: 'सर्व हस्तकला उत्पादने पाहा' },
  'cat.clickToView': { en: 'Explore Collection', mr: 'पाहण्यासाठी क्लिक करा' },

  // Featured
  'feat.badge': { en: 'Masterpiece Creations', mr: 'उत्कृष्ट कारागिरीचे नमुने' },
  'feat.title': { en: 'Featured Festive Handicrafts', mr: 'हस्तनिर्मित विशेष निर्मिती' },
  'feat.subtitle': {
    en: 'Every piece is handcrafted in limited batches. Explore our most treasured festive creations.',
    mr: 'प्रत्येक वस्तू मर्यादित संख्येत, प्रेमाने घडवलेली आहे. आमचे खास सणासुदीचे नमुने पाहा.'
  },
  'feat.tabAll': { en: 'All Creations', mr: 'सर्व' },
  'feat.tabLamps': { en: 'Lamps & Divas', mr: 'दिवे' },
  'feat.tabFlowers': { en: 'Flowers & Torans', mr: 'फुले व तोरण' },
  'feat.tabRangoli': { en: 'Rangoli Patches', mr: 'रांगोळी' },
  'feat.tabHampers': { en: 'Diwali Hampers', mr: 'दिवाळी हॅम्पर्स' },
  'feat.browseShop': { en: 'Browse Complete Shop', mr: 'संपूर्ण हस्तकला दालन पाहा' },

  // Maker's Story
  'story.badge': { en: 'The Maker’s Story', mr: 'आमची गोष्ट' },
  'story.title': { en: 'Where Heritage Meets Pure Joy', mr: 'हस्तकला आणि परंपरेचा संगम' },
  'story.readFull': { en: 'Read Our Full Story', mr: 'संपूर्ण कहाणी वाचा' },
  'story.studioStamp': { en: 'Pune, Maharashtra • Studio', mr: 'पुणे, महाराष्ट्र • स्टुडिओ' },

  // Hamper Callout
  'hamper.badge': { en: 'Custom Hamper Studio', mr: 'सानुकूल भेटपेटी' },
  'hamper.title1': { en: 'Curate Your Own', mr: 'तुमच्या आवडीची' },
  'hamper.title2': { en: 'Luxury Diwali Gift Trunk', mr: 'खास दिवाळी भेटपेटी' },
  'hamper.desc': {
    en: 'Choose your royal gift trunk, handpick handcrafted brass divas, sola flower malas, temple dhoop, and sweets. Customize your bespoke festive hamper with ease!',
    mr: 'राजेशाही लाकडी पेटी निवडा, त्यामध्ये पितळी दिवा, तोरण, धूप आणि मिठाई स्वतः निवडून भरा. तुमची भेटपेटी आपल्या आवडीनुसार सजवा!'
  },
  'hamper.f1': { en: 'Live Artisanal Gift Packing', mr: 'थेट सानुकूल पॅकिंग' },
  'hamper.f2': { en: 'Handwritten Calligraphy Card', mr: 'हस्तलिखित देवनागरी शुभेच्छापत्र' },
  'hamper.f3': { en: 'Hereditary Artisan Crafted', mr: 'पारंपरिक कारागिरांनी घडवलेले' },
  'hamper.f4': { en: 'Instant WhatsApp Order Dispatch', mr: 'WhatsApp वर थेट ऑर्डर सुविधा' },
  'hamper.cta': { en: 'Create Your Hamper', mr: 'भेटपेटी बनवणे सुरू करा' },

  // Instagram
  'insta.tag': { en: 'Instagram Feed', mr: 'इन्स्टाग्राम वरील झलक' },
  'insta.title': { en: 'Reels & Stories from Our Pune Studio', mr: 'आमच्या कारागिरीचे रील्स व फोटो' },
  'insta.followBtn': { en: 'Follow @_kalashrushti_', mr: '@_kalashrushti_ फॉलो करा' },

  // Cart
  'cart.title': { en: 'Your Shopping Bag', mr: 'तुमची खरेदी पिशवी' },
  'cart.itemsCount': { en: 'Handcrafted items', mr: 'हस्तकला वस्तू' },
  'cart.freeDiyaProgress': { en: 'Add ₹{amount} more for a Free Brass Diya', mr: 'अजून ₹{amount} जोडा आणि मिळवा मोफत पितळी दिवा' },
  'cart.freeDiyaUnlocked': { en: 'Congratulations! Free Brass Diya Unlocked! 🪔', mr: 'अभिनंदन! मोफत पितळी दिवा अनलॉक झाला! 🪔' },
  'cart.emptyTitle': { en: 'Your bag is empty', mr: 'तुमची पिशवी रिकामी आहे' },
  'cart.emptyDesc': { en: 'Discover our handmade lamps, torans, and festive kundan rangolis.', mr: 'आमचे सणासुदीचे दिवे, तोरणे आणि सुंदर रांगोळी पाहा.' },
  'cart.exploreBtn': { en: 'Explore Crafts', mr: 'हस्तकला पाहा' },
  'cart.subtotal': { en: 'Subtotal:', mr: 'उपएकूण:' },
  'cart.taxesNotice': { en: 'Shipping calculated at final request step.', mr: 'डिलिव्हरी पुढील पायरीवर निश्चित केली जाईल.' },
  'cart.checkoutBtn': { en: 'Review & Send Order Request', mr: 'ऑर्डर विनंती पाठवा' },
  'cart.whatsappBtn': { en: 'Quick WhatsApp Order Inquiry', mr: 'WhatsApp वर त्वरित ऑर्डर चौकशी' },
  'cart.quickAdd': { en: 'Quick Add', mr: 'पिशवीत टाका' },

  // Footer
  'footer.heritagePill': { en: 'Tradition of Handcraft', mr: 'हस्तकलेची परंपरा' },
  'footer.aboutDesc': {
    en: 'A boutique handmade craft studio rooted in Maharashtra. Every petal strung, brass edge polished, and rangoli motif cast with love to bring joy into your home.',
    mr: 'महाराष्ट्राच्या संस्कृतीत रुजलेला हस्तकला स्टुडिओ. घरोघरी आनंदाचा सागर पोहोचवण्यासाठी प्रेमाने घडवलेली कला.'
  },
  'footer.craftsHeading': { en: 'Crafts', mr: 'हस्तकला संग्रह' },
  'footer.giftingHeading': { en: 'Gifting', mr: 'सणासुदीच्या भेटवस्तू' },
  'footer.aboutHeading': { en: 'About Studio', mr: 'आमची ओळख' },
  'footer.contactHeading': { en: 'Direct Connect', mr: 'थेट संपर्क' },
  'footer.allRights': { en: 'All rights reserved.', mr: 'सर्व हक्क राखीव.' },
  'footer.craftedWith': { en: 'Crafted with love for festive homes', mr: 'भारतीय सणांसाठी प्रेमाने घडवलेले' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kalashrushti_lang') as Language;
      if (saved === 'en' || saved === 'mr') {
        setLanguageState(saved);
      }
    } catch {
      // Ignore SSR
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('kalashrushti_lang', lang);
    } catch {
      // Ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'mr' : 'en';
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    if (DICTIONARY[key]) {
      return DICTIONARY[key][language] || DICTIONARY[key].en;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
