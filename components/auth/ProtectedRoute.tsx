'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole,
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      router.push(redirectTo);
    }
    
    // Vérifier les rôles si nécessaire
    if (!loading && user && requiredRole) {
      // Implémentez votre logique de vérification de rôle ici
      // Par exemple: if (!user.roles?.includes(requiredRole)) { router.push('/unauthorized'); }
    }
  }, [user, loading, router, requiredRole, redirectTo]);

  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" className="text-primary" />
      </div>
    );
  }

  // Si l'utilisateur est connecté (et a le bon rôle si spécifié), afficher le contenu protégé
  return <>{children}</>;
}
