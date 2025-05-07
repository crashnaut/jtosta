<script lang="ts">
	import { CheckCircle } from 'lucide-svelte';
	import SEO from '$lib/components/seo.svelte';

	const whatsappLink = `https://wa.me/5562982653996?text=${encodeURIComponent('Olá, Jaqueline! Gostaria de saber mais sobre seus serviços.')}`;
</script>

<SEO
	title="J. Tosta - Psicoterapia e Acolhimento Emocional"
	description="Psicoterapia humanizada com Jaqueline Tosta (CRP 09/21067). Encontre apoio para seu desenvolvimento pessoal e bem-estar emocional."
/>

<div class="flex flex-col">
	<!-- Hero Section -->
	<section class="relative h-[60vh] min-h-[400px] w-full">
		<img
			src="https://picsum.photos/1600/900"
			alt="Paisagem calma e acolhedora"
			class="absolute inset-0 h-full w-full object-cover brightness-75"
			data-ai-hint="calm landscape nature"
		/>
		<div
			class="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-4 text-center text-primary-foreground"
		>
			<h1 class="mb-4 text-4xl font-bold leading-tight drop-shadow-md md:text-5xl lg:text-6xl">
				Cuidar da sua mente é o primeiro passo para cuidar de você.
			</h1>
			<p class="mb-8 max-w-2xl text-lg drop-shadow-sm md:text-xl">
				Este é o espaço onde você pode ser você mesmo, sem julgamentos.
			</p>
			<a
				href={whatsappLink}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center rounded-md bg-[hsl(var(--whatsapp))] px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-[hsl(var(--whatsapp-hover))]"
			>
				Fale comigo no WhatsApp
			</a>
		</div>
	</section>

	<!-- Bio Section -->
	<section id="bio" class="py-16 md:py-24">
		<div class="container mx-auto px-4">
			<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-12">
				<div class="md:col-span-1">
					<img
						src="https://picsum.photos/400/400"
						alt="Psicoterapeuta Jaqueline Tosta"
						class="mx-auto rounded-full shadow-lg"
						width="400"
						height="400"
						data-ai-hint="professional woman portrait psychologist"
					/>
				</div>
				<div class="md:col-span-2">
					<h2 class="mb-4 text-3xl font-semibold text-primary">Psicoterapeuta Jaqueline Tosta</h2>
					<p class="mb-4 text-lg font-medium text-muted-foreground">CRP 09/21067</p>
					<p class="mb-6 text-foreground">
						Olá! Sou Jaqueline Tosta, psicoterapeuta dedicada a oferecer um espaço seguro e
						acolhedor para o seu desenvolvimento pessoal e bem-estar emocional. Minha abordagem
						integra ciência e sensibilidade, buscando compreender suas necessidades individuais e
						auxiliá-lo(a) na jornada do autoconhecimento e transformação.
					</p>
					<h3 class="mb-2 text-xl font-semibold text-secondary-foreground">Formação:</h3>
					<ul class="mb-6 list-inside list-disc space-y-1 text-muted-foreground">
						<li>Graduada em Psicologia e Pedagogia</li>
						<li>Pós-graduada em Neuropsicopedagogia</li>
						<li>Pós-graduanda em Neuropsicologia e Gestalt-terapia no ITGT/PUC</li>
					</ul>
					<a
						href="/sobre"
						class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
					>
						Saiba Mais Sobre Mim
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Services/Approach Section -->
	<section id="servicos" class="bg-secondary/50 py-16 md:py-24">
		<div class="container mx-auto px-4 text-center">
			<h2 class="mb-12 text-3xl font-semibold text-primary">Minha Abordagem</h2>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				<div
					class="rounded-lg border bg-card p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300"
				>
					<div class="flex items-center gap-2 text-lg font-semibold text-secondary-foreground mb-2">
						<CheckCircle class="h-6 w-6 text-accent" />
						Terapia Integrativa
					</div>
					<p class="text-sm text-muted-foreground">
						Unindo diferentes abordagens científicas da psicologia para oferecer um tratamento
						personalizado e eficaz, focado nas suas necessidades únicas.
					</p>
				</div>

				<div
					class="rounded-lg border bg-card p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300"
				>
					<div class="flex items-center gap-2 text-lg font-semibold text-secondary-foreground mb-2">
						<CheckCircle class="h-6 w-6 text-accent" />
						Acolhimento Emocional
					</div>
					<p class="text-sm text-muted-foreground">
						Crio um ambiente seguro, empático e livre de julgamentos, onde você se sentirá à vontade
						para explorar seus sentimentos e desafios.
					</p>
				</div>

				<div
					class="rounded-lg border bg-card p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-1"
				>
					<div class="flex items-center gap-2 text-lg font-semibold text-secondary-foreground mb-2">
						<CheckCircle class="h-6 w-6 text-accent" />
						Seus Sentimentos Importam
					</div>
					<p class="text-sm text-muted-foreground">
						Acredito na importância de dar atenção aos seus sentimentos. Juntos, vamos
						compreendê-los e encontrar caminhos para o seu bem-estar.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 text-center md:py-24">
		<div class="container mx-auto px-4">
			<h2 class="mb-6 text-2xl font-semibold md:text-3xl">Pronto para começar sua jornada?</h2>
			<p class="mb-8 max-w-xl mx-auto text-muted-foreground">
				Entre em contato para agendar uma conversa inicial e descobrir como posso te ajudar.
			</p>
			<a
				href={whatsappLink}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center rounded-md bg-[hsl(var(--whatsapp))] px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-[hsl(var(--whatsapp-hover))]"
			>
				Fale comigo no WhatsApp
			</a>
		</div>
	</section>
</div>
