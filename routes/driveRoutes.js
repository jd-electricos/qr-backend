// driveRoutes.js
const express = require('express');
const router = express.Router();
const driveController = require('../controllers/driveController');
const upload = require('../middleware/uploadMiddleware');

router.post('/uploads', upload.single('image'), driveController.uploadFile);

module.exports = router;
