// src/lib/firebase/comments.ts
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  updateDoc,
  increment,
  getDoc,
  serverTimestamp,
  limit,
  type DocumentData,
  Timestamp,
  or,
  and,
  setDoc
} from 'firebase/firestore';
import { db } from './config';
import { getCurrentUser } from './auth';
import type { Comment, CommentLike, CommentReply } from '$lib/types/blog';

export interface NewComment {
  postId: string;
  content: string;
  parentId?: string;
}

// Add a new comment to a blog post
export async function addComment(comment: NewComment): Promise<Comment | null> {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to add a comment');
    }

    // Get user display name, email or fallback
    let userDisplayName = 'Anonymous User';
    if (user.displayName) {
      userDisplayName = user.displayName;
    } else if (user.email) {
      // Use part before @ in email if display name not set
      userDisplayName = user.email.split('@')[0];
    }

    // Create comment document
    const commentData = {
      postId: comment.postId,
      userId: user.uid,
      userDisplayName: userDisplayName,
      userPhotoURL: user.photoURL || null,
      content: comment.content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likeCount: 0,
      replyCount: 0,
      parentId: comment.parentId || null
    };

    // Add comment to Firestore
    const docRef = await addDoc(collection(db, 'comments'), commentData);
    
    try {
      // If it's a reply to another comment, increment the parent's replyCount
      if (comment.parentId) {
        const parentCommentRef = doc(db, 'comments', comment.parentId);
        await updateDoc(parentCommentRef, {
          replyCount: increment(1)
        });
      }
      
      // Increment comment count on the blog post
      const postRef = doc(db, 'posts', comment.postId);
      await updateDoc(postRef, {
        commentCount: increment(1)
      });
    } catch (countError) {
      // If updating count fails, don't fail the whole operation
      console.error('Error updating counts:', countError);
    }

    const commentDoc = await getDoc(docRef);
    if (!commentDoc.exists()) {
      throw new Error('Failed to retrieve created comment');
    }
    
    const createdComment = commentDoc.data();
    
    return {
      id: docRef.id,
      ...createdComment,
      createdAt: createdComment.createdAt?.toDate?.() 
                ? createdComment.createdAt.toDate().toISOString() 
                : new Date().toISOString(),
      updatedAt: createdComment.updatedAt?.toDate?.() 
                ? createdComment.updatedAt.toDate().toISOString() 
                : new Date().toISOString()
    } as Comment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment. Please try again later.');
  }
}

// Get top-level comments for a specific blog post
export async function getComments(postId: string, includeReplies: boolean = false): Promise<Comment[]> {
  try {
    const commentsRef = collection(db, 'comments');
    
    // Try the optimized query first (requires composite index)
    try {
      // For top-level comments (parentId is null) or all comments based on includeReplies flag
      const q = includeReplies 
        ? query(
            commentsRef,
            where('postId', '==', postId),
            orderBy('createdAt', 'desc')
          )
        : query(
            commentsRef,
            where('postId', '==', postId),
            where('parentId', '==', null),
            orderBy('createdAt', 'desc')
          );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() 
                    ? data.createdAt.toDate().toISOString() 
                    : new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.() 
                    ? data.updatedAt.toDate().toISOString() 
                    : new Date().toISOString()
        } as Comment;
      });
    } catch (indexError) {
      console.warn('Index error, falling back to simple query:', indexError);
      
      // Fallback to simple query without ordering if index doesn't exist yet
      const q = query(
        commentsRef,
        where('postId', '==', postId)
      );
      
      const snapshot = await getDocs(q);
      const comments = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() 
                    ? data.createdAt.toDate().toISOString() 
                    : new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.() 
                    ? data.updatedAt.toDate().toISOString() 
                    : new Date().toISOString()
        } as Comment;
      });
      
      // Filter to top-level comments only if needed
      const filteredComments = includeReplies 
        ? comments 
        : comments.filter(comment => !comment.parentId);
        
      // Manual sorting as fallback - prioritize recent comments with likes
      return filteredComments.sort((a, b) => {
        // First compare: if one has likes and the other doesn't, prefer the one with likes
        const aHasLikes = (a.likeCount || 0) > 0;
        const bHasLikes = (b.likeCount || 0) > 0;
        
        if (aHasLikes && !bHasLikes) return -1;
        if (!aHasLikes && bHasLikes) return 1;
        
        // Second compare: if both have likes or both don't have likes, sort by recency
        const aTime = new Date(a.createdAt).getTime();
        const bTime = new Date(b.createdAt).getTime();
        
        return bTime - aTime; // Newer posts first
      });
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error('Failed to fetch comments. Please try again later.');
  }
}

// Get replies to a specific comment
export async function getCommentReplies(commentId: string): Promise<Comment[]> {
  try {
    const commentsRef = collection(db, 'comments');
    const q = query(
      commentsRef,
      where('parentId', '==', commentId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() 
                  ? data.createdAt.toDate().toISOString() 
                  : new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.() 
                  ? data.updatedAt.toDate().toISOString() 
                  : new Date().toISOString()
      } as Comment;
    });
  } catch (error) {
    console.error('Error fetching comment replies:', error);
    throw new Error('Failed to fetch replies. Please try again later.');
  }
}

