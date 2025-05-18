// src/lib/firebase/likes.ts
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  increment,
  getDocs,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from './config';
import { getCurrentUser } from './auth';

// Like a blog post
export async function likePost(postId: string): Promise<void> {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to like a post');
    }
    
    // Create a unique ID for the like document using user ID and post ID
    const likeId = `${postId}_${user.uid}`;
    
    // Check if user already liked this post
    const likeRef = doc(db, 'likes', likeId);
    const likeDoc = await getDoc(likeRef);
    
    if (likeDoc.exists()) {
      // User already liked this post, ignore
      return;
    }
    
    // Create like document
    await setDoc(likeRef, {
      postId,
      userId: user.uid,
      createdAt: new Date().toISOString()
    });
    
    // Increment like count on the blog post
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likeCount: increment(1)
    });
  } catch (error) {
    console.error('Error liking post:', error);
    throw new Error('Failed to like post. Please try again later.');
  }
}

// Unlike a blog post
export async function unlikePost(postId: string): Promise<void> {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to unlike a post');
    }
    
    // Get the like ID using post ID and user ID
    const likeId = `${postId}_${user.uid}`;
    
    // Delete the like document
    const likeRef = doc(db, 'likes', likeId);
    const likeDoc = await getDoc(likeRef);
    
    if (!likeDoc.exists()) {
      // User hasn't liked this post, ignore
      return;
    }
    
    await deleteDoc(likeRef);
    
    // Decrement like count on the blog post
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likeCount: increment(-1)
    });
  } catch (error) {
    console.error('Error unliking post:', error);
    throw new Error('Failed to unlike post. Please try again later.');
  }
}

// Check if user has liked a post
export async function hasUserLikedPost(postId: string): Promise<boolean> {
  try {
    const user = getCurrentUser();
    if (!user) {
      return false;
    }
    
    const likeId = `${postId}_${user.uid}`;
    const likeRef = doc(db, 'likes', likeId);
    const likeDoc = await getDoc(likeRef);
    
    return likeDoc.exists();
  } catch (error) {
    console.error('Error checking if user liked post:', error);
    return false;
  }
}

// Get the like count for a post
export async function getLikeCount(postId: string): Promise<number> {
  try {
    const postRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postRef);
    
    if (!postDoc.exists()) {
      return 0;
    }
    
    const postData = postDoc.data();
    return postData.likeCount || 0;
  } catch (error) {
    console.error('Error getting like count:', error);
    return 0;
  }
}