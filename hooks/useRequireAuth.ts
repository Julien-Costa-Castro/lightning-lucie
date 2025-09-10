'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface UseRequireAuthOptions {
  redirectTo?: string;
  requiredRole?: string;
}

export function useRequireAuth({ 
  redirectTo = '/login',
  requiredRole
}: UseRequireAuthOptions = {}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Ne rien faire pendant le chargement

    // Rediriger si l'utilisateur n'est pas connecté
    if (!user) {
      router.push(redirectTo);
      return;
    }

    // Vérifier le rôle si nécessaire
    if (requiredRole) {
      // Implémentez votre logique de vérification de rôle ici
      // Par exemple: if (!user.roles?.includes(requiredRole)) { router.push('/unauthorized'); }
    }
  }, [user, loading, router, redirectTo, requiredRole]);

  return { user, loading };
}
