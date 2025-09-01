'use client';

import { Cart } from '@/components/Cart';
import { LightningField } from '@/components/LightningField';

export default function PanierPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <LightningField />
      <main className="relative z-10">
        <Cart />
      </main>
    </div>
  );
}