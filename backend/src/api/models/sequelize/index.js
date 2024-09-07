const Sequalize = require('sequelize');
const dbConnection = require('../../../config/sequelize');

const db = {};
db.dbConnection = dbConnection;
db.Sequalize = Sequalize;

// Add models to db object here
db.entry = require('./entry.model')(dbConnection, Sequalize);
db.habit = require('./habit.model')(dbConnection, Sequalize);
db.apple = require('./apple.model')(dbConnection, Sequalize);
db.entry = require('./entry.model')(dbConnection, Sequalize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.habit.hasMany(db.entry, {
  foreignKey: 'habitId',
  as: 'entries',
});

db.entry.belongsTo(db.habit, {
  foreignKey: 'habitId',
  as: 'habits',
});

// Databse Syncing
db.dbConnection.sync({ force: false }).then(async () => {
  // await clearDB();
  // createSampleData();
});

module.exports = db;
