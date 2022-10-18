const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
    slika: {
        type: String
    },
    ime: {
        type: String
    },
    tip: {
        type: String
    },
    kvadratura: {
        type: String
    },
    grad: {
        type: String
    },
    broj: {
        type: String
    },
}, {
    collection: 'nekretnine'
},
{ timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)