import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Playfair_Display, Inter, Rozha_One } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ProductsProvider } from '@/context/ProductsContext';
import { StoreLayoutShell } from '@/components/layout/StoreLayoutShell';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const rozha = Rozha_One({
  weight: '400',
  subsets: ['latin', 'devanagari'],
  variable: '--font-rozha',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'कालाश्रुष्टी (kalashrusti) | हस्तकला – आनंदाचा सागर | Handmade Indian Crafts',
  description:
    'Handmade flowers, brass lamps (diva), kundan rangoli patches, Paithani silk table runners, and bespoke Diwali hampers. Handcrafted with love in Pune, India. Instagram: @_kalashrushti_',
  keywords: [
    'kalashrusti',
    'कालाश्रुष्टी',
    'handcrafted lamps',
    'brass diya',
    'kundan rangoli',
    'sola wood flowers',
    'Diwali gift hampers',
    'Pune handicrafts',
    'Indian festive decor'
  ],
  openGraph: {
    title: 'कालाश्रुष्टी (kalashrusti) | हस्तकला – आनंदाचा सागर',
    description: 'Festive handmade flowers, rangoli, lamps, runners, and custom Diwali hampers.',
    url: 'https://instagram.com/_kalashrushti_',
    siteName: 'kalashrusti Handicrafts',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="mr-IN"
      className={`${playfair.variable} ${inter.variable} ${rozha.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#FFF8EC] text-[#231F20] selection:bg-[#F5A623] selection:text-[#231F20]">
        <LenisProvider>
          <LanguageProvider>
            <ProductsProvider>
              <CartProvider>
                <StoreLayoutShell>
                  {children}
                </StoreLayoutShell>
              </CartProvider>
            </ProductsProvider>
          </LanguageProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
