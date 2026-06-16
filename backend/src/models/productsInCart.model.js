const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const ProductsInCart = db.define('products_cart', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "product_id"
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "cart_id"
    }
});

module.exports = ProductsInCart;