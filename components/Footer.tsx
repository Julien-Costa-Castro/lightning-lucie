'use client';

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto w-full">
      <style jsx global>{`
        .footer-glass {
          background: rgba(0, 0, 0, 0.3) !important;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .footer-content {
          padding: 2.5rem 1rem 1rem;
          position: relative;
        }
        @supports not (backdrop-filter: none) {
          .footer-glass {
            background: rgba(0, 0, 0, 0.6) !important;
          }
        }
      `}</style>
      
      <div className="footer-glass">
        <div className="footer-content mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 md:flex-row md:items-start md:justify-between md:gap-12 text-white">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-700 text-2xl font-extrabold text-white shadow-md">
              ⚡
            </span>
            <span className="bg-gradient-to-br from-blue-200 to-blue-500 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
              Lightning Lucie
            </span>
          </Link>
          <p className="text-white/80 mb-6 max-w-xs text-center text-sm md:text-left">
            Création de contenus uniques et personnalisés. Photographie, vidéo et design pour mettre en lumière votre univers.
          </p>
          <div className="mt-2 flex gap-3 text-blue-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-foreground transition"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-foreground transition"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-foreground transition"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-blue-400 uppercase">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-white/70 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="text-white/70 hover:text-white transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-blue-400 uppercase">
              Liens utiles
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-white/70 hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-white/70 hover:text-white transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/politique-de-confidentialite" className="text-white/70 hover:text-white transition-colors">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-blue-400 uppercase">
              Contact
            </div>
            <ul className="space-y-2">
              <li className="flex items-center justify-center gap-2 md:justify-start">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:contact@lightning-lucie.com" className="text-white/70 hover:text-white transition-colors">
                  contact@lightning-lucie.com
                </a>
              </li>
              <li className="flex items-center justify-center gap-2 md:justify-start">
                <Phone className="h-4 w-4 text-blue-400" />
                <a href="tel:+33123456789" className="text-white/70 hover:text-white transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center justify-center gap-2 md:justify-start">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  123 Rue de Paris, 75001 Paris, France
                </span>
              </li>
            </ul>
          </div>
        </nav>
        </div>
        
        <div className="text-white/60 relative z-10 mt-6 text-center text-xs pb-4">
          <span>&copy; {new Date().getFullYear()} Lightning Lucie. Tous droits réservés.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
