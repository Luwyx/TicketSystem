import { json } from '@sveltejs/kit';
import { getData, deleteData, updateData } from '../../baseApi';

// Get a faq
export async function GET({ params }) {
    const { id } = params; // Extract 'id' from params
    let indexId = null;

    // Check if id is a number and use it as userId
    if (id && !isNaN(parseInt(id))) {
        indexId = parseInt(id);
    }
    //return json('TEST')
    return json(await getData('notes', indexId, 'userId'));
}

export async function DELETE({ params }){
    const { id } = params;
    let indexId = null;

    if (id && !isNaN(parseInt(id))) {
        indexId = parseInt(id);
    }
    return json(await deleteData('notes', indexId, 'noteId'));
}

export async function PUT({ params, request }){
    const body = await request.json();

    const { id } = params;
    let indexId = null;

    if (id && !isNaN(parseInt(id))) {
        indexId = parseInt(id);
    }
    return json(await updateData('notes', indexId, 'noteId', body));
}

