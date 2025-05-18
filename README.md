# J. Tosta Website

Professional website for psychologist Jaqueline Tosta, built with SvelteKit, Firebase, and TailwindCSS.

## Quick Start

```bash
# Install dependencies
pnpm install

# Development
pnpm run dev

# Production build
pnpm run build
```

## Deployment

- **Staging**: https://tostamente.web.app/
- **Production**: https://jtosta.com/

```bash
# Deploy to staging
pnpm run deploy:staging

# Deploy to production
pnpm run deploy:prod

# Promote staging to production
pnpm run promote-to-prod
```

## Project Structure

```
/src
  /content       # Blog posts (markdown)
  /lib           # Core utilities and components
  /routes        # Pages and API routes
/functions       # Firebase Cloud Functions
/static          # Static assets
```

See `context.md` files in each directory for more detailed documentation.

## Key Features

- Responsive design with TailwindCSS
- Firebase backend (Auth, Firestore, Functions)
- Blog system with comments
- Payment processing with Stripe
- SEO optimized

## Configuration

Create `.env` files following the `.env.example` template:

```
# Firebase configuration
PUBLIC_FIREBASE_API_KEY=your_key
PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
PUBLIC_FIREBASE_PROJECT_ID=your_id
# ...other Firebase variables

# Stripe (if using payments)
PUBLIC_STRIPE_PUBLIC_KEY=your_key
```

## Blog Management

```bash
# Create/manage blog posts
pnpm run blog-manager

# Migrate to Firestore
pnpm run migrate-blogs
```
