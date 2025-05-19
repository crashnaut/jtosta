<script lang="ts">
  import { user } from '$lib/firebase/auth';
</script>

<svelte:head>
  <title>Painel Administrativo - J. Tosta</title>
</svelte:head>

<div class="space-y-6">
  <div class="border-b pb-4 mb-4">
    <h1 class="text-2xl font-bold">Painel Administrativo</h1>
    <p class="text-gray-600">Bem-vindo(a) à área administrativa do site.</p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Blog Management Card -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:border-primary transition-colors">
      <h2 class="text-xl font-semibold mb-3">Gerenciamento do Blog</h2>
      <p class="text-gray-600 mb-4">Crie, edite e gerencie artigos do blog diretamente do painel.</p>
      <a href="/admin/blog" class="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
        Gerenciar Blog
      </a>
    </div>
    
    <!-- Stats Card -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:border-primary transition-colors">
      <h2 class="text-xl font-semibold mb-3">Estatísticas</h2>
      <p class="text-gray-600 mb-4">Visualize estatísticas de engajamento do site e do blog.</p>
      <a href="/admin/stats" class="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
        Ver Estatísticas
      </a>
    </div>
  </div>
  
  <!-- Quick Actions -->
  <div class="mt-8">
    <h2 class="text-xl font-semibold mb-3">Ações Rápidas</h2>
    <div class="flex flex-wrap gap-4">
      <a href="/admin/blog/new" class="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
        Criar Novo Artigo
      </a>
    </div>
  </div>
</div>