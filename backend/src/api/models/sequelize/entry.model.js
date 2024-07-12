/**
 *
 * Entry Model
 *
 */

module.exports = (sequelize, Sequelize) => {
  const Entry = sequelize.define(
    'entrys',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
  return Entry;
};
