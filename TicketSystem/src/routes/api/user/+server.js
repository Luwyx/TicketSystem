import { json } from '@sveltejs/kit';
import { connection } from '../db'; // Adjusted the import path

// This file is to get a list of all FAQ
export async function GET() {
    try {
        const faqs = await getUser();
        return json(faqs);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        return json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}
async function getUser(userId = null) {
    let query = 'SELECT * FROM users';

    if (userId !== null && Number.isInteger(userId)) {
        query += ` WHERE "userId" = ${userId}`;
    }

    try {
        const result = await connection.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

