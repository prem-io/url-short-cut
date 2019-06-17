const express = require('express')
const mongoose =  require('./config/database')
const app = express()

const port = process.env.port || 3002

app.get('/', (req, res) => {
    res.send('Welcome to url-shortner')
})

app.listen(port, (req, res) => {
    console.log('server at port: ', port)
})