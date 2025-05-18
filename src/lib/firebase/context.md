# Firebase Integration

This directory contains the Firebase integration for the J. Tosta website. It includes configuration, authentication, and Firestore database operations.

## Files

- `config.ts` - Central Firebase configuration using environment variables
- `auth.ts` - Authentication functions and user management
- `firestore.ts` - Database operations for blog posts, comments, and other data

## Environment Variables

Firebase configuration requires the following environment variables in `.env` files:

```
PUBLIC_FIREBASE_API_KEY=your_api_key
PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
PUBLIC_FIREBASE_PROJECT_ID=your_project_id
PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Development Notes

- All Firebase credentials should be stored in environment variables, not hardcoded
- Use the centralized config.ts file rather than initializing Firebase in multiple files
- The auth store provides reactive user state with `isAuthenticated` and `user` stores