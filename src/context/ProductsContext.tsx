'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import { MOCK_PRODUCTS } from '@/data/mockData';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewCount'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  resetToDefaults: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const STORAGE_KEY = 'kalashrushti_products';

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Load persisted products from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch {
      // Fallback to MOCK_PRODUCTS
    }
  }, []);

  // Save to localStorage whenever products change
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
    } catch {
      // Ignore
    }
  };

  const addProduct = (productData: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewCount'>): Product => {
    // Generate slug from English name
    const slugBase = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const slug = `${slugBase || 'craft-item'}-${randomSuffix}`;

    // Ensure fallback image placeholder if blank
    const defaultPlaceholder =
      'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=1000&q=80';
    const images =
      productData.images && productData.images.length > 0 && productData.images[0].trim() !== ''
        ? productData.images
        : [defaultPlaceholder];

    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      slug,
      images,
      rating: 5.0,
      reviewCount: 1,
    };

    const updated = [newProduct, ...products];
    saveProducts(updated);
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  const getProductsByCategory = (category: string) => {
    if (!category || category === 'all') return products;
    return products.filter((p) => p.category === category);
  };

  const resetToDefaults = () => {
    saveProducts(MOCK_PRODUCTS);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        getProductsByCategory,
        resetToDefaults,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
