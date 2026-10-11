'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Plus, 
  Trash2, 
  ExternalLink, 
  Search,
  CheckCircle2,
  X
} from 'lucide-react';
import { useProducts } from '@/context/ProductsContext';
import { Product } from '@/types';

const PRESET_IMAGES = [
  { label: 'Brass Diya', url: '/images/crafts/brass_diya.png' },
  { label: 'Sola Flowers', url: '/images/crafts/marigold_toran.png' },
  { label: 'Kundan Rangoli', url: '/images/crafts/rangoli_patches.png' },
  { label: 'Silk Runner', url: '/images/crafts/silk_runner.png' },
  { label: 'Pooja Mat', url: '/images/crafts/pooja_mat.png' },
  { label: 'Gift Hamper', url: '/images/crafts/diwali_hamper.png' },
];

const DEFAULT_PLACEHOLDER_IMAGE = '/images/crafts/brass_diya.png';

const CATEGORIES = [
  { id: 'lamps', label: 'Lamps & Divas' },
  { id: 'flowers', label: 'Flowers & Torans' },
  { id: 'patches', label: 'Rangoli Patches' },
  { id: 'runners', label: 'Table Runners' },
  { id: 'mats', label: 'Pooja Mats' },
  { id: 'hampers', label: 'Diwali Hampers' },
];

