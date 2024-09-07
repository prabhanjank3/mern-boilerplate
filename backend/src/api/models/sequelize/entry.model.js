/**
 *
 * Entry Model
 *
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const HabitProgress = sequelize.define(
    'entries',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      habitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'habits', // assuming your habit model is named "Habits"
          key: 'id',
        },
      },
      date: {
        type: DataTypes.DATEONLY, // stores only the date (YYYY-MM-DD)
        allowNull: false,
      },
      yesOrNo: {
        type: DataTypes.BOOLEAN,
        allowNull: true, // Only for "yes_or_no" criteria
      },
      numericValue: {
        type: DataTypes.INTEGER,
        allowNull: true, // Only for "numeric" criteria
      },
      checklist: {
        type: DataTypes.JSON,
        allowNull: true, // Only for "checklist" criteria
      },
    },
    {
      timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
      tableName: 'habit_progress',
    }
  );

  return HabitProgress;
};
