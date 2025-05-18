# Stripe Integration

This directory contains the Stripe payment integration for the J. Tosta website.

## Files

- `config.ts` - Stripe configuration and environment variables
- `stripe-service.ts` - Core service for handling payment operations
- `index.ts` - Exports for the Stripe module

## Environment Variables

For Stripe to work properly, the following environment variables are required:

```
# Client-side public key (used in the browser)
PUBLIC_STRIPE_PUBLIC_KEY=pk_your_stripe_public_key

# Server-side keys (only used in Firebase Functions)
STRIPE_SECRET=sk_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Usage

```typescript
// Import the stripe service
import { stripeService } from '$lib/stripe';

// Create a payment intent
const { success, clientSecret, error } = await stripeService.createPaymentIntent({
  amount: 100, // amount in BRL
  description: 'Payment for session',
  metadata: { userId: '123' }
});

// Handle payment confirmation in your Svelte component
// This is typically done with Stripe Elements UI components
```

## Security Notes

- Never store or expose the Stripe secret key in client-side code
- Always verify payments on the server side
- Use Firebase Functions for sensitive operations
- Use Stripe webhooks for reliable payment event handling