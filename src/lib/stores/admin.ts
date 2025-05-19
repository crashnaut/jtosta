import { writable, derived } from 'svelte/store';
import { isCurrentUserAdmin } from '$lib/firebase/admin';
import { user } from '$lib/firebase/auth';

// Create a derived store that updates whenever the user changes
export const isAdmin = derived(user, ($user) => {
  if (!$user || !$user.email) {
    return false;
  }
  
  return isCurrentUserAdmin();
});