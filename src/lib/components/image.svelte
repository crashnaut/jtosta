<script lang="ts">
	export let src: string;
	export let alt: string;
	export let width: string | number | undefined = undefined;
	export let height: string | number | undefined = undefined;
	export let className: string | undefined = undefined;
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let dataAiHint: string | undefined = undefined;

	let hasError = false;

	// Calculate srcset for responsive images
	const generateSrcSet = (url: string): string => {
		const sizes = [320, 640, 768, 1024, 1280];
		if (url.startsWith('https://picsum.photos')) {
			return sizes.map((size) => `${url.split('?')[0]}/${size}/${size} ${size}w`).join(', ');
		}
		return url;
	};

	const srcset = generateSrcSet(src);

	function handleError() {
		hasError = true;
	}
</script>

{#if hasError}
	<div class={`bg-muted flex items-center justify-center ${className ?? ''}`} style="aspect-ratio: 16/9;">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
		</svg>
	</div>
{:else}
	<img
		{src}
		{srcset}
		{alt}
		{loading}
		{width}
		{height}
		class={className}
		data-ai-hint={dataAiHint}
		sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
		on:error={handleError}
		on:load
	/>
{/if}
