import {
	collection,
	getDocs,
	getDoc,
	doc,
	query,
	orderBy,
	limit,
	startAfter,
	addDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
	serverTimestamp,
	type QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './config';
import { getCurrentUser } from './auth';

export interface BlogPost {
	id: string;
	title: string;
	content: string; // markdown content
	excerpt: string;
	author: string;
	date: string;
	imageUrl: string;
	imageHint: string;
	comments?: Comment[];
}

export interface Comment {
	id: string;
	author: string;
	content: string;
	email?: string;
	createdAt: any; // Firebase timestamp
	isApproved?: boolean;
}

const POSTS_PER_PAGE = 6;

export interface BlogPostsResult {
	posts: BlogPost[];
	lastPost: QueryDocumentSnapshot | null;
	hasMore: boolean;
}

/**
 * Get paginated blog posts from Firestore
 */
export async function getBlogPosts(page = 1, lastPost?: QueryDocumentSnapshot): Promise<BlogPostsResult> {
	const postsRef = collection(db, 'posts');
	let q = query(postsRef, orderBy('date', 'desc'), limit(POSTS_PER_PAGE + 1));

	if (lastPost) {
		q = query(postsRef, orderBy('date', 'desc'), startAfter(lastPost), limit(POSTS_PER_PAGE + 1));
	}

	try {
		const snapshot = await getDocs(q);
		const hasMore = snapshot.docs.length > POSTS_PER_PAGE;
		const posts = snapshot.docs.slice(0, POSTS_PER_PAGE).map((doc) => ({
			id: doc.id,
			...doc.data()
		})) as BlogPost[];

		return {
			posts,
			lastPost: hasMore ? snapshot.docs[POSTS_PER_PAGE - 1] : null,
			hasMore
		};
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		throw new Error('Failed to fetch blog posts. Please try again later.');
	}
}

/**
 * Get a single blog post by ID
 */
export async function getBlogPost(id: string): Promise<BlogPost | null> {
	try {
		const docRef = doc(db, 'posts', id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return {
				id: docSnap.id,
				...docSnap.data()
			} as BlogPost;
		}
		return null;
	} catch (error) {
		console.error('Error fetching blog post:', error);
		throw new Error('Failed to fetch blog post. Please try again later.');
	}
}

/**
 * Add a comment to a blog post
 */
export async function addComment(
	postId: string, 
	comment: { author: string; content: string; email?: string }
): Promise<{ commentId: string }> {
	try {
		const postRef = doc(db, 'posts', postId);
		const postSnap = await getDoc(postRef);
		
		if (!postSnap.exists()) {
			throw new Error('Blog post not found');
		}
		
		// Create a new comment with a unique ID and timestamp
		const commentId = `comment_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
		const newComment: Comment = {
			id: commentId,
			author: comment.author,
			content: comment.content,
			email: comment.email,
			createdAt: serverTimestamp(),
			isApproved: false // Comments require approval by default
		};
		
		// Update the post document by adding the comment to the comments array
		await updateDoc(postRef, {
			comments: arrayUnion(newComment)
		});
		
		return { commentId };
	} catch (error) {
		console.error('Error adding comment:', error);
		throw new Error(error instanceof Error ? error.message : 'Failed to add comment');
	}
}

/**
 * Delete a comment from a blog post (admin only)
 */
export async function deleteComment(postId: string, commentId: string): Promise<void> {
	try {
		// Verify current user is authenticated and admin
		const currentUser = getCurrentUser();
		if (!currentUser) {
			throw new Error('Authentication required');
		}
		
		// TODO: Add admin check here when admin functionality is implemented
		// For now, we'll proceed without the check
		
		const postRef = doc(db, 'posts', postId);
		const postSnap = await getDoc(postRef);
		
		if (!postSnap.exists()) {
			throw new Error('Blog post not found');
		}
		
		const post = postSnap.data() as BlogPost;
		const comments = post.comments || [];
		
		// Find the comment to delete
		const commentToDelete = comments.find(c => c.id === commentId);
		if (!commentToDelete) {
			throw new Error('Comment not found');
		}
		
		// Remove the comment from the post
		await updateDoc(postRef, {
			comments: arrayRemove(commentToDelete)
		});
	} catch (error) {
		console.error('Error deleting comment:', error);
		throw new Error(error instanceof Error ? error.message : 'Failed to delete comment');
	}
}
