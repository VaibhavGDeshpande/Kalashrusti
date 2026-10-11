import React, { Suspense } from 'react';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { ProductDetailView } from '@/components/shop/ProductDetailView';

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
          <div className="w-10 h-10 border-4 border-[#C9A24B]/30 border-t-[#6B1D2A] rounded-full animate-spin" />
        </div>
      }
    >
      <ProductDetailView slug={slug} />
    </Suspense>
  );
}
