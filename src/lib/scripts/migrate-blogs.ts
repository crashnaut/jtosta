// src/lib/scripts/migrate-blogs.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../../content/blog');

// Ensure content directory exists
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
  console.log(`Created directory: ${contentDir}`);
}

// Function to read and process markdown files
async function processBlogFiles() {
  try {
    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
    
    if (files.length === 0) {
      console.log('No blog post files found to migrate. Add markdown files to src/content/blog/ first.');
      return;
    }
    
    console.log(`Found ${files.length} blog posts to migrate...`);
    
    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Extract file name without extension to use as document ID
      const id = path.basename(file, '.md');
      
      // Create blog post document
      const blogPost = {
        title: data.title || 'Untitled Post',
        excerpt: data.excerpt || '',
        content: content, // Store the full markdown content
        author: data.author || 'Jaqueline Tosta',
        date: data.date || new Date().toISOString().split('T')[0],
        imageUrl: data.imageUrl || '',
        imageHint: data.imageHint || '',
        createdAt: new Date().toISOString(), // Add creation timestamp
        updatedAt: new Date().toISOString() // Add update timestamp
      };
      
      // Upload to Firestore
      await setDoc(doc(db, 'posts', id), blogPost);
      console.log(`✅ Uploaded: ${blogPost.title} (ID: ${id})`);
    }
    
    console.log('Migration complete! All blog posts have been uploaded to Firestore.');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migration
processBlogFiles().catch(error => {
  console.error('Failed to process blog files:', error);
  process.exit(1);
});