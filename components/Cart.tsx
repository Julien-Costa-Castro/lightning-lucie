'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { AuthModal } from '@/components/auth/AuthModal';
import { CheckoutProcess } from './checkout/CheckoutProcess';
import Image from 'next/image';

export function Cart() {
  const { items, updateQuantity, removeFromCart, getTotal } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Simuler un temps de chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCheckout = useCallback(() => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    setIsCheckingOut(true);
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Chargement de votre panier...</p>
        </div>
      </div>
    );
  }

  if (isCheckingOut) {
    return (
      <div className="py-12 px-4 max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setIsCheckingOut(false)}
          className="mb-6"
        >
          ← Retour au panier
        </Button>
        <CheckoutProcess 
          items={items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))}
          onSuccess={() => {
            // Rediriger vers la page de confirmation
            window.location.href = '/commande-confirmee';
          }}
          onCancel={() => setIsCheckingOut(false)}
        />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <section className="pt-8 pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="/images/panier.png" 
              alt="Panier" 
              className="h-64 w-auto -mt-16"
            />
          </div>
          <Card className="glass-effect lightning-border hover:lightning-glow transition-all duration-500 max-w-md mx-auto">
            <CardContent className="p-8 md:p-12 text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="text-2xl font-bold text-white mb-4">Votre panier est vide</h2>
              <p className="text-gray-400 mb-8 text-lg">Découvrez nos produits Lightning Lucie</p>
              <div className="flex justify-center">
                <Button 
                  asChild
                  className="w-64 bg-white/10 hover:bg-white/20 text-white font-medium py-4 text-base rounded-lg border border-white/20 hover:border-white/30 transition-all duration-200 relative"
                >
                  <a href="/boutique">Continuer vos achats</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-8 pb-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <img 
              src="/images/panier.png" 
              alt="Votre Panier" 
              className="h-64 w-auto -mt-16"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Articles du panier */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="glass-effect lightning-border hover:lightning-glow transition-all duration-500 group">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 electric-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <p className="text-sm text-gray-500" style={{ fontFamily: 'Arial, sans-serif' }}>
                        {item.isLimited ? 'Stock limité' : 'En stock'}
                      </p>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors" style={{ fontFamily: 'inherit' }}>{item.name}</h3>
                      <p className="text-gray-400 mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>{item.category}</p>
                      <p className="text-blue-400 font-black text-lg mt-2" style={{ fontFamily: 'Arial, sans-serif' }}>{item.price}€</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="h-10 w-10 border-white/20 text-white hover:bg-white/5 rounded-xl lightning-border"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="w-20 text-center glass-effect border-white/20 text-white rounded-xl"
                        style={{ fontFamily: 'Arial, sans-serif' }}
                      />
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-10 w-10 border-white/20 text-white hover:bg-white/5 rounded-xl lightning-border"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="h-10 w-10 ml-4 rounded-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Résumé de commande */}
          <div>
            <Card className="glass-effect lightning-border hover:lightning-glow transition-all duration-500 sticky top-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-black text-white mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>Résumé</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between text-gray-300 text-lg">
                    <span style={{ fontFamily: 'Arial, sans-serif' }}>Sous-total</span>
                    <span className="font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>{getTotal().toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-lg">
                    <span style={{ fontFamily: 'Arial, sans-serif' }}>Livraison</span>
                    <span className="font-semibold text-green-400" style={{ fontFamily: 'Arial, sans-serif' }}>Gratuite</span>
                  </div>
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex justify-between font-black text-white text-2xl">
                      <span style={{ fontFamily: 'Arial, sans-serif' }}>Total</span>
                      <span className="text-blue-400" style={{ fontFamily: 'Arial, sans-serif' }}>{getTotal().toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full">
                  <Button
                    ref={buttonRef}
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-4 text-base rounded-lg border border-white/20 hover:border-white/30 transition-all duration-200 relative z-10"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    <span className="tracking-normal" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {isCheckingOut ? 'Traitement...' : 'Procéder au paiement'}
                    </span>
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 text-center mt-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Paiement sécurisé par Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Modal d'authentification */}
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
      />
    </section>
  );
}