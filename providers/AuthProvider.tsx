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
  UserCredential,
  AuthErrorCodes
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
      return true;
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
      setError(error);
      
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        throw new Error('Email ou mot de passe incorrect');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Trop de tentatives de connexion. Réessayez plus tard.');
      } else {
        throw new Error('Une erreur est survenue lors de la connexion');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Inscription avec email et mot de passe
  const signup = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
      router.push('/');
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error);
      setError(error);
      
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Un compte existe déjà avec cet email');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Le mot de passe est trop faible');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Adresse email invalide');
      } else {
        throw new Error('Une erreur est survenue lors de l\'inscription');
      }
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
      return true;
      router.push('/');
    } catch (error: any) {
      console.error('Erreur lors de la connexion avec Google:', error);
      setError(error);
      
      if (error.code === 'auth/account-exists-with-different-credential') {
        throw new Error('Un compte existe déjà avec un autre fournisseur d\'authentification');
      } else if (error.code === 'auth/popup-closed-by-user') {
        // Ne pas afficher d'erreur si l'utilisateur a fermé la popup
        return false;
      } else {
        throw new Error('Erreur lors de la connexion avec Google');
      }
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
      // Rediriger vers la page d'accueil après la déconnexion
      router.push('/');
      return true;
    } catch (error: any) {
      console.error('Erreur lors de la déconnexion:', error);
      setError(error);
      throw new Error('Une erreur est survenue lors de la déconnexion');
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
