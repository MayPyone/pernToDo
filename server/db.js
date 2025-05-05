const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: isProduction
    ? process.env.DATABASE_URL
    : `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DATABASE}`,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});


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
                todo_id SERIAL PRIMARY KEY,
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
