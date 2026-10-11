/**
 * Backend Data Access Layer for kalashrusti
 * 
 * NOTE FOR SUPABASE INTEGRATION:
 * When ready to connect Supabase:
 * 1. Install @supabase/supabase-js
 * 2. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 * 3. Replace the mock return statements below with supabase.from('products').select('*') etc.
 * The UI components consume these methods, ensuring zero UI changes when migrating.
 */

import { MOCK_PRODUCTS, MOCK_HAMPER_ITEMS, MOCK_FESTIVAL_BANNER, MOCK_ORDERS } from '@/data/mockData';
import { Product, HamperItem, FestivalBannerConfig, OrderRequest } from '@/types';

export const api = {
  async getProducts(category?: string): Promise<Product[]> {
    // Simulate minor network latency for realistic feel
    await new Promise((r) => setTimeout(r, 40));
    if (!category || category === 'all') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter((p) => p.category === category);
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    await new Promise((r) => setTimeout(r, 40));
    const prod = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return prod || null;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    await new Promise((r) => setTimeout(r, 40));
    return MOCK_PRODUCTS.filter((p) => p.featured);
  },

  async getHamperItems(): Promise<HamperItem[]> {
    await new Promise((r) => setTimeout(r, 40));
    return MOCK_HAMPER_ITEMS;
  },

  async getFestivalBanner(): Promise<FestivalBannerConfig> {
    await new Promise((r) => setTimeout(r, 40));
    return MOCK_FESTIVAL_BANNER;
  },

  async getOrders(): Promise<OrderRequest[]> {
    await new Promise((r) => setTimeout(r, 40));
    return MOCK_ORDERS;
  },

  async createOrderRequest(orderData: Omit<OrderRequest, 'id' | 'createdAt' | 'status'>): Promise<OrderRequest> {
    await new Promise((r) => setTimeout(r, 60));
    const newOrder: OrderRequest = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    return newOrder;
  }
};
