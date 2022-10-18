//user model
const User = require('../models/User')
//modules
const bcrypt = require('bcrypt')
var jwt = require("jsonwebtoken");
//secret
const secret = require("../config/keys").secret;

module.exports = class API {

    //login

    static async login(req, res) {
        
        //check if user exist
        User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            //if user exist check passwords
            // var passwordIsValid = bcrypt.compareSync(
            //     req.body.password,
            //     user.password
            // );
            var passwordIsValid = false;
            if(req.body.password == user.password) passwordIsValid = true;
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            //if all is good create token
            var token = jwt.sign({
                id: user.id,
                name: user.name,
                username: user.username
                }, secret, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).send({
                id: user.id,
                username: user.username,
                name: user.name,
                token: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    }
}