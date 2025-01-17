const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    database_url: process.env.Database_URL
})

const initializeDatabase = async () => {
    try {
        // Drop the table if it exists
        await pool.query(`
            DROP TABLE IF EXISTS todo;
        `);
        console.log('Table "todo" has been dropped.');

        // Optionally, recreate the table if needed
        await pool.query(`
            CREATE TABLE todo (
                id SERIAL PRIMARY KEY,
                description TEXT NOT NULL,
                completed BOOLEAN DEFAULT false
            );
        `);
        console.log('Table "todo" has been recreated.');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

module.exports = {pool, initializeDatabase}