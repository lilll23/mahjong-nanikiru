'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Quiz = loader.database.define('quizzes', {
  quizId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  prevalentWind: {
    type: Sequelize.STRING,
    allowNull: false
  },
  handNum: {
    type: Sequelize.STRING,
    allowNull: false
  },
  turnNum: {
    type: Sequelize.STRING,
    allowNull: false
  },
  seatWind: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quizContent: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        fields: ['createdBy']
      }
    ]
  });

module.exports = Quiz;