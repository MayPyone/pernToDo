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
        await pool.query(`
            DROP TABLE todo;
            );
        `);
        console.log('Database initialized');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

module.exports = {pool, initializeDatabase}