// Stripe service for handling payment-related operations
import { stripeConfig, isStripeConfigured } from './config';
import { auth, getCurrentUser } from '$lib/firebase/auth';
import type { Stripe, StripeElements, StripePaymentElement } from '@stripe/stripe-js';

// Define types for payment
export interface PaymentIntent {
  id: string;
  amount: number;
  status: string;
  client_secret?: string;
}

export interface PaymentResult {
  success: boolean;
  clientSecret?: string;
  error?: string;
  paymentIntentId?: string;
}

export interface PaymentOptions {
  amount: number;
  description: string;
  metadata?: Record<string, any>;
  successUrl?: string;
  cancelUrl?: string;
}

/**
 * Service for handling Stripe payments
 * Uses singleton pattern to ensure only one instance exists
 */
export class StripeService {
  private static instance: StripeService;
  private stripe: Stripe | null = null;

  private constructor() {
    // Private constructor for singleton pattern
  }

  /**
   * Get the singleton instance of StripeService
   */
  public static getInstance(): StripeService {
    if (!StripeService.instance) {
      StripeService.instance = new StripeService();
    }
    return StripeService.instance;
  }

  /**
   * Load Stripe dynamically when needed
   * @returns Promise resolving to whether Stripe was successfully loaded
   */
  public async loadStripe(): Promise<boolean> {
    if (!isStripeConfigured()) {
      console.warn('Stripe is not configured. Please set PUBLIC_STRIPE_PUBLIC_KEY in your environment variables.');
      return false;
    }

    if (!this.stripe) {
      try {
        // Dynamic import to avoid loading Stripe until needed
        const { loadStripe } = await import('@stripe/stripe-js');
        this.stripe = await loadStripe(stripeConfig.publicKey);
        return !!this.stripe;
      } catch (error) {
        console.error('Failed to load Stripe:', error);
        return false;
      }
    }
    return !!this.stripe;
  }

  /**
   * Get the current user's auth token for API calls
   * @returns Promise resolving to the ID token or null if not authenticated
   */
  private async getUserToken(): Promise<string | null> {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      console.error('User not authenticated');
      return null;
    }
    
    try {
      return await currentUser.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  }

  /**
   * Create a payment intent by calling our Firebase Function
   * @param options Payment options including amount and description
   * @returns Promise resolving to payment result
   */
  public async createPaymentIntent(options: PaymentOptions): Promise<PaymentResult> {
    const { amount, description, metadata = {} } = options;
    
    // Make sure the user is authenticated
    const idToken = await this.getUserToken();
    if (!idToken) {
      return { 
        success: false, 
        error: 'Usuário não autenticado. Por favor, faça login para continuar.' 
      };
    }
    
    try {
      // Call our Firebase Function to create a payment intent
      const response = await fetch('/api/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          amount,
          description,
          metadata
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao processar pagamento');
      }
      
      if (!data.clientSecret) {
        throw new Error('Resposta inválida do servidor de pagamento');
      }
      
      return {
        success: true,
        clientSecret: data.clientSecret
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido ao processar pagamento'
      };
    }
  }

  /**
   * Confirm a payment with the Stripe SDK
   * @param clientSecret Client secret from the PaymentIntent
   * @param options Additional options for confirmation
   * @returns Promise resolving to payment result
   */
  public async confirmPayment(
    clientSecret: string, 
    elements: StripeElements,
    serviceType: string = 'general',
    details: Record<string, any> = {}
  ): Promise<PaymentResult> {
    if (!this.stripe) {
      const loaded = await this.loadStripe();
      if (!loaded) {
        return { 
          success: false, 
          error: 'Stripe não está inicializado' 
        };
      }
    }
    
    try {
      const { error, paymentIntent } = await this.stripe!.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/payment-success',
        },
        redirect: 'if_required'
      });
      
      if (error) {
        throw new Error(error.message || 'Erro ao confirmar pagamento');
      }
      
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Record the successful payment in our backend
        await this.recordPayment(paymentIntent.id, serviceType, details);
        
        return {
          success: true,
          paymentIntentId: paymentIntent.id
        };
      } else {
        return {
          success: false,
          error: paymentIntent ? `Status do pagamento: ${paymentIntent.status}` : 'Status do pagamento desconhecido'
        };
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido ao confirmar pagamento'
      };
    }
  }
  
  /**
   * Record a successful payment in our database
   * @param paymentIntentId ID of the successful payment intent
   * @param serviceType Type of service being paid for
   * @param details Additional details about the payment
   * @returns Promise resolving to whether recording was successful
   */
  private async recordPayment(
    paymentIntentId: string, 
    serviceType: string = 'general', 
    details: Record<string, any> = {}
  ): Promise<boolean> {
    // Make sure the user is authenticated
    const idToken = await this.getUserToken();
    if (!idToken) {
      console.error('User not authenticated');
      return false;
    }
    
    try {
      const response = await fetch('/api/payment/record-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          paymentIntentId,
          serviceType,
          details
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao registrar pagamento');
      }
      
      return data.success;
    } catch (error) {
      console.error('Error recording payment:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const stripeService = StripeService.getInstance();