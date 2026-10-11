'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Package, 
  ShoppingBag, 
  Plus, 
  ArrowUpRight, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useProducts } from '@/context/ProductsContext';
import { MOCK_ORDERS } from '@/data/mockData';

export default function AdminDashboardPage() {
  const { products } = useProducts();

  const inStockCount = products.filter((p) => p.inStock).length;
  const recentProducts = [...products].reverse().slice(0, 5);
  const recentOrders = [...MOCK_ORDERS].slice(0, 5);

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      subtext: `${inStockCount} currently in stock`,
      icon: Package,
    },
    {
      title: 'Total Orders',
      value: MOCK_ORDERS.length,
      subtext: 'Inquiries received',
      icon: ShoppingBag,
    },
    {
      title: 'Categories',
      value: '6',
      subtext: 'Lamps, Torans, Runners & more',
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Manage kalashrusti craft inventory, orders, and storefront settings.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/products?action=new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition-colors shadow-2xs"
          >
            <Plus size={15} />
            <span>New Product</span>
          </Link>
          <Link
            href="/shop"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:text-neutral-900 text-xs font-medium transition-colors"
          >
            <span>Live Store</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500">
                  {s.title}
                </span>
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600">
                  <Icon size={16} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neutral-900 tracking-tight">
                  {s.value}
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  {s.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Recent Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Recent Products Table */}
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">
                Recent Products
              </h2>
              <p className="text-xs text-neutral-500">Latest additions to catalog</p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {recentProducts.map((p) => (
              <div key={p.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-neutral-50/60 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-neutral-900 truncate">
                      {p.name}
                    </p>
                    <p className="text-[11px] text-neutral-500 capitalize">
                      {p.category}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-neutral-900">
                    ₹{p.price}
                  </p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    p.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {p.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders List */}
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">
                Recent Orders
              </h2>
              <p className="text-xs text-neutral-500">Customer requests &amp; inquiries</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-neutral-50/60 transition-colors">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-neutral-900 truncate">
                    {ord.customerName}
                  </p>
                  <p className="text-[11px] text-neutral-500 truncate">
                    #{ord.id} • {ord.city}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-neutral-900">
                    ₹{ord.total}
                  </p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${
                    ord.status === 'delivered' 
                      ? 'bg-emerald-50 text-emerald-700'
                      : ord.status === 'dispatched'
                      ? 'bg-blue-50 text-blue-700'
                      : ord.status === 'crafting'
                      ? 'bg-purple-50 text-purple-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
