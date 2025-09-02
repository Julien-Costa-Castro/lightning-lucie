'use client';

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto w-full">
      <div className="glass-effect border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12 text-white">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-4 flex items-center gap-2 group">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white/90 to-white/70 text-2xl font-extrabold text-gray-900 shadow-lg group-hover:scale-110 transition-transform duration-300">
                ⚡
              </span>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                Lightning Lucie
              </span>
            </Link>
            <p className="text-white/80 mb-6 max-w-xs text-center text-sm md:text-left">
              Création de contenus uniques et personnalisés. Photographie, vidéo et design pour mettre en lumière votre univers.
            </p>
            <div className="mt-2 flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/70 hover:text-white transition-all hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/70 hover:text-white transition-all hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-white/70 hover:text-white transition-all hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
            <div>
              <div className="mb-3 text-xs font-semibold tracking-widest text-white/80 uppercase">
                Navigation
              </div>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-white/60 hover:text-white transition-colors flex items-center group">
                    <span className="w-1 h-1 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/a-propos" className="text-white/60 hover:text-white transition-colors flex items-center group">
                    <span className="w-1 h-1 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/boutique" className="text-white/60 hover:text-white transition-colors flex items-center group">
                    <span className="w-1 h-1 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                    Boutique
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/60 hover:text-white transition-colors flex items-center group">
                    <span className="w-1 h-1 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <div className="mb-3 text-xs font-semibold tracking-widest text-white/80 uppercase">
                Liens utiles
              </div>
              <ul className="space-y-3">
                <li>
                  <Link href="/mentions-legales" className="text-white/60 hover:text-white transition-colors flex items-center group">
                    <span className="w-1 h-1 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link href="/cgv" className="text-white/60 hover:text-white transition-colors flex items-center group">
                    <span className="w-1 h-1 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                    CGV
                  </Link>
                </li>
                <li>
                  <Link href="/politique-de-confidentialite" className="text-white/60 hover:text-white transition-colors flex items-center group">
                    <span className="w-1 h-1 bg-white/40 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                    Confidentialité
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-white/80 uppercase">
              Contact
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 group">
                <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Mail className="h-3.5 w-3.5 text-white/70 group-hover:text-white transition-colors" />
                </div>
                <a href="mailto:contact@lightning-lucie.com" className="text-white/60 hover:text-white transition-colors text-sm">
                  contact@lightning-lucie.com
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Phone className="h-3.5 w-3.5 text-white/70 group-hover:text-white transition-colors" />
                </div>
                <a href="tel:+33612345678" className="text-white/60 hover:text-white transition-colors text-sm">
                  +33 6 12 34 56 78
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <MapPin className="h-3.5 w-3.5 text-white/70 group-hover:text-white transition-colors" />
                </div>
                <span className="text-white/60 text-sm">
                  Paris, France
                </span>
              </li>
            </ul>
          </div>
        </nav>
        </div>
        
        <div className="border-t border-white/10 py-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between px-6 md:flex-row">
            <p className="text-center text-sm text-white/50 md:text-left">
              &copy; {new Date().getFullYear()} Lightning Lucie. Tous droits réservés.
            </p>
            <div className="mt-4 flex gap-6 text-sm md:mt-0">
              <Link href="/mentions-legales" className="text-white/50 hover:text-white transition-colors hover:underline">
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="text-white/50 hover:text-white transition-colors hover:underline">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
