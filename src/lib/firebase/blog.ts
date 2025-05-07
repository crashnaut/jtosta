import {
	collection,
	getDocs,
	getDoc,
	doc,
	query,
	orderBy,
	limit,
	startAfter,
	type QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './config';

export interface BlogPost {
	id: string;
	title: string;
	content: string; // markdown content
	excerpt: string;
	author: string;
	date: string;
	imageUrl: string;
	imageHint: string;
}

const POSTS_PER_PAGE = 6;

export interface BlogPostsResult {
	posts: BlogPost[];
	lastPost: QueryDocumentSnapshot | null;
	hasMore: boolean;
}

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
