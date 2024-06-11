import { json } from '@sveltejs/kit';
import { getData, createData } from '../baseApi';

// This file is to get a list of all FAQ
export async function GET() {
    return json(await getData('notes'));
}

// Create a faq
export async function POST({ request }) {

    const body = await request.json();
    return new Response(JSON.stringify(await createData('notes', body)), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });    
}