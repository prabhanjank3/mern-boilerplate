/**
 *
 * Habit Routes
 *
 */

const express = require('express');
const router = express.Router();
const habitController = require('../../controllers/sequelize/habit.controller');

/**
 *  Creates new habit
 */
router.post('/create', habitController.createHabit);
/**
 *  Updates existing habit
 */
router.patch('/update/:id', habitController.updateHabit);
/**
 *  Deletes habit
 */
router.delete('/delete/:id', habitController.deleteHabit);
/**
 *  Fetches single habit by id
 */
router.get('/get/:id', habitController.getHabit);

module.exports = router;
