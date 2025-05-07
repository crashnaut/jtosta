import type { PageServerLoad } from './$types';
import { getBlogPost } from '$lib/blog';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const post = await getBlogPost(params.id);
    
    if (!post) {
        throw error(404, 'Artigo não encontrado');
    }

    return {
        post
    };
};
