# J. Tosta - Website for Psicologa Jaqueline Tosta

Personal website for psychologist Jaqueline Tosta, built with SvelteKit and TailwindCSS.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build locally
pnpm run preview
```

## Deployment

This site uses a staging-to-production deployment workflow with Firebase Hosting:

- **Staging Environment**: https://tostamente.web.app/
- **Production Environment**: https://jtosta-com.web.app/ and https://jtosta.com/

```bash
# Install Firebase CLI if you haven't already
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy to staging (default)
npm run deploy
# or simply
firebase deploy

# Test the staging site at https://tostamente.web.app/

# When ready, promote staging to production
npm run promote-to-prod

# If needed, deploy directly to production
npm run deploy:prod
```

The workflow is designed to:
1. Deploy changes to staging first for stakeholder review
2. Promote to production once approved without rebuilding
3. Allow direct production deployment when needed

## Structure

```
src/
  lib/        # Shared utilities and components
  routes/     # SvelteKit pages and layouts
  app.html    # Root HTML template
```

## Features

- 📱 Responsive design
- 🎨 Modern UI with TailwindCSS
- 🔥 Firebase integration for blog posts
- 📝 Blog with comments (authentication coming soon)
- 📊 SEO optimized
- 🚀 Fast and lightweight

## Customization

### Firebase Setup

1. Create a Firebase project
2. Enable Firestore and Authentication
3. Add your Firebase config to `.env.local`:

```env
PUBLIC_FIREBASE_API_KEY=your_api_key
PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
PUBLIC_FIREBASE_PROJECT_ID=your_project_id
PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Blog Posts

Blog posts are stored in Firestore. Each post contains:

- Title
- Content (HTML)
- Author
- Date
- Image URL
- Comments
