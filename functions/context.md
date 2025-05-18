# Firebase Functions

This directory contains Firebase Cloud Functions for the J. Tosta website, primarily handling server-side operations like payment processing.

## Files

- `src/index.ts` - Main entry point exporting all functions
- `src/payment.ts` - Stripe payment processing functions and API endpoints

## Environment Variables

Functions require the following environment variables to be set in the Firebase environment:

```
STRIPE_SECRET=your_stripe_secret_key
STRIPE_PUBLIC=your_stripe_public_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Deployment

Functions are deployed using the Firebase CLI:

```bash
# Deploy all functions
firebase deploy --only functions

# Deploy specific functions
firebase deploy --only functions:paymentApi
```

## Development Notes

- Use proper authentication for sensitive endpoints
- Never expose sensitive keys in client-side code
- Use proper error handling and logging
- Test functions locally using Firebase emulators before deployment
- Document API endpoints with proper JSDoc comments