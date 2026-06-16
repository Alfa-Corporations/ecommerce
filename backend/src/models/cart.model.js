const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Cart = db.define('cart', {

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
        field: "total_price",
        defaultValue: 0
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "empty"
    }
});

module.exports = Cart;