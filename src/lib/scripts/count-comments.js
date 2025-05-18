import { collection, getDocs, query } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBBEX1DSJ-eXVaVTe81XhMDSYBZfFsQZ9M",
  authDomain: "tostamente.firebaseapp.com",
  projectId: "tostamente",
  storageBucket: "tostamente.appspot.com",
  messagingSenderId: "580493533761",
  appId: "1:580493533761:web:4a1cd64efbf06cc675de73",
  measurementId: "G-YL04SHHB0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Count all comments in the Firebase database
 * Run this script with: npm run count-comments
 */
async function countAllComments() {
  try {
    console.log('Counting all comments in the database...');
    
    // Get all comments
    const commentsRef = collection(db, 'comments');
    const commentsQuery = query(commentsRef);
    const commentsSnapshot = await getDocs(commentsQuery);
    
    const comments = commentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`Total comments: ${comments.length}`);
    
    // Group comments by post ID to see distribution
    const commentsByPost = {};
    comments.forEach(comment => {
      const postId = comment.postId;
      if (!commentsByPost[postId]) {
        commentsByPost[postId] = [];
      }
      commentsByPost[postId].push(comment);
    });
    
    // Print counts by post
    console.log('\nComments by post:');
    for (const [postId, postComments] of Object.entries(commentsByPost)) {
      console.log(`Post ${postId}: ${postComments.length} comments`);
    }
    
    return comments.length;
  } catch (error) {
    console.error('Error counting comments:', error);
    console.error('Full error:', error);
    return 0;
  }
}

// Main function
(async () => {
  try {
    await countAllComments();
    console.log('Finished counting comments');
  } catch (err) {
    console.error('Error running script:', err);
  }
})();