'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { MOCK_FESTIVAL_BANNER } from '@/data/mockData';
import { FestivalBannerConfig } from '@/types';

export default function AdminFestivalBannerPage() {
  const [config, setConfig] = useState<FestivalBannerConfig>(MOCK_FESTIVAL_BANNER);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('kalashrusti_festival_banner', JSON.stringify(config));
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Festival Announcement
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Configure the seasonal announcement ribbon displayed across the top of all pages.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:text-neutral-900 text-xs font-medium transition-colors self-start sm:self-auto"
        >
          <span>View Live Store</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Success Notification */}
      {isSaved && (
        <div className="flex items-center gap-2 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>Announcement banner settings saved successfully.</span>
        </div>
      )}

      {/* Live Preview Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-2xs space-y-3">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          Live Preview
        </div>

        {config.isActive ? (
          <div className="w-full bg-neutral-900 text-white py-2.5 px-4 rounded-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-center">
            <span className="font-semibold text-amber-400">✨ {config.title}</span>
            <span className="text-neutral-500">|</span>
            <span className="text-neutral-300">{config.subtitle}</span>
            {config.couponCode && (
              <span className="px-2 py-0.5 rounded bg-amber-400 text-neutral-900 font-mono font-bold text-[11px]">
                {config.couponCode} ({config.discountPercentage}% OFF)
              </span>
            )}
          </div>
        ) : (
          <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-500 text-center text-xs">
            Banner is currently inactive. No announcement will be shown.
          </div>
        )}
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 shadow-2xs">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {/* Active Switch */}
          <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-between">
            <div>
              <div className="font-semibold text-neutral-900">Show Announcement Ribbon</div>
              <div className="text-[11px] text-neutral-500">
                Turn on to display the ribbon on the customer storefront.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.isActive}
                onChange={(e) => setConfig({ ...config, isActive: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-900"></div>
            </label>
          </div>

          {/* Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Headline (English)
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-white border border-neutral-300 focus:border-neutral-900 outline-none text-xs text-neutral-900"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Headline (Marathi)
              </label>
              <input
                type="text"
                value={config.marathiTitle}
                onChange={(e) => setConfig({ ...config, marathiTitle: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-white border border-neutral-300 focus:border-neutral-900 outline-none text-xs text-neutral-900 font-devanagari"
              />
            </div>
          </div>

          {/* Subtitle */}
          <div>
            <label className="block font-medium text-neutral-700 mb-1">
              Offer Subtitle / Promotion Text
            </label>
            <input
              type="text"
              value={config.subtitle}
              onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
              className="w-full p-2.5 rounded-lg bg-white border border-neutral-300 focus:border-neutral-900 outline-none text-xs text-neutral-900"
            />
          </div>

          {/* Coupon Code & Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Coupon Code
              </label>
              <input
                type="text"
                value={config.couponCode}
                onChange={(e) => setConfig({ ...config, couponCode: e.target.value.toUpperCase() })}
                className="w-full p-2.5 rounded-lg bg-white border border-neutral-300 focus:border-neutral-900 outline-none text-xs font-mono text-neutral-900"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Discount Percentage (%)
              </label>
              <input
                type="number"
                value={config.discountPercentage || 0}
                onChange={(e) =>
                  setConfig({ ...config, discountPercentage: parseInt(e.target.value) || 0 })
                }
                className="w-full p-2.5 rounded-lg bg-white border border-neutral-300 focus:border-neutral-900 outline-none text-xs text-neutral-900"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
