const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

// Initialize the app
const app = express();

//Middlewears
//Form data middlewear
app.use(bodyParser.urlencoded({
    extended:false
}))

//Json body middlewear
app.use(bodyParser.json());

//Cors middlewear
app.use(cors())

//Setting up the static directory
app.use(express.static(path.join(__dirname, 'public')))

//uploads file
app.use(express.static("uploads"))
// set the view engine to ejs
app.set('view engine' , 'ejs')

//Connect to MongoDb database
const dataBaseUrl = require('./config/keys').MongoUrl
mongoose.connect(dataBaseUrl)
.then(() => console.log('Connected to db!'))
.catch((err) => console.log(err));


//API
require('./router/api')(app)

//Handle production

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(__dirname+ '/public/'))
//     //Handle SPA
//     app.get(/.*/, (req, res) => res.sendFile(__dirname+"/public/index.html"))
// }

//Connect to port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})