const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    image: String,
    name: String,
    images: Array,

    
},
{ timestamps: true }); 



module.exports = mongoose.model("weddStories", postSchema)