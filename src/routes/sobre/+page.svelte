<script lang="ts">
	import { Brain, Heart, Users } from 'lucide-svelte';
	import SEO from '$lib/components/seo.svelte';
</script>

<SEO
	title="Sobre - Jaqueline Tosta | Psicóloga e Psicoterapeuta"
	description="Conheça mais sobre Jaqueline Tosta, psicóloga e psicoterapeuta em Goiânia. Formação acadêmica, abordagem terapêutica e compromisso com o bem-estar emocional."
	ogImage="https://picsum.photos/500/500"
/>

<div class="container mx-auto px-4 py-12 md:py-20">
	<h1 class="mb-10 text-center text-4xl font-bold text-primary md:text-5xl">Sobre Mim</h1>

	<div class="mb-16 grid grid-cols-1 items-center gap-12 md:grid-cols-3">
		<div class="md:col-span-1">
			<img
				src="/photos/DSC08914.jpg"
				width="500"
				height="30"
				class="mx-auto rounded-lg shadow-xl object-cover object-[center_45%]"
				alt="Psicoterapeuta Jaqueline Tosta"
				data-ai-hint="professional woman smiling friendly"
			/>
		</div>
		<div class="md:col-span-2">
			<h2 class="mb-4 text-3xl font-semibold text-foreground">Jaqueline Tosta</h2>
			<p class="mb-2 text-lg font-medium text-foreground">Psicoterapeuta CRP 09/21067</p>
			<p class="mb-4 text-lg leading-relaxed text-foreground">
				Sou apaixonada por auxiliar pessoas em suas jornadas de autoconhecimento e transformação.
				Acredito que cada indivíduo possui um potencial imenso para o crescimento e a superação de
				desafios, e meu papel como psicoterapeuta é facilitar esse processo, oferecendo um espaço
				seguro, acolhedor e baseado na ciência.
			</p>
			<p class="text-lg leading-relaxed text-foreground">
				Minha trajetória acadêmica e profissional me proporcionou uma visão ampla sobre o
				desenvolvimento humano, desde a infância até a vida adulta, integrando conhecimentos da
				psicologia, pedagogia e neurociências.
			</p>
		</div>
	</div>

	<div class="mb-16">
		<h2 class="mb-8 text-center text-3xl font-semibold text-foreground">Formação Acadêmica</h2>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<h3 class="mb-2 text-lg font-semibold text-foreground">
					Graduação em Psicologia
				</h3>
				<p class="text-sm text-foreground">
					Base sólida para a compreensão do comportamento humano e das teorias psicológicas.
				</p>
			</div>

			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<h3 class="mb-2 text-lg font-semibold text-foreground">Graduação em Pedagogia</h3>
				<p class="text-sm text-foreground">
					Entendimento aprofundado sobre processos de aprendizagem e desenvolvimento infantil.
				</p>
			</div>

			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<h3 class="mb-2 text-lg font-semibold text-foreground">
					Pós-graduação em Neuropsicopedagogia
				</h3>
				<p class="text-sm text-muted-foreground">
					Foco na relação entre cérebro, cognição e aprendizagem.
				</p>
			</div>

			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<h3 class="mb-2 text-lg font-semibold text-foreground">
					Pós-graduanda em Neuropsicologia
				</h3>
				<p class="text-sm text-muted-foreground">
					Especialização na avaliação e reabilitação das funções cognitivas.
				</p>
			</div>

			<div class="rounded-lg border bg-card p-6 shadow-sm">
				<h3 class="mb-2 text-lg font-semibold text-foreground">
					Pós-graduanda em Gestalt-terapia (ITGT/PUC)
				</h3>
				<p class="text-sm text-muted-foreground">
					Abordagem humanista focada no aqui-e-agora e na consciência.
				</p>
			</div>
		</div>
	</div>

	<div>
		<h2 class="mb-8 text-center text-3xl font-semibold text-foreground">
			Minha Abordagem Terapêutica
		</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div class="flex flex-col items-center text-center">
				<div
					class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent"
				>
					<Brain class="h-8 w-8" />
				</div>
				<h3 class="mb-2 text-xl font-semibold text-foreground">Terapia Integrativa</h3>
				<p class="text-foreground">
					Combino técnicas e conhecimentos de diferentes abordagens, como a Gestalt-terapia e a
					Neuropsicologia, para adaptar o tratamento às suas necessidades específicas, promovendo um
					cuidado completo e eficaz.
				</p>
			</div>

			<div class="flex flex-col items-center text-center">
				<div
					class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent"
				>
					<Heart class="h-8 w-8" />
				</div>
				<h3 class="mb-2 text-xl font-semibold text-foreground">Acolhimento Emocional</h3>
				<p class="text-foreground">
					Priorizo a criação de um vínculo terapêutico forte, baseado na empatia, respeito e
					ausência de julgamentos. Aqui, você encontrará um espaço seguro para expressar seus
					sentimentos e vulnerabilidades.
				</p>
			</div>

			<div class="flex flex-col items-center text-center">
				<div
					class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent"
				>
					<Users class="h-8 w-8" />
				</div>
				<h3 class="mb-2 text-xl font-semibold text-foreground">Foco no Indivíduo</h3>
				<p class="text-foreground">
					Cada pessoa é única. Trabalho de forma colaborativa com você, respeitando seu ritmo e sua
					história, para construirmos juntos caminhos mais saudáveis e conscientes para sua vida.
				</p>
			</div>
		</div>
	</div>
</div>
