const Sequalize = require('sequelize');
const dbConnection = require('../../../config/sequelize');

const db = {};
db.dbConnection = dbConnection;
db.Sequalize = Sequalize;

// Add models to db object here
db.habit = require('./habit.model')(dbConnection, Sequalize);
db.apple = require('./apple.model')(dbConnection, Sequalize);
db.entry = require('./entry.model')(dbConnection, Sequalize);

// Databse Syncing
db.dbConnection.sync({ force: false }).then(async () => {
  // await clearDB();
  // createSampleData();
});

module.exports = db;
