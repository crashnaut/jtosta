import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { isAdmin } from '$lib/stores/admin';
import { get } from 'svelte/store';

export const load: LayoutLoad = async ({ data, url }) => {
  // Only run this check in the browser
  if (browser) {
    // Subscribe to the admin store to get current value
    const adminStatus = get(isAdmin);

    // Wait a moment to ensure Firebase auth has initialized
    setTimeout(() => {
      // If not admin, redirect
      if (!adminStatus) {
        goto(`/auth?returnUrl=${encodeURIComponent(url.pathname)}`);
      }
    }, 100);
  }
  
  return {
    ...data
  };
};