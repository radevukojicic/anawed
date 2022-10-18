//post model
const Post = require('../models/slike')
//resize image 
const sharp = require('sharp');
const path = require('path');
const fs = require('fs')

module.exports = class API {

    //fetch all posts
    static async fetchAllPost(req, res) {

        try {
            console.log(req.params.category)
            const posts = await Post.find({category:req.params.category}).sort({  createdAt : -1 })
            res.status(200).json(posts);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

   //fetch post by ID
   static async fetchPostById(req, res) {
       
    const id = req.params.id 
        try {
            const post = await Post.findById(id);
            res.status(200).json(post)
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }

   //Create a post
   static async CreatePost(req, res) {
       
    const post = req.body 
        try {

           for (const file of req.files) {

            //get image metadata and set new size 
            const metadata = await sharp(`./${file.path}`).metadata();
            let width = metadata.width 
            let height = metadata.height 
            if (width > height) {
                width = 2000
                height = 1500
            }
            if (height > width){
                width = 1500
                height = 2000
            }
  
            const { filename: image } = file;
            await sharp(file.path)
                .resize(width,height)
                .webp({ quality: 80 })
                .toFile(
                     path.resolve(file.destination,'resized',image)
                )
                //unlink old images
                await fs.unlinkSync(file.path)


              post.image = await file.filename
              const newPost = await Post.create(post);
            }
            res.status(200).json({message:"Nove fotografije dodate"})

        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }

   //Update post
   static async UpdatePost(req, res) {
    const id = req.params.id 
    //TODO: Un link old image

    // if (req.file) {
    //     new_image = req.file.filename
    //     try {
    //         fs.unlinkSync('./uploads/'+req.body.image);
    //     } catch (error) {
    //         console.log({message: error.message})
    //     }
    // }
    // else{
    //     new_image = req.body.image
    // }

    const post = req.body

       try {
        
          for (const file of req.files) {


            //get image metadata and set new size 
            const metadata = await sharp(`./${file.path}`).metadata();
            let width = metadata.width 
            let height = metadata.height 
            if (width > height) {
                width = 2000
                height = 1400
            }
            if (height > width){
                width = 1400
                height = 2000
            }
  
            const { filename: image } = file;
            await sharp(file.path)
                .resize(width,height)
                .webp({ quality: 80 })
                .toFile(
                     path.resolve(file.destination,'resized',image)
                )
                //unlink old images
                fs.unlinkSync(file.path)


              post.image = file.filename
              const newPost = await Post.findByIdAndUpdate(id,post)
              
            }
           res.status(200).json({message: "Post updated sucessfully"})
       } catch (error) {
           res.status(404).json({message: error.message})
       }
   }

    //Delete post
    static async DeletePost(req, res) {

        const id = req.params.id
        try {
            const image = await Post.findById(id);
            try {
                fs.unlinkSync('uploads/resized/'+image.image)
            } catch (error) {
                console.log({message: error.message});
            }
            const deletePost = await Post.findByIdAndDelete(id)
            res.status(200).json({message: "Post deleted succesfully"})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }



    //Delete all  post
    static async DeletePostAll(req, res) {
        try {
            //find all images
            const images = await Post.find({category:req.params.category});
            //remove images from folder
            try {
                images.forEach(image=> {
                fs.unlinkSync('uploads/resized/'+image.image)
                })
            } catch (error) {
                console.log({message: error.message});
            }
            //delete all
            await Post.deleteMany({category:req.params.category})
            res.status(200).json({message: "All Posts deleted succesfully"})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }

}