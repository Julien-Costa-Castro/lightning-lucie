'use client';

import { Zap, Rocket, Globe } from 'lucide-react';

export function About() {
  return (
    <section className="py-32 px-4 relative">
      {/* Fond légèrement assombri pour correspondre à la section Collection */}
      <div className="absolute inset-0 -z-10 bg-black/10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/60"></div>
                <Zap className="h-6 w-6 text-white/80" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/60"></div>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white">
                L'Univers de Kora
              </h2>
            </div>
            
            <div className="space-y-8 text-white/80">
              <p className="text-xl leading-relaxed">
                En 2360, la Terre devient inhabitable. L'humanité se lance dans une quête 
                épique de deux siècles pour trouver de nouveaux mondes habitables.
              </p>
              
              <p className="text-xl leading-relaxed">
                La découverte du système solaire Kora en 2601 marque un tournant décisif. 
                Ce système parfait devient le théâtre d'aventures extraordinaires où notre 
                héroïne Lucie révèle ses pouvoirs électriques dans les arènes de combat.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-effect p-6 rounded-2xl chrome-effect group hover:chrome-glow transition-all duration-500 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors duration-300">
                  <Rocket className="h-6 w-6 text-white/80 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-white mb-2">Science-Fiction</h3>
                <p className="text-white/70">Exploration spatiale et technologies avancées</p>
              </div>
              
              <div className="glass-effect p-6 rounded-2xl chrome-effect group hover:chrome-glow transition-all duration-500 border border-white/10">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors duration-300">
                  <Globe className="h-6 w-6 text-white/80 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-white mb-2">Système Kora</h3>
                <p className="text-white/70">Six planètes habitables à explorer</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] glass-effect rounded-3xl chrome-border flex items-center justify-center group hover:chrome-glow transition-all duration-700 relative overflow-hidden">
              {/* Subtle shine effects */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-48 bg-gradient-to-t from-white/10 to-transparent transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              </div>
              
              <div className="text-center space-y-6 relative z-10">
                <div className="w-40 h-40 mx-auto bg-gradient-to-br from-white/90 to-white/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <Zap className="text-7xl text-gray-900" />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">Lucie</p>
                  <p className="text-white/60">Héroïne aux pouvoirs électriques</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}