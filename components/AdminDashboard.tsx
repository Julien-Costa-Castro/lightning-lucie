'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { products } from '@/lib/products';

export function AdminDashboard() {
  const [stats] = useState({
    totalSales: 15420,
    ordersCount: 342,
    productsCount: products.length,
    visitorsCount: 2847
  });

  const [orders] = useState([
    { id: '001', customer: 'Marie Dupont', total: 39.98, status: 'Livré', date: '2024-01-15' },
    { id: '002', customer: 'Pierre Martin', total: 89.99, status: 'En cours', date: '2024-01-14' },
    { id: '003', customer: 'Sophie Bernard', total: 24.99, status: 'Expédié', date: '2024-01-13' },
    { id: '004', customer: 'Lucas Moreau', total: 19.99, status: 'En préparation', date: '2024-01-12' },
  ]);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Administration
        </h1>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gray-800/50 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Ventes totales</p>
                  <p className="text-2xl font-bold text-green-400">{stats.totalSales.toLocaleString()}€</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Commandes</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.ordersCount}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Produits</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.productsCount}</p>
                </div>
                <Package className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Visiteurs</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.visitorsCount.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="orders" className="space-y-8">
          <TabsList className="grid w-full lg:w-auto grid-cols-3 lg:flex bg-gray-800/50 border border-blue-500/20">
            <TabsTrigger value="orders" className="data-[state=active]:bg-blue-600">
              Commandes
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-purple-600">
              Produits
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card className="bg-gray-800/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Gestion des commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold text-white">Commande #{order.id}</p>
                          <p className="text-gray-400 text-sm">{order.customer}</p>
                          <p className="text-gray-400 text-sm">{order.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="font-bold text-blue-400">{order.total}€</span>
                        <Badge 
                          className={`${
                            order.status === 'Livré' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'Expédié' ? 'bg-blue-500/20 text-blue-400' :
                            order.status === 'En cours' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {order.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card className="bg-gray-800/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-400">Gestion des produits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.slice(0, 6).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center">
                          <span className="text-lg">⚡</span>
                        </div>
                        <div>
                          <p className="font-semibold text-white">{product.name}</p>
                          <p className="text-gray-400 text-sm">{product.category}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="font-bold text-purple-400">{product.price}€</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-gray-800/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">Analytics & Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-400">Ventes par catégorie</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">BD</span>
                        <span className="text-green-400 font-semibold">8,542€ (55%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Édition limitée</span>
                        <span className="text-blue-400 font-semibold">4,231€ (27%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Goodies</span>
                        <span className="text-purple-400 font-semibold">2,647€ (18%)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-400">Métriques clés</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Taux de conversion</span>
                        <span className="text-green-400 font-semibold">3.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Panier moyen</span>
                        <span className="text-blue-400 font-semibold">45.12€</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Retours</span>
                        <span className="text-purple-400 font-semibold">1.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}