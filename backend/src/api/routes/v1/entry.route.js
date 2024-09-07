/**
 *
 * Entry Routes
 *
 */

const express = require('express');
const habitProgressController = require('../../controllers/sequelize/entry.controller'); // Adjust the path as needed
const router = express.Router();

// POST - Log daily progress for a habit
router.post('/create/:habitId', habitProgressController.logHabitProgress);

// GET - Get daily progress for a habit
router.get('/get/:habitId', habitProgressController.getHabitProgressByDate);

// PATCH - Update progress for a habit
router.patch('/update/:entryId', habitProgressController.updateHabitProgress);

module.exports = router;
