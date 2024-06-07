import { json } from '@sveltejs/kit';
import { connection } from '../db';
import { getData, updateData, deleteData  } from '../baseApi';

export async function GET() {
	//return json(await getNewestSla());
	//return json(await getData('newestSla'));
	return json(await deleteData('newestSla', 4, 'testId'  ));
}

// Only get for reading the newes version of the SLA
async function getNewestSla() {
	const exampleObject = {
		header: "Example Header",
		text: "Example text';",
		createDate: "2024-06-07T12:00:00Z",
		version: "1.0"
	  };
	const result = await connection.query('SELECT * FROM "newestSla"');
	if (result.rows.length > 0) {
		return result.rows[0];		
	} else {
		return null;
	}
}