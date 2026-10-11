'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';

export function StoreLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <React.Suspense fallback={<div className="h-16 bg-white" />}>
        <Navbar />
      </React.Suspense>
      <main className="flex-1">
        {children}
      </main>
      <CartDrawer />
      <Footer />
    </>
  );
}
