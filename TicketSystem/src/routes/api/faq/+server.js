import { json } from '@sveltejs/kit';
import { getData, createData } from '../baseApi';

// This file is to get a list of all FAQ
export async function GET() {
    return json(await getData('faq'));
}

// Create a faq
export async function POST({ params }) {
    //return json('TEST')
    return json(params);
    return json(await createData('faq', 'body'));
}