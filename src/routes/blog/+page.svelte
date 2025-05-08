<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Image from '$lib/components/image.svelte';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';
	import type { BlogPost } from '$lib/types/blog';
	import type { PageData } from './$types';

	export let data: PageData;
	let isLoading = false;

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
							<time class="text-sm text-muted-foreground" datetime={post.date}>
								{new Date(post.date).toLocaleDateString('pt-BR', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
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
