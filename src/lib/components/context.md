# Components

This directory contains reusable Svelte components for the J. Tosta website.

## Structure

- `layout/` - Layout components like Header, Footer, and page containers
- `ui/` - Reusable UI components like buttons, cards, and form inputs
- `blog/` - Components specific to blog functionality
- `auth/` - Authentication-related components

## Usage Guidelines

- Components should be self-contained with proper TypeScript typing
- Use props validation and default values where appropriate
- Prefer composition over inheritance
- Keep components focused on a single responsibility
- Document complex components with comments
- Use consistent naming conventions:
  - PascalCase for component names
  - kebab-case for file names
  - camelCase for props and variables

## Styling

- Use Tailwind CSS for styling
- Use the clsx/tailwind-merge utility for conditional classes
- Maintain consistent spacing, colors, and typography according to the design system