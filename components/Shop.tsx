'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { products } from '@/lib/products';
import { useCart } from '@/hooks/useCart';

export default function Shop() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const filteredProducts = products;
  
  // Vérifier l'accès au localStorage
  useEffect(() => {
    console.log('Shop - Vérification du localStorage...');
    try {
      const testKey = 'test-storage';
      localStorage.setItem(testKey, 'test-value');
      const value = localStorage.getItem(testKey);
      console.log('Shop - Test localStorage:', { value, isSupported: value === 'test-value' });
      localStorage.removeItem(testKey);
    } catch (error) {
      console.error('Erreur d\'accès au localStorage:', error);
    }
  }, []);

  return (
    <section className="relative py-12 px-4 min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/layout-shop.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '120vh' }}>
      <div className="max-w-6xl mx-auto relative p-4">
        <div className="relative w-full max-w-4xl h-40 md:h-52 mx-auto mb-8">
          <Image 
            src="/images/shop.png" 
            alt="Boutique" 
            fill 
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 80vw"
            priority
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto px-2 sm:px-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-transparent group flex flex-col items-center w-full border-none shadow-none"
            >
              <div className="w-full flex justify-center mb-4">
                <div className="relative w-[140px] h-[210px] sm:w-[160px] sm:h-[240px] md:w-[200px] md:h-[300px]">
                  <div className="w-full h-full rounded-lg overflow-hidden bg-black/10 p-2 shadow-[0_0_15px_3px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.25)]">
                    <div className="relative w-full h-full">
                      <Image 
                        src={`/images/${product.image || 'BD.png'}`}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, 200px"
                        priority={product.id === '1'}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full px-2 mt-2 flex flex-col items-center">
                <h3 className="font-bold text-base md:text-lg text-white mb-1 text-center min-h-[2rem] w-full line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center w-full max-w-[220px] md:max-w-[250px] space-x-2">
                  <div className="bg-white rounded-full px-3 md:px-4 h-[2rem] md:h-[2.3rem] flex items-center min-w-[70px] justify-center">
                    <span className="text-lg md:text-xl font-bold text-black font-sans" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {product.price}€
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="bg-white hover:bg-gray-100 text-black font-sans font-bold px-3 md:px-4 text-sm md:text-base rounded-full border-2 border-white transition-colors whitespace-nowrap h-[2rem] md:h-[2.3rem] flex items-center" style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="h-16"></div>
      </div>
    </section>
  );
}