<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { createBlogPost } from '$lib/firebase/blog';
  import type { BlogPost } from '$lib/firebase/blog';
  import ImageUpload from '$lib/components/image-upload.svelte';
  
  let isSubmitting = false;
  let error: string | null = null;
  let showPreview = false;
  
  // Form data
  let title = '';
  let slug = '';
  let excerpt = '';
  let content = '';
  let imageUrl = '';
  let imageHint = '';
  let published = true;
  
  // Auto-generate slug from title
  $: {
    if (title && !userEditedSlug) {
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
  
  // Handle image upload
  function handleImageChange(event: CustomEvent<{url: string}>) {
    imageUrl = event.detail.url;
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
      
      const today = new Date().toISOString().split('T')[0];
      
      const blogPost: Omit<BlogPost, 'id'> = {
        title,
        content,
        excerpt,
        author: 'Jaqueline Tosta',
        date: today,
        imageUrl,
        imageHint: imageHint || 'Imagem relacionada ao artigo',
        published,
        id: slug // Used by createBlogPost to set the document ID
      };
      
      const result = await createBlogPost(blogPost);
      
      // Redirect to the edit page for the new post
      goto(`/admin/blog/edit/${result.id}`);
      
    } catch (err) {
      console.error('Error creating blog post:', err);
      error = 'Erro ao criar o artigo. Por favor, tente novamente.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Novo Artigo - J. Tosta</title>
</svelte:head>

<div class="space-y-8">
  <div class="border-b pb-4 mb-4 flex justify-between items-center">
    <div>
      <h1 class="text-2xl font-bold">Novo Artigo</h1>
      <p class="text-gray-600">Crie um novo artigo para o blog</p>
    </div>
    
    <div class="flex space-x-3">
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
  
  {#if !showPreview}
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
      
      <!-- Featured Image Upload Component -->
      <div class="space-y-4">
        <div>
          <span id="featured-image-label" class="block text-sm font-medium text-gray-700">Imagem em Destaque</span>
        </div>
        
        <ImageUpload 
          bind:imageUrl={imageUrl} 
          label="Imagem de Capa" 
          uploadPath="blog-covers"
          on:change={handleImageChange}
          disabled={isSubmitting}
        />
        
        {#if imageUrl}
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
            Publicar imediatamente
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
            Salvar Artigo
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