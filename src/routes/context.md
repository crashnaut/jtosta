# Routes

This directory contains all the route components for the J. Tosta website, following SvelteKit's file-based routing system.

## Main Routes

- `/` - Home page showcasing Jaqueline Tosta's psychology services
- `/sobre/` - About page with professional information
- `/blog/` - Blog listing page with posts related to psychology
- `/blog/[slug]/` - Individual blog post pages
- `/contato/` - Contact page with form and information
- `/auth/` - Authentication page for login/registration
- `/admin/` - Protected admin area for managing content

## Structure

- `+page.svelte` - Page component
- `+page.ts` - Page data loading
- `+layout.svelte` - Layout component for route
- `+layout.ts` - Layout data loading
- `+error.svelte` - Error component

## API Routes

- `/api/payment/` - Stripe payment processing endpoints
- `/api/contact/` - Contact form submission endpoints

## Development Notes

- Use proper meta tags for SEO in each page
- Implement proper authentication guards for protected routes
- Use prerendering for static content where appropriate
- Implement proper loading and error states