import type { PageServerLoad } from './$types';
import { getBlogPosts } from '$lib/blog';

export const load: PageServerLoad = async ({ url }) => {
    const page = Number(url.searchParams.get('page')) || 1;
    const { posts, hasMore } = await getBlogPosts(page);
    
    return {
        posts,
        pagination: {
            page,
            hasNextPage: hasMore,
            hasPrevPage: page > 1
        }
    };
};
