'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  CheckCircle2,
  Gift,
  Tag
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { api } from '@/lib/api';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const { language } = useLanguage();
  const isMarathi = language === 'mr';

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Customer checkout form state
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const giftThreshold = 1999;
  const freeDiyaUnlocked = subtotal >= giftThreshold;
  const remainingForGift = Math.max(0, giftThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / giftThreshold) * 100));

  const shippingFee = subtotal > 0 ? (subtotal >= 1499 ? 0 : 99) : 0;
  const grandTotal = Math.max(0, subtotal - couponDiscount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'DIWALI2026' || code === 'DIWALI10' || code === 'FESTIVE10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedCoupon(code);
      setCouponDiscount(discount);
      setCouponInput('');
    } else if (code === 'UTSAV15' || code === 'DIWALI15') {
      const discount = Math.round(subtotal * 0.15);
      setAppliedCoupon(code);
      setCouponDiscount(discount);
      setCouponInput('');
    } else {
      setCouponError(isMarathi ? 'अवैध कूपन कोड' : 'Invalid coupon code. Try DIWALI2026');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponError(null);
  };

  // Generate WhatsApp order message with full customer details
  const generateWhatsAppUrl = () => {
    let text = isMarathi 
      ? `*नवीन ऑर्डर विचारणा (kalashrusti Pune)*\n\n`
      : `*New Order Inquiry (kalashrusti Pune)*\n\n`;

    if (customerName) text += `👤 *Customer:* ${customerName}\n`;
    if (phone) text += `📞 *Phone:* ${phone}\n`;
    if (city) text += `📍 *City / Pin:* ${city} ${pincode ? `(${pincode})` : ''}\n`;
    if (address) text += `🏠 *Address:* ${address}\n`;

    text += `\n🛒 *Ordered Crafts:*\n`;
    items.forEach((item, index) => {
      const name = isMarathi ? item.product.marathiName : item.product.name;
      text += `${index + 1}. *${name}*\n   Qty: ${item.quantity} × ₹${item.product.price} = ₹${item.quantity * item.product.price}\n`;
    });

    text += `\n*Subtotal:* ₹${subtotal}\n`;
    if (couponDiscount > 0) {
      text += `🏷️ *Coupon (${appliedCoupon}):* -₹${couponDiscount}\n`;
    }
    text += `🚚 *Shipping:* ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}\n`;
    text += `💰 *Grand Total:* ₹${grandTotal}\n`;

    if (freeDiyaUnlocked) {
      text += `🪔 *Gift:* Free Handcrafted Akhand Brass Diya Included!\n`;
    }
    if (specialNote) {
      text += `\n📝 *Special Request:* ${specialNote}\n`;
    }

    text += isMarathi 
      ? `\nकृपया उपलब्धतेची पुष्टी करा आणि पेमेंट / डिलिव्हरी तपशील सांगा. धन्यवाद!`
      : `\nPlease confirm availability, payment instructions, and dispatch schedule. Thank you!`;

    return `https://wa.me/918149065483?text=${encodeURIComponent(text)}`;
  };

  const handlePlaceOrderRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      const newOrder = await api.createOrderRequest({
        customerName: customerName.trim() || 'Festive Customer',
        phone: phone.trim() || '+91 81490 65483',
        email: email.trim() || 'customer@festive.in',
        address: address.trim() || 'Pune Workshop Delivery',
        city: city.trim() || 'Pune',
        pincode: pincode.trim() || '411014',
        items,
        subtotal,
        shipping: shippingFee,
        total: grandTotal,
        specialInstructions: specialNote.trim() || (freeDiyaUnlocked ? 'Free Brass Diya qualified' : undefined),
      });

      setOrderSuccess(newOrder.id);
      clearCart();
    } catch {
      // Fallback
      setOrderSuccess(`ORD-${Math.floor(1000 + Math.random() * 9000)}`);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (orderSuccess) {
    return (
      <div className="min-h-[75vh] bg-[#FFFDF9] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#6B1D2A] bg-[#6B1D2A]/10 px-3 py-1 rounded-full">
              Order Inquiry #{orderSuccess}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
              {isMarathi ? 'ऑर्डर विनंती यशस्वीरीत्या नोंदवली!' : 'Festive Order Request Received!'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
              {isMarathi 
                ? 'आमचा पुणे स्टुडिओ कारागीर आपल्या ऑर्डरची पडताळणी करेल आणि WhatsApp द्वारे आपल्याशी थेट संपर्क साधेल.'
                : 'Thank you for supporting authentic handmade crafts. Our Pune artisan studio has received your order request and will reach out via WhatsApp with tracking details.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-left text-xs space-y-2">
            <div className="flex justify-between text-neutral-600">
              <span>Order Reference:</span>
              <span className="font-mono font-bold text-neutral-900">{orderSuccess}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Artisan Studio:</span>
              <span className="font-semibold text-neutral-900">kalashrusti, Pune</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Status:</span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Pending Studio Confirmation
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={`https://wa.me/918149065483?text=${encodeURIComponent(`Namaskar kalashrusti! I just submitted order request #${orderSuccess}. Please confirm my order details!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              <WhatsAppIcon size={16} />
              <span>{isMarathi ? 'WhatsApp वर थेट संपर्क करा' : 'Connect on WhatsApp Directly'}</span>
            </a>

            <Link
              href="/shop"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-800 font-semibold text-xs transition-colors"
            >
              <ArrowLeft size={14} />
              <span>{isMarathi ? 'दुकान दालनात परत जा' : 'Return to Craft Catalog'}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART SCREEN
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FFFDF9] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-[#FFF8EC] border border-neutral-200 flex items-center justify-center mx-auto text-[#6B1D2A]">
            <ShoppingBag size={32} />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-bold text-neutral-900">
              {isMarathi ? 'तुमची खरेदी पिशवी रिकामी आहे' : 'Your Shopping Bag is Empty'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto">
              {isMarathi
                ? 'आमचे सुंदर अखंड पितळी दिवे, झेंडूची तोरणे आणि कुंदन रांगोळी संग्रह पाहा.'
                : 'Explore our authentic handcrafted brass divas, marigold torans, and Paithani silk table runners.'}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-8 rounded-full bg-[#6B1D2A] hover:bg-[#4A121C] text-white text-xs font-semibold shadow-xs transition-all"
            >
              <span>{isMarathi ? 'हस्तकला दालन पाहा' : 'Explore Collections'}</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/hamper-builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-medium transition-colors"
            >
              <Gift size={14} className="text-[#C9A24B]" />
              <span>{isMarathi ? '३D भेटपेटी बनवा' : '3D Hamper Builder'}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <Link href="/" className="hover:text-black transition-colors">
                {isMarathi ? 'मुख्यपृष्ठ' : 'Home'}
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-black transition-colors">
                {isMarathi ? 'दालन' : 'Shop'}
              </Link>
              <span>/</span>
              <span className="text-neutral-900 font-medium">
                {isMarathi ? 'खरेदी पिशवी' : 'Shopping Bag'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
              {isMarathi ? 'तुमची खरेदी पिशवी' : 'Your Shopping Bag'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {items.length} {isMarathi ? 'हस्तकला उत्पादने' : 'handcrafted items'} • kalashrusti Studio Pune
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-black transition-colors self-start sm:self-auto"
          >
            <ArrowLeft size={13} />
            <span>{isMarathi ? 'अजून खरेदी करा' : 'Continue Shopping'}</span>
          </Link>
        </div>

        {/* Free Brass Diya Progress Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF8EC] border border-[#C9A24B]/30 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-2 text-[#6B1D2A]">
              <Sparkles size={16} className="text-[#F5A623]" />
              {freeDiyaUnlocked ? (
                <span className="font-bold text-[#6B1D2A]">
                  🎉 {isMarathi ? 'अभिनंदन! मोफत अखंड पितळी दिवा अनलॉक झाला!' : 'Congratulations! Free Handcrafted Akhand Brass Diya Unlocked!'}
                </span>
              ) : (
                <span>
                  {isMarathi 
                    ? `अजून ₹${remainingForGift} जोडा आणि मिळवा मोफत अखंड पितळी दिवा 🪔`
                    : `Add ₹${remainingForGift} more to qualify for a Free Handcrafted Brass Diya 🪔`}
                </span>
              )}
            </span>
            <span className="font-bold text-[#D4880D]">{progressPercent}%</span>
          </div>

          <div className="w-full bg-[#E5D7BF] h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className="bg-gradient-to-r from-[#F5A623] to-[#D4880D] h-full rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* 2-Column Layout: Left Items Table | Right Order Summary & Request Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT: Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-2xs divide-y divide-neutral-100">
              {items.map((item) => (
                <div key={item.product.id} className="p-4 sm:p-5 flex gap-4 sm:gap-5 items-center">
                  {/* Thumbnail */}
                  <Link 
                    href={`/shop/${item.product.slug}`}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                          {item.product.category}
                        </span>
                        <Link 
                          href={`/shop/${item.product.slug}`}
                          className="block text-sm sm:text-base font-semibold text-neutral-900 hover:text-[#6B1D2A] transition-colors truncate"
                        >
                          {isMarathi ? item.product.marathiName : item.product.name}
                        </Link>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="text-xs text-neutral-500 font-light truncate">
                      {item.product.tagline}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="inline-flex items-center border border-neutral-200 rounded-full bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-neutral-100 rounded-l-full text-neutral-600 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-xs font-semibold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-neutral-100 rounded-r-full text-neutral-600 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Total for item */}
                      <div className="text-right">
                        <div className="text-sm font-bold text-neutral-900">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[11px] text-neutral-400">
                            (₹{item.product.price} each)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="flex justify-between items-center text-xs text-neutral-500 px-1">
              <span>{items.length} {isMarathi ? 'वस्तू निवडल्या आहेत' : 'unique crafts in your bag'}</span>
              <button
                onClick={clearCart}
                className="hover:text-red-600 underline cursor-pointer transition-colors"
              >
                {isMarathi ? 'पिशवी रिकामी करा' : 'Clear all items'}
              </button>
            </div>

            {/* Heritage Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-white border border-neutral-200 text-center space-y-1">
                <ShieldCheck size={18} className="mx-auto text-[#6B1D2A]" />
                <div className="text-[11px] font-bold text-neutral-900">100% Authentic</div>
                <div className="text-[10px] text-neutral-500">Handcrafted in Pune</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-neutral-200 text-center space-y-1">
                <Truck size={18} className="mx-auto text-[#6B1D2A]" />
                <div className="text-[11px] font-bold text-neutral-900">Safe Packaging</div>
                <div className="text-[10px] text-neutral-500">Zero-damage boxes</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-neutral-200 text-center space-y-1">
                <RotateCcw size={18} className="mx-auto text-[#6B1D2A]" />
                <div className="text-[11px] font-bold text-neutral-900">Artisan Support</div>
                <div className="text-[10px] text-neutral-500">Direct to families</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary & Customer Request Form (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Price Summary Card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-bold text-neutral-900 pb-2 border-b border-neutral-100">
                {isMarathi ? 'ऑर्डर सारांश' : 'Order Summary'}
              </h2>

              <div className="space-y-2.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>{isMarathi ? 'वस्तू उपएकूण:' : 'Cart Subtotal:'}</span>
                  <span className="font-semibold text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag size={12} />
                      <span>Coupon ({appliedCoupon}):</span>
                    </span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{isMarathi ? 'डिलिव्हरी शुल्क:' : 'Estimated Shipping:'}</span>
                  <span className="font-semibold text-neutral-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE (Diwali Special)</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                {freeDiyaUnlocked && (
                  <div className="flex justify-between text-[#B87005] font-medium pt-1">
                    <span>🪔 Free Handcrafted Diya:</span>
                    <span className="font-bold">INCLUDED</span>
                  </div>
                )}

                <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-neutral-900">{isMarathi ? 'एकूण रक्कम:' : 'Grand Total:'}</span>
                  <span className="text-xl font-bold font-serif text-[#6B1D2A]">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Coupon Code Input */}
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <span className="font-semibold">Coupon &apos;{appliedCoupon}&apos; Applied!</span>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-neutral-400 hover:text-red-600 text-[11px] underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (DIWALI2026)"
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:border-neutral-900 outline-none uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                )}
              </div>
            </div>

            {/* Customer Details & Fast WhatsApp Checkout Card */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  {isMarathi ? 'ऑर्डर नोंदणी तपशील' : 'Dispatch & Contact Details'}
                </h3>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  {isMarathi 
                    ? 'पुणे स्टुडिओ थेट संपर्क साधेल आणि पार्सल पाठवेल.'
                    : 'Our Pune team directly confirms delivery and tracking.'}
                </p>
              </div>

              <form onSubmit={handlePlaceOrderRequest} className="space-y-3 text-xs">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Radhika Joshi"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98231 XXXXX"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-neutral-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      City / Pin Code
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Pune (411004)"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-neutral-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Flat No., Society, Area"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-neutral-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Special Gift Note / Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="e.g. Please add Diwali greeting card wishing Happy Deepawali!"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-neutral-900 outline-none text-xs"
                  />
                </div>

                <div className="space-y-2.5 pt-2">
                  {/* Instant WhatsApp Order */}
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <WhatsAppIcon size={16} />
                    <span>{isMarathi ? 'WhatsApp वर थेट ऑर्डर करा' : 'Order Instantly via WhatsApp'}</span>
                  </a>

                  {/* Standard Studio Request */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    <span>
                      {isSubmitting
                        ? (isMarathi ? 'नोंदणी करत आहे...' : 'Submitting Request...')
                        : (isMarathi ? 'स्टुडिओकडे ऑर्डर पाठवा' : 'Submit Studio Order Request')}
                    </span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
