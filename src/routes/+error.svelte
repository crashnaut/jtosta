<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
</script>

<div
	class="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center"
>
	<h1 class="mb-4 text-4xl font-bold text-primary">
		{$page.status}: {$page.error?.message || 'Página não encontrada'}
	</h1>

	{#if dev && $page.error?.stack}
		<pre class="mb-8 max-w-2xl overflow-x-auto rounded bg-muted p-4 text-left text-sm text-muted-foreground">
			{$page.error.stack}
		</pre>
	{:else}
		<p class="mb-8 text-lg text-muted-foreground">
			{#if $page.status === 404}
				Desculpe, mas a página que você está procurando não existe.
			{:else}
				Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.
			{/if}
		</p>
	{/if}

	<a
		href="/"
		class="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90"
	>
		Voltar para a Página Inicial
	</a>
</div>
