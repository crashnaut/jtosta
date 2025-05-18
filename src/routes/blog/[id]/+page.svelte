<script lang="ts">
	import Image from '$lib/components/image.svelte';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';
	import SEO from '$lib/components/seo.svelte';
	import Comments from '$lib/components/comments.svelte'; 
	import LikeButton from '$lib/components/like-button.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { getPostStats } from '$lib/firebase/post-stats';

	export let data: PageData;
	
	let stats = {
		likeCount: Math.max(0, data.post.likeCount || 0),
		commentCount: Math.max(0, data.post.commentCount || 0)
	};
	
	onMount(async () => {
		if (browser) {
			try {
				// Fetch the latest stats from Firebase
				const latestStats = await getPostStats(data.post.id);
				stats = {
					likeCount: Math.max(0, latestStats.likeCount),
					commentCount: Math.max(0, latestStats.commentCount)
				};
			} catch (error) {
				console.error('Error fetching post stats:', error);
			}
		}
	});
	
	const post = data.post;
</script>

{#if $page.error}
	<div class="container mx-auto flex h-[60vh] items-center justify-center px-4">
		<div class="text-center">
			<h1 class="mb-4 text-2xl font-bold">Erro ao carregar o artigo</h1>
			<p class="text-muted-foreground">{$page.error.message}</p>
			<a href="/blog" class="mt-4 inline-block text-primary hover:underline">← Voltar para o Blog</a>
		</div>
	</div>
{:else if !post}
	<div class="container mx-auto flex h-[60vh] items-center justify-center px-4">
		<LoadingSpinner size="lg" />
	</div>
{:else}
	<SEO
		title={`${post.title} | J. Tosta`}
		description={post.excerpt}
		ogImage={post.imageUrl}
		type="article"
	/>

	<article class="container mx-auto px-4 py-12">
		<header class="mb-8">
			<h1 class="mb-4 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">{post.title}</h1>
			<p class="mb-4 text-base lg:text-lg text-muted-foreground">{post.excerpt}</p>
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<span class="text-sm text-muted-foreground">Por {post.author}</span>
					<time class="text-sm text-muted-foreground" datetime={post.date}>
						{new Date(post.date).toLocaleDateString('pt-BR', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</time>
				</div>
				
				<LikeButton postId={post.id} />
			</div>
		</header>

		<div class="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
			<Image
				src={post.imageUrl}
				alt={post.imageHint}
				className="object-cover"
			/>
		</div>

		<div class="prose prose-lg mx-auto max-w-3xl dark:prose-invert">
			{@html post.content}
		</div>

		<div class="mt-8 border-t pt-8">
			<Comments postId={post.id} />
		</div>

		<div class="mt-12 text-center">
			<a href="/blog" class="text-primary hover:underline">← Voltar para o Blog</a>
		</div>
	</article>
{/if}
