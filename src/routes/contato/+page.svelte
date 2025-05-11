<script lang="ts">
	import { Mail, Phone, CheckCircle } from 'lucide-svelte';
	import SEO from '$lib/components/seo.svelte';
	import { user } from '$lib/firebase/auth';
	import { onMount } from 'svelte';

	const whatsappLink = `https://wa.me/5562982653996?text=${encodeURIComponent('Olá, Jaqueline! Gostaria de marcar uma conversa.')}`;

	// Form state
	let formData = {
		name: '',
		email: '',
		message: '',
		phone: ''
	};
	let formSubmitted = false;
	let formSubmitting = false;
	let formError = '';
	let newsletterEmail = '';
	let newsletterSubmitted = false;
	let newsletterError = '';
	let newsletterSubmitting = false;

	// WhatsApp Icon component
	const WhatsAppIcon = {
		svg: {
			viewBox: '0 0 448 512',
			path: 'M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z'
		}
	};

	// Function to handle email form submission
	async function handleEmailSubmit(event: Event) {
		event.preventDefault();
		formSubmitting = true;
		formError = '';

		try {
			// Get user information
			if (!$user) {
				formError = 'Por favor, faça login para enviar uma mensagem.';
				formSubmitting = false;
				return;
			}

			// Prepare the email data
			const emailData = {
				to: 'psijtosta@gmail.com',
				from: formData.email,
				name: formData.name,
				message: formData.message,
				phone: formData.phone,
				userId: $user.uid,
				timestamp: new Date().toISOString()
			};

			// Send the email using Fetch API to a serverless function
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(emailData)
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Erro ao enviar mensagem.');
			}

			// Success
			formSubmitted = true;

			// Reset form after 5 seconds
			setTimeout(() => {
				formSubmitted = false;
				formData = {
					name: '',
					email: '',
					message: '',
					phone: ''
				};
			}, 5000);

		} catch (error) {
			console.error('Error sending email:', error);
			formError = error.message || 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.';
		} finally {
			formSubmitting = false;
		}
	}

	// Function to handle newsletter subscription
	async function handleNewsletterSubmit(event: Event) {
		event.preventDefault();
		newsletterSubmitting = true;
		newsletterError = '';

		try {
			if (!newsletterEmail || !newsletterEmail.includes('@')) {
				newsletterError = 'Por favor, forneça um email válido.';
				newsletterSubmitting = false;
				return;
			}

			// Send the subscription request
			const response = await fetch('/api/newsletter-subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: newsletterEmail })
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Erro ao se inscrever na newsletter.');
			}

			// Success
			newsletterSubmitted = true;

			// Reset form after 5 seconds
			setTimeout(() => {
				newsletterSubmitted = false;
				newsletterEmail = '';
			}, 5000);

		} catch (error) {
			console.error('Error subscribing to newsletter:', error);
			newsletterError = error.message || 'Ocorreu um erro ao se inscrever. Por favor, tente novamente.';
		} finally {
			newsletterSubmitting = false;
		}
	}

	// Set form data from user if available
	onMount(() => {
		// Update the form with user data when authenticated
		const unsubscribe = user.subscribe(userData => {
			if (userData) {
				formData.email = userData.email || '';
				formData.name = userData.displayName || '';
			}
		});

		return unsubscribe;
	});
</script>

<SEO
	title="Contato - J. Tosta | Agende sua Consulta"
	description="Entre em contato com a psicoterapeuta Jaqueline Tosta. Atendimento em Goiânia, via WhatsApp ou email. Comece sua jornada de transformação hoje."
/>

