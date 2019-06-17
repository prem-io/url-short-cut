const express = require('express')
const router = express.Router()

const Bookmark = require('../models/bookmark')

router.post('/bookmarks', (req, res) => {
    const body = req.body
    const bookmark = new Bookmark(body)

    // pre-save middleware
    bookmark.save()
        .then((bookmark) => {
            res.send(bookmark)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/bookmarks', (req, res) => {
    Bookmark.find()
        .then((bookmarks) => {
            res.send(bookmarks)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/bookmarks/:id', (req, res) => {
    const id = req.params.id
    Bookmark.findById(id)
        .then((bookmark) => {
            (bookmark) ? res.send(bookmark) : res.status(404).send({"error" : "Requested bookmark not found"})
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/bookmarks/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    Bookmark.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((bookmark) => {
            res.send(bookmark)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/bookmarks/:id', (req, res) => {
    const id = req.params.id
    Bookmark.findByIdAndDelete(id)
        .then((bookmark) => {
            res.send(bookmark)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/:hash', (req, res) => {
    const hash = req.params.hash;
    Bookmark.findOne({
        "hashed_url": hash
    })
    .then((bookmark) => {
        if(bookmark === null) return res.send('Uh oh. We could not find a link at that URL')
        res.redirect('http://' + bookmark.original_url)
    })
    .catch((err) => {
        res.status(400).send({"error" : "Sorry, the link has expired."})
    })
})

module.exports = router