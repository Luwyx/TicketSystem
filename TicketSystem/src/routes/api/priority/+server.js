import { json } from '@sveltejs/kit';
import { connection } from '../db';

export  async function GET() {
    return json(await getPrioritys());
}


async function getPrioritys() { 
    const result = await connection.query('SELECT * FROM priority');
    return result.rows;
  }
