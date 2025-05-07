import type { PageServerLoad } from './$types';
import { getBlogPosts } from '$lib/firebase/blog';

export const load: PageServerLoad = async ({ url }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const posts = await getBlogPosts(page);

	// TODO: Implement proper pagination with Firebase
	const totalPages = 1; // This will be updated when we implement proper pagination

	return {
		posts,
		pagination: {
			page,
			totalPages,
			hasNextPage: false, // Will be updated with proper pagination
			hasPrevPage: page > 1
		}
	};
};
