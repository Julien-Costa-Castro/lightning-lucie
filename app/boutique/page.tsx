'use client';

import { Shop } from '@/components/Shop';
import { LightningField } from '@/components/LightningField';

export default function Boutique() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <LightningField />
      <main className="relative z-10">
        <Shop />
      </main>
    </div>
  );
}