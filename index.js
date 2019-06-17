const express = require('express')
const mongoose =  require('./config/database')
const router = require('./api/controllers/bookmarkController')

const app = express()
app.use(express.json())

const port = process.env.port || 3002

app.get('/', (req, res) => {
    res.send('Welcome to url-shortner')
})

app.use('/', router)

app.listen(port, () => {
    console.log('server at port: ', port)
})