// src/lib/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
