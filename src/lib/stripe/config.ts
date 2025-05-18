// Stripe configuration file
// IMPORTANT: Never store the secret key in client-side code.
// This file only stores the public key and configuration settings.

// Use Stripe public key from environment variables
const STRIPE_PUBLIC_KEY = import.meta.env.PUBLIC_STRIPE_PUBLIC_KEY || '';

// Default currency for your Stripe payments
const CURRENCY = 'BRL';

// Supported payment methods - can be extended as needed
const PAYMENT_METHODS = ['card'];

// Export configurations
export const stripeConfig = {
  publicKey: STRIPE_PUBLIC_KEY,
  currency: CURRENCY,
  paymentMethods: PAYMENT_METHODS,
  appearance: {
    theme: 'stripe',
    variables: {
      colorPrimary: '#8855FF',
    }
  }
};

// Function to validate Stripe configuration
export function isStripeConfigured(): boolean {
  return !!stripeConfig.publicKey;
}

// Logging for development to ensure configuration is loaded
if (import.meta.env.DEV && !isStripeConfigured()) {
  console.warn('Stripe public key not configured. Payment functionality will not work.');
}