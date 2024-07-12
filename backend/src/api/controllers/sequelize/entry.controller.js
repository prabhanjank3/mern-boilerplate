/**
 *
 * Entry Controller
 *
 */

const db = require('../../models/sequelize/index');
const Entry = db.entry;

/**
 * Create new entry
 */
exports.createEntry = (req, resp) => {
  Entry.create(req.body)
    .then((data) => {
      resp.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      resp.status(500).send(err);
    });
};

/**
 * Update existing entry
 */
exports.updateEntry = (req, resp) => {
  Entry.update(req.body, { where: { id: req.params.id } })
    .then(() => {
      resp.status(200).send({
        message: 'Entry updated Successfully',
      });
    })
    .catch((err) => {
      console.error(err);
      resp.status(500).send({
        message: err.message || 'Some error occurred while updating entry.',
      });
    });
};

/**
 * Deletes entry specified by id in params
 */
exports.deleteEntry = (req, resp) => {
  Entry.destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result === 1) {
        resp.status(200).send({
          message: 'Entry deleted Successfully',
        });
      } else {
        resp.status(500).send({
          message: 'Some error occurred while deleting entry.',
        });
      }
    })
    .catch((err) => {
      resp.status(500).send({
        message: err.message || 'Some error occurred while deleting entry.',
      });
    });
};

/**
 * Fetches single entry by id in params
 */
exports.getEntry = (req, resp) => {
  Entry.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (data) {
        resp.status(201).send(data);
      } else {
        resp.status(401).send({ message: 'Entry Not Found' });
      }
    })
    .catch((err) => {
      resp.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving the entry.',
      });
    });
};

/**
 * Fetches all entry matching by query
 */
exports.getEntryByQuery = (req, resp) => {
  Entry.findAll({ where: { Date: req.query } })
    .then((data) => {
      if (data) {
        resp.status(201).send(data);
      } else {
        resp.status(401).send({ message: 'Entrys Not Found' });
      }
    })
    .catch((err) => {
      resp.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving the entry.',
      });
    });
};
