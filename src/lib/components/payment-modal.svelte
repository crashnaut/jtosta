<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { auth } from '$lib/firebase/auth';
  import { user } from '$lib/stores/auth';
  import PaymentForm from './payment-form.svelte';

  export let open = false;
  export let amount: number = 0;
  export let description: string = '';
  export let title: string = 'Pagamento';
  export let buttonText: string = 'Pagar';
  export let successRedirect: string | null = null;

  const dispatch = createEventDispatcher();
  let authChecked = false;
  let isAuthenticated = false;

  onMount(() => {
    // Check authentication status
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      isAuthenticated = !!userData;
      authChecked = true;
      
      // Close modal if user is not authenticated
      if (authChecked && !isAuthenticated && open) {
        handleClose();
      }
    });

    return unsubscribe;
  });

  function handleClose() {
    open = false;
    dispatch('close');
  }

  function handleSuccess(event) {
    dispatch('success', event.detail);
    
    if (successRedirect) {
      window.location.href = successRedirect;
    } else {
      handleClose();
    }
  }

  // Handle clicks outside the modal to close it
  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }

  // Handle ESC key to close modal
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      handleClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div 
    class="modal-overlay" 
    transition:fade={{ duration: 150 }} 
    on:click={handleOutsideClick}
    on:keydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-labelledby="payment-modal-title"
    tabindex="-1"
  >
    <div class="modal-container">
      {#if !authChecked}
        <div class="loading-container">
          <span class="loading-spinner"></span>
          <p>Verificando autenticação...</p>
        </div>
      {:else if !isAuthenticated}
        <div class="auth-required">
          <h3>Autenticação Necessária</h3>
          <p>Você precisa estar logado para realizar pagamentos.</p>
          <button on:click={handleClose}>Fechar</button>
        </div>
      {:else}
        <div class="modal-header">
          <h3 id="payment-modal-title">{title}</h3>
          <button class="close-button" on:click={handleClose} aria-label="Fechar">×</button>
        </div>
        <div class="modal-content">
          <PaymentForm 
            {amount} 
            {description} 
            buttonText={buttonText} 
            on:success={handleSuccess}
          />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal-container {
    background-color: white;
    border-radius: 8px;
    width: 100%;
    max-width: 550px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
  }

  .modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    color: #666;
  }

  .close-button:hover {
    color: #000;
  }

  .modal-content {
    padding: 20px;
  }

  .loading-container, .auth-required {
    padding: 30px;
    text-align: center;
  }

  .loading-spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #4CAF50;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .auth-required button {
    margin-top: 15px;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .auth-required button:hover {
    background-color: #45a049;
  }
</style>