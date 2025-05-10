<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	export let src: string;
	export let alt: string;
	export let width: string | number | undefined = undefined;
	export let height: string | number | undefined = undefined;
	export let className: string | undefined = undefined;
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let priority = false; // New prop for high-priority images that should load early
	export let dataAiHint: string | undefined = undefined;

	let hasError = false;
	let isLoaded = false;
	let imageElement: HTMLImageElement;
	let effectiveLoading = loading;

	// Calculate srcset for responsive images
	const generateSrcSet = (url: string): string => {
		// Skip for local images as they don't have dynamic resizing
		if (url.startsWith('/') && !url.startsWith('https://') && !url.startsWith('http://')) {
			return '';
		}
		
		const sizes = [320, 640, 768, 1024, 1280];
		if (url.startsWith('https://picsum.photos')) {
			return sizes.map((size) => `${url.split('?')[0]}/${size}/${size} ${size}w`).join(', ');
		}
		return '';
	};

	const srcset = generateSrcSet(src);

	function handleError() {
		hasError = true;
	}
	
	function handleLoad() {
		isLoaded = true;
	}

	// Preload high priority images
	onMount(() => {
		if (priority && browser) {
			// Set loading to eager for high priority images
			effectiveLoading = 'eager';
			
			// For browsers that support it, we can use fetchpriority
			if (imageElement) {
				// @ts-ignore - fetchpriority is not in all TypeScript DOM definitions yet
				imageElement.fetchPriority = 'high';
			}
		}
	});
</script>

{#if hasError}
	<div class={`bg-muted flex items-center justify-center ${className ?? ''}`} style="aspect-ratio: 16/9;">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
		</svg>
	</div>
{:else}
	<div class={`relative ${!isLoaded ? 'bg-muted/20' : ''} ${className || ''}`}>
		{#if !isLoaded}
			<div class="absolute inset-0 flex items-center justify-center">
				<div class="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
			</div>
		{/if}
		<img
			bind:this={imageElement}
			{src}
			srcset={srcset || undefined}
			{alt}
			loading={effectiveLoading}
			{width}
			{height}
			class={`${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
			data-ai-hint={dataAiHint}
			sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
			on:error={handleError}
			on:load={handleLoad}
			decoding="async"
		/>
	</div>
{/if}
