const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'), // Definisikan nilai ENUM yang valid
    allowNull: false
  }
}, {
  tableName: 'users' // Pastikan nama tabel adalah 'users'
});

module.exports = User;
