import { json } from '@sveltejs/kit';
import { getData, createData } from '../baseApi';

// This file is to get a list of all FAQ
export async function GET() {
    return json(await getData('faq'));
}

// Create a faq
export async function POST({ request }) {

    const body = await request.json();
    return new Response(JSON.stringify(await createData('faq', body)), {
        status: 201,
        headers: {
            'Content-Type': 'application/json'
        }
    });    
}