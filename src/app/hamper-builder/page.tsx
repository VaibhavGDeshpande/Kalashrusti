'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Plus, 
  Trash2, 
  Scale, 
  RotateCcw, 
  PenTool, 
  HeartHandshake, 
  Package, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_HAMPER_ITEMS } from '@/data/mockData';
import { HamperItem, Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { RangoliDivider } from '@/components/ui/RangoliDivider';
import HamperCanvas from '@/components/canvas/HamperCanvas';

const BASE_BOX_PRICE = 499; // Price for handcrafted lacquered keepsake trunk
const MAX_WEIGHT_GRAMS = 2000;

export default function HamperBuilderPage() {
  const { addToCart, setIsCartOpen } = useCart();
  const { language, t } = useLanguage();

  // Selected item IDs (Defaults with diya and marigold mala pre-selected for instant wow factor)
  const [selectedIds, setSelectedIds] = useState<string[]>(['h-1', 'h-2', 'h-5']);

  // Personalization State
  const [recipientName, setRecipientName] = useState('Mama & Mami');
  const [senderName, setSenderName] = useState('Deshmukh Family');
  const [personalNote, setPersonalNote] = useState(
    'दीपावलीच्या आणि नवीन वर्षाच्या मनःपूर्वक हार्दिक शुभेच्छा! हे वर्ष आनंदाचे आणि भरभराटीचे जावो.'
  );
  const [ribbonStyle, setRibbonStyle] = useState<'velvet' | 'zari' | 'jute'>('velvet');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const selectedItems = MOCK_HAMPER_ITEMS.filter((item) => selectedIds.includes(item.id));
  const itemsTotal = selectedItems.reduce((acc, curr) => acc + curr.price, 0);
  const totalPrice = BASE_BOX_PRICE + itemsTotal;
  const totalWeight = selectedItems.reduce((acc, curr) => acc + curr.weightGrams, 0) + 400; // trunk weight ~400g

  const toggleItem = (itemId: string) => {
    setSelectedIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleAddToCart = () => {
    // Construct bespoke Hamper product object
    const bespokeHamper: Product = {
      id: `custom-hamper-${Date.now()}`,
      slug: `custom-hamper-${Date.now()}`,
      name: `Bespoke Festive Hamper (${selectedItems.length} Treasures)`,
      marathiName: `सानुकूल दिवाळी भेटपेटी (${selectedItems.length} वस्तू)`,
      tagline: `Includes ${selectedItems.map((i) => i.name).join(', ')} with personalized calligraphy card for ${recipientName}`,
      description: `Luxury lacquered gift trunk containing: ${selectedItems.map((i) => i.name).join(', ')}. Gift message: "${personalNote}"`,
      category: 'hampers',
      price: totalPrice,
      originalPrice: totalPrice + 500,
      images: ['/images/crafts/diwali_hamper.png'],
      inStock: true,
      featured: true,
      dimensions: '12 x 10 x 5 in Keepsake Wooden Box',
      material: 'Lacquered Pine Wood with Crimson Silk Lining & Handcrafted Brass Accents',
      festivalSpecial: true,
      has3DModel: true,
      modelType: 'hamper',
      rating: 5.0,
      reviewCount: 1,
    };

    addToCart(bespokeHamper, 1);

    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F5A623', '#6B1D2A', '#C9A24B', '#FFF8EC'],
    });

    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      setIsCartOpen(true);
    }, 600);
  };

  const waMessage = encodeURIComponent(
    `Namaskar Kalashrushti! I customized a Bespoke Diwali Hamper on your 3D Builder:\n\n` +
      `🎁 Hamper Box: Luxury Wooden Keepsake Trunk (₹${BASE_BOX_PRICE})\n` +
      `✨ Selected Crafts:\n${selectedItems.map((i) => `• ${i.name} (₹${i.price})`).join('\n')}\n\n` +
      `🏷️ Total Price: ₹${totalPrice}\n` +
      `🎀 Ribbon Style: ${ribbonStyle.toUpperCase()}\n` +
      `💌 Calligraphy Card:\nTo: ${recipientName}\nFrom: ${senderName}\nMessage: "${personalNote}"\n\n` +
      `Please confirm crafting & delivery to Pune!`
  );

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Breadcrumbs & Title */}
        <div>
          <nav className="flex items-center gap-2 text-xs text-[#231F20]/60 mb-3">
            <Link href="/" className="hover:text-[#6B1D2A]">
              Home
            </Link>
            <ChevronRight size={13} />
            <Link href="/shop" className="hover:text-[#6B1D2A]">
              Catalog
            </Link>
            <ChevronRight size={13} />
            <span className="text-[#6B1D2A] font-semibold">3D Hamper Builder</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 text-xs font-semibold text-[#6B1D2A] mb-2">
                <Sparkles size={14} className="text-[#D4880D]" />
                <span>
                  {language === 'mr'
                    ? 'सानुकूल ३D भेटपेटी कार्यशाळा'
                    : 'Interactive 3D Bespoke Gifting Studio'}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6B1D2A] tracking-tight">
                {language === 'mr'
                  ? 'आपली सानुकूल भेटपेटी तयार करा'
                  : 'Design Your Bespoke Diwali Trunk'}
              </h1>
              <p className="text-xs sm:text-sm text-[#231F20]/75 mt-1 max-w-2xl">
                {language === 'mr'
                  ? 'आपल्या आवडीचा पितळी दिवा, फुलांची माळ, धूप आणि मिष्टान्न निवडा. ३D मध्ये प्रत्यक्ष रूप पहा.'
                  : 'Assemble your choice of sacred brass divas, marigold malas, organic incense, and a handwritten calligraphy gift card.'}
              </p>
            </div>

            {/* Reset / Quick stats */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedIds(['h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6'])}
                className="px-3.5 py-1.5 rounded-full border border-[#C9A24B]/40 bg-[#FFF8EC] hover:bg-[#6B1D2A] hover:text-[#FFF8EC] text-xs font-semibold text-[#6B1D2A] transition-colors cursor-pointer"
              >
                Select All ({MOCK_HAMPER_ITEMS.length})
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-100 text-xs text-stone-600 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <RangoliDivider theme="gold" className="my-2" />

        {/* ======================================================== */}
        {/* MAIN BUILDER WORKSPACE: 3D CANVAS + CONTROLS PANEL */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ======================================================== */}
          {/* LEFT COLUMN: INTERACTIVE 3D HAMPER CANVAS & METERS (7 Cols) */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
            {/* 3D Canvas Card */}
            <div className="relative rounded-3xl overflow-hidden bg-radial from-[#FFFDF9] via-[#F7EAD0]/60 to-[#E8DFC8]/40 border-2 border-[#C9A24B]/40 shadow-xl">
              {/* Top Bar inside 3D Canvas */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#6B1D2A] text-[#F5A623] shadow-md border border-[#C9A24B]/40 pointer-events-auto">
                  🎁 3D Live Trunk Simulator
                </span>

                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#231F20] shadow-xs border border-[#C9A24B]/30 pointer-events-auto">
                  {selectedItems.length} items packed inside
                </span>
              </div>

              {/* R3F 3D Canvas */}
              <HamperCanvas selectedItems={selectedIds} />

              {/* Bottom Ribbon Indicator */}
              <div className="p-3 bg-[#FFF8EC]/95 border-t border-[#C9A24B]/30 flex flex-wrap items-center justify-between gap-2 text-xs text-[#231F20]/80">
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-[#6B1D2A]" />
                  <span>
                    Base: <strong>Signature Lacquered Wooden Trunk</strong> (₹{BASE_BOX_PRICE})
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#A5802E] font-medium">
                  <Scale size={13} />
                  <span>
                    Est. Weight: <strong>{totalWeight}g</strong> / {MAX_WEIGHT_GRAMS}g
                  </span>
                </div>
              </div>
            </div>

            {/* Live Calligraphy Card Preview */}
            <div className="p-5 rounded-2xl bg-[#FFF8EC] border border-[#C9A24B]/40 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5A623]/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#6B1D2A] uppercase tracking-wider">
                <PenTool size={14} className="text-[#F5A623]" />
                <span>Calligraphy Gift Card Included Inside Trunk</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#C9A24B]/30 shadow-inner space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#6B1D2A]">
                  <span>प्रति / To: {recipientName || 'Recipient'}</span>
                  <span>प्रेषक / From: {senderName || 'Sender'}</span>
                </div>
                <p className="text-xs text-[#231F20]/80 italic font-serif leading-relaxed">
                  &ldquo;{personalNote}&rdquo;
                </p>
                <div className="text-[10px] text-[#A5802E] text-right font-medium">
                  ✍️ Hand-inscribed on golden-flecked handmade paper
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: STEP-BY-STEP CUSTOMIZER STUDIO (5 Cols) */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            {/* STEP 1: ITEM SELECTION */}
            <div className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8DFC8] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC8]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A5802E]">
                    Step 1 of 3
                  </span>
                  <h2 className="font-serif text-lg font-bold text-[#6B1D2A]">
                    Select Artisanal Treasures
                  </h2>
                </div>
                <span className="text-xs font-bold text-[#6B1D2A] bg-[#FFF8EC] px-2.5 py-1 rounded-full border border-[#C9A24B]/30">
                  {selectedIds.length} of {MOCK_HAMPER_ITEMS.length}
                </span>
              </div>

              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {MOCK_HAMPER_ITEMS.map((item) => {
                  const isSelected = selectedIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#FFF8EC] border-[#6B1D2A] shadow-xs'
                          : 'bg-white border-[#E8DFC8] hover:border-[#C9A24B]/60'
                      }`}
                    >
                      {/* Thumbnail Image */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 border border-[#C9A24B]/30 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-semibold text-xs text-[#231F20] truncate">
                            {item.name}
                          </h4>
                        </div>
                        <div className="text-[10px] text-[#A5802E] font-devanagari">
                          {item.marathiName}
                        </div>
                        <div className="text-[10px] text-[#231F20]/50 line-clamp-1 mt-0.5">
                          {item.description}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-serif font-bold text-xs text-[#6B1D2A]">
                            ₹{item.price}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            • {item.weightGrams}g
                          </span>
                        </div>
                      </div>

                      {/* Toggle Button */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${
                          isSelected
                            ? 'bg-[#6B1D2A] text-[#F5A623] shadow-xs'
                            : 'border-2 border-stone-300 text-stone-300 hover:border-[#6B1D2A]'
                        }`}
                      >
                        {isSelected ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: PERSONALIZED CALLIGRAPHY CARD */}
            <div className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8DFC8] shadow-xs space-y-4">
              <div className="pb-3 border-b border-[#E8DFC8]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A5802E]">
                  Step 2 of 3
                </span>
                <h2 className="font-serif text-lg font-bold text-[#6B1D2A]">
                  Personalized Greeting Note
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#6B1D2A] mb-1 text-[11px]">
                      Recipient (कोणासाठी)
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Kulkarni Family"
                      className="w-full p-2 rounded-xl bg-white border border-[#C9A24B]/40 focus:border-[#6B1D2A] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#6B1D2A] mb-1 text-[11px]">
                      Sender (प्रेषक)
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Deshmukh Family"
                      className="w-full p-2 rounded-xl bg-white border border-[#C9A24B]/40 focus:border-[#6B1D2A] outline-none text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#6B1D2A] mb-1 text-[11px]">
                    Handwritten Calligraphy Message
                  </label>
                  <textarea
                    rows={2}
                    value={personalNote}
                    onChange={(e) => setPersonalNote(e.target.value)}
                    placeholder="Type your warm festival wishes..."
                    className="w-full p-2.5 rounded-xl bg-white border border-[#C9A24B]/40 focus:border-[#6B1D2A] outline-none text-xs font-serif"
                  />
                </div>
              </div>
            </div>

            {/* STEP 3: FESTIVE RIBBON FINISH */}
            <div className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8DFC8] shadow-xs space-y-3">
              <div className="pb-2 border-b border-[#E8DFC8]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A5802E]">
                  Step 3 of 3
                </span>
                <h2 className="font-serif text-lg font-bold text-[#6B1D2A]">
                  Select Finishing Ribbon
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'velvet', label: 'Royal Maroon Velvet', icon: '🎗️' },
                  { id: 'zari', label: 'Pure Gold Zari Lace', icon: '✨' },
                  { id: 'jute', label: 'Organic Eco Jute', icon: '🌿' },
                ].map((rib) => (
                  <button
                    key={rib.id}
                    type="button"
                    onClick={() => setRibbonStyle(rib.id as typeof ribbonStyle)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      ribbonStyle === rib.id
                        ? 'bg-[#6B1D2A] text-[#FFF8EC] border-[#6B1D2A] shadow-xs font-bold'
                        : 'bg-white border-[#E8DFC8] hover:border-[#6B1D2A] text-[#231F20]'
                    }`}
                  >
                    <span className="text-base block mb-0.5">{rib.icon}</span>
                    <span className="text-[10px] block leading-tight">{rib.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE SUMMARY & CHECKOUT BUTTONS */}
            <div className="p-6 rounded-2xl bg-[#FFF8EC] border-2 border-[#C9A24B]/40 shadow-md space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#231F20]/75">
                  <span>Keepsake Lacquered Wooden Trunk:</span>
                  <span className="font-mono">₹{BASE_BOX_PRICE}</span>
                </div>
                <div className="flex justify-between text-[#231F20]/75">
                  <span>{selectedItems.length} Artisanal Craft Add-ons:</span>
                  <span className="font-mono">₹{itemsTotal}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-800 font-bold">
                  <span>Complimentary Calligraphy Card:</span>
                  <span>FREE</span>
                </div>
                <div className="pt-2 border-t border-[#C9A24B]/30 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#6B1D2A] block">
                      Total Hamper Price
                    </span>
                    <span className="text-[10px] text-[#A5802E]">Taxes &amp; festive packaging included</span>
                  </div>
                  <span className="font-serif text-3xl font-bold text-[#6B1D2A]">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={selectedItems.length === 0}
                  className="w-full py-3.5 px-6 rounded-full bg-[#6B1D2A] hover:bg-[#4A121C] disabled:bg-stone-300 text-[#FFF8EC] text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={17} className="text-[#F5A623]" />
                  <span>
                    {isAddedSuccess ? 'Added to Bag!' : `Add Bespoke Hamper to Bag (₹${totalPrice})`}
                  </span>
                </button>

                <a
                  href={`https://wa.me/8149065483?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon size={16} />
                  <span>Order Bespoke Hamper on WhatsApp</span>
                </a>
              </div>

              {/* Studio Assurance */}
              <div className="pt-2 border-t border-[#C9A24B]/20 flex items-center justify-center gap-2 text-[11px] text-[#231F20]/70 text-center">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Hand-packed with care in Pune • Breakage-free insured shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
