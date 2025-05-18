<!-- Example usage of the payment modal -->
<script lang="ts">
  import PaymentModal from '$lib/components/payment-modal.svelte';
  import { user } from '$lib/stores/auth';
  
  let showPaymentModal = false;
  let paymentAmount = 150.00;
  let paymentDescription = "Sessão de Terapia - 50 minutos";
  
  function openPaymentModal() {
    showPaymentModal = true;
  }
  
  function handlePaymentSuccess(event) {
    // Handle successful payment
    console.log('Payment successful:', event.detail);
    alert('Pagamento realizado com sucesso!');
    // In a real implementation you might want to:
    // - Update the user's subscription status
    // - Show a confirmation message
    // - Redirect to a success page
    // - Send an email confirmation
  }
</script>

<div class="payment-example">
  <h2>Exemplo de Pagamento</h2>
  
  <div class="payment-card">
    <h3>Sessão de Terapia</h3>
    <p>Uma sessão individual de terapia com duração de 50 minutos.</p>
    <p class="price">R$ 150,00</p>
    
    {#if $user}
      <button class="payment-button" on:click={openPaymentModal}>
        Agendar e Pagar
      </button>
    {:else}
      <div class="login-message">
        <p>Faça login para agendar uma sessão</p>
      </div>
    {/if}
  </div>
  
  <!-- Payment Modal -->
  <PaymentModal
    bind:open={showPaymentModal}
    amount={paymentAmount}
    description={paymentDescription}
    title="Pagamento de Sessão"
    buttonText="Confirmar Pagamento"
    on:success={handlePaymentSuccess}
  />
</div>

<style>
  .payment-example {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .payment-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #4CAF50;
    margin: 15px 0;
  }
  
  .payment-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .payment-button:hover {
    background-color: #45a049;
  }
  
  .login-message {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    color: #666;
  }
</style>