import { getCurrentUser } from './auth';

// Whitelist of admin emails
const ADMIN_EMAILS: string[] = [
  'tostajaqueline7@gmail.com',
  'adrianatosta7@gmail.com',
  'tosta.jaqueline7@gmail.com',
  'adriana.tosta7@gmail.com',
  'msell@totalperform.com'
];

/**
 * Check if the current user is an admin (based on email whitelist)
 * @returns True if the current user is an admin, false otherwise
 */
export function isCurrentUserAdmin(): boolean {
  const user = getCurrentUser();
  if (!user || !user.email) {
    return false;
  }
  
  return ADMIN_EMAILS.includes(user.email);
}

/**
 * Check if a specific email is in the admin whitelist
 * @param email Email to check
 * @returns True if the email is in the admin whitelist, false otherwise
 */
export function isEmailWhitelisted(email: string): boolean {
  return ADMIN_EMAILS.includes(email);
}