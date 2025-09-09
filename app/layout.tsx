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
  icons: {
    icon: '/favicon.ico',
  },
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
    <html lang="fr" className="dark scroll-smooth h-full" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen bg-background text-foreground`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}