<script lang="ts">
  import { onMount } from 'svelte';
  import { collection, getDocs, query } from 'firebase/firestore';
  import { db } from '$lib/firebase/config';
  import LoadingSpinner from '$lib/components/loading-spinner.svelte';
  
  let isLoading = true;
  let commentStats = {
    totalCount: 0,
    byPost: {} as Record<string, number>
  };
  
  let likeStats = {
    totalCount: 0,
    byPost: {} as Record<string, number>
  };
  
  onMount(async () => {
    try {
      await fetchCommentStats();
      await fetchLikeStats();
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      isLoading = false;
    }
  });
  
  async function fetchCommentStats() {
    // Get all comments
    const commentsRef = collection(db, 'comments');
    const commentsQuery = query(commentsRef);
    const commentsSnapshot = await getDocs(commentsQuery);
    
    const comments = commentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Group comments by post ID
    const byPost: Record<string, number> = {};
    comments.forEach(comment => {
      const postId = comment.postId;
      if (!byPost[postId]) {
        byPost[postId] = 0;
      }
      byPost[postId]++;
    });
    
    commentStats = {
      totalCount: comments.length,
      byPost
    };
  }
  
  async function fetchLikeStats() {
    // Get all likes
    const likesRef = collection(db, 'postLikes');
    const likesQuery = query(likesRef);
    const likesSnapshot = await getDocs(likesQuery);
    
    const likes = likesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Group likes by post ID
    const byPost: Record<string, number> = {};
    likes.forEach(like => {
      const postId = like.postId;
      if (!byPost[postId]) {
        byPost[postId] = 0;
      }
      byPost[postId]++;
    });
    
    likeStats = {
      totalCount: likes.length,
      byPost
    };
  }
</script>

<svelte:head>
  <title>Blog Stats | Admin</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Blog Statistics</h1>
  
  {#if isLoading}
    <div class="flex justify-center py-8">
      <LoadingSpinner />
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Comment Stats -->
      <div class="border rounded-lg p-6 shadow-sm">
        <h2 class="text-xl font-semibold mb-4">Comment Statistics</h2>
        <p class="text-2xl font-bold mb-6">Total Comments: {commentStats.totalCount}</p>
        
        <h3 class="text-lg font-medium mb-2">Comments by Post:</h3>
        {#if Object.keys(commentStats.byPost).length === 0}
          <p class="text-muted-foreground">No comments found.</p>
        {:else}
          <ul class="space-y-2">
            {#each Object.entries(commentStats.byPost) as [postId, count]}
              <li class="border-b pb-2">
                <div class="flex justify-between">
                  <span class="font-medium truncate" title={postId}>{postId}</span>
                  <span class="font-bold">{count}</span>
                </div>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
      
      <!-- Like Stats -->
      <div class="border rounded-lg p-6 shadow-sm">
        <h2 class="text-xl font-semibold mb-4">Like Statistics</h2>
        <p class="text-2xl font-bold mb-6">Total Likes: {likeStats.totalCount}</p>
        
        <h3 class="text-lg font-medium mb-2">Likes by Post:</h3>
        {#if Object.keys(likeStats.byPost).length === 0}
          <p class="text-muted-foreground">No likes found.</p>
        {:else}
          <ul class="space-y-2">
            {#each Object.entries(likeStats.byPost) as [postId, count]}
              <li class="border-b pb-2">
                <div class="flex justify-between">
                  <span class="font-medium truncate" title={postId}>{postId}</span>
                  <span class="font-bold">{count}</span>
                </div>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  {/if}
</div>