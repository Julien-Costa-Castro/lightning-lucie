'use client';

import { AboutPage } from '@/components/AboutPage';
import { LightningField } from '@/components/LightningField';

export default function APropos() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <LightningField />
      <main className="relative z-10">
        <AboutPage />
      </main>
    </div>
  );
}