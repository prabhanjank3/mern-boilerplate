const Sequelize = require('sequelize');
const ENVIRONMENT = process.env.NODE_ENV || 'test';
const { sequelize } = require('./vars')[ENVIRONMENT];

const sequelizeInstance = new Sequelize(
  sequelize.DB_NAME,
  sequelize.DB_USER,
  sequelize.DB_PASSWORD,
  {
    host: sequelize.DB_HOST,
    dialect: sequelize.dialect,
    pool: sequelize.pool,
    port: sequelize.port || 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // This line is important for ElephantSQL
      },
    },
  }
);

module.exports = sequelizeInstance;
