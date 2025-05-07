import {
	collection,
	getDocs,
	getDoc,
	doc,
	query,
	orderBy,
	limit,
	startAfter
} from 'firebase/firestore';
import { db } from './config';

export interface BlogPost {
	id: string;
	title: string;
	content: string;
	excerpt: string;
	author: string;
	date: string;
	imageUrl: string;
	imageHint: string;
	comments: Comment[];
}

interface Comment {
	id: number;
	author: string;
	date: string;
	text: string;
	avatarFallback: string;
}

const POSTS_PER_PAGE = 6;

export async function getBlogPosts(page = 1) {
	const postsRef = collection(db, 'posts');
	const q = query(postsRef, orderBy('date', 'desc'), limit(POSTS_PER_PAGE));

	try {
		const snapshot = await getDocs(q);
		const posts = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		})) as BlogPost[];

		return posts;
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return [];
	}
}

export async function getBlogPost(id: string) {
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
		return null;
	}
}
