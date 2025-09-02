'use client';

import { useState } from 'react';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple auth pour démo (en production, utilisez une vraie authentification)
    if (credentials.username === 'admin' && credentials.password === 'kora2601') {
      setIsAuthenticated(true);
    } else {
      alert('Identifiants incorrects');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-black overflow-hidden">
        <main className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-24">
          <Card className="w-full max-w-md glass-effect lightning-border">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Lock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h1 className="text-3xl font-black text-white">Accès Administrateur</h1>
                <p className="text-gray-400 mt-2">Connectez-vous pour accéder au panel admin</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="username" className="text-gray-300">Nom d'utilisateur</Label>
                  <Input
                    id="username"
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    className="glass-effect border-white/20 text-white rounded-xl"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-gray-300">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="glass-effect border-white/20 text-white rounded-xl"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full electric-gradient text-white font-semibold py-3 rounded-xl lightning-border hover:lightning-glow transition-all duration-300"
                >
                  Se connecter
                </Button>
              </form>
              
              <p className="text-xs text-gray-500 text-center mt-6">
                Démo: admin / kora2601
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <main className="relative z-10">
      <AdminDashboard />
    </main>
  );
}