<div class="container mx-auto px-4 py-12 md:py-20">
	<h1 class="mb-10 text-center text-4xl font-bold text-primary md:text-5xl">Entre em Contato</h1>
	<p class="mb-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
		Estou aqui para ouvir você. Escolha a melhor forma de entrar em contato e vamos começar essa
		conversa.
	</p>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		<!-- WhatsApp Contact Card -->
		<div class="rounded-lg border bg-card text-card-foreground shadow-md">
			<div class="flex flex-col space-y-1.5 p-6">
				<div class="flex items-center gap-2 text-lg font-semibold text-foreground">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox={WhatsAppIcon.svg.viewBox}
						class="h-5 w-5 text-[hsl(var(--whatsapp))]"
					>
						<path fill="currentColor" d={WhatsAppIcon.svg.path} />
					</svg>
					WhatsApp
				</div>
				<p class="text-sm text-foreground">
					A forma mais rápida e direta de falar comigo. Clique no botão abaixo para iniciar uma
					conversa.
				</p>
			</div>
			<div class="p-6 pt-0">
				<p class="mb-4 flex items-center text-foreground">
					<Phone class="mr-2 h-4 w-4" /> (62) 98265-3996
				</p>
				<a
					href={whatsappLink}
					class="inline-flex w-full items-center justify-center rounded-md bg-[hsl(var(--whatsapp))] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[hsl(var(--whatsapp-hover))]"
					target="_blank"
					rel="noopener noreferrer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox={WhatsAppIcon.svg.viewBox}
						class="mr-2 h-4 w-4"
					>
						<path fill="currentColor" d={WhatsAppIcon.svg.path} />
					</svg>
					Falar no WhatsApp
				</a>
			</div>
		</div>

		<!-- Email Form Card -->
		<div class="rounded-lg border bg-card text-card-foreground shadow-md">
			<div class="flex flex-col space-y-1.5 p-6">
				<div class="flex items-center gap-2 text-lg font-semibold text-foreground">
					<Mail class="h-5 w-5" /> Formulário por Email
				</div>
				<p class="text-sm text-foreground">
					Prefere enviar um email? Preencha o formulário abaixo (disponível para usuários logados).
				</p>
			</div>
			<div class="p-6 pt-0">
				{#if $user}
					{#if formSubmitted}
						<div class="flex flex-col items-center justify-center text-center py-8">
							<div class="mb-4 text-green-500">
								<CheckCircle class="h-16 w-16 mx-auto" />
							</div>
							<h3 class="text-xl font-bold mb-2">Mensagem Enviada!</h3>
							<p class="text-muted-foreground">
								Obrigada pelo contato. Responderei o mais breve possível.
							</p>
						</div>
					{:else}
						<form class="space-y-4" on:submit={handleEmailSubmit}>
							{#if formError}
								<div class="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
									{formError}
								</div>
							{/if}

							<div>
								<label for="name" class="block text-sm font-medium text-muted-foreground mb-1"
									>Nome</label
								>
								<input
									type="text"
									id="name"
									name="name"
									bind:value={formData.name}
									class="w-full rounded-md border p-2 bg-background"
									placeholder="Seu nome"
									required
								/>
							</div>
							<div>
								<label for="email" class="block text-sm font-medium text-muted-foreground mb-1"
									>Email</label
								>
								<input
									type="email"
									id="email"
									name="email"
									bind:value={formData.email}
									class="w-full rounded-md border p-2 bg-background"
									placeholder="seuemail@exemplo.com"
									required
								/>
							</div>
							<div>
								<label for="phone" class="block text-sm font-medium text-muted-foreground mb-1"
									>Telefone (opcional)</label
								>
								<input
									type="tel"
									id="phone"
									name="phone"
									bind:value={formData.phone}
									class="w-full rounded-md border p-2 bg-background"
									placeholder="(00) 00000-0000"
								/>
							</div>
							<div>
								<label for="message" class="block text-sm font-medium text-muted-foreground mb-1"
									>Mensagem</label
								>
								<textarea
									id="message"
									name="message"
									rows="4"
									bind:value={formData.message}
									class="w-full rounded-md border p-2 bg-background"
									placeholder="Sua mensagem..."
									required
								></textarea>
							</div>
							<button
								type="submit"
								class="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
								disabled={formSubmitting}
							>
								{#if formSubmitting}
									<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Enviando...
								{:else}
									Enviar Mensagem
								{/if}
							</button>
						</form>
					{/if}
				{:else}
					<div
						class="flex flex-col items-center justify-center h-full rounded-md border border-dashed p-8 text-center text-muted-foreground"
					>
						<p class="mb-4">
							O formulário de contato por email está disponível apenas para usuários autenticados.
						</p>
						<a
							href="/auth"
							class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
						>
							Fazer Login
						</a>
						<p class="mt-4 text-sm">Ou utilize o WhatsApp para contato imediato.</p>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Newsletter Subscription -->
	<div class="mt-16 pt-8 border-t border-border">
		<div class="max-w-2xl mx-auto text-center">
			<h2 class="text-2xl font-bold mb-4">Assine nossa Newsletter</h2>
			<p class="text-muted-foreground mb-6">
				Receba dicas sobre saúde mental, bem-estar emocional e novidades sobre serviços e eventos.
			</p>

			{#if newsletterSubmitted}
				<div class="bg-green-100 text-green-800 px-4 py-3 rounded-md text-sm max-w-md mx-auto">
					<div class="flex items-center">
						<CheckCircle class="h-5 w-5 mr-2" />
						<span>Inscrição realizada com sucesso!</span>
					</div>
				</div>
			{:else}
				<form on:submit={handleNewsletterSubmit} class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
					{#if newsletterError}
						<div class="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm w-full">
							{newsletterError}
						</div>
					{/if}

					<div class="flex flex-col sm:flex-row gap-4 w-full">
						<input
							type="email"
							placeholder="Seu email"
							bind:value={newsletterEmail}
							class="flex-1 rounded-md border p-2 bg-background"
							required
						/>
						<button
							type="submit"
							class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
							disabled={newsletterSubmitting}
						>
							{#if newsletterSubmitting}
								<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Enviando...
							{:else}
								Assinar Newsletter
							{/if}
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>
