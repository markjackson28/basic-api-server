'use strict';

const ApexLegend = (sequelize, DataTypes) => sequelize.define('ApexLegend', {
  legendName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  legendPassive: {
    type: DataTypes.STRING,
  }
});

module.exports = ApexLegend;
