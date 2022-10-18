//post model
const Card = require('../models/weddStories')
//resize image 
const sharp = require('sharp');
const path = require('path');
const fs = require('fs')

module.exports = class API {

    //fetch all posts
    static async fetchAllPost(req, res) {

        try {
            const posts = await Card.find({}).sort({  createdAt : -1 })
            res.status(200).json(posts);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

   //fetch post by ID
   static async fetchPostById(req, res) {
       
    const id = req.params.id
    console.log(id)
        try {
            const post = await Card.findById(id).sort({images: 1});
            res.status(200).json(post)
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }

   //Create a CARD
   static async CreateCard(req, res) {
       
    const post = req.body 
        try {
              post.image = await req.files[0].filename
              const newPost = await Card.create(post);
              res.status(200).json({message:"Nova prica dodata"})
            

        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }

    //Create a CARD images
   static async CreateImagesCard(req, res) {
       
        try {
              for (const file of req.files) {
                await Card.updateOne(
                    { _id:  await req.body.id },
                    { $push: { images:  await file.filename } },)
                }
              

              res.status(200).json({message:"Nove slike dodate u vjencanje"})
            

        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }


    

      //Update  CARD
      static async updateCard(req, res) {
       
        const newPostData = req.body 
        const id = req.params.id 
        console.log(req.files[0])
            try {
                  if(req.files[0]){

                    newPostData.image = await req.files[0].filename
                    const newPost = await Card.findByIdAndUpdate(id,newPostData);
                  }
                  else{
                    const newPost = await Card.updateOne({_id: id},{$set: {name: req.body.name}} );
                  }
                
               

                  res.status(200).json({message:"Wed storie updated"})
                
    
            } catch (error) {
                res.status(404).json({message: error.message})
            }
        }



    //Delete post
    static async DeletePost(req, res) {

        const id = req.params.id
        try {
            const image = await Card.findById(id);
            try {
                fs.unlinkSync('uploads/'+image.image)
            } catch (error) {
                console.log({message: error.message});
            }
            const deletePost = await Card.findByIdAndDelete(id)
            res.status(200).json({message: "Post deleted succesfully"})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }



    //Delete all  post
    static async DeletePostAll(req, res) {
        try {
            //find all images
            const images = await Card.find({});
            //remove images from folder
            try {
                images.forEach(image=> {
                fs.unlinkSync('uploads/'+image.image)
                })
            } catch (error) {
                console.log({message: error.message});
            }
            //delete all
            await Card.deleteMany({})
            res.status(200).json({message: "All Posts deleted succesfully"})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }

}