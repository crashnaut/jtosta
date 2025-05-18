<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Image from '$lib/components/image.svelte';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';
	import type { BlogPost } from '$lib/types/blog';
	import type { PageData } from './$types';
	import { getBatchPostStats } from '$lib/firebase/post-stats';

	export let data: PageData;
	let isLoading = false;
	let postStats: Record<string, { likeCount: number, commentCount: number }> = {};
	let isLoadingStats = true;

	onMount(async () => {
		if (browser && data.posts.length > 0) {
			isLoadingStats = true;
			try {
				const postIds = data.posts.map(post => post.id);
				postStats = await getBatchPostStats(postIds);
			} catch (error) {
				console.error('Error loading post stats:', error);
			} finally {
				isLoadingStats = false;
			}
		}
	});

	async function handlePageChange(newPage: number) {
		if (!browser || isLoading) return;
		isLoading = true;
		
		const params = new URLSearchParams();
		params.set('page', newPage.toString());
		
		await goto(`/blog?${params.toString()}`, {
			invalidateAll: true
		});
		
		isLoading = false;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Blog | J. Tosta</title>
	<meta name="description" content="Artigos sobre psicologia, saúde mental e desenvolvimento pessoal por Jaqueline Tosta." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-4xl font-bold">Blog J. Tosta</h1>

	{#if isLoading}
		<div class="flex h-[400px] items-center justify-center">
			<LoadingSpinner size="lg" />
		</div>
	{:else if data.posts.length === 0}
		<div class="flex h-[400px] flex-col items-center justify-center space-y-4">
			<p class="text-lg text-muted-foreground">Nenhum artigo encontrado.</p>
		</div>
	{:else}
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post (post.id)}
				<a href="/blog/{post.id}" class="group block">
					<article class="relative flex h-full flex-col rounded-lg border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
						<div class="relative aspect-video w-full overflow-hidden rounded-lg">
							<Image
								src={post.imageUrl}
								alt={post.imageHint}
								className="object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>
						<div class="flex flex-1 flex-col space-y-2 pt-4">
							<h2 class="line-clamp-2 text-xl font-semibold text-card-foreground group-hover:text-primary">
								{post.title}
							</h2>
							<p class="line-clamp-2 text-muted-foreground">
								{post.excerpt}
							</p>
							<div class="flex justify-between items-center mt-auto pt-2">
								<time class="text-sm text-muted-foreground" datetime={post.date}>
									{new Date(post.date).toLocaleDateString('pt-BR', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</time>
								
								<div class="flex items-center gap-3">
									<span class="flex items-center gap-1 text-sm text-muted-foreground">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
										</svg>
										{isLoadingStats 
											? Math.max(0, post.likeCount || 0) 
											: Math.max(0, (postStats[post.id]?.likeCount !== undefined) 
													? postStats[post.id].likeCount 
													: (post.likeCount || 0))
										}
									</span>
									
									<span class="flex items-center gap-1 text-sm text-muted-foreground">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
										</svg>
										{isLoadingStats
											? Math.max(0, post.commentCount || 0)
											: Math.max(0, (postStats[post.id]?.commentCount !== undefined)
													? postStats[post.id].commentCount
													: (post.commentCount || 0))
										}
									</span>
								</div>
							</div>
						</div>
					</article>
				</a>
			{/each}
		</div>

		<!-- Pagination -->
		<div class="mt-8 flex items-center justify-center space-x-4">
			{#if data.pagination.hasPrevPage}
				<button
					class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					on:click={() => handlePageChange(data.pagination.page - 1)}
					disabled={isLoading}
				>
					Anterior
				</button>
			{/if}
			{#if data.pagination.hasNextPage}
				<button
					class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					on:click={() => handlePageChange(data.pagination.page + 1)}
					disabled={isLoading}
				>
					Próxima
				</button>
			{/if}
		</div>
	{/if}
</div>
