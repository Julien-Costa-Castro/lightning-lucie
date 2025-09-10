/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Désactiver la sortie statique pour permettre l'authentification côté serveur
  output: 'standalone',
  
  // Configuration des images
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'lightning-lucie.firebasestorage.app',
      'avatars.githubusercontent.com'
    ],
    // Activer l'optimisation des images
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  
  // Ignorer les erreurs ESLint pendant la construction
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuration des en-têtes de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Configuration pour la réécriture des URL (si nécessaire pour l'authentification)
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
