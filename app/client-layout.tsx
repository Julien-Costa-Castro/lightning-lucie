'use client';

import { useEffect } from 'react';
import { MainNavBar } from '@/components/ui/anime-navbar';
import { Footer } from '@/components/Footer';
import { Squares } from '@/components/ui/squares-background';
import { Toaster } from '@/components/ui/toaster';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Vérifier l'accès au localStorage au niveau racine
  useEffect(() => {
    console.log('ClientLayout - Vérification du localStorage...');
    try {
      const testKey = 'test-storage-root';
      localStorage.setItem(testKey, 'test-value-root');
      const value = localStorage.getItem(testKey);
      console.log('ClientLayout - Test localStorage:', { 
        value, 
        isSupported: value === 'test-value-root',
        localStorage: typeof window !== 'undefined' ? 'disponible' : 'indisponible'
      });
      localStorage.removeItem(testKey);
    } catch (error) {
      console.error('ClientLayout - Erreur d\'accès au localStorage:', error);
    }
  }, []);

  return (
    <>
      <Squares 
        direction="diagonal"
        speed={0.5}
        squareSize={40}
        borderColor="#333" 
        hoverFillColor="#1a1a1a"
      />
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
        <MainNavBar />
        <main className="flex-grow pt-24 md:pt-28">
          {children}
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
