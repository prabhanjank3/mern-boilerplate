/**
 *
 * Apple Controller
 *
 */

const db = require('../../models/sequelize/index');
const Apple = db.apple;

/**
 * Create new apple
 */
exports.createApple = (req, resp) => {
  Apple.create(req.body)
    .then((data) => {
      resp.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      resp.status(500).send(err);
    });
};

/**
 * Update existing apple
 */
exports.updateApple = (req, resp) => {
  Apple.update(req.body, { where: { id: req.params.id } })
    .then(() => {
      resp.status(200).send({
        message: 'Apple updated Successfully',
      });
    })
    .catch((err) => {
      console.error(err);
      resp.status(500).send({
        message: err.message || 'Some error occurred while updating apple.',
      });
    });
};

/**
 * Deletes apple specified by id in params
 */
exports.deleteApple = (req, resp) => {
  Apple.destroy({ where: { id: req.params.id } })
    .then((result) => {
      if (result === 1) {
        resp.status(200).send({
          message: 'Apple deleted Successfully',
        });
      } else {
        resp.status(500).send({
          message: 'Some error occurred while deleting apple.',
        });
      }
    })
    .catch((err) => {
      resp.status(500).send({
        message: err.message || 'Some error occurred while deleting apple.',
      });
    });
};

/**
 * Fetches single apple by id in params
 */
exports.getApple = (req, resp) => {
  Apple.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (data) {
        resp.status(201).send(data);
      } else {
        resp.status(401).send({ message: 'Apple Not Found' });
      }
    })
    .catch((err) => {
      resp.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving the apple.',
      });
    });
};

/**
 * Fetches all apple matching by query
 */
exports.getAppleByQuery = (req, resp) => {
  Apple.findAll({ where: { Date: req.query } })
    .then((data) => {
      if (data) {
        resp.status(201).send(data);
      } else {
        resp.status(401).send({ message: 'Apples Not Found' });
      }
    })
    .catch((err) => {
      resp.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving the apple.',
      });
    });
};
