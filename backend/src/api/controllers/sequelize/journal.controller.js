const { RRule } = require('rrule');
const db = require('../../models/sequelize/index');
const Habit = db.habit;
const { Op } = require('sequelize');

const getHabitsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res
        .status(400)
        .json({ message: 'Date query parameter is required' });
    }

    const removeOffsetFromDate = (date) => {
      const offsetInMilliseconds = 5.5 * 60 * 60 * 1000;
      return new Date(date.getTime() + offsetInMilliseconds);
    };

    const targetDate = removeOffsetFromDate(new Date(date));
    const habits = await Habit.findAll({
      where: {
        rrule: {
          [Op.ne]: null,
        },
      },
    });

    const getStartOfDate = (targetDate) => {
      return new Date(
        Date.UTC(
          targetDate.getUTCFullYear(), // Year
          targetDate.getUTCMonth(), // Month (0-based)
          targetDate.getUTCDate(), // Date
          0, // Hours
          0, // Minutes
          0, // Seconds
          0 // Milliseconds
        )
      );
    };
    const getEndOfDate = (targetDate) => {
      return new Date(
        Date.UTC(
          targetDate.getUTCFullYear(), // Year
          targetDate.getUTCMonth(), // Month (0-based)
          targetDate.getUTCDate(), // Date
          23, // Hours
          59, // Minutes
          59, // Seconds
          999 // Milliseconds
        )
      );
    };
    const matchingHabits = habits.filter((habit) => {
      const rule = RRule.fromString(habit.rrule);
      const occurrences = rule.between(
        getStartOfDate(targetDate), // Start of the day
        getEndOfDate(targetDate), // End of the day
        true
      );

      return occurrences.length > 0;
    });

    return res.json(matchingHabits);
  } catch (error) {
    console.error('Error fetching habits by date:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getHabitsByDate,
};
