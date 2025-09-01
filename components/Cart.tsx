'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, CreditCard, Zap } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export function Cart() {
  const { items, updateQuantity, removeFromCart, getTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Ici vous intégreriez Stripe
    setTimeout(() => {
      alert('Redirection vers le paiement sécurisé...');
      setIsCheckingOut(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
            <Zap className="h-6 w-6 text-blue-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-12 text-white">
            Panier
          </h1>
          <Card className="glass-effect lightning-border hover:lightning-glow transition-all duration-500">
            <CardContent className="p-16">
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="text-2xl font-bold text-white mb-4">Votre panier est vide</h2>
              <p className="text-gray-400 mb-8 text-lg">Découvrez nos produits Lightning Lucie</p>
              <Button 
                asChild
                className="electric-gradient text-white font-semibold px-8 py-4 rounded-xl lightning-border hover:lightning-glow transition-all duration-300"
              >
                <a href="/boutique">Continuer vos achats</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
            <Zap className="h-6 w-6 text-blue-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white">
            Votre Panier
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Articles du panier */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="glass-effect lightning-border hover:lightning-glow transition-all duration-500 group">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 electric-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">⚡</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors">{item.name}</h3>
                      <p className="text-gray-400 mt-1">{item.category}</p>
                      <p className="text-blue-400 font-black text-lg mt-2">{item.price}€</p>
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
                <h3 className="text-2xl font-black text-white mb-8">Résumé</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between text-gray-300 text-lg">
                    <span>Sous-total</span>
                    <span className="font-semibold">{getTotal().toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-lg">
                    <span>Livraison</span>
                    <span className="font-semibold text-green-400">Gratuite</span>
                  </div>
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex justify-between font-black text-white text-2xl">
                      <span>Total</span>
                      <span className="text-blue-400">{getTotal().toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full electric-gradient text-white font-semibold py-4 rounded-xl group lightning-border hover:lightning-glow transition-all duration-300"
                >
                  <CreditCard className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-lg">
                    {isCheckingOut ? 'Traitement...' : 'Procéder au paiement'}
                  </span>
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Paiement sécurisé par Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}