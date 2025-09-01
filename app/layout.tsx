import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MainNavBar } from '@/components/ui/anime-navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lightning Lucie - BD Sci-Fi 2601',
  description: 'Découvrez Lightning Lucie, la bande dessinée épique qui vous emmène en 2601 dans le système solaire Kora. Aventure spatiale, combats d\'arènes et héroïne électrisante.',
  keywords: 'bande dessinée, BD, sci-fi, espace, Lightning Lucie, 2601, Kora, futur',
  openGraph: {
    title: 'Lightning Lucie - BD Sci-Fi 2601',
    description: 'L\'aventure spatiale épique dans le système Kora',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen flex flex-col`}>
        <MainNavBar />
        <main className="flex-grow pt-24 md:pt-28 pb-40 md:pb-48">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}