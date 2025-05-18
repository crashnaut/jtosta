import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { paymentRouter } from './payment';

// Initialize Firebase Admin
admin.initializeApp();

// Export functions
export const payments = functions.https.onRequest(paymentRouter);