const express = require('express');

//Web Site controllers
const website = require('../controllers/website/pagesController')

//CONTROLLERS ROUTES

//posts
const postRoute = require('./postRoute')

//cards
const cardRoute = require('./cardRoute')


//cards gallery
const cardGalleryRoute = require('./cardGalleryRoute')


//auth
const userRoute = require('./userRoute')

//Middlewares
const admin = require('../middlewares/admin')


function initRoutes(app) {


    //WEB PAGES
    app.get('/', website.index )
    app.get('/contact', website.contact )
    app.get('/wedd-stories', website.wedStories )
    app.get('/wedd-stories/:id', website.wedStoriesSingle )
    


    //API

    //login route
    app.use('/apiUsers', userRoute)


    //POSTS
    app.use('/apiPost', admin, postRoute)


    //CARDS
    app.use('/apiCard',  cardRoute)

    //CARDS Gallery
    app.use('/apiCardGallery',  cardGalleryRoute)

}


module.exports=initRoutes
