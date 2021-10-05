'use strict';

require('dotenv').config();

const DATABASE_URL = process.env.NODE_ENV === 'test' 
? 'sqlite:memory' 
: process.env.NODE_ENV === 'production'
? process.env.HEROKU_POSTGRESQL_MAUVE_URL
: process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require('sequelize');
let sequelizeOptions = process.env.NODE_ENV === 'production'
  ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
  : {};
let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const pet = require('./pets');
const apexLegend = require('./apexLegends');

module.exports = {
  db: sequelize,
  Pet: pet(sequelize, DataTypes),
  ApexLegend: apexLegend(sequelize, DataTypes)
};

