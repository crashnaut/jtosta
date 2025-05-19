<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { uploadImage } from '$lib/firebase/storage';
  import { X, Upload, Image } from 'lucide-svelte';
  
  export let imageUrl: string = '';
  export let label: string = 'Imagem de capa';
  export let uploadPath: string = 'blog-covers';
  export let disabled: boolean = false;
  
  const dispatch = createEventDispatcher<{
    change: { url: string };
    error: { message: string };
    loading: { status: boolean };
  }>();
  
  let isLoading = false;
  let error = '';
  let fileInput: HTMLInputElement;
  
  async function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      error = 'Por favor, selecione uma imagem válida.';
      dispatch('error', { message: error });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      error = 'A imagem não pode ser maior que 5MB.';
      dispatch('error', { message: error });
      return;
    }
    
    try {
      error = '';
      isLoading = true;
      dispatch('loading', { status: true });
      
      const url = await uploadImage(file, uploadPath);
      imageUrl = url;
      
      dispatch('change', { url });
    } catch (err) {
      console.error('Error uploading image:', err);
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = 'Ocorreu um erro ao fazer o upload da imagem.';
      }
      dispatch('error', { message: error });
    } finally {
      isLoading = false;
      dispatch('loading', { status: false });
    }
  }
  
  function handleRemoveImage() {
    imageUrl = '';
    dispatch('change', { url: '' });
    
    // Reset file input
    if (fileInput) {
      fileInput.value = '';
    }
  }
  
  function openFileSelector() {
    if (!disabled && fileInput) {
      fileInput.click();
    }
  }
</script>

<div class="w-full space-y-2">
  <label class="block text-sm font-medium text-gray-700">
    {label}
  </label>
  
  {#if imageUrl}
    <div class="relative w-full max-w-md h-48 rounded-md overflow-hidden border border-gray-200">
      <img 
        src={imageUrl} 
        alt="Preview" 
        class="w-full h-full object-cover"
      />
      <button 
        type="button"
        on:click={handleRemoveImage}
        class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label="Remover imagem"
        disabled={disabled}
      >
        <X class="h-4 w-4" />
      </button>
    </div>
  {:else}
    <div 
      class="flex flex-col items-center justify-center w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
      on:click={openFileSelector}
      on:keydown={(e) => e.key === 'Enter' && openFileSelector()}
      tabindex="0"
      role="button"
      aria-label="Clique para fazer upload de uma imagem"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        {#if isLoading}
          <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p class="mt-2 text-sm text-gray-500">Carregando...</p>
        {:else}
          <Image class="h-10 w-10 text-gray-400" />
          <p class="mt-2 text-sm text-gray-500">Clique para upload</p>
          <p class="text-xs text-gray-400">PNG, JPG, WEBP até 5MB</p>
        {/if}
      </div>
    </div>
  {/if}
  
  {#if error}
    <p class="text-sm text-red-500">{error}</p>
  {/if}
  
  <input
    bind:this={fileInput}
    type="file"
    class="hidden"
    accept="image/*"
    on:change={handleFileChange}
    disabled={disabled || isLoading}
  />
</div>