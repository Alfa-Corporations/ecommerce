const db = require('../utils/database');
const { DataTypes } = require('sequelize');

/**
* @openapi
* components:
*   schemas:
*     securitySchemes:
*          bearerAuth:
*              type: http
*              scheme: bearer
*              bearerFormat: jwt
*     Role:
*       type: object
*       properties:
*         id:
*           type: integer
*           description: The auto-generated id of the role
*         name:
*           type: string
*           description: The name of the role
*         description:
*           type: string
*           description: The description of the role
*       example:
*         id: 1
*         name: Admin
*         description: The admin role
*     RoleCreated:
*       type: object
*       required:
*         - name
*         - description
*       properties:
*         name:
*           type: string
*           description: The name of the role
*         description:
*           type: string
*           description: The description of the role
*       example:
*         name: Admin
*         description: The admin role
*     RoleUpdated:
*       type: object
*       required:
*         - name
*         - description
*       properties:
*         name:
*           type: string
*           description: The name of the role
*         description:
*           type: string
*           description: The description of the role
*       example:
*         name: Admin
*         description: The admin role
*/

const Roles = db.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Roles;