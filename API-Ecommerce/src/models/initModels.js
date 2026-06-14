const Categories = require("./categories.model");
const { Users, Cart, Order, Products, ProductsInCart, ProductsInOrder, Roles } = require("./index");

const initModels = () => {
    /* ----------------------------------------------------------------------------- */
    Users.hasOne(Cart, {as: "cart", foreignKey: "user_id"});
    Cart.belongsTo(Users, {as: "owner", foreignKey: "user_id"});

    /* ----------------------------------------------------------------------------- */
    Users.hasMany(Order, {as: "order", foreignKey: "user_id"});
    Order.belongsTo(Users, {as: "user", foreignKey: "user_id"});

    /* ----------------------------------------------------------------------------- */
    Users.hasMany(Products, {as: "products", foreignKey: "user_id"});
    Products.belongsTo(Users, {as: "created", foreignKey: "user_id"});

    /* ----------------------------------------------------------------------------- */
    Users.belongsTo(Roles, {as: "role", foreignKey: "role_id"});
    Roles.hasMany(Users, {as: "users", foreignKey: "role_id"});

    /* ----------------------------------------------------------------------------- */
    Products.belongsTo(Categories, {as: "category", foreignKey: "category_id"});
    Categories.hasMany(Products, {as: "products", foreignKey: "category_id"});

    /* ----------------------------------------------------------------------------- */
    ProductsInCart.belongsTo(Cart, {as: "productCart", foreignKey: "cart_id"});
    Cart.hasMany(ProductsInCart, {as: "cartProduct", foreignKey: "cart_id"});

    Products.hasOne(ProductsInCart, {as: "itemCart", foreignKey: "product_id"})
    ProductsInCart.belongsTo(Products, {as: "item", foreignKey: "product_id"});

    /* ----------------------------------------------------------------------------- */
    ProductsInOrder.belongsTo(Order, {as: "productOrder", foreignKey: "order_id"});
    Order.hasMany(ProductsInOrder, {as: "orderProduct", foreignKey: "order_id"});

    Products.hasOne(ProductsInOrder, {as: "itemOrder", foreignKey: "product_id"});
    ProductsInOrder.belongsTo(Products, {as: "product", foreignKey: "product_id"});
};

module.exports = initModels;