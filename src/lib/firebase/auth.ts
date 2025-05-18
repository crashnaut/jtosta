import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  type User,
  type AuthError
} from 'firebase/auth';
import { auth } from './config';
import { writable } from 'svelte/store';

// Export the auth object so it can be imported by other modules
export { auth };

// Create a user store to track authentication state
export const user = writable<User | null>(null);
export const isAuthenticated = writable<boolean>(false);
export const authLoading = writable<boolean>(true);

// Listen for auth state changes
auth.onAuthStateChanged((firebaseUser) => {
  user.set(firebaseUser);
  isAuthenticated.set(!!firebaseUser);
  authLoading.set(false);
});

/**
 * Helper function to handle Firebase auth errors consistently
 */
function handleAuthError(error: unknown): never {
  // If it's already a formatted error, just throw it
  if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
    throw error;
  }
  
  // Otherwise format it as a FirebaseAuthError
  const authError = error as AuthError;
  throw { 
    code: authError.code || 'auth/unknown-error', 
    message: authError.message || 'An unknown authentication error occurred' 
  };
}

/**
 * Email and password sign up
 */
export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    handleAuthError(error);
  }
}

/**
 * Email and password sign in
 */
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    handleAuthError(error);
  }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    handleAuthError(error);
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return true;
  } catch (error) {
    handleAuthError(error);
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    handleAuthError(error);
  }
}

/**
 * Get current user
 */
export function getCurrentUser() {
  return auth.currentUser;
}