// db.js
import pkg from 'pg';
const {Pool} = pkg;

const connection = new Pool({
    user: 'postgres',
    host: '10.130.56.49',
    database: 'TicketSystem',
    password: 'admin',
    port: 5432,
});

export { connection };
