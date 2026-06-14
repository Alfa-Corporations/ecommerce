const db = require('../utils/database');
const { DataTypes } = require('sequelize');

/**
* @openapi
* components:
*   schemas:
*     Category:
*       type: object
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the category
*         name:
*           type: string
*           description: The name of the category
*         status:
*           type: string
*           description: The status of the category
*       example:
*         id: 1
*         name: Category 1
*         status: active
*     CategoryCreated:
*       type: object
*       properties:
*         name:
*           type: string
*           description: The name of the category
*       example:
*         name: Category 1
*     CategoryUpdated:
*       type: object
*       properties:
*         name:
*           type: string
*           description: The name of the category
*         status:
*           type: string
*           description: The status of the category
*       example:
*         name: Category 1
*         status: active
*     CategoryDeleted:
*       type: object
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the category
*       example:
*         id: 1
*/

const Categories = db.define('categories', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = Categories;