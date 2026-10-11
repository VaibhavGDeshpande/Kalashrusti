'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Package, 
  ShoppingBag, 
  LayoutDashboard, 
  ExternalLink, 
  Store, 
  Plus,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Festival Banner', href: '/admin/festival-banner', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-neutral-900 flex flex-col md:flex-row font-sans antialiased">
      {/* Clean Minimal Sidebar */}
      <aside className="w-full md:w-60 bg-white border-r border-neutral-200 flex flex-col shrink-0">
        {/* Brand Header */}  
        <div className="h-16 px-5 border-b border-neutral-200 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-semibold text-sm">
              का
            </div>
            <div>
              <div className="font-semibold text-sm text-neutral-900 leading-tight">
                Kalashrushti
              </div>
              <div className="text-[11px] text-neutral-500 font-normal">
                Admin Panel
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links (Horizontal swipe on mobile, vertical sidebar on desktop) */}
        <nav 
          className="p-2 sm:p-3 flex md:flex-col overflow-x-auto no-scrollbar gap-1 md:gap-0 md:space-y-0.5 shrink-0 border-b md:border-b-0 border-neutral-200"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="hidden md:block px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
            Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-neutral-900 text-white font-semibold shadow-2xs md:bg-neutral-100 md:text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <Icon size={15} className={isActive ? 'text-white md:text-neutral-900' : 'text-neutral-500'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Direct Link to Storefront */}
        <div className="hidden md:block p-3 border-t border-neutral-200">
          <Link
            href="/shop"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-neutral-50 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Store size={15} />
              <span>Public Store</span>
            </span>
            <ExternalLink size={13} className="text-neutral-400" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-neutral-200 px-6 sm:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400">Admin</span>
            <span className="text-neutral-300">/</span>
            <span className="font-semibold text-neutral-900 capitalize">
              {pathname === '/admin'
                ? 'Overview'
                : pathname === '/admin/products'
                ? 'Products'
                : pathname === '/admin/orders'
                ? 'Orders'
                : 'Festival Banner'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products?action=new"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition-colors"
            >
              <Plus size={14} />
              <span>Add Product</span>
            </Link>

            <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold flex items-center justify-center">
              A
            </div>
          </div>
        </header>

        {/* Page Children */}
        <main className="flex-1 p-6 sm:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
