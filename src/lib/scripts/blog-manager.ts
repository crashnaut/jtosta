// src/lib/scripts/blog-manager.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { prompt } from 'inquirer';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Firebase configuration from environment variables or use fallback values
const firebaseConfig = {
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY || "AIzaSyDS-i6M1SBFHqodsulJ0IYeUn3OYODlHRA",
  authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "tostamente.firebaseapp.com",
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID || "tostamente",
  storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET || "tostamente.firebasestorage.app",
  messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "603102018157",
  appId: process.env.PUBLIC_FIREBASE_APP_ID || "1:603102018157:web:3fe1f03c4ccd61ed935d64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Constants for file paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../../content/blog');
const templatePath = path.join(__dirname, '../templates/blog-template.md');

// Create directories if they don't exist
const templatesDir = path.join(__dirname, '../templates');
if (!fs.existsSync(templatesDir)) {
  fs.mkdirSync(templatesDir, { recursive: true });
}
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Blog post template
const BLOG_TEMPLATE = `---
title: "Your Blog Post Title"
excerpt: "A brief summary of your blog post (2-3 sentences)"
author: "Jaqueline Tosta"
date: "${new Date().toISOString().split('T')[0]}"
imageUrl: "/photos/your-image.jpg"
imageHint: "Brief description of the image for accessibility"
---

Start writing your blog post content here. This is the introduction paragraph.

## First Section Heading

Your content goes here...

## Second Section Heading

More content here...

## Conclusion

Concluding thoughts here...
`;

// Create the blog template file if it doesn't exist
if (!fs.existsSync(templatePath)) {
  fs.writeFileSync(templatePath, BLOG_TEMPLATE, 'utf8');
  console.log(`✅ Created blog template at ${templatePath}`);
}

// Function to create a new blog post from template
async function createNewBlogPost() {
  const answers = await prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the blog post title:',
      validate: (input) => input.trim() !== '' ? true : 'Title is required'
    },
    {
      type: 'input',
      name: 'slug',
      message: 'Enter the blog post slug (used in URL, e.g., managing-anxiety):',
      default: (answers) => answers.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      validate: (input) => /^[a-z0-9-]+$/.test(input) ? true : 'Slug must contain only lowercase letters, numbers, and hyphens'
    },
    {
      type: 'input',
      name: 'excerpt',
      message: 'Enter a brief excerpt (2-3 sentences):',
      validate: (input) => input.trim() !== '' ? true : 'Excerpt is required'
    },
    {
      type: 'input',
      name: 'imageUrl',
      message: 'Enter the image URL (e.g., /photos/your-image.jpg):',
      default: '/photos/treat_anx.jpg'
    },
    {
      type: 'input',
      name: 'imageHint',
      message: 'Enter image description for accessibility:',
      default: 'Image related to the blog post'
    }
  ]);

  const today = new Date().toISOString().split('T')[0];
  
  const frontmatter = {
    title: answers.title,
    excerpt: answers.excerpt,
    author: 'Jaqueline Tosta',
    date: today,
    imageUrl: answers.imageUrl,
    imageHint: answers.imageHint
  };
  
  const template = fs.readFileSync(templatePath, 'utf8');
  const { content } = matter(template);
  
  const newPost = matter.stringify(content, frontmatter);
  const outputPath = path.join(contentDir, `${answers.slug}.md`);
  
  fs.writeFileSync(outputPath, newPost, 'utf8');
  console.log(`✅ Created new blog post at: ${outputPath}`);
  console.log(`Next steps:`);
  console.log(`1. Edit the content in your favorite markdown editor`);
  console.log(`2. Run 'npm run migrate-blogs' to upload to Firestore when ready`);
}

// Function to check which blog posts exist in Firestore
async function getBlogPostsInFirestore() {
  try {
    const postsRef = collection(db, 'posts');
    const snapshot = await getDocs(postsRef);
    return snapshot.docs.map(doc => doc.id);
  } catch (error) {
    console.error('Error fetching blog posts from Firestore:', error);
    return [];
  }
}

// Function to clean up local blog posts that are already in Firestore
async function cleanupLocalBlogPosts() {
  try {
    // Get blog posts from Firestore
    const firestorePosts = await getBlogPostsInFirestore();
    
    if (firestorePosts.length === 0) {
      console.log('⚠️ No blog posts found in Firestore. Nothing to clean up.');
      return;
    }
    
    console.log(`Found ${firestorePosts.length} posts in Firestore.`);
    
    // Check local blog posts
    const localFiles = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
    const localSlugs = localFiles.map(file => path.basename(file, '.md'));
    
    // Find posts that exist in both places
    const duplicates = localSlugs.filter(slug => firestorePosts.includes(slug));
    
    if (duplicates.length === 0) {
      console.log('No duplicate posts found. All local posts are unique.');
      return;
    }
    
    console.log(`Found ${duplicates.length} posts that exist both locally and in Firestore:`);
    duplicates.forEach(slug => console.log(`- ${slug}.md`));
    
    const { confirm } = await prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to remove these local files? (They are already in Firestore)',
        default: false
      }
    ]);
    
    if (confirm) {
      duplicates.forEach(slug => {
        const filePath = path.join(contentDir, `${slug}.md`);
        fs.unlinkSync(filePath);
        console.log(`🗑️ Removed: ${filePath}`);
      });
      console.log('✅ Cleanup complete!');
    } else {
      console.log('Operation canceled. No files were removed.');
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

// Main function to run the script
async function main() {
  const { action } = await prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: 'Create a new blog post', value: 'create' },
        { name: 'Clean up local blog posts that exist in Firestore', value: 'cleanup' },
        { name: 'Exit', value: 'exit' }
      ]
    }
  ]);
  
  switch (action) {
    case 'create':
      await createNewBlogPost();
      break;
    case 'cleanup':
      await cleanupLocalBlogPosts();
      break;
    case 'exit':
      console.log('Exiting...');
      break;
  }
}

// Run the script
main().catch(console.error);