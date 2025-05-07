<script lang="ts">
	export let title: string = 'J. Tosta - Psicoterapia e Acolhimento Emocional';
	export let description: string =
		'Psicoterapia humanizada e acolhedora com Jaqueline Tosta (CRP 09/21067). Encontre apoio para seu bem-estar emocional.';
	export let ogImage: string = 'https://picsum.photos/1200/630?random=1';
	export let type: string = 'website';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>
