const path = require('path');

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  example: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri:
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
  test: {
    sequelize: {
      DB_HOST: 'kashin.db.elephantsql.com',
      DB_USER: 'wwagildd',
      DB_PASSWORD: 'bpHW5VDXVPwY7M6AtV6mq7ha9vizO3NT',
      DB_NAME: 'wwagildd',
      DB_PORT: 5432,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
  dev: {
    sequelize: {
      DB_HOST: 'kashin.db.elephantsql.com',
      DB_USER: 'wwagildd',
      DB_PASSWORD: 'bpHW5VDXVPwY7M6AtV6mq7ha9vizO3NT',
      DB_NAME: 'wwagildd',
      DB_PORT: 5432,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
  prod: {
    sequelize: {
      DB_HOST: 'bubble.db.elephantsql.com',
      DB_USER: 'moxmflax',
      DB_PASSWORD: 'XZy6Wj3X6XadtiiUuExWNN7t0ab8ZBjU',
      DB_NAME: 'moxmflax',
      DB_PORT: 5432,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
};
