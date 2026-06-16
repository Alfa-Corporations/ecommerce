const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Order = db.define('order', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id"
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "total_price",
        defaultValue: 0
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Empty"
    }
});

module.exports = Order;