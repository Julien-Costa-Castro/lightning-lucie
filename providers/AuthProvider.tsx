'use client';

import { ReactNode, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User as FirebaseUser,
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  Auth,
  AuthError,
  UserCredential
} from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { AuthContext, type AuthContextType } from '@/contexts/AuthContext';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  // Gestion de l'état d'authentification
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Erreur de changement d\'état d\'authentification:', error);
      setError(error as Error);
      setLoading(false);
    });

    // Nettoyer l'abonnement lors du démontage du composant
    return () => unsubscribe();
  }, []);

  // Connexion avec email et mot de passe
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Inscription avec email et mot de passe
  const signup = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      setError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Connexion avec Google
  const loginWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      console.error('Erreur de connexion avec Google:', error);
      setError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Déconnexion
  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await firebaseSignOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      setError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Réinitialisation du mot de passe
  const resetPassword = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Erreur de réinitialisation du mot de passe:', error);
      setError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Valeur du contexte
  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
