const mongoose = require('mongoose');
const Schema = mongoose.Schema

//Create the User Schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
}, {
    collection: 'user'
})

module.exports = mongoose.model('User', UserSchema)
