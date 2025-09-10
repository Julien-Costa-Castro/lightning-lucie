'use client';

import { useEffect } from 'react';
import { MainNavBar } from '@/components/ui/anime-navbar';
import Footer from '@/components/Footer';
import { Squares } from '@/components/ui/squares-background';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/providers/AuthProvider';
import { NotificationProvider } from '@/components/NotificationProvider';

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
    <AuthProvider>
      <NotificationProvider>
        <div className="min-h-screen flex flex-col">
          <Squares />
          <MainNavBar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
}
