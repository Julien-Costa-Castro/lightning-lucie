'use client';

import { Zap, Rocket, Globe } from 'lucide-react';

export function About() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
                <Zap className="h-6 w-6 text-blue-400" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white">
                L'Univers de Kora
              </h2>
            </div>
            
            <div className="space-y-8 text-gray-300">
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
              <div className="glass-effect p-6 rounded-2xl lightning-border group hover:lightning-glow transition-all duration-500">
                <Rocket className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-white mb-2">Science-Fiction</h3>
                <p className="text-gray-400">Exploration spatiale et technologies avancées</p>
              </div>
              <div className="glass-effect p-6 rounded-2xl lightning-border group hover:lightning-glow transition-all duration-500">
                <Globe className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-white mb-2">Système Kora</h3>
                <p className="text-gray-400">Six planètes habitables à explorer</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] glass-effect rounded-3xl lightning-border flex items-center justify-center group hover:lightning-glow transition-all duration-700 relative overflow-hidden">
              {/* Lightning effects */}
              <div className="absolute top-8 left-6 w-px h-20 bg-gradient-to-b from-blue-400 to-transparent lightning-animate"></div>
              <div className="absolute bottom-12 right-8 w-px h-24 bg-gradient-to-b from-blue-300 to-transparent lightning-animate" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/4 w-px h-16 bg-gradient-to-b from-blue-500 to-transparent lightning-animate" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="text-center space-y-6">
                <div className="w-40 h-40 mx-auto electric-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 lightning-glow">
                  <Zap className="text-7xl text-white" />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">Lucie</p>
                  <p className="text-gray-400">Héroïne aux pouvoirs électriques</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}