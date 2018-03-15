'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Clicks = loader.database.define('clicks', {
  quizId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tileId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  clicks: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
}, {
    freezeTableName: true,
    timestamps: false
  });

module.exports = Clicks;