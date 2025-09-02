'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Zap } from 'lucide-react';
import Link from 'next/link';
import { AnimatedTitle } from './AnimatedTitle';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
      {/* Hero Content */}
      <div className="max-w-6xl mx-auto text-center space-y-12">
        {/* Animated Title */}
        <div className="space-y-8">
          <div className="relative">
            <AnimatedTitle />
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/60"></div>
            <Zap className="h-6 w-6 text-white/80" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/60"></div>
          </div>
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
            En 2601, dans le système Kora, une héroïne aux pouvoirs électriques 
            affronte les arènes de combat interplanétaires
          </p>
        </div>

        {/* Description with modern cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="glass-effect p-8 rounded-2xl chrome-effect group hover:chrome-glow transition-all duration-500 border border-white/10">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-3">Pouvoirs Électriques</h3>
            <p className="text-white/70 leading-relaxed">
              Découvrez les capacités extraordinaires de Lucie et ses combats 
              spectaculaires dans les arènes de Kora.
            </p>
          </div>
          
          <div className="glass-effect p-8 rounded-2xl chrome-effect group hover:chrome-glow transition-all duration-500 border border-white/10">
            <div className="text-4xl mb-4">🌌</div>
            <h3 className="text-xl font-bold text-white mb-3">Univers Spatial</h3>
            <p className="text-white/70 leading-relaxed">
              Explorez le système Kora et ses six planètes habitables dans 
              cette épopée futuriste captivante.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/boutique">
            <Button 
              size="lg" 
              className="relative overflow-hidden group chrome-effect hover:chrome-glow transition-all duration-300"
            >
              <span className="relative z-10 flex items-center text-lg font-medium">
                Acheter maintenant
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-xl group chrome-border hover:chrome-glow transition-all duration-300"
          >
            <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="text-lg">Bande-annonce</span>
          </Button>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 relative">
          <div className="mx-auto w-full max-w-5xl h-[500px] glass-effect rounded-3xl chrome-border flex items-center justify-center group hover:chrome-glow transition-all duration-700 relative overflow-hidden">
            {/* Subtle shine effects */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -bottom-1/2 -right-1/2 w-full h-32 bg-gradient-to-t from-white/10 to-transparent transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </div>
            
            <div className="text-center space-y-6 relative z-10">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-white/90 to-white/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
                <Zap className="text-5xl text-gray-900" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-white">Lightning Lucie</p>
                <p className="text-white/60">Aperçu de l'univers électrisant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}