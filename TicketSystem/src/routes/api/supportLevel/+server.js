import { json } from '@sveltejs/kit';
import { connection } from '../db';

export  async function GET() {
    return json(await getStatus());
}

async function getStatus() {
    const result = await connection.query('SELECT * FROM "supportLevel"');
    return result.rows;
  } 



