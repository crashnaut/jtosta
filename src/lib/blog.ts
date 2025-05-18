// Core functionality for blog post retrieval and management
import type { BlogPost, BlogPostsResult } from './types/blog';
import {
  getBlogPosts as getFirestoreBlogPosts,
  getBlogPost as getFirestoreBlogPost,
  addComment,
  deleteComment
} from './firebase/blog';
import type { QueryDocumentSnapshot } from 'firebase/firestore';

// Cache to store the last query snapshot for pagination
let lastPostSnapshot: QueryDocumentSnapshot | undefined = undefined;

/**
 * Get all blog post IDs from Firestore
 * Used for generating static routes and sitemaps
 */
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

/**
 * Get paginated blog posts from Firestore
 * @param page Page number (1-based)
 * @returns Object containing posts array and hasMore flag
 */
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
    // Return empty result instead of throwing
    return {
      posts: [],
      hasMore: false,
      error: error instanceof Error ? error.message : 'Unknown error fetching blog posts'
    };
  }
}

/**
 * Get a single blog post by ID from Firestore
 * @param id Blog post ID (slug)
 * @returns Blog post object or null if not found
 */
export async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    return await getFirestoreBlogPost(id);
  } catch (error) {
    console.error(`Error fetching blog post with ID '${id}':`, error);
    return null;
  }
}

/**
 * Add a comment to a blog post
 * @param postId Blog post ID
 * @param comment Comment data
 * @returns Success flag and comment ID if successful
 */
export async function addCommentToBlogPost(
  postId: string, 
  comment: { author: string; content: string; email?: string }
): Promise<{ success: boolean; commentId?: string; error?: string }> {
  try {
    const result = await addComment(postId, comment);
    return { success: true, commentId: result.commentId };
  } catch (error) {
    console.error(`Error adding comment to post '${postId}':`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error adding comment'
    };
  }
}

/**
 * Delete a comment from a blog post (admin only)
 * @param postId Blog post ID
 * @param commentId Comment ID to delete
 * @returns Success flag
 */
export async function deleteCommentFromBlogPost(
  postId: string,
  commentId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteComment(postId, commentId);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting comment '${commentId}' from post '${postId}':`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error deleting comment'
    };
  }
}