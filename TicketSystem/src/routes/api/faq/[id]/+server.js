import { json } from '@sveltejs/kit';
import { getData } from '../../baseApi';

// Get a faq
export async function GET({ params }) {
    const { id } = params; // Extract 'id' from params
    let userId = null;

    // Check if id is a number and use it as userId
    if (id && !isNaN(parseInt(id))) {
        userId = parseInt(id);
    }
    //return json('TEST')
    return json(await getData('faq', userId, 'faqId'));
}


