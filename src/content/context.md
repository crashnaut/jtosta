# Content

This directory contains markdown content for the J. Tosta website, primarily blog posts that can be migrated to Firestore.

## Structure

- `blog/` - Directory containing all blog posts as markdown files
  - Each file follows the format `[slug].md` where slug is the URL-friendly identifier

## Blog Post Format

Blog posts use frontmatter for metadata and markdown for content:

```md
---
title: "Title of the Blog Post"
excerpt: "A brief summary of the blog post (2-3 sentences)"
author: "Jaqueline Tosta"
date: "2023-05-15"
imageUrl: "/photos/example-image.jpg"
imageHint: "Description of the image for accessibility"
---

Content of the blog post in Markdown format.

## Headings Use Markdown Syntax

Regular paragraphs and **formatting** are supported.
```

## Development Workflow

1. Create new posts using the blog manager: `npm run blog-manager`
2. Edit posts in your preferred markdown editor
3. Migrate posts to Firestore: `npm run migrate-blogs`
4. Once migrated, local files can be cleaned up via the blog manager

## Important Notes

- Always include all required frontmatter fields
- Keep image paths consistent and ensure images exist in the static directory
- Use descriptive slugs that relate to the post content
- Consider SEO in your titles and content