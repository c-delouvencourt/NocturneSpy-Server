var Sequelize = require('sequelize')
var sequelize = require('../config/sequelize')

var Model = sequelize.define('Calendar', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uid: Sequelize.STRING(50),
  name: Sequelize.STRING(50),
  date: Sequelize.STRING(50)
}, {
  tableName: 'calendar',
  timestamps: false
})

module.exports = Model
