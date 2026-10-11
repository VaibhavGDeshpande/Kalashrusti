'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const STORY_CHAPTERS = [
  {
    id: 1,
    title: 'माती आणि निसर्गाशी घट्ट नातं',
    englishTitle: 'The Soul of Soil & Botanical Craft',
    description:
      'We began kalashrusti with a simple heartfelt yearning: to bring back the pure, unhurried tactile warmth of Indian festivals. Our sola flowers are carved from wild water-plant pith that will never wilt, and our clay diyas are turned on traditional foot wheels by generational kumhars.',
    marathiDesc:
      'भारतीय सणांची अस्सल आणि पवित्र ऊब परत आणण्याच्या प्रेरणेतून कालाश्रुष्टीचा जन्म झाला. आमची झेंडूची फुले जंगली पाण्याच्या वनस्पतीपासून कोरलेली आहेत जी कधीही सुकत नाहीत, आणि आमचे मातीचे दिवे पारंपरिक चाकावर पिढ्यान्पिढ्या काम करणाऱ्या कुंभारांनी घडवले आहेत.',
    quote: '"हस्तकला ही केवळ वस्तू नसते, ती कारागिराच्या हृदयाची स्पंदने असते."',
    englishQuote: '"Handicraft is not merely an object; it is the heartbeat of the artisan."',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    stat: '४०+ कुंभार व कारागीर कुटुंबे',
    englishStat: '40+ Artisan Families',
    statLabel: 'Artisan Families Supported',
    marathiStatLabel: 'कारागीर कुटुंबे जोडलेली',
  },
  {
    id: 2,
    title: 'अखंड पितळेची तेजोमय परंपरा',
    englishTitle: 'Molten Brass & Unbroken Light',
    description:
      'In a world flooded with cheap stamped metal, our akhand divas are cast in heavy virgin brass. Master chisellers hand-chisel every peacock feather and lotus petal. Designed so that the sacred flame stays steady and protected throughout festive nights.',
    marathiDesc:
      'स्वस्त पत्र्याच्या जमान्यात, आमचे अखंड दिवे शुद्ध आणि जड पितळामध्ये ओतले जातात. कारागीर प्रत्येक मोराचा पिसारा आणि कमळाची पाकळी हाताने कोरीव करतात, जेणेकरून मांगल्याची ज्योत अविरत तेवत राहावी.',
    quote: '"दिवा म्हणजे केवळ प्रकाश नव्हे, तर मांगल्याचा आणि तेजाचा वास."',
    englishQuote: '"A lamp is not just illumination; it is the sacred dwelling of light and goodwill."',
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80',
    stat: '१००% अस्सल शुद्ध पितळ',
    englishStat: '100% Solid Virgin Brass',
    statLabel: 'Purity & Weight Guaranteed',
    marathiStatLabel: 'शुद्धता आणि वजनाची खात्री',
  },
  {
    id: 3,
    title: 'घरोघरी आनंदाचा सागर पोहोचवणे',
    englishTitle: 'Hastakala: An Ocean of Joy',
    description:
      'From our studio in Pune, every gift hamper is packed with personalized calligraphy, fragrant sandalwood dhoop, and carefully wrapped brassware. We make sure unboxing a kalashrusti parcel feels like receiving festive blessings directly from family.',
    marathiDesc:
      'पुण्यातील आमच्या स्टुडिओतून प्रत्येक भेटपेटी वैयक्तिक देवनागरी अक्षरांनी, सुगंधी चंदन धूप आणि पितळी दिव्यांनी सजवून पाठवली जाते. कालाश्रुष्टीचा बॉक्स उघडणे म्हणजे थेट आपुलकीचा सण साजरा करण्यासारखे आहे.',
    quote: '"प्रत्येक घरात आनंदाचे दीप तेवत राहोत, हाच आमचा ध्यास."',
    englishQuote: '"May the light of joy shine in every home—this is our sole devotion."',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
    stat: '५,०००+ समाधानी घरे',
    englishStat: '5,000+ Festive Homes',
    statLabel: 'Illuminated Across India',
    marathiStatLabel: 'भारतभर उजळलेली घरे',
  },
];

