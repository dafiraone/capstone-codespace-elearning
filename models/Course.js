const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Course = sequelize.define('Course', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: "course"
});

module.exports = Course;