'use client';

import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { About } from '@/components/About';
import { LightningField } from '@/components/LightningField';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <LightningField />
      <main className="relative z-10">
        <Hero />
        <FeaturedProducts />
        <About />
      </main>
    </div>
  );
}