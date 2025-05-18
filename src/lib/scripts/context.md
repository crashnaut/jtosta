# Scripts

This directory contains utility scripts for managing blog posts and other administrative tasks.

## Files

- `blog-manager.ts` - Interactive CLI tool for creating and managing blog posts
- `migrate-blogs.ts` - Migrates local markdown blog posts to Firestore database
- `count-comments.js` - Utility to count and analyze blog post comments

## Usage

These scripts can be run from the project root using npm/pnpm:

```bash
# Create or manage blog posts
npm run blog-manager

# Migrate local markdown blog posts to Firestore
npm run migrate-blogs

# Count comments on blog posts
npm run count-comments
```

## Development Notes

- All scripts use the central Firebase configuration
- Blog posts are stored as markdown files in `src/content/blog` before migration
- After migration, posts are stored in Firestore with the slug as the document ID
- Scripts handle environment variables through dotenv