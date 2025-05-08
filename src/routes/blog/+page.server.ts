import type { PageServerLoad } from './$types';
import { getBlogPosts } from '$lib/blog';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load = (async ({ url }) => {
    try {
        const page = 1;  // Always use page 1 for prerendering
        const { posts, hasMore } = await getBlogPosts(page);
        return { posts, pagination: { page, hasNextPage: hasMore, hasPrevPage: false } };
    } catch (e) {
        throw error(500, 'Failed to load blog posts');
    }
}) satisfies PageServerLoad;
