'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Package } from 'lucide-react';
import { MondialRelayWidget } from './MondialRelayWidget';
import { PaymentForm } from './PaymentForm';
import { useCart } from '@/hooks/useCart';

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
  const { clearCart } = useCart();
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
    setShowRelaySelector(false);
  };

  const handleWidgetReady = () => {
    console.log('Widget Mondial Relay prêt');
    setIsWidgetLoading(false);
    setWidgetError(null);
  };

  const handleWidgetError = (error: string) => {
    console.error('Erreur du widget Mondial Relay:', error);
    setWidgetError(error);
    setIsWidgetLoading(false);
  };

  const handlePayment = async () => {
    if (!selectedPoint) {
      setWidgetError('Veuillez sélectionner un point relais avant de procéder au paiement');
      return;
    }
    
    setIsLoading(true);
    setWidgetError(null);
    
    try {
      // Créer une intention de paiement côté serveur
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

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création de la session de paiement');
      }

      const { clientSecret } = data;
      
      if (!clientSecret) {
        throw new Error('Impossible de récupérer le client secret');
      }
      
      setClientSecret(clientSecret);
      
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      setWidgetError(
        error instanceof Error 
          ? error.message 
          : 'Une erreur est survenue lors de la préparation du paiement'
      );
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = useCallback(() => {
    // Vider le panier après une commande réussie
    clearCart();
    onSuccess();
  }, [onSuccess, clearCart]);

  if (clientSecret) {
    return (
      <Elements 
        stripe={stripePromise} 
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#000000',
              colorBackground: '#ffffff',
              colorText: '#000000',
              fontFamily: 'system-ui, sans-serif',
            },
          },
        }}
      >
        <div className="max-w-2xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">Paiement sécurisé</h2>
          <PaymentForm 
            onSuccess={handlePaymentSuccess} 
            onError={(message) => setWidgetError(message)} 
          />
        </div>
      </Elements>
    );
  }

  // Rendu du récapitulatif de commande
  const renderOrderSummary = () => (
    <Card className="font-sans">
      <CardHeader>
        <CardTitle className="font-sans">Récapitulatif de la commande</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 font-sans">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium font-sans">{item.name}</p>
                <p className="text-sm text-gray-500 font-sans">Quantité: {item.quantity}</p>
              </div>
              <p className="font-medium font-sans">{(item.price * item.quantity).toFixed(2)} €</p>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold font-sans">
              <p>Total</p>
              <p>{calculateTotal().toFixed(2)} €</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Rendu du sélecteur de point relais
  const renderRelayPointSelector = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Point de retrait</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedPoint ? (
          <div className="space-y-2">
            <p className="font-medium">{selectedPoint.name}</p>
            <p className="text-sm">{selectedPoint.address}</p>
            <p className="text-sm">
              {selectedPoint.zipCode} {selectedPoint.city}
            </p>
            <Button
              variant="outline"
              className="mt-2 w-full"
              onClick={() => setShowRelaySelector(true)}
            >
              Changer de point relais
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowRelaySelector(true)}
          >
            <Package className="mr-2 h-4 w-4" />
            Choisir un point relais
          </Button>
        )}
      </CardContent>
    </Card>
  );

  // Rendu du modal de sélection du point relais
  const renderRelayPointModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-4 bg-black text-white flex justify-between items-center rounded-t-lg">
          <h3 className="text-lg font-semibold">Sélectionnez un point relais</h3>
          <button
            onClick={() => setShowRelaySelector(false)}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <MondialRelayWidget
            onSelect={handleRelayPointSelect}
            onReady={handleWidgetReady}
            onError={handleWidgetError}
            defaultPostalCode={postalCode}
            isVisible={showRelaySelector}
          />
        </div>
      </div>
    </div>
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

  // Rendu du contenu principal
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Finaliser la commande</h1>
      
      {widgetError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{widgetError}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {renderOrderSummary()}
          {renderRelayPointSelector()}
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Vous serez redirigé vers une page de paiement sécurisé pour finaliser votre commande.
              </p>
              {renderActionButtons()}
            </CardContent>
          </Card>
        </div>
      </div>

      {showRelaySelector && renderRelayPointModal()}
    </div>
  );
};
