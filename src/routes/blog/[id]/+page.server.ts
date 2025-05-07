import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getBlogPost } from '$lib/firebase/blog';

export const load: PageServerLoad = async ({ params }) => {
	const post = await getBlogPost(params.id);

	if (!post) {
		throw error(404, {
			message: 'Post não encontrado'
		});
	}

	return {
		post
	};
};
