/**
 *
 * Habit Model
 *
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Habit = sequelize.define(
    'habits',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true, // Optional
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      frequency: {
        type: DataTypes.STRING, // Store frequency as a string
        allowNull: false,
      },
      daysOfWeek: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Store days of week as an array of strings
        allowNull: true,
      },
      daysOfMonth: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // Store days of month as an array of integers
        allowNull: true,
      },
      daysOfYear: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Store days of year as an array of strings (YYYY-MM-DD)
        allowNull: true,
      },
      xDays: {
        type: DataTypes.INTEGER,
        allowNull: true, // For "every_x_days"
      },
      rrule: {
        type: DataTypes.TEXT, // Store rrule as a text string
        allowNull: false,
      },
      completionCriteria: {
        type: DataTypes.ENUM('numeric', 'yes_or_no', 'checklist'),
        allowNull: false,
      },
      numericValue: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      unitCategory: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customUnit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      checklist: {
        type: DataTypes.ARRAY(DataTypes.JSON), // Store checklist as an array of JSON objects
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return Habit;
};
