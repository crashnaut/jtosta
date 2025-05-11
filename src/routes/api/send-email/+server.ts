import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// POST handler for the email sending endpoint
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { to, from, name, message, phone, userId, timestamp } = body;

		// Validate required fields
		if (!to || !from || !name || !message || !userId) {
			throw error(400, 'Missing required fields');
		}

		// In a production environment, you would integrate with an email service like SendGrid, Mailgun, etc.
		// For now, let's store the message in Firestore for the admin to read
		
		// Import Firestore dynamically (since this is a server-side route)
		const { db } = await import('$lib/firebase/config');
		
		// Store the message in Firestore
		const messagesCollection = collection(db, 'contact_messages');
		await addDoc(messagesCollection, {
			to,
			from,
			name,
			message,
			phone: phone || null,
			userId,
			timestamp,
			read: false
		});
		
		// You could also trigger an email notification to the admin here
		// using a service like SendGrid, Mailgun, etc.
		
		return json({ success: true, message: 'Message sent successfully!' });
	} catch (err) {
		console.error('Error sending email:', err);
		return error(500, 'Failed to send message');
	}
};