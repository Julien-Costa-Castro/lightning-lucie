'use client';

import { Contact } from '@/components/Contact';
import { LightningField } from '@/components/LightningField';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <LightningField />
      <main className="relative z-10">
        <Contact />
      </main>
    </div>
  );
}