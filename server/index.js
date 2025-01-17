require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
const {pool, initializeDatabase} = require('./db')
const router = require('./routes')

//middlewares
app.use(cors())
app.use(express.json())

const startUp = async()=> {
    await initializeDatabase()
    await pool.connect()
    console.log("connected to db")
}

app.use('/api', router)
app.get('/',async(req,res)=> {
    res.json({success: "true", message: "Api is working"})
})

startUp()

const port = process.env.PORT || 5000
app.listen(port,()=> {
    console.log("server is starting on port ",port)
})
