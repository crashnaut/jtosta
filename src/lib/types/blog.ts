export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    date: string;
    imageUrl: string;
    imageHint: string;
}

export interface BlogPostsResult {
    posts: BlogPost[];
    hasMore: boolean;
}