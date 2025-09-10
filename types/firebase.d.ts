import { User as FirebaseUser } from 'firebase/auth';

declare module 'firebase/auth' {
  interface User extends FirebaseUser {
    // Ajoutez ici des propriétés personnalisées si nécessaire
  }
}
