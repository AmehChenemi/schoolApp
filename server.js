const express = require("express")
const dotenv = require('dotenv').config()
const mongoose = require ('mongoose')
const router = require('./routes/router')
const scoreRouter = require('./routes/scoreRouter')
// const port = 4444


const app = express()
app.use(express.json())
app.use( router)
app.use( scoreRouter)


const db = process.env.link
const port = process.env.port

mongoose.connect (db).then(()=>{
  console.log(`Database connected successfully`)
})
.catch((err)=>{
    console.log(`unable to connect ${err}`)
})

app.listen(port,()=>{
    console.log(`server is listening on port:${port}`)
})