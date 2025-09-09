'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function FeaturedProducts() {
  return (
    <section className="pt-12 md:pt-20 pb-24 md:pb-32 px-4 relative">
      {/* Fond légèrement assombri pour améliorer la lisibilité */}
      <div className="absolute inset-0 -z-10 bg-black/20"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="h-6"></div>
          <div className="relative w-full max-w-4xl h-48 md:h-56 mx-auto mb-8 md:mb-12">
            <Image 
              src="/images/les-personnages.png" 
              alt="Les Personnages" 
              fill 
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 80vw"
              priority
            />
          </div>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Découvrez les personnages emblématiques de l'univers Lightning Lucie
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <Card
              key={`lucie-${index}`}
              className="glass-effect hover:chrome-glow transition-all duration-500 group relative overflow-hidden border border-white/10 hover:border-white/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 flex flex-col items-center">
                <div className="aspect-square w-full mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="relative w-48 h-48">
                    <Image 
                      src="/images/personnage.png" 
                      alt="Lucie" 
                      fill 
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">LUCIE</h3>
                  <p className="text-white/80 text-sm">
                    Jeune femme amnésique de 17 ans aux pouvoirs
                    extraordinaires.
                    <br />
                    Combattante redoutable de l'arène spatiale.
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/boutique">
            <Button 
              variant="outline" 
              size="lg"
              className="relative overflow-hidden group border-white/20 hover:border-white/40 transition-all duration-300 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10"
            >
              <span className="relative z-10 flex items-center text-white/90 group-hover:text-white transition-colors">
                Découvrir le shop
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}