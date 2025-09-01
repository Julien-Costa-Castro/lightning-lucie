'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Filter, Zap } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { products } from '@/lib/products';

export function Shop() {
  const [filter, setFilter] = useState('all');
  const { addToCart } = useCart();

  const categories = ['all', 'BD', 'Goodies', 'Édition limitée'];
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
            <Zap className="h-6 w-6 text-blue-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-white">
            Boutique Lightning Lucie
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Découvrez notre collection complète de produits Lightning Lucie
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === category
                  ? 'electric-gradient text-white lightning-glow'
                  : 'border-white/20 text-white hover:bg-white/5 lightning-border hover:lightning-glow'
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              {category === 'all' ? 'Tous' : category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="glass-effect lightning-border hover:lightning-glow transition-all duration-500 group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Lightning decoration */}
                <div className="absolute top-4 right-4 w-px h-8 bg-gradient-to-b from-blue-400 to-transparent lightning-animate"></div>
                
                <div className="aspect-[4/5] bg-gradient-to-br from-gray-900 to-black rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden lightning-border">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-500">⚡</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {product.isNew && (
                    <Badge className="absolute top-3 left-3 electric-gradient text-white font-semibold">
                      Nouveau
                    </Badge>
                  )}
                  
                  {product.isLimited && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold">
                      Édition limitée
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {product.category}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-400 ml-1">4.9</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-black text-white">
                      {product.price}€
                    </span>
                    <Button
                      onClick={() => addToCart(product)}
                      className="electric-gradient text-white font-semibold px-4 py-2 rounded-xl group lightning-border hover:lightning-glow transition-all duration-300"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      Ajouter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}