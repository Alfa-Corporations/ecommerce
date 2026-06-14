
const UserServices = require('./users.service.js');
const ProductServices = require('./product.service.js');
const ProductsInCartServices = require('./productsInCartServices.service.js');
const ProductsInOrderServices = require('./productsInOrderServices.service.js');
const RoleServices = require('./roles.service.js');
const CategoriesServices = require('./categories.service.js');
const AuthServices = require('./auth.service.js');

module.exports = {
    UserServices,
    ProductServices,
    ProductsInCartServices,
    ProductsInOrderServices,
    RoleServices,
    CategoriesServices,
    AuthServices
};
