/* eslint-disable no-console */
/**
 *
 * Habit Controller
 *
 */
const db = require('../../models/sequelize/index');
const Habit = db.habit;

/**
 * Create new habit
 */
exports.createHabit = (req, resp) => {
  Habit.create(req.body)
    .then((data) => {
      resp.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      resp.status(500).send(err);
    });
};

/**
 * Update existing habit
 */
exports.updateHabit = (req, resp) => {
  Habit.update(req.body, { where: { id: req.params.id } })
    .then(() => {
      resp.status(200).send({
        message: 'Habit updated Successfully',
      });
    })
    .catch((err) => {
      console.log(err);
      resp.status(500).send({
        message: err.message || 'Some error occurred while updating habit.',
      });
    });
};

/**
 * Deletes habit specified by id in params
 */
exports.deleteHabit = (req, resp) => {
  Habit.destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result === 1) {
        resp.status(200).send({
          message: 'Habit deleted Successfully',
        });
      } else {
        resp.status(500).send({
          message: 'Some error occurred while deleting habit.',
        });
      }
    })
    .catch((err) => {
      resp.status(500).send({
        message: err.message || 'Some error occurred while deleting habit.',
      });
    });
};

/**
 * Fetches single habit by id in params
 */
exports.getHabit = (req, resp) => {
  Habit.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (data) {
        resp.status(201).send(data);
      } else {
        resp.status(401).send({ message: 'Habit Not Found' });
      }
    })
    .catch((err) => {
      resp.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving the habit.',
      });
    });
};

/**
 * Fetches all habit matching by query
 */
exports.getHabitByQuery = (req, resp) => {
  Habit.findAll({ where: { Date: req.query } })
    .then((data) => {
      if (data) {
        resp.status(201).send(data);
      } else {
        resp.status(401).send({ message: 'Habits Not Found' });
      }
    })
    .catch((err) => {
      resp.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving the habit.',
      });
    });
};
