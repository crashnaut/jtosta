<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { stripeService } from '$lib/stripe';
  
  export let amount: number = 0;
  export let description: string = '';
  export let buttonText: string = 'Pagar';
  export let successRedirect: string = '/pagamento-sucesso';
  
  const dispatch = createEventDispatcher();
  let loading = false;
  let error: string | null = null;
  let stripeLoaded = false;
  let cardElement: any = null;
  let cardComplete = false;
  let stripe: any = null;
  let elements: any = null;
  
  onMount(async () => {
    // Load Stripe when the component mounts
    stripeLoaded = await stripeService.loadStripe();
    if (!stripeLoaded) {
      error = 'Não foi possível carregar o Stripe. Por favor, tente novamente mais tarde.';
      return;
    }
    
    // Import Stripe Elements
    const { loadStripe } = await import('@stripe/stripe-js');
    const stripeJs = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');
    
    if (!stripeJs) {
      error = 'Falha ao carregar Stripe.js';
      return;
    }
    
    stripe = stripeJs;
    elements = stripe.elements();
    
    // Create card element
    cardElement = elements.create('card', {
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      }
    });
    
    // Mount the card element
    setTimeout(() => {
      const cardContainer = document.getElementById('card-element');
      if (cardContainer) {
        cardElement.mount('#card-element');
        
        // Listen for changes
        cardElement.on('change', (event: any) => {
          cardComplete = event.complete;
          if (event.error) {
            error = event.error.message;
          } else {
            error = null;
          }
        });
      }
    }, 100);
  });
  
  async function handlePayment() {
    if (!stripeLoaded || !cardElement || !cardComplete) {
      error = 'Por favor, preencha os dados do cartão corretamente.';
      return;
    }
    
    loading = true;
    error = null;
    
    try {
      // Step 1: Create a payment intent on the server
      const paymentResult = await stripeService.createPaymentIntent(amount, description);
      
      if (!paymentResult.success || !paymentResult.clientSecret) {
        throw new Error(paymentResult.error || 'Erro ao iniciar pagamento');
      }
      
      // Step 2: Confirm the payment with the card element
      const result = await stripe.confirmCardPayment(paymentResult.clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });
      
      if (result.error) {
        throw new Error(result.error.message);
      }
      
      // Check if payment succeeded
      if (result.paymentIntent.status === 'succeeded') {
        // Dispatch success event to be handled by parent component
        dispatch('success', { 
          paymentIntentId: result.paymentIntent.id,
          amount,
          description,
          timestamp: new Date().toISOString()
        });
        
        console.log('Pagamento realizado com sucesso!');
      } else {
        throw new Error(`O pagamento não foi concluído. Status: ${result.paymentIntent.status}`);
      }
    } catch (err) {
      console.error('Error during payment:', err);
      error = err instanceof Error ? err.message : 'Ocorreu um erro ao processar o pagamento.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="payment-container">
  {#if !description}
    <h3>Detalhes do Pagamento</h3>
  {/if}
  
  <div class="payment-details">
    <p><strong>Valor:</strong> R$ {amount.toFixed(2)}</p>
    {#if description}
      <p><strong>Descrição:</strong> {description}</p>
    {/if}
  </div>
  
  <div class="card-container">
    <label for="card-element">Dados do Cartão</label>
    <div id="card-element" class="card-element">
      <!-- Stripe Card Element will be inserted here -->
    </div>
  </div>
  
  {#if error}
    <div class="error-message">
      {error}
    </div>
  {/if}
  
  <button 
    class="payment-button" 
    on:click={handlePayment} 
    disabled={loading || !stripeLoaded || !cardComplete || amount <= 0}
  >
    {#if loading}
      <span class="spinner"></span> Processando...
    {:else}
      {buttonText}
    {/if}
  </button>
  
  <div class="payment-notice">
    <small>
      Pagamentos processados com segurança via Stripe.
      <br>
      Seus dados de pagamento não são armazenados em nossos servidores.
    </small>
  </div>
</div>

<style>
  .payment-container {
    max-width: 100%;
    margin: 0 auto;
  }
  
  h3 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .payment-details {
    margin-bottom: 20px;
  }
  
  .card-container {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  .card-element {
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: white;
    transition: border-color 0.3s;
    min-height: 24px;
  }
  
  .error-message {
    padding: 10px;
    margin-bottom: 15px;
    background-color: #fff0f0;
    border-left: 4px solid #e74c3c;
    color: #e74c3c;
  }
  
  .payment-button {
    display: block;
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    position: relative;
  }
  
  .payment-button:hover:not(:disabled) {
    background-color: #45a049;
  }
  
  .payment-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
    position: relative;
    top: 3px;
    margin-right: 5px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .payment-notice {
    margin-top: 15px;
    text-align: center;
    color: #666;
  }
</style>