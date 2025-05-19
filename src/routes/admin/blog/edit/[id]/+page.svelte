<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { getBlogPost, updateBlogPost } from '$lib/firebase/blog';
  import type { BlogPost } from '$lib/firebase/blog';
  
  // Get post ID from URL
  const postId = $page.params.id;
  
  let post: BlogPost | null = null;
  let isLoading = true;
  let isSubmitting = false;
  let error: string | null = null;
  let showPreview = false;
  let originalSlug = '';
  
  // Form data
  let title = '';
  let slug = '';
  let excerpt = '';
  let content = '';
  let imageUrl = '';
  let imageHint = '';
  let published = true;
  
  onMount(async () => {
    try {
      isLoading = true;
      error = null;
      
      // Load post data
      post = await getBlogPost(postId);
      
      if (!post) {
        error = 'Artigo não encontrado.';
        return;
      }
      
      // Set form values
      title = post.title;
      slug = post.id;
      originalSlug = post.id;
      excerpt = post.excerpt;
      content = post.content;
      imageUrl = post.imageUrl;
      imageHint = post.imageHint;
      published = post.published !== false; // Default to true if not set
      
    } catch (err) {
      console.error('Error loading blog post:', err);
      error = 'Erro ao carregar o artigo. Por favor, tente novamente.';
    } finally {
      isLoading = false;
    }
  });
  
  // Auto-generate slug from title if it's a new title
  $: {
    if (title && !userEditedSlug && title !== post?.title) {
      slug = title
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w-]/g, '') // Remove special characters
        .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
    }
  }
  
  let userEditedSlug = false;
  function handleSlugInput() {
    userEditedSlug = true;
  }
  
  // Images the user can choose from
  const availableImages = [
    { url: '/photos/mindfulness.jpg', hint: 'Pessoa meditando em posição de mindfulness' },
    { url: '/photos/treat_anx.jpg', hint: 'Pessoa mostrando ansiedade' },
    { url: '/photos/DSC08714.jpg', hint: 'Foto Jaqueline Tosta' },
    { url: '/photos/DSC08824.jpg', hint: 'Foto Jaqueline Tosta' },
    { url: '/photos/DSC08829.jpg', hint: 'Foto Jaqueline Tosta' },
    { url: '/photos/compentet.jpeg', hint: 'Competência e empatia' }
  ];
  
  // Select an image from the available images
  function selectImage(img: { url: string, hint: string }) {
    imageUrl = img.url;
    imageHint = img.hint;
  }
  
  async function handleSubmit() {
    try {
      isSubmitting = true;
      error = null;
      
      if (!title || !excerpt || !content) {
        error = 'Por favor, preencha todos os campos obrigatórios.';
        isSubmitting = false;
        return;
      }
      
      const updateData: Partial<BlogPost> = {
        title,
        content,
        excerpt,
        imageUrl,
        imageHint: imageHint || 'Imagem relacionada ao artigo',
        published
      };
      
      // If the slug has changed, we need to create a new post and delete the old one
      if (slug !== originalSlug) {
        // Create the new post with the updated slug
        const newPost: Omit<BlogPost, 'id'> = {
          ...post!,
          ...updateData,
          id: slug
        };
        
        // Here we're directly updating instead of creating a new post and 
        // deleting the old one for simplicity. In a more complex system,
        // you might want to handle slug changes differently.
        
        // For now, just update the post with the original ID.
        // In a real system, you might want to:
        // 1. Create a new post with the new slug
        // 2. Delete the old post
        // 3. Set up a redirect from the old URL to the new one
        updateData.id = slug;
      }
      
      // Update the post
      await updateBlogPost(postId, updateData);
      
      // If the slug changed, redirect to the edit page for the new slug
      if (slug !== originalSlug) {
        goto(`/admin/blog/edit/${slug}`);
      } else {
        // Reload the page to show the updated data
        window.location.reload();
      }
      
    } catch (err) {
      console.error('Error updating blog post:', err);
      error = 'Erro ao atualizar o artigo. Por favor, tente novamente.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Editar Artigo - J. Tosta</title>
</svelte:head>

<div class="space-y-8">
  <div class="border-b pb-4 mb-4 flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold">Editar Artigo</h1>
      <p class="text-gray-600">Edite o artigo "{post?.title || ''}"</p>
    </div>
    
    <div class="flex space-x-3">
      <a 
        href={`/blog/${postId}`} 
        target="_blank"
        class="px-3 py-2 border rounded bg-white border-gray-200 hover:bg-gray-50"
      >
        Ver Publicado
      </a>
      <button 
        on:click={() => showPreview = !showPreview}
        class="px-3 py-2 border rounded {showPreview ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'}"
      >
        {showPreview ? 'Editar' : 'Visualizar'}
      </button>
    </div>
  </div>
  
  {#if error}
    <div class="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
      {error}
    </div>
  {/if}
  
  {#if isLoading}
    <div class="flex justify-center py-8">
      <svg class="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  {:else if !post}
    <div class="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
      Artigo não encontrado.
    </div>
  {:else if !showPreview}
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <!-- Title -->
      <div class="space-y-1">
        <label for="title" class="block text-sm font-medium text-gray-700">Título *</label>
        <input 
          type="text" 
          id="title" 
          bind:value={title} 
          required
          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          placeholder="Título do artigo"
        />
      </div>
      
      <!-- Slug -->
      <div class="space-y-1">
        <label for="slug" class="block text-sm font-medium text-gray-700">Slug URL *</label>
        <div class="flex rounded-md shadow-sm">
          <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            /blog/
          </span>
          <input 
            type="text" 
            id="slug" 
            bind:value={slug} 
            on:input={handleSlugInput}
            required
            class="flex-1 min-w-0 block w-full border-gray-300 rounded-none rounded-r-md focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="url-do-artigo"
          />
        </div>
        <p class="text-sm text-gray-500 mt-1">
          O slug é usado na URL do artigo. Use apenas letras minúsculas, números e hífens.
        </p>
        
        {#if slug !== originalSlug}
          <p class="text-sm text-yellow-600 mt-2">
            <svg class="w-4 h-4 inline-block -mt-1 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            Atenção: Alterar o slug pode quebrar links existentes para este artigo.
          </p>
        {/if}
      </div>
      
      <!-- Excerpt -->
      <div class="space-y-1">
        <label for="excerpt" class="block text-sm font-medium text-gray-700">Resumo *</label>
        <textarea 
          id="excerpt" 
          bind:value={excerpt} 
          required
          rows="2"
          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          placeholder="Um breve resumo do artigo (2-3 frases)"
        ></textarea>
      </div>
      
      <!-- Content -->
      <div class="space-y-1">
        <label for="content" class="block text-sm font-medium text-gray-700">Conteúdo *</label>
        <textarea 
          id="content" 
          bind:value={content} 
          required
          rows="15"
          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm font-mono"
          placeholder="Conteúdo do artigo em formato Markdown"
        ></textarea>
        <p class="text-sm text-gray-500 mt-1">
          O conteúdo usa formatação <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" class="text-primary hover:underline">Markdown</a>. 
          Use # para títulos, ** para negrito, * para itálico, etc.
        </p>
      </div>
      
      <!-- Featured Image -->
      <div class="space-y-4">
        <div>
          <span id="featured-image-label" class="block text-sm font-medium text-gray-700">Imagem em Destaque</span>
        </div>
        
        {#if imageUrl}
          <div class="mt-2 relative rounded-lg overflow-hidden h-48 bg-gray-100">
            <img src={imageUrl} alt={imageHint} class="w-full h-full object-cover" />
          </div>
          <div class="mt-1">
            <label for="imageHint" class="block text-sm font-medium text-gray-700">Descrição da Imagem (Acessibilidade)</label>
            <input 
              type="text" 
              id="imageHint" 
              bind:value={imageHint} 
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Descrição da imagem para leitores de tela"
            />
          </div>
        {/if}
        
        <div class="mt-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Escolha uma imagem:</h4>
          <div class="grid grid-cols-3 gap-4">
            {#each availableImages as img}
              <button 
                type="button"
                on:click={() => selectImage(img)}
                class="relative rounded-lg overflow-hidden h-24 bg-gray-100 border-2 {imageUrl === img.url ? 'border-primary' : 'border-transparent'}"
              >
                <img src={img.url} alt={img.hint} class="w-full h-full object-cover" />
              </button>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Publishing Options -->
      <div class="space-y-2">
        <div class="flex items-center">
          <input 
            type="checkbox" 
            id="published" 
            bind:checked={published}
            class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label for="published" class="ml-2 block text-sm text-gray-700">
            Publicado
          </label>
        </div>
        <p class="text-sm text-gray-500">
          Desmarque esta opção para salvar como rascunho.
        </p>
      </div>
      
      <!-- Submit Buttons -->
      <div class="flex justify-end space-x-3 pt-4 border-t">
        <a 
          href="/admin/blog"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Cancelar
        </a>
        <button 
          type="submit"
          disabled={isSubmitting}
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if isSubmitting}
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Salvando...
          {:else}
            Atualizar Artigo
          {/if}
        </button>
      </div>
    </form>
  {:else}
    <!-- Preview Mode -->
    <div class="prose max-w-none">
      <h1>{title || 'Título do Artigo'}</h1>
      
      {#if imageUrl}
        <div class="my-4">
          <img src={imageUrl} alt={imageHint || 'Imagem do artigo'} class="w-full rounded-lg" />
        </div>
      {/if}
      
      <div class="text-lg font-medium text-gray-600 mb-8">
        {excerpt || 'Aqui aparecerá o resumo do artigo...'}
      </div>
      
      {#if content}
        <!-- Basic markdown rendering for preview -->
        {#each content.split('\n\n') as paragraph}
          {#if paragraph.startsWith('# ')}
            <h1 class="text-3xl font-bold mt-8 mb-4">{paragraph.replace('# ', '')}</h1>
          {:else if paragraph.startsWith('## ')}
            <h2 class="text-2xl font-bold mt-6 mb-3">{paragraph.replace('## ', '')}</h2>
          {:else if paragraph.startsWith('### ')}
            <h3 class="text-xl font-bold mt-5 mb-2">{paragraph.replace('### ', '')}</h3>
          {:else if paragraph.startsWith('- ')}
            <ul class="list-disc list-inside mb-4">
              {#each paragraph.split('\n- ') as item}
                {#if item}
                  <li class="mb-1">{item.replace('- ', '')}</li>
                {/if}
              {/each}
            </ul>
          {:else}
            <p class="mb-4">{paragraph}</p>
          {/if}
        {/each}
      {:else}
        <p class="text-gray-500 italic">Sem conteúdo para visualizar...</p>
      {/if}
    </div>
  {/if}
</div>