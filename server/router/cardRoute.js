const express = require('express');
const router = express.Router();
const API = require('../controllers/weddingController')
const upload = require('../middlewares/upload')

//routes
router.get('/',  API.fetchAllPost)
router.get('/:id', API.fetchPostById)
router.post('/',upload, API.CreateCard)
router.post('/details',upload, API.CreateImagesCard)
router.patch('/:id',upload ,API.updateCard)
router.delete('/:id', API.DeletePost)
router.delete('/deleteAll/all', API.DeletePostAll)



module.exports = router;