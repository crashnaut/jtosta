<script lang="ts">
	export let src: string;
	export let alt: string;
	export let width: number | string = 'auto';
	export let height: number | string = 'auto';
	export let className: string = '';
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let dataAiHint: string | undefined = undefined;

	// Calculate srcset for responsive images
	const generateSrcSet = (url: string): string => {
		const sizes = [320, 640, 768, 1024, 1280];
		if (url.startsWith('https://picsum.photos')) {
			return sizes.map((size) => `${url.split('?')[0]}/${size}/${size} ${size}w`).join(', ');
		}
		return url;
	};

	const srcset = generateSrcSet(src);
</script>

<img
	{src}
	{srcset}
	{alt}
	{loading}
	width={typeof width === 'number' ? width : 'auto'}
	height={typeof height === 'number' ? height : 'auto'}
	class={className}
	data-ai-hint={dataAiHint}
	sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
