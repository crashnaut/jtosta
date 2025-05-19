<script lang="ts">
  import { onMount } from 'svelte';
  import { collection, getDocs, query, orderBy } from 'firebase/firestore';
  import { db } from '$lib/firebase/config';
  import type { BlogPost } from '$lib/firebase/blog';
  import { deleteBlogPost } from '$lib/firebase/blog';
  
  let posts: BlogPost[] = [];
  let isLoading = true;
  let error: string | null = null;
  
  // Load all blog posts from Firestore
  onMount(async () => {
    try {
      isLoading = true;
      error = null;
      
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, orderBy('updatedAt', 'desc'));
      const snapshot = await getDocs(q);
      
      posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      error = 'Erro ao carregar os artigos do blog. Por favor, tente novamente mais tarde.';
    } finally {
      isLoading = false;
    }
  });
  
  // Format date for display
  function formatDate(dateString: string) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }
  
  // Delete a blog post
  async function handleDelete(post: BlogPost) {
    if (!confirm(`Tem certeza que deseja excluir o artigo "${post.title}"? Esta ação não pode ser desfeita.`)) {
      return;
    }
    
    try {
      await deleteBlogPost(post.id);
      posts = posts.filter(p => p.id !== post.id);
    } catch (err) {
      console.error('Error deleting blog post:', err);
      alert('Erro ao excluir o artigo. Por favor, tente novamente.');
    }
  }
</script>

<svelte:head>
  <title>Gerenciar Blog - J. Tosta</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex justify-between items-center border-b pb-4 mb-4">
    <div>
      <h1 class="text-2xl font-bold">Gerenciar Blog</h1>
      <p class="text-gray-600">Gerencie os artigos do blog</p>
    </div>
    
    <a 
      href="/admin/blog/new" 
      class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
    >
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      Novo Artigo
    </a>
  </div>
  
  {#if isLoading}
    <div class="flex justify-center py-8">
      <svg class="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  {:else if error}
    <div class="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
      {error}
    </div>
  {:else if posts.length === 0}
    <div class="bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-4">
      Nenhum artigo encontrado. Clique em "Novo Artigo" para criar seu primeiro artigo de blog.
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Título
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each posts as post}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  {#if post.imageUrl}
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-md object-cover" src={post.imageUrl} alt={post.imageHint || post.title} />
                    </div>
                  {/if}
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{post.title}</div>
                    <div class="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(post.date)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                {#if post.published !== false}
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Publicado
                  </span>
                {:else}
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    Rascunho
                  </span>
                {/if}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-3">
                  <a 
                    href={`/blog/${post.id}`} 
                    class="text-primary hover:text-primary-dark" 
                    title="Visualizar"
                    aria-label={`Visualizar ${post.title}`}
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </a>
                  <a 
                    href={`/admin/blog/edit/${post.id}`} 
                    class="text-blue-600 hover:text-blue-800" 
                    title="Editar"
                    aria-label={`Editar ${post.title}`}
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </a>
                  <button 
                    on:click={() => handleDelete(post)} 
                    class="text-red-600 hover:text-red-800" 
                    title="Excluir"
                    aria-label={`Excluir ${post.title}`}
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>