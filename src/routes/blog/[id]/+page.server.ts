import type { PageServerLoad } from './$types';
import { getBlogPost, getAllBlogPostIds } from '$lib/blog';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const entries = async () => {
    const ids = await getAllBlogPostIds();
    return ids.map(id => ({ id }));
};

export const load = (async ({ params }) => {
    const post = await getBlogPost(params.id);
    if (!post) {
        throw error(404, 'Post não encontrado');
    }
    return { post };
}) satisfies PageServerLoad;
