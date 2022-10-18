const express = require('express');
const router = express.Router();
const API = require('../controllers/weddingGallery')
const upload = require('../middlewares/upload')

//routes
router.post('/:id',upload, API.CreateImagesCard)
router.patch('/:id/:image',upload, API.UpdateImageCard)
router.delete('/:id/:image', API.DeletePost)
router.delete('/deleteAll/all/:id', API.DeletePostAll)



module.exports = router;


