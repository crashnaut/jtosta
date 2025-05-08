// src/lib/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyDS-i6M1SBFHqodsulJ0IYeUn3OYODlHRA",
	authDomain: "tostamente.firebaseapp.com",
	projectId: "tostamente",
	storageBucket: "tostamente.firebasestorage.app",
	messagingSenderId: "603102018157",
	appId: "1:603102018157:web:3fe1f03c4ccd61ed935d64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
