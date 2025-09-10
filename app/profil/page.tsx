"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulation de chargement
        setTimeout(() => {
          // Pour le moment, on utilise des données de test
          // Dans une vraie application, vous récupéreriez les commandes depuis votre base de données
          setOrders([
            { id: '1', date: new Date(), total: 49.99, status: 'Livré', items: 2 },
            { id: '2', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), total: 29.99, status: 'Expédié', items: 1 },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Accès non autorisé</h1>
          <p className="text-muted-foreground mb-6">Veuillez vous connecter pour accéder à votre profil.</p>
          <Button onClick={() => window.location.href = '/'}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-28 pb-12 font-['Arial']">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* En-tête du profil */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Mon Profil</h1>
          <p className="text-muted-foreground">Vos informations personnelles</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Informations du compte */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Informations du compte</CardTitle>
                <CardDescription>Vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Compte créé le</p>
                  <p className="font-medium">
                    {user.metadata?.creationTime 
                      ? format(new Date(user.metadata.creationTime), 'PPP', { locale: fr })
                      : 'Date non disponible'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Commandes */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Mes Commandes</CardTitle>
                <CardDescription>Votre historique de commandes</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="max-w-md mx-auto space-y-4">
                  <p className="text-muted-foreground">
                    Aucune commande n'est existante pour le moment
                  </p>
                  <Button onClick={() => window.location.href = '/boutique'}>
                    Voir le Shop
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
