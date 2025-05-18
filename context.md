# J. Tosta Website

This is the main codebase for the J. Tosta psychology service website. The site is built with SvelteKit, uses Firebase for backend services, and is styled with TailwindCSS.

## Project Structure

- `src/` - Source code for the SvelteKit application
  - `lib/` - Reusable components, utilities, and business logic
  - `routes/` - SvelteKit pages and API routes
  - `content/` - Markdown content for blog posts
- `static/` - Static assets (images, favicon, etc.)
- `functions/` - Firebase Cloud Functions for server-side operations
- `build/` - Compiled production build (generated)

## Tech Stack

- **Frontend**: SvelteKit, TypeScript, TailwindCSS
- **Backend**: Firebase (Authentication, Firestore, Cloud Functions)
- **Hosting**: Firebase Hosting
- **Payments**: Stripe
- **Content**: Markdown with MDsveX

## Development Workflow

1. Local development: `npm run dev`
2. Blog post creation: `npm run blog-manager`
3. Deploy to staging: `npm run deploy:staging`
4. Deploy to production: `npm run deploy:prod`

## Environment Setup

This project uses environment variables for sensitive configuration. Create `.env` files following the `.env.example` template:

- `.env.development` - Development environment
- `.env.production` - Production environment

## Security Notes

- Ensure sensitive API keys are never committed to the repository
- Use Firebase Authentication for protected routes
- Store all API keys in environment variables or Firebase config
- Follow the principle of least privilege for Firebase rules