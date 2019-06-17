const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const uri = `mongodb://localhost:27017/url-short-cut`

mongoose.connect(uri, {useNewUrlParser: true})
    .then(res => {
        console.log('connected to db: url-short-cut')
    })
    .catch(err => {
        console.log('error connecting db...')
    })

module.export = mongoose