/**
 *
 * Apple Model
 *
 */

module.exports = (sequelize, Sequelize) => {
  const Apple = sequelize.define(
    'apples',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
  return Apple;
};
