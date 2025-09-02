'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function MentionsLegales() {
  return (
    <main className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">Mentions Légales</h1>
          
        <Card className="glass-effect border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="space-y-8">
              <Card className="bg-gray-800/50 border-blue-500/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-blue-400 mb-4">Éditeur du site</h2>
                  <div className="text-gray-300 space-y-2">
                    <p><strong>Nom :</strong> Lightning Lucie Productions</p>
                    <p><strong>Adresse :</strong> 123 Rue des Étoiles, 75001 Paris, France</p>
                    <p><strong>Email :</strong> contact@lightning-lucie.com</p>
                    <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                    <p><strong>SIRET :</strong> 123 456 789 00012</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-purple-500/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-purple-400 mb-4">Hébergement</h2>
                  <div className="text-gray-300">
                    <p>Ce site est hébergé par Bolt Hosting</p>
                    <p>Service cloud sécurisé et performant</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-green-500/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-green-400 mb-4">Propriété intellectuelle</h2>
                  <div className="text-gray-300 space-y-4">
                    <p>
                      Tous les contenus présents sur ce site (textes, images, vidéos, logos) sont 
                      la propriété exclusive de Lightning Lucie Productions et sont protégés par 
                      les lois françaises et internationales relatives à la propriété intellectuelle.
                    </p>
                    <p>
                      Toute reproduction, représentation, modification, publication, adaptation de 
                      tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, 
                      est interdite, sauf autorisation écrite préalable.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-yellow-500/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">Protection des données</h2>
                  <div className="text-gray-300 space-y-4">
                    <p>
                      Conformément au Règlement Général sur la Protection des Données (RGPD), 
                      vous disposez d'un droit d'accès, de rectification et de suppression des 
                      données vous concernant.
                    </p>
                    <p>
                      Les données collectées via les formulaires de ce site ne sont utilisées 
                      que dans le cadre de notre activité et ne sont jamais transmises à des tiers.
                    </p>
                    <p>
                      Pour exercer vos droits, contactez-nous à : privacy@lightning-lucie.com
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-red-500/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-red-400 mb-4">Conditions de vente</h2>
                  <div className="text-gray-300 space-y-4">
                    <p>
                      <strong>Prix :</strong> Les prix sont indiqués en euros TTC et incluent la TVA française.
                    </p>
                    <p>
                      <strong>Livraison :</strong> Livraison gratuite pour toute commande en France métropolitaine.
                    </p>
                    <p>
                      <strong>Retours :</strong> Droit de rétractation de 14 jours à compter de la réception de la commande.
                    </p>
                    <p>
                      <strong>Paiement :</strong> Paiements sécurisés par Stripe. Cartes bancaires acceptées.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}