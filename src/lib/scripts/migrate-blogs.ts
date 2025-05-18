// src/lib/scripts/migrate-blogs.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

// Firebase configuration - use your existing config
const firebaseConfig = {
  apiKey: "AIzaSyDS-i6M1SBFHqodsulJ0IYeUn3OYODlHRA",
  authDomain: "tostamente.firebaseapp.com",
  projectId: "tostamente",
  storageBucket: "tostamente.firebasestorage.app",
  messagingSenderId: "603102018157",
  appId: "1:603102018157:web:3fe1f03c4ccd61ed935d64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../../content/blog');

// Function to read and process markdown files
async function processBlogFiles() {
  try {
    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
    
    console.log(`Found ${files.length} blog posts to migrate...`);
    
    for (const file of files) {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Extract file name without extension to use as document ID
      const id = path.basename(file, '.md');
      
      // Create blog post document
      const blogPost = {
        title: data.title,
        excerpt: data.excerpt,
        content: content, // Store the full markdown content
        author: data.author,
        date: data.date,
        imageUrl: data.imageUrl,
        imageHint: data.imageHint,
        createdAt: new Date().toISOString(), // Add creation timestamp
        updatedAt: new Date().toISOString() // Add update timestamp
      };
      
      // Upload to Firestore
      await setDoc(doc(db, 'posts', id), blogPost);
      console.log(`✅ Uploaded: ${data.title}`);
    }
    
    console.log('Migration complete! All blog posts have been uploaded to Firestore.');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migration
processBlogFiles();