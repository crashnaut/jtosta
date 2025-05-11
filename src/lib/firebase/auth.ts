import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  type User
} from 'firebase/auth';
import { auth } from './config';
import { writable } from 'svelte/store';

// Create a user store to track authentication state
export const user = writable<User | null>(null);

// Listen for auth state changes
auth.onAuthStateChanged((firebaseUser) => {
  user.set(firebaseUser);
});

// Define a type for Firebase Auth errors
interface FirebaseAuthError {
  code: string;
  message: string;
}

// Email and password sign up
export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const firebaseError = error as FirebaseAuthError;
    throw { code: firebaseError.code, message: firebaseError.message };
  }
}

// Email and password sign in
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const firebaseError = error as FirebaseAuthError;
    throw { code: firebaseError.code, message: firebaseError.message };
  }
}

// Sign in with Google
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    const firebaseError = error as FirebaseAuthError;
    throw { code: firebaseError.code, message: firebaseError.message };
  }
}

// Sign out
export async function signOut() {
  return firebaseSignOut(auth);
}

// Reset password
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    const firebaseError = error as FirebaseAuthError;
    throw { code: firebaseError.code, message: firebaseError.message };
  }
}

// Get current user
export function getCurrentUser() {
  return auth.currentUser;
}