<script lang="ts">
	import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';
	import SEO from '$lib/components/seo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	// TODO: Implement authentication check later for comments
	const isAuthenticated = false;
</script>

<SEO
	title="Blog - J. Tosta | Reflexões sobre Saúde Mental e Bem-estar"
	description="Artigos e reflexões sobre psicologia, saúde mental, terapia e desenvolvimento pessoal por Jaqueline Tosta."
/>

{#if !data}
	<div class="container mx-auto flex min-h-[50vh] items-center justify-center px-4">
		<LoadingSpinner size="lg" />
	</div>
{:else}
	<div class="container mx-auto px-4 py-12 md:py-20">
		<h1 class="mb-10 text-center text-4xl font-bold text-primary md:text-5xl">Blog J. Tosta</h1>
		<p class="mb-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
			Reflexões, insights e dicas sobre saúde mental, psicoterapia e bem-estar.
		</p>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post (post.id)}
				<div
					class="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300"
				>
					<div class="p-0">
						<img
							src={post.imageUrl}
							alt={post.title}
							class="aspect-[3/2] w-full object-cover"
							data-ai-hint={post.imageHint}
						/>
					</div>
					<div class="flex-1 p-6">
						<h2 class="mb-2 text-xl leading-tight">
							<a href={`/blog/${post.id}`} class="hover:text-primary transition-colors">
								{post.title}
							</a>
						</h2>
						<p class="mb-4 text-sm line-clamp-3 text-muted-foreground">
							{post.excerpt}
						</p>
						<div class="flex items-center text-xs text-muted-foreground">
							<div
								class="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground mr-2"
							>
								{post.author[0]}
							</div>
							<span>{post.author} &middot; {post.date}</span>
						</div>
					</div>
					<div class="flex justify-between items-center p-6 pt-0">
						<a href={`/blog/${post.id}`} class="text-sm text-primary hover:underline"> Ler mais </a>
						<div class="flex items-center text-sm text-muted-foreground">
							<MessageCircle class="h-4 w-4 mr-1" />
							{post.commentsCount}
						</div>
					</div>
				</div>
			{/each}
		</div>

		{#if data.pagination.totalPages > 1}
			<div class="mt-12 flex justify-center items-center space-x-4">
				<a
					href={`/blog?page=${data.pagination.page - 1}`}
					class="inline-flex items-center justify-center rounded-md border border-input bg-background p-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
					class:pointer-events-none={!data.pagination.hasPrevPage}
					class:opacity-50={!data.pagination.hasPrevPage}
					aria-disabled={!data.pagination.hasPrevPage}
				>
					<ChevronLeft class="h-4 w-4" />
					<span class="sr-only">Página Anterior</span>
				</a>

				<span class="text-sm text-muted-foreground">
					Página {data.pagination.page} de {data.pagination.totalPages}
				</span>

				<a
					href={`/blog?page=${data.pagination.page + 1}`}
					class="inline-flex items-center justify-center rounded-md border border-input bg-background p-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
					class:pointer-events-none={!data.pagination.hasNextPage}
					class:opacity-50={!data.pagination.hasNextPage}
					aria-disabled={!data.pagination.hasNextPage}
				>
					<ChevronRight class="h-4 w-4" />
					<span class="sr-only">Próxima Página</span>
				</a>
			</div>
		{/if}

		{#if !isAuthenticated}
			<div class="mt-16 text-center text-muted-foreground">
				<p>Faça login para deixar comentários nos artigos.</p>
			</div>
		{/if}
	</div>
{/if}
