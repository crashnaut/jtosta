import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { dev } from '$app/environment';
import type { BlogPost, BlogPostsResult } from './types/blog';

const POSTS_PER_PAGE = 6;

export async function getBlogPosts(page = 1): Promise<BlogPostsResult> {
    try {
        console.log('Fetching blog posts...');
        const postsDirectory = join(process.cwd(), dev ? 'src/content/blog' : 'build/content/blog');
        const filenames = readdirSync(postsDirectory);
        
        console.log('Found files:', filenames);

        const posts = filenames
            .filter(filename => filename.endsWith('.md'))
            .map(filename => {
                const filePath = join(postsDirectory, filename);
                const fileContent = readFileSync(filePath, 'utf-8');
                const id = filename.replace('.md', '');
                
                // Parse frontmatter
                const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
                if (!frontmatterMatch) {
                    throw new Error(`Invalid frontmatter in ${filename}`);
                }
                
                const frontmatter = frontmatterMatch[1]
                    .split('\n')
                    .reduce((acc, line) => {
                        const [key, ...valueParts] = line.split(':');
                        if (key && valueParts.length > 0) {
                            const value = valueParts.join(':').trim();
                            acc[key.trim()] = value.replace(/^"(.*)"$/, '$1');
                        }
                        return acc;
                    }, {} as Record<string, string>);

                // Get content (everything after frontmatter)
                const content = fileContent.slice(frontmatterMatch[0].length).trim();

                return {
                    id,
                    title: frontmatter.title,
                    excerpt: frontmatter.excerpt,
                    author: frontmatter.author,
                    date: frontmatter.date,
                    imageUrl: frontmatter.imageUrl,
                    imageHint: frontmatter.imageHint,
                    content
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const start = (page - 1) * POSTS_PER_PAGE;
        const end = start + POSTS_PER_PAGE;
        const paginatedPosts = posts.slice(start, end);
        
        return {
            posts: paginatedPosts,
            hasMore: posts.length > end
        };
    } catch (error) {
        console.error('Error in getBlogPosts:', error);
        throw error;
    }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
    try {
        const postsDirectory = join(process.cwd(), dev ? 'src/content/blog' : 'build/content/blog');
        const filePath = join(postsDirectory, `${id}.md`);
        
        try {
            const fileContent = readFileSync(filePath, 'utf-8');
            
            // Parse frontmatter
            const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
            if (!frontmatterMatch) {
                throw new Error(`Invalid frontmatter in ${id}.md`);
            }
            
            const frontmatter = frontmatterMatch[1]
                .split('\n')
                .reduce((acc, line) => {
                    const [key, ...valueParts] = line.split(':');
                    if (key && valueParts.length > 0) {
                        const value = valueParts.join(':').trim();
                        acc[key.trim()] = value.replace(/^"(.*)"$/, '$1');
                    }
                    return acc;
                }, {} as Record<string, string>);

            // Get content (everything after frontmatter)
            const content = fileContent.slice(frontmatterMatch[0].length).trim();
            
            return {
                id,
                title: frontmatter.title,
                excerpt: frontmatter.excerpt,
                author: frontmatter.author,
                date: frontmatter.date,
                imageUrl: frontmatter.imageUrl,
                imageHint: frontmatter.imageHint,
                content
            };
        } catch (e) {
            return null;
        }
    } catch (error) {
        console.error('Error in getBlogPost:', error);
        throw error;
    }
}