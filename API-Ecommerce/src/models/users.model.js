const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


/**
* @openapi
*  components:
*      securitySchemes:
*          bearerAuth:
*              type: http
*              scheme: bearer
*              bearerFormat: jwt
*      schemas:
*          Users:
*              type: object
*              properties:
*                  id:
*                      type: integer
*                      example: 1
*                  firstName:
*                      type: string
*                      example: Luis
*                  lastName:
*                      type: string
*                      example: Uzcategui
*                  email:
*                      type: string
*                      example: example@gmail.com
*                  phoneNumber:
*                      type: string
*                      example: "123456789"
*                  password:
*                      type: string
*                      example: "123123"
*                  roleId:
*                      type: integer
*                      example: 1
*          CreateUser:
*              type: object
*              properties:
*                  firstName:
*                      type: string
*                      example: "Luis"
*                  lastName:
*                      type: string
*                      example: "Uzcategui"
*                  email:
*                      type: string
*                      example: "example@gmail.com"
*                  phoneNumber:
*                      type: string
*                      example: "123456789"
*                  password:
*                      type: string
*                      example: "123123"
*                  roleId:
*                      type: integer
*                      example: 1
*          Verify:
*              type: object
*              properties:
*                  codeVerify:
*                      type: integer
*                      example: 123456
*          GetUsers:
*              type: object
*              properties:
*                  id:
*                      type: integer
*                      example: 1
*                  firstName:
*                      type: string
*                      example: "Luis"
*                  lastName:
*                      type: string
*                      example: "Uzcategui"
*                  email:
*                      type: string
*                      example:
*                  phoneNumber:
*                      type: string
*                      example: "123456789"
*                  role:
*                      type: string
*                      example: "client"
*                  status:
*                      type: string
*                      example: "unverified"
*          DeleteUser:
*              type: object
*              properties:
*                  id:
*                      type: integer
*                      example: 1
*                  firstName:
*                      type: string
*                      example: "Luis"
*                  lastName:
*                      type: string
*                      example: "Uzcategui"
*                  email:
*                      type: string
*                      example:
*                  phoneNumber:
*                      type: string
*                      example: "123456789"
*                  role:
*                      type: string
*                      example: "client"
*                  status:
*                      type: string
*                      example: "unverified"
*          GetAllCart:
*              type: object
*              properties:
*                  id:
*                      type: integer
*                      example: 1
*                  total:
*                      type: float
*                      example: 1.10
*                  status:
*                      type: string
*                      example: "With products"
*                  products:
*                      type: array
*                      items:
*                          type: object
*                          properties:
*                              id:
*                                  type: integer
*                                  example: 1
*                              productId:
*                                  type: integer
*                                  example: 1
*                              quantity:
*                                  type: integer
*                                  example: 1
*                              total:
*                                  type: float
*                                  example: 1.10
*                              item:
*                                  type: object
*                                  properties:
*                                      url:
*                                          type: string
*                                          example: "https://www.google.com"
*                                      stock:
*                                          type: integer
*                                          example: 1
*          AddToCart:
*              type: object
*              properties:
*                  productId:
*                      type: integer
*                      example: 1
*                  quantity:
*                      type: integer
*                      example: 1
*          UpdateProductCart:
*              type: object
*              properties:
*                  productId:
*                      type: integer
*                      example: 1
*                  quantity:
*                      type: integer
*                      example: 1
*          DeleteProductCart:
*              type: object
*              properties:
*                  productId:
*                      type: integer
*                      example: 1
*          Purchase:
*              type: object
*              properties:
*                  products:
*                      type: array
*                      items:
*                          type: object
*                          properties:
*                              productId:
*                                  type: integer
*                                  example: 1
*                              quantity:
*                                  type: integer
*                                  example: 1
*          GetPurchase:
*              type: object
*              properties:
*                  id:
*                      type: integer
*                      example: 1
*                  products:
*                      type: array
*                      items:
*                          type: object
*                          properties:
*                              productId:
*                                  type: integer
*                                  example: 1
*                              quantity:
*                                  type: integer
*                                  example: 1
*/


const code = () => Math.ceil( Math.random() * 999999 );

const Users = db.define('users', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name"
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "phone_number"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
        field: "role_id"
    },
    isVerify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_verify"
    },
    codeVerify: {
        type: DataTypes.INTEGER,
        defaultValue: code(),
        field: "code_verify"
    }
}, {
    hooks: {
        beforeCreate: (user, options) => {
            const { password } = user;
            const hash = bcrypt.hashSync(password, 8);
            user.password = hash;
        },
    },
});

module.exports = Users;