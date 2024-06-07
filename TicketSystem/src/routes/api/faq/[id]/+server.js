import { json } from '@sveltejs/kit';
import { connection } from '../../db'; // Adjusted the import path

// Fetch FAQs
export async function GET({ params }) {
    const { id } = params; // Extract 'id' from params
    let userId = null;

    // Check if id is a number and use it as userId
    if (id && !isNaN(parseInt(id))) {
        userId = parseInt(id);
    }
    try {
        const faqs = await getFaq(userId);
        return json(faqs);
    } catch (error) {
        console.error('Error fetching FAQs:', error); // Debugging line for errors
        return json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}

// Create FAQ
export async function POST({ request }) {
    const { userId, question, answer } = await request.json();

    try {
        const result = await createFaq(userId, question, answer);
        return json(result);
    } catch (error) {
        console.error('Error creating FAQ:', error); // Debugging line for errors
        return json({ error: 'Failed to create FAQ' }, { status: 500 });
    }
}

// Update FAQ
export async function PUT({ request }) {
    const { id, question, answer } = await request.json();

    try {
        const result = await updateFaq(id, question, answer);
        return json(result);
    } catch (error) {
        console.error('Error updating FAQ:', error); // Debugging line for errors
        return json({ error: 'Failed to update FAQ' }, { status: 500 });
    }
}

// Mark FAQ as deleted
export async function DELETE({ request }) {
    const { id } = await request.json();

    try {
        const result = await markFaqAsDeleted(id);
        return json(result);
    } catch (error) {
        console.error('Error deleting FAQ:', error); // Debugging line for errors
        return json({ error: 'Failed to delete FAQ' }, { status: 500 });
    }
}




async function createFaq(userId, question, answer) {
    const query = `INSERT INTO faq ("userId", question, answer, deleted) VALUES ($1, $2, $3, false) RETURNING *`;
    const values = [userId, question, answer];

    try {
        const result = await connection.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query:', error); // Debugging line for query errors
        throw error;
    }
}

async function updateFaq(id, question, answer) {
    const query = `UPDATE faq SET question = $1, answer = $2 WHERE id = $3 AND deleted = false RETURNING *`;
    const values = [question, answer, id];

    try {
        const result = await connection.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query:', error); // Debugging line for query errors
        throw error;
    }
}

async function markFaqAsDeleted(id) {
    const query = `UPDATE faq SET deleted = true WHERE id = $1 RETURNING *`;
    const values = [id];

    try {
        const result = await connection.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error executing query:', error); // Debugging line for query errors
        throw error;
    }
}
