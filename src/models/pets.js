'use strict';

const Pet = (sequelize, DataTypes) => sequelize.define('Pet', {
  petType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  petColor: {
    type: DataTypes.STRING,
  }
});

module.exports = Pet;
