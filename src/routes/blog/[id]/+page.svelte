<script lang="ts">
	import { ArrowLeft, MessageCircle } from 'lucide-svelte';
	import LoadingSpinner from '$lib/components/loading-spinner.svelte';
	import SEO from '$lib/components/seo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	// TODO: Implement authentication check later
	const isAuthenticated = false;

	$: post = data?.post;
</script>

{#if !post}
	<div class="container mx-auto flex min-h-[50vh] items-center justify-center px-4">
		<LoadingSpinner size="lg" />
	</div>
{:else}
	<SEO
		title="{post.title} - Blog J. Tosta"
		description={post.excerpt}
		ogImage={post.imageUrl}
		type="article"
	/>

	<div class="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
		<a
			href="/blog"
			class="mb-8 inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
		>
			<ArrowLeft class="mr-2 h-4 w-4" />
			Voltar para o Blog
		</a>

		<article>
			<header class="mb-8">
				<h1 class="mb-4 text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl">
					{post.title}
				</h1>
				<div class="flex items-center text-sm text-muted-foreground">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground mr-2"
					>
						{post.author[0]}
					</div>
					<span>Por {post.author} &middot; {post.date}</span>
				</div>
			</header>

			<img
				src={post.imageUrl}
				alt={post.title}
				class="mb-8 w-full rounded-lg object-cover shadow-md aspect-[2/1]"
				data-ai-hint={post.imageHint}
			/>

			<div
				class="prose prose-lg max-w-none dark:prose-invert text-foreground prose-headings:text-secondary-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
			>
				{@html post.content}
			</div>
		</article>

		<hr class="my-12 border-border" />

		<!-- Comments Section -->
		<section>
			<h2 class="mb-6 text-2xl font-semibold flex items-center">
				<MessageCircle class="mr-2 h-6 w-6 text-primary" /> Comentários ({post.comments.length})
			</h2>

			{#if isAuthenticated}
				<div class="mb-8">
					<textarea
						placeholder="Escreva seu comentário aqui..."
						class="mb-2 w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					></textarea>
					<button
						class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
					>
						Enviar Comentário
					</button>
				</div>
			{:else}
				<div class="mb-8 rounded-md border border-dashed p-4 text-center text-muted-foreground">
					<p>Faça login para deixar um comentário.</p>
				</div>
			{/if}

			<div class="space-y-6">
				{#each post.comments as comment (comment.id)}
					<div class="flex space-x-4">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground"
						>
							{comment.avatarFallback}
						</div>
						<div class="flex-1">
							<div class="flex items-center justify-between">
								<p class="font-semibold text-foreground">{comment.author}</p>
								<p class="text-xs text-muted-foreground">{comment.date}</p>
							</div>
							<p class="mt-1 text-sm text-foreground">{comment.text}</p>
						</div>
					</div>
				{/each}

				{#if post.comments.length === 0}
					<p class="text-sm text-muted-foreground italic">Ainda não há comentários.</p>
				{/if}
			</div>
		</section>
	</div>
{/if}
