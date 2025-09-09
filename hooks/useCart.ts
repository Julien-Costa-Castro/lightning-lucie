'use client';

import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  isNew?: boolean;
  isLimited?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

const STORAGE_KEY = 'lightning-lucie-cart';

function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Erreur lors de la lecture du panier:', error);
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Charger le panier uniquement après le montage du composant
  useEffect(() => {
    setIsMounted(true);
    setItems(getStoredCart());
  }, []);
  
  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du panier:', error);
      }
    }
  }, [items, isMounted]);

  const addToCart = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        // Afficher une notification
        toast({
          title: 'Quantité mise à jour',
          description: `La quantité de "${product.name}" a été augmentée à ${existingItem.quantity + 1}`,
          variant: 'default',
        });
        
        return newItems;
      }
      
      const newItems = [...prevItems, { ...product, quantity: 1 }];
      
      // Afficher une notification
      toast({
        title: 'Produit ajouté',
        description: `"${product.name}" a été ajouté à votre panier`,
        variant: 'default',
      });
      
      return newItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotal,
    clearCart,
  };
}