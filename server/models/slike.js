const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    image: String,
    category: String
    
},
{ timestamps: true }); 



module.exports = mongoose.model("slike", postSchema)