require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
const pool = require('./db')
const router = require('./routes')

//middlewares
app.use(cors())
app.use(express.json())

const startUp = async()=> {
    await pool.connect()
    console.log("connected to db")
}

app.use('/api', router)

startUp()

const port = process.env.PORT || 5000
app.listen(5000,()=> {
    console.log("server is starting on port ",port)
})
