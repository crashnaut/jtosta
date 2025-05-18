<script lang="ts">
  import { onMount } from 'svelte';
  import { user } from '$lib/firebase/auth';
  import { likePost, unlikePost, hasUserLikedPost, getLikeCount } from '$lib/firebase/likes';
  import { openAuthModal } from '$lib/stores/auth-modal';
  
  export let postId: string;
  
  let likeCount = 0;
  let hasLiked = false;
  let isLoading = true;
  
  onMount(async () => {
    await loadLikeData();
  });
  
  async function loadLikeData() {
    isLoading = true;
    try {
      // Load data in parallel
      const [count, userLiked] = await Promise.all([
        getLikeCount(postId),
        $user ? hasUserLikedPost(postId) : false
      ]);
      
      likeCount = count;
      hasLiked = userLiked;
    } catch (error) {
      console.error('Error loading like data:', error);
    } finally {
      isLoading = false;
    }
  }
  
  async function toggleLike() {
    if (!$user) {
      // Open auth modal instead of redirecting
      openAuthModal(window.location.pathname);
      return;
    }
    
    try {
      if (hasLiked) {
        await unlikePost(postId);
        likeCount = Math.max(0, likeCount - 1);
        hasLiked = false;
      } else {
        await likePost(postId);
        likeCount = likeCount + 1;
        hasLiked = true;
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }
</script>

<div class="flex items-center gap-2">
  <button
    on:click={toggleLike}
    disabled={isLoading}
    class="flex items-center gap-1 text-sm transition-colors {hasLiked ? 'text-rose-500' : 'text-muted-foreground hover:text-rose-500'}"
    aria-label={hasLiked ? 'Unlike this post' : 'Like this post'}
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill={hasLiked ? "currentColor" : "none"}
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      class="transition-all {hasLiked ? 'scale-110' : ''}"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
    <span class="font-medium">{likeCount}</span>
  </button>
</div>