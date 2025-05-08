import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { dev } from '$app/environment';
import type { BlogPost, BlogPostsResult } from './types/blog';

const POSTS_PER_PAGE = 6;

// Cache for parsed blog posts to improve performance
const postsCache = new Map<string, BlogPost>();

function parseFrontmatter(content: string): Record<string, string> {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
        throw new Error('Invalid frontmatter');
    }
    
    return frontmatterMatch[1]
        .split('\n')
        .reduce((acc, line) => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim();
                acc[key.trim()] = value.replace(/^"(.*)"$/, '$1');
            }
            return acc;
        }, {} as Record<string, string>);
}

function parsePost(filename: string, fileContent: string): BlogPost {
    const id = filename.replace('.md', '');
    const frontmatter = parseFrontmatter(fileContent);
    const content = fileContent.slice(fileContent.indexOf('---\n', 4) + 4).trim();
    
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
}

export async function getAllBlogPostIds(): Promise<string[]> {
    try {
        const postsDirectory = join(process.cwd(), dev ? 'src/content/blog' : 'build/content/blog');
        return readdirSync(postsDirectory)
            .filter(filename => filename.endsWith('.md'))
            .map(filename => filename.replace('.md', ''));
    } catch (error) {
        console.error('Error in getAllBlogPostIds:', error);
        return [];
    }
}

export async function getBlogPosts(page = 1): Promise<BlogPostsResult> {
    try {
        const postsDirectory = join(process.cwd(), dev ? 'src/content/blog' : 'build/content/blog');
        const filenames = readdirSync(postsDirectory)
            .filter(filename => filename.endsWith('.md'));

        const posts = filenames.map(filename => {
            if (postsCache.has(filename)) {
                return postsCache.get(filename)!;
            }

            const filePath = join(postsDirectory, filename);
            const fileContent = readFileSync(filePath, 'utf-8');
            const post = parsePost(filename, fileContent);
            postsCache.set(filename, post);
            return post;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const start = (page - 1) * POSTS_PER_PAGE;
        const end = start + POSTS_PER_PAGE;
        
        return {
            posts: posts.slice(start, end),
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
            if (postsCache.has(`${id}.md`)) {
                return postsCache.get(`${id}.md`)!;
            }

            const fileContent = readFileSync(filePath, 'utf-8');
            const post = parsePost(`${id}.md`, fileContent);
            postsCache.set(`${id}.md`, post);
            return post;
        } catch (e) {
            return null;
        }
    } catch (error) {
        console.error('Error in getBlogPost:', error);
        throw error;
    }
}