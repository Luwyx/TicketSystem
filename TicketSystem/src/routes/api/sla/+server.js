import { json } from '@sveltejs/kit';
import { connection } from '../db';

export  async function GET() {
    return json(await getNewestSla());
}


// Only get for reading the newes version of the SLA
async function getNewestSla() {
    const result = await connection.query('SELECT * FROM "newestSla"');
    if (result.rows.length > 0){
      return result.rows[0];
    } else{
      return null;
    }
  }
