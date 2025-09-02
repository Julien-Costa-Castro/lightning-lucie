'use client';

import { MainNavBar } from '@/components/ui/anime-navbar';
import { Footer } from '@/components/Footer';
import { Squares } from '@/components/ui/squares-background';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    </>
  );
}
