<script lang="ts">
	import { Brain, Heart, Users, Briefcase, X } from 'lucide-svelte';
	import SEO from '$lib/components/seo.svelte';
	import { onMount } from 'svelte';

	// Define job type
	interface Job {
		cargo: string;
		empresa: string;
		local: string;
		periodo: string;
		descricao: string[];
	}

	// Jobs data
	const experienciasPrevias: Job[] = [
		{
			cargo: 'Professora',
			empresa: 'Centro de Educação Conviver',
			local: 'Goiânia',
			periodo: 'Jan 2014 - Dez 2022',
			descricao: [
				'Responsável pelo planejamento e ministração de aulas no Jardim I (crianças de 4 e 5 anos) no período vespertino.',
				'Desenvolvimento de projetos pedagógicos; confecção de material didáticos.',
				'Elaboração de relatórios bimestrais.',
				'Acompanhar e motivar a qualidade de ensino.',
				'Participação de reuniões com os responsáveis dos alunos.'
			]
		},
		{
			cargo: 'Professora Assistente',
			empresa: 'Escola Ethos',
			local: 'Goiânia',
			periodo: 'Jul 2017 - Feb 2011',
			descricao: [
				'Responsável em receber as crianças com atividades recreativas e jogos (crianças de 3 a 5).',
				'Acompanhar crianças ao banheiro, recreio e aulas específicas.',
				'Auxiliar o professor no processo educativo-pedagógico, nas ações de planejamento, registro e avaliação.',
				'Participar de reuniões administrativas, pedagógicas e com familiares.'
			]
		},
		{
			cargo: 'Professora Assistente',
			empresa: 'Escola Magia de Criança',
			local: 'Brasília',
			periodo: 'Dez 2010 - Jul 2010',
			descricao: [
				'Realizei estágio na escola e fui contratada como assistente de sala de aula com crianças de 3 a 4 anos.'
			]
		},
		{
			cargo: 'Professora Assistente / Secretaria',
			empresa: 'Escola Videira',
			local: 'Goiânia',
			periodo: 'Nov 2009 - Feb 2008',
			descricao: [
				'Iniciei trabalhando na secretaria da escola durante 3 meses.',
				'Depois fui para sala de aula como assistente de sala, crianças de 3 a 4 anos de idade.'
			]
		}
	];

	// Function to format date ranges (latest date - earlier date)
	function formatDateRange(periodo: string): string {
		// Extract dates from period string (format: "Month Year - Month Year")
		const dateParts = periodo.split(' - ');
		if (dateParts.length !== 2) return periodo;
		
		// Parse start and end dates
		const startDateStr = dateParts[0].trim();
		const endDateStr = dateParts[1].trim();
		
		// Map month abbreviations to numbers
		const monthMap: {[key: string]: number} = {
			'Jan': 0, 'Feb': 1, 'Mar': 2, 'Abr': 3, 'Apr': 3, 'Mai': 4, 'May': 4,
			'Jun': 5, 'Jul': 6, 'Ago': 7, 'Aug': 7, 'Set': 8, 'Sep': 8, 
			'Out': 9, 'Oct': 9, 'Nov': 10, 'Dez': 11, 'Dec': 11
		};
		
		try {
			// Parse start date
			const startMonthStr = startDateStr.substring(0, 3);
			const startMonth = monthMap[startMonthStr];
			const startYear = parseInt(startDateStr.substring(4));
			
			// Parse end date
			const endMonthStr = endDateStr.substring(0, 3);
			const endMonth = monthMap[endMonthStr];
			const endYear = parseInt(endDateStr.substring(4));
			
			// Compare dates to find the latest and earliest
			const startDate = new Date(startYear, startMonth);
			const endDate = new Date(endYear, endMonth);
			
			// Return dates in the desired format (latest - earliest)
			if (endDate > startDate) {
				return `${endDateStr} - ${startDateStr}`;
			}
			return `${startDateStr} - ${endDateStr}`;
		} catch (error) {
			// If any parsing error occurs, return the original string
			return periodo;
		}
	}

	// Modal state
	let modalOpen = false;
	let selectedJob: Job = experienciasPrevias[0];

	// Function to open modal with selected job
	function openModal(job: Job): void {
		selectedJob = job;
		modalOpen = true;
		document.body.classList.add('overflow-hidden');
	}

	// Function to close modal
	function closeModal(): void {
		modalOpen = false;
		document.body.classList.remove('overflow-hidden');
	}

	// Close modal on escape key press
	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape' && modalOpen) {
			closeModal();
		}
	}

	// Close modal when clicking outside
	function handleOutsideClick(event: MouseEvent): void {
		if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
			closeModal();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
			document.body.classList.remove('overflow-hidden');
		};
	});
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

	<div class="mb-16">
		<h2 class="mb-8 text-center text-3xl font-semibold text-foreground">
			Experiência Anterior
		</h2>
		<p class="mb-8 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
			Antes de me dedicar integralmente à psicologia, atuei como educadora infantil, trabalhando principalmente 
			com crianças entre 3 e 6 anos. Clique nos cards abaixo para conhecer mais sobre minha trajetória profissional.
		</p>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
			{#each experienciasPrevias as job}
				<button 
					type="button"
					class="w-full text-left rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md cursor-pointer flex items-start"
					on:click={() => openModal(job)}
					on:keydown={(e) => e.key === 'Enter' && openModal(job)}
					aria-label="Ver detalhes do cargo {job.cargo} na {job.empresa}"
				>
					<div class="mr-4 mt-1">
						<div class="h-10 w-10 flex items-center justify-center rounded-full bg-accent/20 text-accent">
							<Briefcase class="h-5 w-5" />
						</div>
					</div>
					<div>
						<h3 class="mb-1 text-lg font-semibold text-foreground">{job.cargo}</h3>
						<p class="text-sm text-foreground mb-1">{job.empresa} - {job.local}</p>
						<p class="text-sm text-muted-foreground">{formatDateRange(job.periodo)}</p>
					</div>
				</button>
			{/each}
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

<!-- Modal -->
{#if modalOpen}
	<div 
		class="fixed inset-0 z-50 flex items-center justify-center px-4 modal-backdrop"
		on:click={handleOutsideClick}
		on:keydown={(e) => e.key === 'Enter' && handleOutsideClick(e)}
		role="presentation"
	>
		<!-- Overlay -->
		<div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
		
		<!-- Modal Content -->
		<div 
			class="relative w-full max-w-2xl rounded-lg border bg-card shadow-lg p-6 md:p-8 animate-in fade-in zoom-in-95 duration-300"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<!-- Close button -->
			<button 
				class="absolute right-4 top-4 p-1 rounded-full hover:bg-accent/10 text-muted-foreground"
				on:click={closeModal}
				aria-label="Fechar"
			>
				<X class="h-5 w-5" />
			</button>
			
			<!-- Title -->
			<div class="flex items-start">
				<div class="mr-4">
					<div class="h-10 w-10 flex items-center justify-center rounded-full bg-accent/20 text-accent">
						<Briefcase class="h-5 w-5" />
					</div>
				</div>
				<div>
					<h2 id="modal-title" class="text-2xl font-semibold text-foreground mb-1">{selectedJob.cargo}</h2>
					<p class="text-lg text-foreground mb-1">{selectedJob.empresa}</p>
					<p class="text-base text-muted-foreground mb-4">{selectedJob.local} | {selectedJob.periodo}</p>
				</div>
			</div>
			
			<!-- Content -->
			<div class="mt-6">
				<h3 class="font-medium text-foreground mb-2">Responsabilidades e Atividades:</h3>
				<ul class="space-y-2">
					{#each selectedJob.descricao as item}
						<li class="pl-4 border-l-2 border-accent/20">
							<p class="text-foreground">{item}</p>
						</li>
					{/each}
				</ul>
			</div>
			
			<div class="mt-8 flex justify-end">
				<button 
					class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
					on:click={closeModal}
				>
					Fechar
				</button>
			</div>
		</div>
	</div>
{/if}
