// Node Modules
const express = require('express')
const bodyParser = require('body-parser')

// Project module
const db = require('./config/mongoose')

// Variable
const app = express()
const port = process.env.PORT || 8080

// Middlewares --->

//Request Body Parser
app.use(bodyParser.urlencoded({extended:false}))


//routers
app.use('/',require('./routes'))


// Server
app.listen(port,(err)=>{
    if(err) console.log(`error on running the server on port : ${port}`)
    else console.log(`Server is running on port: ${port}`)
})