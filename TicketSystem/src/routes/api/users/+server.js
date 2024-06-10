import { json } from '@sveltejs/kit';
import { getData } from '../baseApi';

// This file is to get a list of all FAQ
export async function GET() {
    return json(await getData('users'));
}


