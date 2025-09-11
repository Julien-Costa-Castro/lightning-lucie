'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmation() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Card className="glass-effect lightning-border">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold">Commande confirmée !</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-lg">
            Merci pour votre achat ! Votre commande a bien été enregistrée.
          </p>
          <p>
            Vous recevrez sous peu un email de confirmation avec les détails de votre commande
            et les informations de suivi.
          </p>
          <div className="pt-6">
            <Button asChild>
              <a href="/boutique">
                Retour à la boutique
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
