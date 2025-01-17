const Pool = require("pg").Pool;

const connect = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port :process.env.PORT,
    database: process.env.DATABASE,
    database_url: process.env.Database_URL
})

module.exports = connect