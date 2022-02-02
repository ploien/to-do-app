const Sequelize = require('sequelize');
const sequelize = require('../util/mysqlDatabase');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    user_name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    password: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

module.exports = User;