function AdminProductsContent() {
  const searchParams = useSearchParams();
  const { products, addProduct, deleteProduct, updateProduct } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<{ message: string; slug: string; category: string } | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    marathiName: '',
    category: 'lamps' as Product['category'],
    price: '',
    originalPrice: '',
    imageUrl: '',
    tagline: '',
    description: '',
    material: '',
    dimensions: '',
    inStock: true,
    featured: true,
    bestseller: false,
    has3DModel: false,
  });

  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleResetForm = () => {
    setFormData({
      name: '',
      marathiName: '',
      category: 'lamps',
      price: '',
      originalPrice: '',
      imageUrl: '',
      tagline: '',
      description: '',
      material: '',
      dimensions: '',
      inStock: true,
      featured: true,
      bestseller: false,
      has3DModel: false,
    });
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    const priceNum = parseFloat(formData.price) || 0;
    const origPriceNum = formData.originalPrice ? parseFloat(formData.originalPrice) : undefined;
    const finalImage = formData.imageUrl.trim() || DEFAULT_PLACEHOLDER_IMAGE;

    const created = addProduct({
      name: formData.name.trim(),
      marathiName: formData.marathiName.trim() || formData.name.trim(),
      category: formData.category,
      price: priceNum,
      originalPrice: origPriceNum,
      images: [finalImage],
      tagline: formData.tagline.trim() || 'Handcrafted festive masterpiece by Kalashrushti artisans.',
      description: formData.description.trim() || 'Exquisitely crafted using traditional techniques in Pune, Maharashtra.',
      material: formData.material.trim() || 'Handcrafted Natural Materials',
      dimensions: formData.dimensions.trim() || 'Standard festive size',
      inStock: formData.inStock,
      featured: formData.featured,
      bestseller: formData.bestseller,
      festivalSpecial: true,
      has3DModel: formData.has3DModel,
      modelType: formData.category === 'lamps' ? 'diya' : formData.category === 'hampers' ? 'hamper' : undefined,
    });

    setIsModalOpen(false);
    handleResetForm();

    setSuccessToast({
      message: `Product "${created.name}" created successfully.`,
      slug: created.slug,
      category: created.category,
    });

    setTimeout(() => {
      setSuccessToast(null);
    }, 5000);
  };

  const displayedProducts = products.filter((p) => {
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.marathiName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Products Catalog
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            {products.length} products total across {CATEGORIES.length} categories.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus size={15} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Success Toast */}
      {successToast && (
        <div className="flex items-center justify-between p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{successToast.message}</span>
          </div>
          <Link
            href={`/shop/${successToast.slug}`}
            target="_blank"
            className="font-medium underline hover:text-emerald-950 flex items-center gap-1"
          >
            <span>View on store</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
            }`}
          >
            All ({products.length})
          </button>
          {CATEGORIES.map((c) => {
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setFilterCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  filterCategory === c.id
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                {c.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-60">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white border border-neutral-200 focus:border-neutral-400 outline-none text-neutral-800 placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/75 border-b border-neutral-200 text-neutral-500 font-medium text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {displayedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50/50 transition-colors">
                  {/* Thumbnail & Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0">
                        <Image
                          src={product.images[0] || DEFAULT_PLACEHOLDER_IMAGE}
                          alt={product.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-neutral-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-neutral-500 font-devanagari truncate">
                          {product.marathiName}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="capitalize text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded text-[11px] font-medium">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 font-semibold text-neutral-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </td>

                  {/* Stock Toggle */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => updateProduct(product.id, { inStock: !product.inStock })}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-colors ${
                        product.inStock
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-600' : 'bg-neutral-400'}`} />
                      <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/shop/${product.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                        title="View on Storefront"
                      >
                        <ExternalLink size={14} />
                      </Link>

                      <button
                        onClick={() => {
                          if (confirm(`Delete "${product.name}"?`)) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="p-1.5 rounded-md text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clean Modal for Creating Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden my-6">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-neutral-900">
                  Add New Product
                </h2>
                <p className="text-xs text-neutral-500">
                  Item will appear instantly in chosen category.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateProduct} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs" data-lenis-prevent>
              {/* Category */}
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Product['category'] })}
                  className="w-full p-2.5 rounded-lg bg-white border border-neutral-300 focus:border-neutral-900 outline-none text-xs text-neutral-900"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">
                    English Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Royal Peacock Akhand Brass Diya"
                    className="w-full p-2.5 rounded-lg bg-white border border-neutral-300 focus:border-neutral-900 outline-none text-xs text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">
                    Marathi Name
                  </label>
                  <input
                    type="text"
                    value={formData.marathiName}
                    onChange={(e) => setFormData({ ...formData, marathiName: e.target.value })}
                    placeholder="उदा. मयूर अखंड पितळी दिवा"
                    className="w-full p-2.5 rounded-lg bg-white border border-neutral-300 focus:border-neutral-900 outline-none text-xs text-neutral-900"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="1850"
                    className="w-full p-2.5 rounded-lg bg-white border border-neutral-300 focus:border-neutral-900 outline-none text-xs text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">
                    Original Price (₹) (Optional)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="2200"
                    className="w-full p-2.5 rounded-lg bg-white border border-neutral-300 focus:border-neutral-900 outline-none text-xs text-neutral-900"
                  />
                </div>
              </div>

              {/* Image Preview & Selection */}
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Product Image
                </label>
                <div className="flex gap-3 items-start">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0">
                    <Image
                      src={formData.imageUrl.trim() || DEFAULT_PLACEHOLDER_IMAGE}
                      alt="Preview"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="Paste image URL or choose preset below"
                      className="w-full p-2 rounded-lg bg-white border border-neutral-300 focus:border-neutral-900 outline-none text-xs text-neutral-900"
                    />

                    <div className="flex flex-wrap gap-1">
                      {PRESET_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                          className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe materials, handmade craftsmanship, and usage..."
                  className="w-full p-2.5 rounded-lg bg-white border border-neutral-300 focus:border-neutral-900 outline-none text-xs text-neutral-900"
                />
              </div>

              {/* Toggles */}
              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="accent-neutral-900 w-3.5 h-3.5"
                  />
                  <span>In Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-neutral-900 w-3.5 h-3.5"
                  />
                  <span>Featured</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.bestseller}
                    onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                    className="accent-neutral-900 w-3.5 h-3.5"
                  />
                  <span>Bestseller</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
        </div>
      }
    >
      <AdminProductsContent />
    </Suspense>
  );
}
