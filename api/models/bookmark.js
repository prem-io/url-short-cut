const mongoose = require('mongoose')
const validator = require('validator')
const sh = require('shorthash')

const Schema = mongoose.Schema

const BookmarkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    original_url: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return validator.isURL(value)
            },
            message: function(){
                return 'invalid URL format'
            }
        }
    },
    hashed_url: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

BookmarkSchema.pre('save', function(next) {
    const bookmark = this
    bookmark.hashed_url = sh.unique(bookmark.original_url)
    console.log("pre-save",bookmark.hashed_url, bookmark.original_url)
    next();
});

const Bookmark = mongoose.model('Bookmark', BookmarkSchema)

module.exports = Bookmark