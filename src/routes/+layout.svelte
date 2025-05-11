<script lang="ts">
  import '../app.css';
  import '@fontsource-variable/inter';
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

  // Social media links
  const socialLinks = [
    { 
      name: "Instagram", 
      appUrl: "instagram://user?username=psi.jaquelinetosta_", 
      webUrl: "https://www.instagram.com/psi.jaquelinetosta_/",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`
    }
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

  // Social media handling
  function handleSocialClick(event: MouseEvent, appUrl: string, webUrl: string) {
    event.preventDefault();
    
    // Check if it's likely a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Try to open the app first
      const start = Date.now();
      window.location.href = appUrl;
      
      // Set a timeout to check if the app opened
      setTimeout(() => {
        if (Date.now() - start < 2000) {
          // App likely didn't open, redirect to web URL
          window.location.href = webUrl;
        }
      }, 500);
    } else {
      // On desktop, just open the web URL
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  }
</script>

<svelte:head>
  <style>
    :root {
      --font-sans: 'Inter Variable', sans-serif;
    }
  </style>
</svelte:head>

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
    </div>
  </header>

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
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true"></div>

      <!-- Menu Content -->
      <div 
        bind:this={dialogContainer}
        class="fixed inset-y-0 right-0 w-[250px] border-l bg-white p-6 shadow-lg transition ease-in-out dark:bg-white"
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
          
          <!-- Social Media Icons in Mobile Menu -->
          <div class="pt-4 mt-4 border-t border-border flex space-x-3">
            {#each socialLinks as social}
              <a 
                href={social.webUrl}
                on:click={(e) => {
                  handleSocialClick(e, social.appUrl, social.webUrl);
                  isMobileMenuOpen = false;
                }}
                class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label={social.name}
              >
                {@html social.icon}
              </a>
            {/each}
          </div>
        </nav>
      </div>
    </div>
  {/if}

  <!-- Main Content -->
  <main class="flex-1">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="bg-muted/50 py-8">
    <div class="container mx-auto px-4 text-center text-muted-foreground">
      <!-- Social Media Links -->
      <div class="mb-6 flex justify-center space-x-4">
        <a 
          href="https://www.instagram.com/psi.jaquelinetosta_/"
          on:click={(e) => handleSocialClick(e, 'instagram://user?username=psi.jaquelinetosta_', 'https://www.instagram.com/psi.jaquelinetosta_/')}
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>
      </div>

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

