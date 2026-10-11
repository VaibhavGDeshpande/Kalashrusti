'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Heart, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { useLanguage } from '@/context/LanguageContext';

const INSTA_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=600&q=80',
    likes: 428,
    caption: 'दिवाळीच्या पहिल्या दिवशी आपल्या दारात उजळणारा पितळी अखंड दिवा 🪔✨ #Kalashrushti #diwali2026',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    likes: 612,
    caption: 'नैसर्गिक वनस्पतीपासून घडवलेली झेंडूची हस्तनिर्मित तोरणे 🌼 कधीही सुकणार नाहीत! #handmadeflowers',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    likes: 389,
    caption: 'रांगोळी काढायची घाई? हे कुंदन पॅचेस फक्त २ मिनिटांत सजवा! 🌸💎 #kundanrangoli #festivedecor',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    likes: 540,
    caption: 'पैठणी पदराच्या नजाकतीने सजलेला रेशमी टेबल रनर 🦚 आपल्या डायनिंग टेबलला द्या राजेशाही लुक!',
  },
];

export const InstagramShowcase: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-[#FFFDF9] border-t border-[#C9A24B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <InstagramIcon size={16} className="text-[#8E2737]" />
              <span className="text-xs uppercase tracking-widest text-[#C9A24B] font-bold">
                {t('insta.tag')}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B1D2A]">
              {t('insta.title')}
            </h2>
          </div>

          <a
            href="https://instagram.com/_kalashrushti_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6B1D2A] text-[#FFF8EC] hover:bg-[#4A121C] text-xs font-semibold shadow transition-all group"
          >
            <InstagramIcon size={14} className="text-[#F5A623]" />
            <span>{t('insta.followBtn')}</span>
            <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* 4 Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTA_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/_kalashrushti_"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-[#C9A24B]/30 shadow-sm hover:shadow-xl transition-all"
            >
              <Image
                src={post.image}
                alt="Kalashrushti Instagram Post"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover overlay with likes & caption */}
              <div className="absolute inset-0 bg-[#6B1D2A]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white text-xs">
                <div className="flex items-center justify-end">
                  <InstagramIcon size={16} className="text-[#F5A623]" />
                </div>
                <div>
                  <p className="line-clamp-3 text-[11px] font-medium leading-relaxed mb-2 text-[#FFF8EC]">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-[#F5A623] font-bold">
                    <Heart size={14} className="fill-[#F5A623]" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