// Get the top comments for a post (based on like count)
export async function getTopComments(postId: string, count: number = 3): Promise<Comment[]> {
  try {
    const commentsRef = collection(db, 'comments');
    const q = query(
      commentsRef,
      where('postId', '==', postId),
      where('parentId', '==', null),
      orderBy('likeCount', 'desc'),
      orderBy('createdAt', 'desc'),
      limit(count)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() 
                  ? data.createdAt.toDate().toISOString() 
                  : new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.() 
                  ? data.updatedAt.toDate().toISOString() 
                  : new Date().toISOString()
      } as Comment;
    });
  } catch (error) {
    console.error('Error fetching top comments:', error);
    
    // Fallback to regular comments if the index doesn't exist
    const comments = await getComments(postId);
    return comments
      .sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))
      .slice(0, count);
  }
}

// Delete a comment
export async function deleteComment(commentId: string, postId: string): Promise<void> {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to delete a comment');
    }
    
    // Get the comment to verify ownership
    const commentRef = doc(db, 'comments', commentId);
    const commentSnap = await getDoc(commentRef);
    
    if (!commentSnap.exists()) {
      throw new Error('Comment not found');
    }
    
    const commentData = commentSnap.data();
    if (commentData.userId !== user.uid) {
      throw new Error('You are not authorized to delete this comment');
    }
    
    // Check if this is a parent comment with replies
    const parentId = commentData.parentId;
    
    // Delete the comment
    await deleteDoc(commentRef);
    
    // Update counts
    try {
      // If it has a parent, decrement the parent's reply count
      if (parentId) {
        const parentCommentRef = doc(db, 'comments', parentId);
        await updateDoc(parentCommentRef, {
          replyCount: increment(-1)
        });
      }
      
      // Decrement comment count on the blog post
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        commentCount: increment(-1)
      });
    } catch (countError) {
      console.error('Error updating counts after deletion:', countError);
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw new Error('Failed to delete comment. Please try again later.');
  }
}

// Like a comment
export async function likeComment(commentId: string): Promise<void> {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to like a comment');
    }
    
    const likeId = `${commentId}_${user.uid}`;
    const likeRef = doc(db, 'commentLikes', likeId);
    
    // Check if like already exists
    const existingLike = await getDoc(likeRef);
    if (existingLike.exists()) {
      return; // User already liked this comment
    }
    
    // Create the like
    await setDoc(likeRef, {
      commentId,
      userId: user.uid,
      createdAt: serverTimestamp()
    });
    
    // Increment the comment's like count
    const commentRef = doc(db, 'comments', commentId);
    await updateDoc(commentRef, {
      likeCount: increment(1)
    });
  } catch (error) {
    console.error('Error liking comment:', error);
    throw new Error('Failed to like comment. Please try again later.');
  }
}

// Unlike a comment
export async function unlikeComment(commentId: string): Promise<void> {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to unlike a comment');
    }
    
    const likeId = `${commentId}_${user.uid}`;
    const likeRef = doc(db, 'commentLikes', likeId);
    
    // Check if like exists
    const existingLike = await getDoc(likeRef);
    if (!existingLike.exists()) {
      return; // Nothing to unlike
    }
    
    // Delete the like
    await deleteDoc(likeRef);
    
    // Decrement the comment's like count
    const commentRef = doc(db, 'comments', commentId);
    await updateDoc(commentRef, {
      likeCount: increment(-1)
    });
  } catch (error) {
    console.error('Error unliking comment:', error);
    throw new Error('Failed to unlike comment. Please try again later.');
  }
}

// Check if the current user has liked a comment
export async function hasUserLikedComment(commentId: string): Promise<boolean> {
  try {
    const user = getCurrentUser();
    if (!user) {
      return false;
    }
    
    const likeId = `${commentId}_${user.uid}`;
    const likeRef = doc(db, 'commentLikes', likeId);
    const existingLike = await getDoc(likeRef);
    
    return existingLike.exists();
  } catch (error) {
    console.error('Error checking if user liked comment:', error);
    return false;
  }
}

// Edit a comment
export async function editComment(commentId: string, newContent: string): Promise<void> {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to edit a comment');
    }
    
    // Get the comment to verify ownership
    const commentRef = doc(db, 'comments', commentId);
    const commentSnap = await getDoc(commentRef);
    
    if (!commentSnap.exists()) {
      throw new Error('Comment not found');
    }
    
    const commentData = commentSnap.data();
    if (commentData.userId !== user.uid) {
      throw new Error('You are not authorized to edit this comment');
    }
    
    // Update the comment
    await updateDoc(commentRef, {
      content: newContent,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error editing comment:', error);
    throw new Error('Failed to edit comment. Please try again later.');
  }
}