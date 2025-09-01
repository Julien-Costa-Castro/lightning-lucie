'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AboutPage() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            À propos de Lightning Lucie
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Plongez dans l'univers épique de cette saga spatiale
          </p>
        </div>

        <div className="space-y-12">
          {/* Histoire */}
          <Card className="bg-gray-800/50 border-blue-500/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-blue-400 mb-6">L'Histoire</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    En 2360, la Terre succombe aux catastrophes climatiques et devient totalement 
                    inhabitable. Face à cette tragédie planétaire, l'humanité n'a d'autre choix 
                    que de tourner son regard vers les étoiles.
                  </p>
                  <p>
                    Pendant deux siècles, de 2360 à 2560, d'immenses vaisseaux générationnels 
                    sillonnent la galaxie, colonisant méthodiquement chaque exoplanète habitable 
                    découverte. Cette grande diaspora spatiale forge une nouvelle humanité.
                  </p>
                </div>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    En 2601, les explorateurs découvrent enfin le système solaire parfait : 
                    Kora. Six planètes habitables, chacune avec ses propres caractéristiques 
                    uniques, gravitent autour d'une étoile stable.
                  </p>
                  <p>
                    C'est dans ce nouveau monde que naît notre héroïne, Lucie, dotée de 
                    pouvoirs électriques extraordinaires qui la mèneront à devenir une 
                    légende dans les arènes de combat interplanétaires.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personnages */}
          <Card className="bg-gray-800/50 border-purple-500/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-purple-400 mb-6">Les Personnages</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-700/50 p-6 rounded-lg border border-blue-400/20">
                  <h3 className="font-bold text-blue-400 mb-2">Lucie</h3>
                  <Badge className="bg-blue-500/20 text-blue-300 mb-3">Héroïne</Badge>
                  <p className="text-gray-300 text-sm">
                    Jeune femme aux pouvoirs électriques, gladiatrice redoutable dans les arènes de Kora.
                  </p>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-lg border border-purple-400/20">
                  <h3 className="font-bold text-purple-400 mb-2">Commandant Zara</h3>
                  <Badge className="bg-purple-500/20 text-purple-300 mb-3">Mentor</Badge>
                  <p className="text-gray-300 text-sm">
                    Ancienne championne des arènes, elle guide Lucie dans sa quête de pouvoir.
                  </p>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-lg border border-red-400/20">
                  <h3 className="font-bold text-red-400 mb-2">Empereur Vox</h3>
                  <Badge className="bg-red-500/20 text-red-300 mb-3">Antagoniste</Badge>
                  <p className="text-gray-300 text-sm">
                    Dirigeant tyrannique du système Kora, organisateur des combats d'arènes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Créateurs */}
          <Card className="bg-gray-800/50 border-green-500/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-green-400 mb-6">L'Équipe Créative</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-4xl">✍️</span>
                  </div>
                  <h3 className="font-bold text-blue-400 mb-2">Alex Cosmos</h3>
                  <Badge className="bg-blue-500/20 text-blue-300 mb-3">Scénariste</Badge>
                  <p className="text-gray-300 text-sm">
                    Auteur reconnu de science-fiction, spécialiste des univers spatiaux complexes.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-4xl">🎨</span>
                  </div>
                  <h3 className="font-bold text-purple-400 mb-2">Luna Storm</h3>
                  <Badge className="bg-purple-500/20 text-purple-300 mb-3">Illustratrice</Badge>
                  <p className="text-gray-300 text-sm">
                    Artiste talentueuse spécialisée dans les univers futuristes et les effets lumineux.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}