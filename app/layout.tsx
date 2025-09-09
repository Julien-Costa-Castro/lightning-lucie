import './globals.css';
import './fonts.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientLayout from './client-layout';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  title: 'Lightning Lucie - BD Sci-Fi 2601',
  description: 'Découvrez Lightning Lucie, la bande dessinée épique qui vous emmène en 2601 dans le système solaire Kora. Aventure spatiale, combats d\'arènes et héroïne électrisante.',
  keywords: 'bande dessinée, BD, sci-fi, espace, Lightning Lucie, 2601, Kora, futur',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/images/logo.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/images/logo.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/images/logo.png',
    },
  ],
  openGraph: {
    title: 'Lightning Lucie - BD Sci-Fi 2601',
    description: 'L\'aventure spatiale épique dans le système Kora',
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Lightning Lucie Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/logo.png'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark scroll-smooth h-full" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen bg-background text-foreground`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}