const Sequelize = require('sequelize');
const sequelize = require('../util/mysqlDatabase');

const List = sequelize.define('List', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    creationDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
})

module.exports = User;