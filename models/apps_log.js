var Sequelize = require('sequelize')
var sequelize = require('../config/sequelize')

var Model = sequelize.define('AppsLog', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: Sequelize.STRING,
        length: 100
    },
    package: Sequelize.STRING(255),
    icon: Sequelize.STRING(255)
}, {
    tableName: 'apps_logs',
    timestamps: false,
})

module.exports = Model
