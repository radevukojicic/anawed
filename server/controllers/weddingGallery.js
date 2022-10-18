//post model
const Card = require('../models/weddStories')
//resize image 
const sharp = require('sharp');
const path = require('path');
const fs = require('fs')

module.exports = class API {

    //Update a CARD images
    static async CreateImagesCard(req, res) {
       
        try {
              for (const file of req.files) {
                await Card.updateOne(
                    { _id: req.body.id },
                    { $push: { images: file.filename } },)
              }
              

              res.status(200).json({message:"Nove slike dodate u vjencanje"})
            

        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }

      //Update a CARD images
    static async UpdateImageCard(req, res) {
       const id = req.params.id
       let oldImg = req.params.image
       let newImg = req.files[0].filename
    try {
        try {
            fs.unlinkSync('uploads/'+oldImg)
        } catch (error) {
            console.log({message: error.message});
        }
            await Card.updateOne(
                {_id: id, images : oldImg },
                { $set: { "images.$" : newImg } }
           )
          res.status(200).json({message:"izmena slike za vjencanje"})
        

    } catch (error) {
        res.status(404).json({message: error.message})
    }
    }



    //Delete image from gallery
    static async DeletePost(req, res) {
        const id = req.params.id
        try {
            try {
                fs.unlinkSync('uploads/'+req.params.image)
            } catch (error) {
                console.log({message: error.message});
            }
            const deletePost = await Card.updateOne(
                { _id: id },
                { $pull: { 'images': req.params.image } }
              );     
            res.status(200).json({message: "Image deleted succesfully"})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }



    //Delete all  post
    static async DeletePostAll(req, res) {
        try {
            let id = req.params.id
            //remove images from folder
            let imagesCard = await Card.findOne({_id:id})
            try {
                imagesCard.images.forEach(image=> {
                fs.unlinkSync('uploads/'+image)
                })
            } catch (error) {
                console.log({message: error.message});
            }
            //delete all
            await Card.updateOne(
                { _id: id },
                { $set : {'images': [] }} , {multi:true} 
              );
            res.status(200).json({message: "All images deleted succesfully"})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }

}