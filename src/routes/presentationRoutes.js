const express = require('express');
const router = express.Router();
const presentationController = require('../controllers/presentationController');



router.post('/presentations', presentationController.createPresentation);
router.get('/presentations/:title', presentationController.getPresentationByTitle);
router.post('/presentations/:title/slides', presentationController.addSlide);
router.put('/presentations/:title/slides/:slideId', presentationController.alterSlide);
router.put('/presentations/:title/authors', presentationController.alterAuthorsList);
router.delete('/presentations/:title/slides/:slideId', presentationController.deleteSlide);
router.delete('/presentations/:title', presentationController.deletePresentation);
router.get('/presentations', presentationController.getAllPresentations);

module.exports = router;