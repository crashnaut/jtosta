import type { PageServerLoad } from './$types';
import { getBlogPosts } from '$lib/blog';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
    try {
        console.log('Starting blog page load...');
        const page = Number(url.searchParams.get('page')) || 1;
        console.log('Loading page:', page);

        try {
            const { posts, hasMore } = await getBlogPosts(page);
            console.log('Successfully loaded posts:', posts.length);
            
            return {
                posts,
                pagination: {
                    page,
                    hasNextPage: hasMore,
                    hasPrevPage: page > 1
                }
            };
        } catch (e) {
            console.error('Error during getBlogPosts:', e);
            throw e;
        }
    } catch (e) {
        console.error('Server load error:', e);
        throw error(500, {
            message: e instanceof Error ? e.message : 'Failed to load blog posts',
            code: 'BLOG_LOAD_ERROR'
        });
    }
};
