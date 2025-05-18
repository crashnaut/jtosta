"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const admin = __importStar(require("firebase-admin"));
const stripe_1 = __importDefault(require("stripe"));
// Create express router
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
// Auth middleware to ensure requests are authenticated
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Unauthorized', message: 'No authentication token provided' });
    }
    const idToken = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        res.locals.user = decodedToken;
        return next();
    }
    catch (error) {
        return res.status(403).json({ error: 'Unauthorized', message: 'Invalid authentication token' });
    }
};
// Initialize Stripe with the secret key from environment variables
const stripe = new stripe_1.default(process.env.STRIPE_SECRET || 'sk_test_placeholder', {
    apiVersion: '2023-08-16', // Use the latest API version supported by the package
});
// Check if Stripe is properly configured
app.get('/config', (req, res) => {
    // Only return a boolean indicating if Stripe is configured
    // Never return the actual API key
    const isConfigured = !!process.env.STRIPE_SECRET;
    res.json({
        isConfigured,
        publishableKey: process.env.STRIPE_PUBLIC || '',
        currency: 'brl',
    });
});
// Create a payment intent (requires authentication)
app.post('/create-payment-intent', authenticateUser, async (req, res) => {
    try {
        const { amount, description, metadata = {} } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }
        // Get the authenticated user
        const user = res.locals.user;
        // Create the payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents/centavos
            currency: 'brl',
            description,
            metadata: Object.assign(Object.assign({}, metadata), { userId: user.uid, userEmail: user.email || '' }),
        });
        // Log payment intent creation for auditing
        console.log(`Payment intent created: ${paymentIntent.id} for user ${user.uid}`);
        // Only return the client secret, never return the entire payment intent
        return res.json({
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (error) {
        console.error('Error creating payment intent:', error);
        return res.status(500).json({
            error: 'Failed to create payment intent',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Record a successful payment (called after client-side confirmation)
app.post('/record-payment', authenticateUser, async (req, res) => {
    try {
        const { paymentIntentId, serviceType, details } = req.body;
        if (!paymentIntentId) {
            return res.status(400).json({ error: 'Payment intent ID is required' });
        }
        // Get the authenticated user
        const user = res.locals.user;
        // Retrieve the payment intent from Stripe to verify it
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        // Verify that the payment was successful
        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ error: 'Payment has not been completed successfully' });
        }
        // Store the payment record in Firestore
        const paymentRecord = {
            userId: user.uid,
            userEmail: user.email || '',
            paymentIntentId,
            amount: paymentIntent.amount / 100, // Convert back from cents to real
            currency: paymentIntent.currency,
            description: paymentIntent.description,
            status: paymentIntent.status,
            serviceType: serviceType || 'general',
            details: details || {},
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        // Save to Firestore
        await admin.firestore().collection('payments').doc(paymentIntentId).set(paymentRecord);
        return res.json({ success: true });
    }
    catch (error) {
        console.error('Error recording payment:', error);
        return res.status(500).json({
            error: 'Failed to record payment',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Webhook handler for Stripe events (no authentication required)
app.post('/webhook', express_1.default.raw({ type: 'application/json' }), async (req, res) => {
    const signature = req.headers['stripe-signature'];
    if (!signature) {
        return res.status(400).json({ error: 'Missing Stripe signature' });
    }
    try {
        // Verify the webhook signature
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
        const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
        // Handle different event types
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
                // Process successful payment (could sync with your database, etc.)
                break;
            case 'payment_intent.payment_failed':
                const failedPayment = event.data.object;
                console.log(`PaymentIntent ${failedPayment.id} failed`);
                // Handle failed payment
                break;
            // Add more event types as needed
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
        return res.json({ received: true });
    }
    catch (error) {
        console.error('Webhook error:', error);
        return res.status(400).json({
            error: 'Webhook signature verification failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Export the express app as the payment router
exports.paymentRouter = app;
//# sourceMappingURL=payment.js.map