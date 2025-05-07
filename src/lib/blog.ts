import type { BlogPost, BlogPostsResult } from './types/blog';

const POSTS_PER_PAGE = 6;

interface MarkdownPost {
    metadata: {
        title: string;
        excerpt: string;
        author: string;
        date: string;
        imageUrl: string;
        imageHint: string;
    };
    default: {
        render(): { html: string };
    };
}

export type { BlogPost, BlogPostsResult };

export async function getBlogPosts(page = 1): Promise<BlogPostsResult> {
    try {
        const posts = Object.entries(import.meta.glob<MarkdownPost>('/src/content/blog/*.md', { eager: true }))
            .map(([path, post]) => {
                const id = path.split('/').pop()?.replace('.md', '');
                if (!id) throw new Error(`Invalid post path: ${path}`);
                
                return {
                    id,
                    title: post.metadata.title,
                    excerpt: post.metadata.excerpt,
                    author: post.metadata.author,
                    date: post.metadata.date,
                    imageUrl: post.metadata.imageUrl,
                    imageHint: post.metadata.imageHint,
                    content: post.default.render().html
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const start = (page - 1) * POSTS_PER_PAGE;
        const end = start + POSTS_PER_PAGE;
        const paginatedPosts = posts.slice(start, end);
        const hasMore = posts.length > end;

        return {
            posts: paginatedPosts,
            hasMore
        };
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        throw new Error('Failed to fetch blog posts. Please try again later.');
    }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
    try {
        const posts = Object.entries(import.meta.glob<MarkdownPost>('/src/content/blog/*.md', { eager: true }));
        const postEntry = posts.find(([path]) => path.includes(`${id}.md`));
        
        if (!postEntry) {
            return null;
        }

        const [, post] = postEntry;

        return {
            id,
            title: post.metadata.title,
            excerpt: post.metadata.excerpt,
            author: post.metadata.author,
            date: post.metadata.date,
            imageUrl: post.metadata.imageUrl,
            imageHint: post.metadata.imageHint,
            content: post.default.render().html
        };
    } catch (error) {
        console.error('Error fetching blog post:', error);
        throw new Error('Failed to fetch blog post. Please try again later.');
    }
}