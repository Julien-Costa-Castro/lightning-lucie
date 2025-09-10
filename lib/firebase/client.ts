import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, Firestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, FirebaseStorage, connectStorageEmulator } from "firebase/storage";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBOMCjLHVG2sgS75vVq_mzC47vW_j8Hlig",
  authDomain: "lightning-lucie.firebaseapp.com",
  databaseURL: "https://lightning-lucie-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lightning-lucie",
  storageBucket: "lightning-lucie.firebasestorage.app",
  messagingSenderId: "266816598640",
  appId: "1:266816598640:web:bfa61e53412c511705bab5",
  measurementId: "G-4BE047W3VN"
};

// Initialisation des services Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// Vérifier si nous sommes côté navigateur
if (typeof window !== 'undefined') {
  // Initialiser l'application Firebase une seule fois
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  
  // Initialiser l'authentification
  auth = getAuth(app);
  
  // Initialiser Firestore
  db = getFirestore(app);
  
  // Initialiser le stockage
  storage = getStorage(app);
  
  // Désactivation temporaire des émulateurs pour le débogage
  if (false && process.env.NODE_ENV === 'development') {
    try {
      // Émulateur d'authentification
      connectAuthEmulator(auth, 'http://localhost:9099');
      
      // Émulateur Firestore
      connectFirestoreEmulator(db, 'localhost', 8080);
      
      // Émulateur de stockage
      connectStorageEmulator(storage, 'localhost', 9199);
      
      console.log('Firebase emulators connected');
    } catch (error) {
      console.log('Firebase emulators not connected', error);
    }
  }
}

export { app, auth, db, storage };
