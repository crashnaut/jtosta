export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    date: string;
    imageUrl: string;
    imageHint: string;
    commentCount?: number;
    likeCount?: number;
}

export interface BlogPostsResult {
    posts: BlogPost[];
    hasMore: boolean;
}

export interface Comment {
    id: string;
    postId: string;
    userId: string;
    userDisplayName: string;
    userPhotoURL?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    likeCount?: number;
    parentId?: string;       // For nested comments - null/undefined for top-level comments
    replyCount?: number;     // Number of replies to this comment
}

// Extra interfaces for comment functionality
export interface CommentLike {
    id?: string;
    commentId: string;
    userId: string;
    createdAt: string;
}

export interface CommentReply {
    commentId: string;
    content: string;
    parentId: string;
}