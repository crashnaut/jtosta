import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from './config';

// Get the statistics (like and comment counts) for a specific post
export async function getPostStats(postId: string) {
  try {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    
    if (postSnap.exists()) {
      const data = postSnap.data();
      return {
        likeCount: data.likeCount || 0,
        commentCount: data.commentCount || 0
      };
    }
    
    return {
      likeCount: 0,
      commentCount: 0
    };
  } catch (error) {
    console.error('Error fetching post stats:', error);
    return {
      likeCount: 0,
      commentCount: 0
    };
  }
}

// Get statistics for multiple posts at once
export async function getBatchPostStats(postIds: string[]) {
  try {
    const statsPromises = postIds.map(id => getPostStats(id));
    const statsResults = await Promise.all(statsPromises);
    
    const stats: Record<string, { likeCount: number, commentCount: number }> = {};
    postIds.forEach((id, index) => {
      stats[id] = statsResults[index];
    });
    
    return stats;
  } catch (error) {
    console.error('Error fetching batch post stats:', error);
    return {};
  }
}