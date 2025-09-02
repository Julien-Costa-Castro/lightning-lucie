'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Zap, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { products } from '@/lib/products';

export function FeaturedProducts() {
  const { addToCart } = useCart();

  const featuredProducts = products.slice(0, 3);

  return (
    <section className="py-24 md:py-32 px-4 relative">
      {/* Fond légèrement assombri pour améliorer la lisibilité */}
      <div className="absolute inset-0 -z-10 bg-black/10"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center space-x-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/60"></div>
            <Zap className="h-6 w-6 text-white/80" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/60"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            Collection
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Découvrez l'univers Lightning Lucie à travers notre sélection exclusive
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="glass-effect hover:chrome-glow transition-all duration-500 group relative overflow-hidden border border-white/10 hover:border-white/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-px h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
                
                <div className="aspect-[4/5] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden border border-white/5">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-500">⚡</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {product.isNew && (
                    <Badge className="absolute top-3 left-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-medium">
                      Nouveau
                    </Badge>
                  )}
                  
                  {product.isLimited && (
                    <Badge className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-medium">
                      Édition limitée
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-white/5 text-white/90 border border-white/10 font-medium">
                      {product.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-white/70 ml-1">4.9</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl text-white group-hover:text-white/90 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed text-sm">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6">
                    <span className="text-2xl font-black text-white">
                      {product.price}€
                    </span>
                    <Button
                      onClick={() => addToCart(product)}
                      className="relative overflow-hidden group bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-300 hover:border-white/20"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      Ajouter
                      <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/boutique">
            <Button 
              variant="outline" 
              size="lg"
              className="relative overflow-hidden group border-white/20 hover:border-white/40 transition-all duration-300 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10"
            >
              <span className="relative z-10 flex items-center text-white/90 group-hover:text-white transition-colors">
                Voir toute la collection
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}