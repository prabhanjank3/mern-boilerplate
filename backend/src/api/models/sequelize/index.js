const Sequalize = require('sequelize');
const dbConnection = require('../../../config/sequelize');

const db = {};
db.dbConnection = dbConnection;
db.Sequalize = Sequalize;

// Add models to db object here
db.apple = require('./apple.model')(dbConnection, Sequalize);
db.entry = require('./entry.model')(dbConnection, Sequalize);

// Databse Syncing
db.dbConnection
  .sync
  // { force: true }
  ()
  .then(async () => {
    // await clearDB();
    // createSampleData();
  });

module.exports = db;
