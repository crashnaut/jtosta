# Stores

This directory contains Svelte stores for managing application state in the J. Tosta website.

## Core Stores

- `auth.ts` - Authentication state management
- `theme.ts` - Theme preferences and color scheme management
- `blog.ts` - Blog post and comment state management

## Usage Guidelines

- Use reactive stores for state that needs to be shared across components
- Prefer readonly stores when consumers shouldn't modify the state directly
- Use derived stores to compute values based on other stores
- Keep store logic separate from UI components

## Example

```typescript
// Import a store
import { theme } from '$lib/stores/theme';

// In a Svelte component
<script>
  import { theme } from '$lib/stores/theme';
  
  // Subscribe to the store value
  $: isDarkMode = $theme === 'dark';
  
  // Update the store
  function toggleTheme() {
    theme.set($theme === 'dark' ? 'light' : 'dark');
  }
</script>

<button on:click={toggleTheme}>
  Toggle theme (currently: {$theme})
</button>
```