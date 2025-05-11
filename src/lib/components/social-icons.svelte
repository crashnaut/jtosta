<script lang="ts">
  // Class for styling the container
  export let containerClass = "";
  // Class for styling individual icons
  export let iconClass = "inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors";
  // Size for the icons (sm, md, lg)
  export let size: "sm" | "md" | "lg" = "md";
  // Optional label to be displayed alongside icons
  export let label = "";
  // Whether to display in horizontal (row) or vertical (column) layout
  export let layout: "row" | "column" = "row";
  
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

  // Define icon size classes
  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  // Define container layout classes
  const layoutClasses = {
    row: "flex items-center space-x-3",
    column: "flex flex-col space-y-3"
  };

  // Social media links
  const socialLinks = [
    { 
      name: "Instagram", 
      appUrl: "instagram://user?username=psi.jaquelinetosta_", 
      webUrl: "https://www.instagram.com/psi.jaquelinetosta_/",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${iconSizes[size]}"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`
    },
    { 
      name: "Linktree", 
      appUrl: "https://linktr.ee/jaquelinetosta", 
      webUrl: "https://linktr.ee/jaquelinetosta",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${iconSizes[size]}"><path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.528.897 1.052.89h1.294v2.5a3.06 3.06 0 0 0 2.982 3.069c.786 0 1.54-.298 2.09-.824.549-.527.868-1.228.868-1.97v-2.687h1.293c.541 0 1.004-.396 1.084-.934a1.023 1.023 0 0 0-.246-.833l-4.562-5.95a1.04 1.04 0 0 0-1.665 0l-4.562 5.95c-.081.163-.128.325-.128.487z M7.976 7.692c.08-.164.08-.328.08-.49-.08-.573-.608-.914-1.068-.89l-1.293.001v-2.5C5.7 2.015 3.55.013 1.003 0 .451.013.013.423.013.975v9.802c0 .329.134.646.366.873l4.4 5.128a1.122 1.122 0 1 0 1.695-1.466l-3.367-3.92V2.776h.574c.331 0 .63.194.763.493l3.636 4.888c.067.128.166.24.283.33z"/></svg>`
    }
  ];
</script>

<div class={`${layoutClasses[layout]} ${containerClass}`}>
  {#if label}
    <span class="text-sm text-muted-foreground">{label}</span>
  {/if}
  
  {#each socialLinks as social}
    <a 
      href={social.webUrl}
      on:click={(e) => handleSocialClick(e, social.appUrl, social.webUrl)}
      class={iconClass}
      aria-label={social.name}
    >
      {@html social.icon}
    </a>
  {/each}
</div>