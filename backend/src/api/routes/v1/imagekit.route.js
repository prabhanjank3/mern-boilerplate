const express = require('express');
const router = express.Router();
const imagekitController = require('../../controllers/imagekit.controller');

/**
 *  Authenticates imagekit server
 */
router.get('/auth', imagekitController.authenticateImagekit);

module.exports = router;
