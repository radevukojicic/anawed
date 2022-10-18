const express = require('express');
const router = express.Router();
const API = require('../controllers/postController')
const upload = require('../middlewares/upload')

//routes
router.get('/:category',  API.fetchAllPost)
router.get('/:id', API.fetchPostById)
router.post('/',upload, API.CreatePost)
router.patch('/:id',upload ,API.UpdatePost)
router.delete('/:id/', API.DeletePost)
router.delete('/deleteAll/all/:category', API.DeletePostAll)



module.exports = router;