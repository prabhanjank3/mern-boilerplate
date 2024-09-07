const { RRule } = require('rrule');
const db = require('../../models/sequelize/index');
const Habit = db.habit;
const HabitProgress = db.entry;
const { Op } = require('sequelize');

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
      include: {
        model: HabitProgress,
        as: 'entries',
        where: { date: targetDate },
        required: false, // Include even if no progress is logged
      },
    });

    const matchingHabits = habits.filter((habit) => {
      const rule = RRule.fromString(habit.rrule);
      const occurrences = rule.between(
        getStartOfDate(targetDate), // Start of the day
        getEndOfDate(targetDate), // End of the day
        true
      );

      return occurrences.length > 0;
    });
    // Process each habit and determine if it's completed or not
    const habitsWithProgress = matchingHabits.map((habit) => {
      const progress = habit.entries?.[0]; // Get progress for the current habit on the target date
      let completed = false;

      if (habit.completionCriteria === 'yes_or_no') {
        completed = progress ? progress.yesOrNo === true : false;
      } else if (habit.completionCriteria === 'numeric') {
        completed = progress
          ? progress.numericValue >= habit.numericValue
          : false;
      } else if (habit.completionCriteria === 'checklist') {
        completed = progress
          ? progress.checklist.every((task) => task.completed === true)
          : false;
      }

      return {
        ...habit.toJSON(),
        completed,
      };
    });

    return res.json(habitsWithProgress);
  } catch (error) {
    console.error('Error fetching habits by date:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getHabitsByDate,
};
