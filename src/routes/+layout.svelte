<script lang="ts">
  import '../app.css';
  import '@fontsource/inter/400.css';
  import '@fontsource/inter/500.css';
  import '@fontsource/inter/600.css';
  import '@fontsource/inter/700.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  let isMobileMenuOpen = false;
  let dialogContainer: HTMLDivElement;
  
  const navItems = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre" },
    { href: "/blog", label: "Blog" },
    { href: "/contato", label: "Contato" }
  ];

  const handleOverlayClick = () => {
    isMobileMenuOpen = false;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      isMobileMenuOpen = false;
    }
  };

  const trapFocus = (event: KeyboardEvent) => {
    if (!dialogContainer || !isMobileMenuOpen) return;

    const focusableElements = Array.from(
      dialogContainer.querySelectorAll<HTMLElement>(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled'));

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable?.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    }
  };

  $: if (isMobileMenuOpen && dialogContainer) {
    setTimeout(() => {
      const firstFocusable = dialogContainer.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      firstFocusable?.focus();
    }, 0);
  }

  onMount(() => {
    // Initialize any client-side libraries here
  });
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="relative flex min-h-screen flex-col">
  <!-- Header -->
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto flex h-16 items-center justify-between px-4">
      <a href="/" class="text-2xl font-bold text-primary">
        J. Tosta
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        {#each navItems as item}
          <a
            href={item.href}
            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            class:text-primary={$page.url.pathname === item.href}
          >
            {item.label}
          </a>
        {/each}
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="inline-flex h-10 w-10 items-center justify-center rounded-md p-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 md:hidden"
        on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? "Fechar Menu" : "Abrir Menu"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {#if isMobileMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          {/if}
        </svg>
      </button>

      <!-- Mobile Menu -->
      {#if isMobileMenuOpen}
        <div 
          class="fixed inset-0 z-50 md:hidden" 
          on:click={handleOverlayClick}
          on:keydown={handleKeyDown}
          role="dialog"
          tabindex="-1"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <!-- Overlay -->
          <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" aria-hidden="true"></div>
          
          <!-- Menu Content -->
          <div 
            bind:this={dialogContainer}
            class="fixed inset-y-0 right-0 w-[250px] border-l bg-background p-6 shadow-lg transition ease-in-out"
            on:click|stopPropagation={() => {}}
            on:keydown={trapFocus}
            tabindex="0"
            role="menu"
            aria-orientation="vertical"
            aria-label="Menu de navegação"
          >
            <div class="flex items-center justify-between">
              <a href="/" class="text-xl font-bold text-primary" on:click={() => (isMobileMenuOpen = false)}>
                J. Tosta
              </a>
              <button
                class="inline-flex h-10 w-10 items-center justify-center rounded-md p-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                on:click={() => (isMobileMenuOpen = false)}
                aria-label="Fechar menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav class="mt-6 flex flex-col space-y-4">
              {#each navItems as item}
                <a
                  href={item.href}
                  class="text-lg font-medium text-foreground transition-colors hover:text-primary focus:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring rounded-md px-2 py-1"
                  class:text-primary={$page.url.pathname === item.href}
                  on:click={() => (isMobileMenuOpen = false)}
                >
                  {item.label}
                </a>
              {/each}
            </nav>
          </div>
        </div>
      {/if}
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="bg-muted/50 py-8">
    <div class="container mx-auto px-4 text-center text-muted-foreground">
      <div class="mb-4 flex justify-center space-x-6">
        {#each navItems as item}
          <a 
            href={item.href} 
            class="text-sm hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-md px-2 py-1"
          >
            {item.label}
          </a>
        {/each}
      </div>
      <div class="mb-4">
        <p class="text-sm">Psicoterapeuta Jaqueline Tosta - CRP 09/21067</p>
        <a
          href="https://wa.me/5562982653996?text={encodeURIComponent('Olá, Jaqueline! Gostaria de saber mais sobre seus serviços.')}"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-md px-2 py-1"
        >
          WhatsApp: (62) 98265-3996
        </a>
      </div>
      <p class="text-xs">
        &copy; {new Date().getFullYear()} J. Tosta. Todos os direitos reservados.
      </p>
      <p class="text-xs mt-1">
        Desenvolvido com ❤️
      </p>
    </div>
  </footer>

  <!-- WhatsApp Button -->
  <a
    href="https://wa.me/5562982653996?text={encodeURIComponent('Olá, Jaqueline! Gostaria de saber mais sobre seus serviços.')}"
    class="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--whatsapp))] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[hsl(var(--whatsapp-hover))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--whatsapp))] focus:ring-offset-2"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Fale no WhatsApp"
  >
    <span class="sr-only">Fale no WhatsApp</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      class="h-7 w-7"
      aria-hidden="true"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  </a>
</div>
