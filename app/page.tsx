'use client';

import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { About } from '@/components/About';

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <FeaturedProducts />
      <About />
    </main>
  );
}