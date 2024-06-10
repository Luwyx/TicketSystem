import { json } from '@sveltejs/kit';
import { connection } from './db';


async function getData(tableName, filterId = null, idField = null) {
    let query = `SELECT * FROM "${tableName}"`;
    // Check if "isDeleted" exists in the table
    const isDeletedColumnExistsQuery = `
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = $1 AND column_name = 'isDeleted'
    `;
    // For test at home
    const isDeletedColumnExistsResult = await connection.query(isDeletedColumnExistsQuery, [tableName]);
    const isDeletedColumnExists = isDeletedColumnExistsResult.rows.length > 0;
    // If "isDeleted" column exists, add the condition to the query
    if (isDeletedColumnExists) {
        query += ` WHERE "isDeleted" = false`;
    }

    // Add filterId condition if provided
    if (filterId !== null && idField !== null) {
        if (query.includes('WHERE')) {
            query += ` AND "${idField}" = ${filterId}`;
        } else {
            query += ` WHERE "${idField}" = ${filterId}`;
        }
    }
    //return query;
    const result = await connection.query(query);

    if (result.rows.length > 0) {
        return result.rows;
    } else {
        return null;
    }
}




// Updata data given the table, id of the row and the data to update in json format with machung headers to the table
async function updateData(tableName, id, idField = 'id', body) {
    const fieldsToUpdate = Object.keys(body).map((key, index) => `"${key}" = $${index + 2}`).join(', ');
    const query = `UPDATE "${tableName}" SET ${fieldsToUpdate} WHERE "${idField}" = $1`;
    const values = [id, ...Object.values(body)];
    await connection.query(query, values);
    return getData(tableName, id, idField);
}

// Update the field 'isDeleted' with true given the table and id of the row
async function deleteData(tableName, id, idField = 'id') {
    const query = `UPDATE "${tableName}" SET "isDeleted" = true WHERE "${idField}" = $1`;
    const result = await connection.query(query, [id]);
    return result.rows[0];
}

// Create the data in the given tabel using the data provided in the body and only data provided in the body
async function createData(tableName, body) {
    const fields = Object.keys(body).map(key => `"${key}"`).join(', ');
    const placeholders = Object.keys(body).map((_, index) => `$${index + 1}`).join(', ');
    const query = `INSERT INTO "${tableName}" (${fields}) VALUES (${placeholders}) RETURNING *`;
    const values = Object.values(body);
    const result = await connection.query(query, values);
    return result.rows[0];
}

export { getData, updateData, deleteData, createData };