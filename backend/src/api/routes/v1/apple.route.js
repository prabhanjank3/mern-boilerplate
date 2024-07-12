/**
 *
 * Apple Routes
 *
 */

const express = require('express');
const router = express.Router();
const appleController = require('../../controllers/sequelize/apple.controller');

/**
 *  Creates new apple
 */
router.post('/create', appleController.createApple);
/**
 *  Updates existing apple
 */
router.post('/update', appleController.updateApple);
/**
 *  Deletes apple
 */
router.get('/delete', appleController.deleteApple);
/**
 *  Fetches single apple by id
 */
router.get('/get/:id', appleController.getApple);

module.exports = router;
