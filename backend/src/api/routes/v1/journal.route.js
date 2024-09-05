const express = require('express');
const {
  getHabitsByDate,
} = require('../../controllers/sequelize/journal.controller');

const router = express.Router();

// GET /habits/by-date?date=YYYY-MM-DD
router.get('/by-date', getHabitsByDate);

module.exports = router;
