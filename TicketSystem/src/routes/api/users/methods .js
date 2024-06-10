import { connection } from '../db';
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
export { getUser };