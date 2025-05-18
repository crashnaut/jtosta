import { writable } from 'svelte/store';

export const authModalOpen = writable(false);
export const authReturnUrl = writable<string | null>(null);

/**
 * Open the auth modal with an optional return URL
 * @param returnUrl Optional URL to redirect to after successful authentication
 */
export function openAuthModal(returnUrl: string | null = null) {
  authReturnUrl.set(returnUrl);
  authModalOpen.set(true);
}

/**
 * Close the auth modal
 */
export function closeAuthModal() {
  authModalOpen.set(false);
}