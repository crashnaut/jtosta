<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let className = '';

	const sizes = {
		sm: 'h-4 w-4 border-2',
		md: 'h-8 w-8 border-3',
		lg: 'h-12 w-12 border-4'
	};
</script>

<div class="flex items-center justify-center">
	<div
		class="animate-spin rounded-full border-primary border-t-transparent {sizes[size]} {className}"
		role="status"
		aria-label="Loading"
	>
		<span class="sr-only">Loading...</span>
	</div>
</div>
