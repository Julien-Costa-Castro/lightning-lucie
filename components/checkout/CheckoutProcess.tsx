'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Package } from 'lucide-react';
import { MondialRelayWidget } from './MondialRelayWidget';

// Configurez votre clé publique Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface RelayPoint {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  openingHours: string;
  distance: number;
}

interface CheckoutProcessProps {
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  onSuccess: () => void;
  onCancel: () => void;
}

export const CheckoutProcess: React.FC<CheckoutProcessProps> = ({ items, onSuccess, onCancel }) => {
  // États pour la gestion du point relais
  const [selectedPoint, setSelectedPoint] = useState<RelayPoint | null>(null);
  const [showRelaySelector, setShowRelaySelector] = useState(false);
  
  // États pour le chargement et les erreurs
  const [isLoading, setIsLoading] = useState(false);
  const [isWidgetLoading, setIsWidgetLoading] = useState(false);
  const [widgetError, setWidgetError] = useState<string | null>(null);
  
  // États pour le paiement
  const [clientSecret, setClientSecret] = useState('');
  const [postalCode] = useState('72000'); // Code postal par défaut

  const calculateTotal = (): number => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleRelayPointSelect = (point: {
    id: string;
    name: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  }) => {
    console.log('Point relais sélectionné:', point);
    const relayPoint: RelayPoint = {
      id: point.id,
      name: point.name,
      address: point.address,
      city: point.city,
      zipCode: point.zipCode,
      country: point.country,
      openingHours: 'Non spécifié', // Valeur par défaut
      distance: 0 // Valeur par défaut
    };
    setSelectedPoint(relayPoint);
    setShowRelaySelector(false); // Fermer le sélecteur après la sélection
    setWidgetError(null);
  };

  const handleWidgetError = (error: string) => {
    console.error('Erreur du widget:', error);
    setWidgetError('Erreur lors du chargement du sélecteur de point relais. Veuillez réessayer.');
    setIsWidgetLoading(false);
  };

  const handleWidgetReady = () => {
    console.log('Widget Mondial Relay prêt');
    setIsWidgetLoading(false);
    setWidgetError(null);
  };

  const handlePayment = async () => {
    if (!selectedPoint) {
      setWidgetError('Veuillez sélectionner un point relais avant de procéder au paiement');
      return;
    }
    
    setIsLoading(true);
    setWidgetError(null);
    
    try {
      // Créer une session de paiement côté serveur
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          relayPoint: selectedPoint,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la session de paiement');
      }

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      setWidgetError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la préparation du paiement');
      setIsLoading(false);
    }
  };

  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Paiement sécurisé</h2>
          <p>Redirection vers le processus de paiement sécurisé...</p>
          <div className="mt-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          </div>
        </div>
      </Elements>
    );
  }

  // Rendu du récapitulatif de commande
  const renderOrderSummary = () => (
    <Card>
      <CardHeader>
        <CardTitle>Récapitulatif de la commande</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
              </div>
              <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{calculateTotal().toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Rendu du sélecteur de point relais
  const renderRelaySelector = () => (
    <Card>
      <CardHeader>
        <CardTitle>Point relais</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedPoint ? (
          <div className="border rounded-lg p-4">
            <h3 className="font-bold">{selectedPoint.name}</h3>
            <p>{selectedPoint.address}</p>
            <p>{selectedPoint.zipCode} {selectedPoint.city}</p>
            <p className="text-sm text-gray-500 mt-2">
              {selectedPoint.distance ? `À ${selectedPoint.distance} km` : ''}
            </p>
            <Button 
              onClick={() => setShowRelaySelector(true)}
              variant="outline" 
              className="mt-2 w-full"
              type="button"
            >
              <Package className="mr-2 h-4 w-4" />
              Changer de point relais
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowRelaySelector(true)}
            type="button"
          >
            <Package className="mr-2 h-4 w-4" />
            Choisir un point relais
          </Button>
        )}
      </CardContent>
    </Card>
  );

  // Rendu des boutons d'action
  const renderActionButtons = () => (
    <div className="w-full">
      <Button 
        onClick={handlePayment}
        disabled={!selectedPoint || isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Traitement...
          </>
        ) : (
          'Payer maintenant'
        )}
      </Button>
    </div>
  );

  // Rendu du modal de sélection de point relais
  const renderRelayPointModal = () => (
    showRelaySelector && (
      <div className="fixed inset-0 bg-black/95 flex items-start pt-32 justify-center z-50 p-4">
        <div className="w-full max-w-4xl bg-black rounded-lg overflow-hidden flex flex-col border border-gray-800 shadow-2xl" style={{ height: '75vh' }}>
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-black">
            <h3 className="text-lg font-medium text-white">Sélectionnez un point relais</h3>
            <button 
              onClick={() => setShowRelaySelector(false)}
              className="text-gray-400 hover:text-white text-xl transition-colors"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 relative bg-black">
            {isWidgetLoading && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
            {widgetError && (
              <div className="m-4 p-4 bg-red-900/70 text-red-200 rounded-md border border-red-700">
                {widgetError}
              </div>
            )}
            <div className="h-full text-black">
              <MondialRelayWidget 
                onSelect={handleRelayPointSelect}
                onError={handleWidgetError}
                onReady={handleWidgetReady}
                defaultPostalCode={postalCode}
                isVisible={showRelaySelector}
              />
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-800 bg-black flex justify-end">
            <Button 
              onClick={() => setShowRelaySelector(false)}
              disabled={!selectedPoint}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                selectedPoint 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              Valider ce point relais
            </Button>
          </div>
        </div>
      </div>
    )
  );

  // Rendu du contenu principal
  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Paiement sécurisé</h2>
          <p>Redirection vers le processus de paiement sécurisé...</p>
          <div className="mt-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          </div>
        </div>
      </Elements>
    );
  }

  // Rendu par défaut
  return (
    <div className="space-y-6 font-['Arial']">
      {renderOrderSummary()}
      {renderRelaySelector()}
      {renderActionButtons()}
      {renderRelayPointModal()}
    </div>
  );
}
