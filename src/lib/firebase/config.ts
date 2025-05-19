// src/lib/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Load environment variables from .env file or use fallback values
// In production, these should be set in your hosting environment
const firebaseConfig = {
	apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || "AIzaSyDS-i6M1SBFHqodsulJ0IYeUn3OYODlHRA",
	authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "tostamente.firebaseapp.com",
	projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || "tostamente",
	storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || "tostamente.firebasestorage.app",
	messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "603102018157",
	appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || "1:603102018157:web:3fe1f03c4ccd61ed935d64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Export a helper to check if Firebase is initialized
export const isFirebaseInitialized = !!app;
