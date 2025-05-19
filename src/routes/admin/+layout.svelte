<script lang="ts">
  import { page } from '$app/stores';
  
  // Navigation items for the admin area
  const navItems = [
    { href: '/admin', label: 'Dashboard', exact: true },
    { href: '/admin/blog', label: 'Gerenciar Blog' },
    { href: '/admin/blog/new', label: 'Novo Artigo' },
    { href: '/admin/stats', label: 'Estatísticas' }
  ];
  
  // Determine if a nav item is active
  function isActive(item: { href: string, exact?: boolean }): boolean {
    if (item.exact) {
      return $page.url.pathname === item.href;
    }
    return $page.url.pathname.startsWith(item.href);
  }
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Admin Header -->
  <header class="bg-primary text-white shadow-md">
    <div class="container mx-auto py-4 px-6 flex items-center justify-between">
      <h1 class="text-xl font-bold">Área Administrativa</h1>
      <a href="/" class="text-white hover:underline text-sm">Voltar ao site</a>
    </div>
  </header>
  
  <!-- Admin Content Area -->
  <div class="container mx-auto px-6 py-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Sidebar Navigation -->
      <aside class="md:col-span-1">
        <nav class="bg-white rounded-lg shadow p-4">
          <ul class="space-y-2">
            {#each navItems as item}
              <li>
                <a 
                  href={item.href} 
                  class="block px-4 py-2 rounded-md transition-colors {isActive(item) 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'hover:bg-gray-100'}"
                >
                  {item.label}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      </aside>
      
      <!-- Main Content -->
      <main class="md:col-span-3">
        <div class="bg-white rounded-lg shadow p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</div>