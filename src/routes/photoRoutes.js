const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

router.post('/upload', auth, upload.single('photo'), photoController.uploadPhoto);
router.get('/', auth, photoController.getAllPhotos);
router.get('/location', auth, photoController.getPhotosByLocation);

module.exports = router;