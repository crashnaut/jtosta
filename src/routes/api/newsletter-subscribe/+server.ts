import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

// POST handler for the newsletter subscription endpoint
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { email } = body;

		// Validate email
		if (!email || !email.includes('@')) {
			throw error(400, 'Valid email is required');
		}

		// Import Firestore dynamically
		const { db } = await import('$lib/firebase/config');
		
		// Check if email already exists in the subscriptions collection
		const subscriptionsRef = collection(db, 'newsletter_subscriptions');
		const q = query(subscriptionsRef, where("email", "==", email));
		const querySnapshot = await getDocs(q);
		
		// If email already exists, return success without adding a duplicate
		if (!querySnapshot.empty) {
			return json({ success: true, message: 'You are already subscribed!' });
		}
		
		// Add new subscription to Firestore
		await addDoc(subscriptionsRef, {
			email,
			subscribedAt: new Date().toISOString(),
			active: true
		});
		
		// In a production environment, you might want to add the user to an email marketing service
		// like Mailchimp, SendGrid, etc.
		
		return json({ success: true, message: 'Successfully subscribed to the newsletter!' });
	} catch (err) {
		console.error('Error subscribing to newsletter:', err);
		return error(500, 'Failed to subscribe to the newsletter');
	}
};