export const MakersStoryPinned: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { language, t } = useLanguage();
  const currentChapter = STORY_CHAPTERS[activeStep];

  const chapterTitle = language === 'mr' ? currentChapter.title : currentChapter.englishTitle;
  const chapterDesc = language === 'mr' ? currentChapter.marathiDesc : currentChapter.description;
  const chapterQuote = language === 'mr' ? currentChapter.quote : currentChapter.englishQuote;
  const chapterStat = language === 'mr' ? currentChapter.stat : currentChapter.englishStat;
  const chapterStatLabel = language === 'mr' ? currentChapter.marathiStatLabel : currentChapter.statLabel;

  return (
    <section className="py-24 bg-[#6B1D2A] text-[#FFF8EC] relative overflow-hidden">
      {/* Decorative Warm Ambient Lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#F5A623]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 rounded-full bg-[#DFC47F]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Story Navigator (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8EC]/10 border border-[#C9A24B]/40 text-xs text-[#DFC47F]">
              <Sparkles size={14} className="text-[#F5A623]" />
              <span className="font-semibold">{t('story.badge')}</span>
            </div>

            <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#FFF8EC] ${
              language === 'mr' ? 'font-devanagari' : ''
            }`}>
              {language === 'mr' ? (
                <>
                  हस्तकला आणि परंपरेचा <br />
                  <span className="gold-gradient-text">पवित्र संगम</span>
                </>
              ) : (
                <>
                  Where Heritage Meets <br />
                  <span className="gold-gradient-text font-serif italic">Pure Craftsmanship</span>
                </>
              )}
            </h2>

            {/* Story Chapter Selector Tabs */}
            <div className="flex gap-2 p-1.5 rounded-xl bg-[#4A121C]/80 border border-[#C9A24B]/20 w-fit">
              {STORY_CHAPTERS.map((chap, idx) => (
                <button
                  key={chap.id}
                  onClick={() => setActiveStep(idx)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeStep === idx
                      ? 'bg-[#F5A623] text-[#231F20] shadow'
                      : 'text-[#FFF8EC]/70 hover:text-[#FFF8EC]'
                  }`}
                >
                  {language === 'mr' ? `भाग ${idx + 1}` : `Chapter ${idx + 1}`}
                </button>
              ))}
            </div>

            {/* Crossfading Chapter Narrative */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <h3 className={`font-serif text-2xl font-bold text-[#FFF8EC] ${
                  language === 'mr' ? 'font-devanagari text-[#F5A623]' : ''
                }`}>
                  {chapterTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#FFF8EC]/80 leading-relaxed font-sans">
                  {chapterDesc}
                </p>

                {/* Poetic Quote Callout */}
                <div className="p-4 rounded-xl bg-[#FFF8EC]/5 border-l-4 border-[#F5A623] italic text-xs sm:text-sm text-[#DFC47F]">
                  {chapterQuote}
                </div>

                {/* Stat Pill */}
                <div className="pt-2 flex items-center gap-3">
                  <div className="p-3 rounded-full bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30">
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="font-serif text-lg font-bold text-[#FFF8EC]">
                      {chapterStat}
                    </div>
                    <div className="text-xs text-[#FFF8EC]/60">{chapterStatLabel}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-4 flex items-center gap-4">
              <Link href="/about">
                <Button variant="festive" size="md">
                  {t('story.readFull')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Crossfading Artisan Photography (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 sm:aspect-16/11 rounded-3xl overflow-hidden border-2 border-[#C9A24B]/40 shadow-2xl bg-[#4A121C]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentChapter.image}
                    alt={chapterTitle}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {/* Subtle edge vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A121C] via-transparent to-transparent opacity-60" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Corner Decorative Brass Emblem */}
            <div className="absolute -bottom-5 -left-5 bg-[#C9A24B] text-[#4A121C] font-serif font-bold text-xs p-3.5 rounded-2xl shadow-xl border-2 border-[#FFF8EC] flex items-center gap-2">
              <Sparkles size={16} />
              <span>{t('story.studioStamp')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
