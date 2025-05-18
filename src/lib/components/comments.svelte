<script lang="ts">
  import { onMount } from 'svelte';
  import { user } from '$lib/firebase/auth';
  import { getComments, addComment, deleteComment, editComment } from '$lib/firebase/comments';
  import type { Comment } from '$lib/types/blog';
  import LoadingSpinner from './loading-spinner.svelte';

  export let postId: string;
  
  let comments: Comment[] = [];
  let newCommentText = '';
  let isLoading = true;
  let isSubmitting = false;
  let error = '';
  
  // Modal state variables
  let showModal = false;
  let selectedComment: Comment | null = null;
  let editedCommentText = '';
  let tempSavedText = '';
  let isEditing = false;

  onMount(async () => {
    await loadComments();
    // Check for temporarily saved content in local storage
    const savedContent = localStorage.getItem(`temp_comment_${postId}`);
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        if (parsed.commentId && parsed.content) {
          tempSavedText = parsed.content;
        }
      } catch (e) {
        console.error('Failed to parse saved comment content', e);
      }
    }
  });

  async function loadComments() {
    isLoading = true;
    error = '';
    
    try {
      comments = await getComments(postId);
    } catch (err) {
      error = 'Failed to load comments. Please try again later.';
      console.error(err);
    } finally {
      isLoading = false;
    }
  }

  async function handleSubmitComment() {
    if (!newCommentText.trim() || isSubmitting) return;
    
    isSubmitting = true;
    error = '';
    
    try {
      await addComment({ postId, content: newCommentText });
      newCommentText = '';
      await loadComments(); // Reload comments
    } catch (err) {
      error = 'Failed to add comment. Please try again later.';
      console.error(err);
    } finally {
      isSubmitting = false;
    }
  }
  
  function openCommentModal(comment: Comment) {
    selectedComment = comment;
    // Check if we have temporarily saved content for this comment
    const savedContent = localStorage.getItem(`temp_comment_${postId}`);
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        if (parsed.commentId === comment.id) {
          editedCommentText = parsed.content;
        } else {
          editedCommentText = comment.content;
        }
      } catch (e) {
        editedCommentText = comment.content;
      }
    } else {
      editedCommentText = comment.content;
    }
    showModal = true;
    // Start in editing mode immediately
    isEditing = true;
  }
  
  function closeModal() {
    showModal = false;
    selectedComment = null;
    editedCommentText = '';
  }
  
  function startEditing() {
    isEditing = true;
  }

  async function handleEditComment() {
    if (!selectedComment || !editedCommentText.trim() || isSubmitting) return;
    
    isSubmitting = true;
    error = '';
    
    try {
      await editComment(selectedComment.id, editedCommentText);
      // Remove the temporary saved content
      localStorage.removeItem(`temp_comment_${postId}`);
      await loadComments(); // Reload comments
      closeModal();
    } catch (err) {
      error = 'Failed to edit comment. Please try again later.';
      console.error(err);
    } finally {
      isSubmitting = false;
      isEditing = false;
    }
  }
  
  async function handleDeleteComment(commentId: string) {
    try {
      await deleteComment(commentId, postId);
      // Remove the temporary saved content if it exists for this comment
      const savedContent = localStorage.getItem(`temp_comment_${postId}`);
      if (savedContent) {
        try {
          const parsed = JSON.parse(savedContent);
          if (parsed.commentId === commentId) {
            localStorage.removeItem(`temp_comment_${postId}`);
          }
        } catch (e) {
          console.error('Failed to parse saved comment content', e);
        }
      }
      closeModal();
      await loadComments(); // Reload comments
    } catch (err) {
      error = 'Failed to delete comment. Please try again later.';
      console.error(err);
    }
  }
  
  function saveTextTemporarily() {
    if (selectedComment && editedCommentText) {
      localStorage.setItem(`temp_comment_${postId}`, JSON.stringify({
        commentId: selectedComment.id,
        content: editedCommentText,
        timestamp: new Date().toISOString()
      }));
    }
  }
  
  function cancelEditing() {
    if (editedCommentText !== selectedComment?.content) {
      saveTextTemporarily();
    }
    isEditing = false;
    closeModal();
  }

  // Handle beforeunload event to clear temporary content if user navigates away
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      if (tempSavedText) {
        localStorage.removeItem(`temp_comment_${postId}`);
      }
    });
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<section class="my-8 max-w-3xl mx-auto">
  <h2 class="text-2xl font-bold mb-6">Comentários ({comments.length})</h2>
  
  {#if $user}
    <div class="mb-8">
      <form on:submit|preventDefault={handleSubmitComment} class="space-y-4">
        <div>
          <label for="comment" class="block mb-2 text-sm font-medium">Deixe seu comentário</label>
          <textarea
            id="comment"
            bind:value={newCommentText}
            rows="4"
            class="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-primary"
            placeholder="Escreva seu comentário aqui..."
            disabled={isSubmitting}
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !newCommentText.trim()}
            class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Comentário'}
          </button>
        </div>
      </form>
    </div>
  {:else}
    <div class="mb-8 p-4 bg-muted rounded-lg">
      <p class="text-center">
        <a href="/auth" class="text-primary hover:underline">Faça login</a> para deixar um comentário.
      </p>
    </div>
  {/if}

  {#if error}
    <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
      {error}
    </div>
  {/if}

  <div class="space-y-6">
    {#if isLoading}
      <div class="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    {:else if comments.length === 0}
      <p class="text-center text-muted-foreground py-8">Seja o primeiro a comentar neste artigo!</p>
    {:else}
      {#each comments as comment (comment.id)}
        <div class="p-4 border rounded-lg">
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                {comment.userDisplayName?.charAt(0) || 'A'}
              </div>
              <div>
                <p class="font-medium">{comment.userDisplayName || 'Anônimo'}</p>
                <p class="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
              </div>
            </div>
            {#if $user && $user.uid === comment.userId}
              <button
                on:click={() => openCommentModal(comment)}
                class="text-xs px-2 py-1 rounded-md bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
              >
                Excluir
              </button>
            {/if}
          </div>
          <p class="text-sm whitespace-pre-line">{comment.content}</p>
        </div>
      {/each}
    {/if}
  </div>
</section>

<!-- Comment Action Modal -->
{#if showModal && selectedComment}
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg max-w-md w-full p-6 relative shadow-xl">
      <button 
        on:click={closeModal}
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <h3 class="text-lg font-bold mb-4">Opções do Comentário</h3>
      
      <div class="mb-4">
        <label for="edit-comment" class="block mb-2 text-sm font-medium">Editar comentário</label>
        <textarea
          id="edit-comment"
          bind:value={editedCommentText}
          rows="4"
          class="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-primary"
          disabled={isSubmitting}
        ></textarea>
      </div>
      
      <div class="flex justify-end space-x-2">
        <button
          on:click={() => handleDeleteComment(selectedComment.id)}
          class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
          disabled={isSubmitting}
        >
          Excluir
        </button>
        
        <button
          on:click={closeModal}
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        
        <button
          on:click={handleEditComment}
          class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
          disabled={isSubmitting || !editedCommentText.trim()}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  </div>
{/if}

{#if tempSavedText && selectedComment}
  <div class="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-md shadow-md">
    <p class="text-sm">Você tem um rascunho salvo para este comentário.</p>
    <div class="mt-2 flex space-x-2">
      <button
        on:click={() => {
          if (selectedComment) {
            openCommentModal(selectedComment);
            isEditing = true;
          }
        }}
        class="text-xs px-2 py-1 bg-yellow-500 text-white rounded"
      >
        Continuar editando
      </button>
      <button
        on:click={() => {
          localStorage.removeItem(`temp_comment_${postId}`);
          tempSavedText = '';
        }}
        class="text-xs px-2 py-1 bg-gray-200 rounded"
      >
        Descartar
      </button>
    </div>
  </div>
{/if}