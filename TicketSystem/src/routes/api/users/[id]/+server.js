import { json } from '@sveltejs/kit';
//import { connection } from '../db';
import { getUser } from '../+server';

export async function GET({ params }) {
    const { id } = params; // Extract 'id' from params
    let userId = null;

    // Check if id is a number and use it as userId
    if (id && !isNaN(parseInt(id))) {
        userId = parseInt(id);
    }
    try {
        console.log(userId);
        const faqs = await getUser(userId);
        console.log(faqs);
        return json(faqs);
    } catch (error) {
        console.error('Error fetching FAQs:', error); // Debugging line for errors
        return json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}