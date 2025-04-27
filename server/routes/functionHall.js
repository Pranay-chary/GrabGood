const express = require('express');
const router = express.Router();
const { authMiddleware, partnerMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware'); // Assuming you're using multer for file uploads
const functionHallController = require('../controllers/functionHallController');

// All routes require authentication as a partner
router.use(authMiddleware, partnerMiddleware);

// GET function hall profile
router.get('/profile', functionHallController.getFunctionHallProfile);

// PUT update function hall profile
router.put('/profile', functionHallController.updateFunctionHallProfile);

// GET venues
router.get('/venues', functionHallController.getVenues);

// PUT update availability
router.put('/availability', functionHallController.updateAvailability);

// POST upload photos (using multer middleware)
router.post('/photos', upload.array('photos', 10), functionHallController.uploadFunctionHallPhotos);

// DELETE a photo
router.delete('/photos/:photoId', functionHallController.deletePhoto);

module.exports = router; 