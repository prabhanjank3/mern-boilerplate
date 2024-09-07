/**
 *
 * Entry Controller
 *
 */
const db = require('../../models/sequelize/index');

const HabitProgress = db.entry;
const Habit = db.habit;

// Log daily progress for a habit
exports.logHabitProgress = async (req, res) => {
  try {
    const { habitId } = req.params;
    const { date, yesOrNo, numericValue, checklist } = req.body;

    // Fetch the habit to ensure it exists
    const habit = await Habit.findByPk(habitId);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    // Log habit progress
    const progress = await HabitProgress.create({
      habitId,
      date,
      yesOrNo: yesOrNo || null,
      numericValue: numericValue || null,
      checklist: checklist || null,
    });

    return res.status(201).json({
      message: 'Progress logged successfully',
      data: progress,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Failed to log progress', details: error.message });
  }
};

exports.updateHabitProgress = async (req, res) => {
  try {
    const { entryId } = req.params;

    // Fetch the habit to ensure it exists
    const entry = await HabitProgress.findByPk(entryId);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    // Log habit progress
    const progress = await HabitProgress.update(req.body, {
      where: { id: entryId },
    });

    return res.status(201).json({
      message: 'Progress updated successfully',
      data: progress,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Failed to update progress', details: error.message });
  }
};

// Get daily progress for a habit
exports.getHabitProgressByDate = async (req, res) => {
  try {
    const { habitId } = req.params;
    const { date } = req.query;

    const progress = await HabitProgress.findOne({
      where: { habitId, date },
    });

    if (!progress) {
      return res.status(404).json({ error: 'No progress found for this date' });
    }

    return res.status(200).json({
      message: 'Progress fetched successfully',
      data: progress,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Failed to fetch progress', details: error.message });
  }
};
