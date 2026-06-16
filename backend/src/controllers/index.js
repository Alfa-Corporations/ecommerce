const { createUser, verifyUser, getAllUser, deleteUser, getAllCart, addPrductToCart, updateProductInCart, deleteProductInCart, purchases, getPurchases } = require('./users.controller.js');
const { createProduct, getAllProducts, getProductsByUser, updateProduct, updateStockProduct, deleteProduct } = require('./product.controller.js')
const { createRole, getAllRoles, updateRole, deleteRole } = require('./roles.controller.js');
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require('./categories.controller.js');

module.exports = { 
    createUser, verifyUser, getAllUser, deleteUser, getAllCart, addPrductToCart, updateProductInCart, deleteProductInCart, purchases, getPurchases,
    createProduct, getAllProducts, getProductsByUser, updateProduct, updateStockProduct, deleteProduct,
    createRole, getAllRoles, updateRole, deleteRole,
    createCategory, getAllCategories, updateCategory, deleteCategory,
};
