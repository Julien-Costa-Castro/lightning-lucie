'use client';

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto w-full">
      <div className="glass-effect border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-6 text-white">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center gap-2 md:mb-0">
              <div className="h-12 w-12 relative">
                <img 
                  src="/images/personnage.png" 
                  alt="Lightning Lucie Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-lg font-bold tracking-tight text-transparent" style={{ fontFamily: 'Arial, sans-serif' }}>
                Lightning Lucie
              </span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Le Mans, France</span>
              </div>
              <a
                href="mailto:contact@lightning-lucie.com"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>Contact</span>
              </a>
            </div>
          </div>
          
          <div className="mt-6 border-t border-white/10 pt-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-white/50 text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                &copy; {new Date().getFullYear()} Lightning Lucie. Tous droits réservés.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-white/50 text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>
                <Link href="/mentions-legales" className="hover:text-white transition-colors">
                  Mentions légales
                </Link>
                <span>•</span>
                <Link href="/cgv" className="hover:text-white transition-colors">
                  CGV
                </Link>
                <span>•</span>
                <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

