const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('elearning', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;