const db = require('../utils/database');
const { DataTypes } = require('sequelize');

/**
* @openapi
* components:
*   schemas:
*     CreateProduct:
*       type: object
*       required:
*         - title
*         - description
*         - price
*         - productImgs
*         - categoryId
*         - stock
*         - userId
*       properties:
*         title:
*           type: string
*           description: The name of the product.
*         description:
*           type: string
*           description: The description of the product.
*         price:
*           type: float
*           description: The price of the product.
*         productImgs:
*           type: array
*           description: The url of the product.
*           items:
*             type: string
*         categoryId:
*           type: integer
*           description: The category id of the product.
*         stock:
*           type: integer
*           description: The stock of the product.
*         userId:
*           type: integer
*           description: The user id of the product.
*       example:
*         title: Product 1
*         description: Product 1 description
*         price: 100
*         productImgs: ["https://www.google.com"]
*         categoryId: 1
*         stock: 10
*         userId: 1
*     GetAllProducts:
*       type: object
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the product.
*         title:
*           type: string
*           description: The name of the product.
*         description:
*           type: string
*           description: The description of the product.
*         price:
*           type: float
*           description: The price of the product.
*         productImgs:
*           type: array
*           description: The url of the product.
*           items:
*             type: string
*         categoryId:
*           type: integer
*           description: The category id of the product.
*         stock:
*           type: integer
*           description: The stock of the product.
*         userId:
*           type: integer
*           description: The user id of the product.
*       example:
*         id: 1
*         title: Product 1
*         description: Product 1 description
*         price: 100
*         productImgs: ["https://www.google.com"]
*         categoryId: 1
*         stock: 10
*         userId: 1
*     GetProductsByUser:
*       type: object
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the product.
*         title:
*           type: string
*           description: The name of the product.
*         description:
*           type: string
*           description: The description of the product.
*         price:
*           type: float
*           description: The price of the product.
*         productImgs:
*           type: array
*           description: The url of the product.
*           items:
*             type: string
*         categoryId:
*           type: integer
*           description: The category id of the product.
*         stock:
*           type: integer
*           description: The stock of the product.
*     UpdateProduct:
*       type: object
*       properties:
*         title:
*           type: string
*           description: The name of the product.
*         description:
*           type: string
*           description: The description of the product.
*         price:
*           type: float
*           description: The price of the product.
*         productImgs:
*           type: array
*           description: The url of the product.
*           items:
*             type: string
*       example:
*         title: Product 1
*         description: Product 1 description
*         price: 100
*         productImgs: ["https://www.google.com"]
*     UpdateStockProduct:
*       type: object
*       required:
*         - stock
*       properties:
*         stock:
*           type: integer
*           description: The stock of the product.
*       example:
*         stock: 10
*     DeleteProduct:
*       type: object
*       required:
*         - id
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the product.
*       example:
*         id: 1
*/

const Products = db.define('products', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "category_id"
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    },
    productImgs: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id"
    }
});

module.exports = Products;