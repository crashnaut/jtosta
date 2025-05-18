import type { BlogPost, BlogPostsResult } from './types/blog';
import {
  getBlogPosts as getFirestoreBlogPosts,
  getBlogPost as getFirestoreBlogPost,
} from './firebase/blog';
import type { QueryDocumentSnapshot } from 'firebase/firestore';

// Cache to store the last query snapshot for pagination
let lastPostSnapshot: QueryDocumentSnapshot | undefined = undefined;

// Get all blog post IDs from Firestore
export async function getAllBlogPostIds(): Promise<string[]> {
  try {
    // We'll get all posts from the first page and extract IDs
    const result = await getFirestoreBlogPosts(1);
    return result.posts.map(post => post.id);
  } catch (error) {
    console.error('Error in getAllBlogPostIds:', error);
    return [];
  }
}

// Get paginated blog posts from Firestore
export async function getBlogPosts(page = 1): Promise<BlogPostsResult> {
  try {
    // Reset lastPostSnapshot when starting from page 1
    if (page === 1) {
      lastPostSnapshot = undefined;
    }
    
    const result = await getFirestoreBlogPosts(page, lastPostSnapshot);
    
    // Store the last post snapshot for potential next page requests
    lastPostSnapshot = result.lastPost || undefined;
    
    // Convert from Firestore result format to the expected BlogPostsResult format
    return {
      posts: result.posts,
      hasMore: result.hasMore
    };
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    throw error;
  }
}

// Get a single blog post by ID from Firestore
export async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    return await getFirestoreBlogPost(id);
  } catch (error) {
    console.error('Error in getBlogPost:', error);
    throw error;
  }
}