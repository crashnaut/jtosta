<script lang="ts">
  import { signIn, signUp, signInWithGoogle, resetPassword } from '$lib/firebase/auth';
  import { goto } from '$app/navigation';
  
  let email = '';
  let password = '';
  let confirmPassword = '';
  let mode: 'login' | 'register' | 'resetPassword' = 'login';
  let loading = false;
  let errorMessage = '';
  let successMessage = '';
  
  // Define the error type for Firebase authentication errors
  interface FirebaseAuthError {
    code: string;
    message: string;
  }
  
  async function handleAuth() {
    loading = true;
    errorMessage = '';
    successMessage = '';
    
    try {
      if (mode === 'register') {
        if (password !== confirmPassword) {
          errorMessage = 'As senhas não coincidem.';
          loading = false;
          return;
        }
        await signUp(email, password);
        successMessage = 'Conta criada com sucesso!';
        goto('/');
      } else if (mode === 'login') {
        await signIn(email, password);
        goto('/');
      } else if (mode === 'resetPassword') {
        await resetPassword(email);
        successMessage = 'Email de recuperação enviado. Verifique sua caixa de entrada.';
        mode = 'login';
      }
    } catch (error: unknown) {
      console.error('Authentication error:', error);
      
      // Handle Firebase auth errors
      const authError = error as FirebaseAuthError;
      if (authError.code === 'auth/wrong-password' || authError.code === 'auth/user-not-found') {
        errorMessage = 'Email ou senha incorretos.';
      } else if (authError.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está sendo usado por outra conta.';
      } else if (authError.code === 'auth/weak-password') {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      } else if (authError.code === 'auth/invalid-email') {
        errorMessage = 'O email fornecido não é válido.';
      } else if (authError.code === 'auth/too-many-requests') {
        errorMessage = 'Muitas tentativas. Tente novamente mais tarde.';
      } else {
        errorMessage = 'Ocorreu um erro. Tente novamente mais tarde.';
      }
    } finally {
      loading = false;
    }
  }
  
  async function handleGoogleSignIn() {
    loading = true;
    errorMessage = '';
    
    try {
      await signInWithGoogle();
      goto('/');
    } catch (error: unknown) {
      console.error('Google sign-in error:', error);
      const authError = error as FirebaseAuthError;
      if (authError.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login cancelado.';
      } else {
        errorMessage = 'Erro ao fazer login com Google. Tente novamente.';
      }
    } finally {
      loading = false;
    }
  }
  
  function resetForm() {
    email = '';
    password = '';
    confirmPassword = '';
    errorMessage = '';
    successMessage = '';
  }
</script>

<svelte:head>
  <title>Autenticação - J. Tosta</title>
  <meta name="description" content="Entre ou crie uma conta para acessar recursos exclusivos">
</svelte:head>

<div class="container mx-auto px-4 py-16">
  <div class="mx-auto max-w-md space-y-6">
    <div class="space-y-2 text-center">
      <h1 class="text-3xl font-bold">{mode === 'login' ? 'Entrar' : mode === 'register' ? 'Criar Conta' : 'Recuperar Senha'}</h1>
      <p class="text-muted-foreground">
        {#if mode === 'login'}
          Entre com sua conta para acessar recursos exclusivos
        {:else if mode === 'register'}
          Crie uma conta para acessar recursos exclusivos
        {:else}
          Informe seu email para recuperar sua senha
        {/if}
      </p>
    </div>
    
    {#if errorMessage}
      <div class="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
        {errorMessage}
      </div>
    {/if}
    
    {#if successMessage}
      <div class="bg-green-100 text-green-800 px-4 py-3 rounded-md text-sm">
        {successMessage}
      </div>
    {/if}
    
    <div class="space-y-4">
      <form on:submit|preventDefault={handleAuth} class="space-y-4">
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            placeholder="seu@email.com"
            required
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        
        {#if mode !== 'resetPassword'}
          <div class="space-y-2">
            <label for="password" class="text-sm font-medium">Senha</label>
            <input
              id="password"
              type="password"
              bind:value={password}
              placeholder={mode === 'register' ? 'Crie uma senha segura' : 'Sua senha'}
              required
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        {/if}
        
        {#if mode === 'register'}
          <div class="space-y-2">
            <label for="confirmPassword" class="text-sm font-medium">Confirmar Senha</label>
            <input
              id="confirmPassword"
              type="password"
              bind:value={confirmPassword}
              placeholder="Confirme sua senha"
              required
              class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        {/if}
        
        {#if mode === 'login'}
          <div class="flex items-center justify-end">
            <button 
              type="button" 
              on:click={() => { mode = 'resetPassword'; resetForm(); }}
              class="text-sm font-medium text-primary hover:underline focus:underline focus:outline-none"
            >
              Esqueceu a senha?
            </button>
          </div>
        {/if}
        
        <button
          type="submit"
          disabled={loading}
          class="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {#if loading}
            <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Carregando...
          {:else}
            {mode === 'login' ? 'Entrar' : mode === 'register' ? 'Criar Conta' : 'Recuperar Senha'}
          {/if}
        </button>
      </form>
      
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-border"></div>
        </div>
        <div class="relative flex justify-center text-xs">
          <span class="bg-background px-2 text-muted-foreground">ou continue com</span>
        </div>
      </div>
      
      <button
        type="button"
        disabled={loading}
        on:click={handleGoogleSignIn}
        class="w-full inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
        </svg>
        Google
      </button>
      
      <div class="text-center text-sm">
        {#if mode === 'login'}
          Não tem uma conta?{' '}
          <button 
            type="button" 
            on:click={() => { mode = 'register'; resetForm(); }}
            class="font-medium text-primary hover:underline focus:underline focus:outline-none"
          >
            Criar conta
          </button>
        {:else if mode === 'register'}
          Já tem uma conta?{' '}
          <button 
            type="button" 
            on:click={() => { mode = 'login'; resetForm(); }}
            class="font-medium text-primary hover:underline focus:underline focus:outline-none"
          >
            Faça login
          </button>
        {:else}
          <button 
            type="button" 
            on:click={() => { mode = 'login'; resetForm(); }}
            class="font-medium text-primary hover:underline focus:underline focus:outline-none"
          >
            Voltar para o login
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>