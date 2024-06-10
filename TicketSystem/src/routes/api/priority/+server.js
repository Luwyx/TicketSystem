import { json } from '@sveltejs/kit';
import { getData } from '../baseApi';


export  async function GET() {
    return json(await getData('priority'));
}