/**
 *
 * Entry Routes
 *
 */

const express = require('express');
const router = express.Router();
const entryController = require('../../controllers/sequelize/entry.controller');

/**
 *  Creates new entry
 */
router.post('/create', entryController.createEntry);
/**
 *  Updates existing entry
 */
router.post('/update', entryController.updateEntry);
/**
 *  Deletes entry
 */
router.get('/delete', entryController.deleteEntry);
/**
 *  Fetches single entry by id
 */
router.get('/get/:id', entryController.getEntry);

module.exports = router;
