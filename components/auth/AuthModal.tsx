"use client";

import React, { useState, FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/components/NotificationProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps): JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  const [resetEmailSent, setResetEmailSent] = useState<boolean>(false);
  
  const { login, signup, loginWithGoogle, resetPassword } = useAuth();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    
    // Validation des champs
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    setLoading(true);
    try {
      let success = false;
      
      if (isLogin) {
        if (login) {
          success = await login(email, password);
        }
      } else {
        // Validation supplémentaire pour l'inscription
        if (password.length < 6) {
          setError('Le mot de passe doit contenir au moins 6 caractères');
          setLoading(false);
          return;
        }
        if (signup) {
          success = await signup(email, password);
        }
      }
      
      if (success) {
        showNotification(isLogin ? 'Connexion réussie !' : 'Compte créé avec succès !', 'success');
        onOpenChange(false);
      }
    } catch (err: any) {
      // Gestion des erreurs spécifiques
      const errorMessage = err?.message || '';
      if (errorMessage.includes('email') || errorMessage.includes('adresse')) {
        setError('Adresse email invalide ou déjà utilisée');
      } else if (errorMessage.includes('mot de passe')) {
        setError('Mot de passe incorrect');
      } else if (errorMessage.includes('trop de tentatives')) {
        setError('Trop de tentatives. Veuillez réessayer plus tard.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      if (loginWithGoogle) {
        const success = await loginWithGoogle();
        if (success) {
          showNotification('Connexion avec Google réussie !', 'success');
          onOpenChange(false);
        }
      }
    } catch (err: any) {
      // On ne montre pas d'erreur si l'utilisateur a simplement fermé la popup
      if (err.message !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Erreur lors de la connexion avec Google');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Veuillez entrer votre adresse email');
      return;
    }
    
    setLoading(true);
    try {
      if (resetPassword) {
        await resetPassword(email);
        setResetEmailSent(true);
        showNotification('Un email de réinitialisation a été envoyé', 'success');
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'envoi de l\'email');
    } finally {
      setLoading(false);
    }
  };
  
  // Gestion de la fermeture de la modale
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Réinitialiser les états lors de la fermeture
      setEmail('');
      setPassword('');
      setError('');
      setLoading(false);
      setShowResetPassword(false);
      setResetEmailSent(false);
    }
    onOpenChange(isOpen);
  };

  // Si on est en mode réinitialisation de mot de passe
  if (showResetPassword) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Réinitialisation du mot de passe</DialogTitle>
            <DialogDescription>
              {resetEmailSent 
                ? (
                  <div className="space-y-2">
                    <p>Un email de réinitialisation a été envoyé à {email}.</p>
                    <p className="text-sm text-muted-foreground">
                      Vérifiez votre boîte de réception ainsi que vos courriers indésirables (spam).
                    </p>
                  </div>
                )
                : 'Entrez votre adresse email pour recevoir un lien de réinitialisation.'
              }
            </DialogDescription>
          </DialogHeader>
          
          {!resetEmailSent ? (
            <form onSubmit={handleResetPassword}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                {error && (
                  <div className="text-sm text-red-500">{error}</div>
                )}
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    'Envoyer le lien de réinitialisation'
                  )}
                </Button>
              </div>
            </form>
          ) : null}
          
          <div className="text-center text-sm">
            <button 
              type="button" 
              className="text-primary hover:underline"
              onClick={() => {
                setShowResetPassword(false);
                setResetEmailSent(false);
              }}
            >
              Retour à la connexion
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Formulaire de connexion/inscription normal
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Connexion' : 'Inscription'}</DialogTitle>
          <DialogDescription>
            {isLogin 
              ? 'Entrez vos identifiants pour vous connecter.'
              : 'Créez un compte pour accéder à votre espace.'
            }
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(''); // Effacer l'erreur quand l'utilisateur modifie le champ
                }}
                required
                className={error && error.includes('email') ? 'border-red-500' : ''}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowResetPassword(true);
                      setError(''); // Effacer les erreurs en passant à la réinitialisation
                    }}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                )}
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(''); // Effacer l'erreur quand l'utilisateur modifie le champ
                }}
                required
                minLength={6}
                className={error && error.includes('mot de passe') ? 'border-red-500' : ''}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? 'Connexion en cours...' : 'Création du compte...'}
                </>
              ) : isLogin ? 'Se connecter' : 'S\'inscrire'}
            </Button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continuer avec
                </span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              type="button" 
              className="w-full"
              onClick={handleGoogleLogin}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </Button>
          </div>
        </form>
        
        <div className="text-center text-sm">
          {isLogin ? (
            <p>
              Pas encore de compte ?{' '}
              <button 
                type="button" 
                className="text-primary hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Créer un compte
              </button>
            </p>
          ) : (
            <p>
              Déjà un compte ?{' '}
              <button 
                type="button" 
                className="text-primary hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Se connecter
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
