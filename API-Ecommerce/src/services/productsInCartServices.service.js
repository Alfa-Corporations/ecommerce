const { ProductsInCart, Products, Cart, Categories } = require('../models');

class ProductsInCartServices {
    static async getAllCart(id) {
        try {
            const result = await Cart.findAll({
                where: { userId: id },
                attributes: ["id", "totalPrice", "status", "createdAt", "updatedAt"],
                include: {
                    model: ProductsInCart,
                    as: "cartProduct",
                    attributes: ["id", "productId", "price", "quantity", "total", "updatedAt", "createdAt"],
                    include: {
                        model: Products,
                        as: "item",
                        attributes: ["title", "productImgs", "stock"],
                        include: {
                            model: Categories,
                            as: "category",
                            attributes: ["name"]
                        }
                    }
                }
            });
            return result;
        } catch (error) {
            throw error
        }
    }
    static async addPrductToCart(id, productToAdded) {
        try {
            const { productId, quantity } = productToAdded;
            const { totalPrice } = await Cart.findOne({ where: { id } });
            const { price, stock } = await Products.findOne({ where: { id: productId } });
            if (stock < quantity) {
                return "No hay stock suficiente"
            } else {
                const product = {
                    productId: productId,
                    price,
                    quantity,
                    total: price * quantity,
                    cartId: Number(id)
                };

                // Actualiza el stock y crea el producto en el carrito en una sola consulta
                const updateCount = await Products.update(
                    { stock: stock - quantity },
                    { where: { id: productId } }
                );
                const createCount = await ProductsInCart.bulkCreate([product]);

                // Actualiza el precio total del carrito
                const cart = await Cart.update(
                    { status: "with products", totalPrice: totalPrice + product.total },
                    { where: { id } }
                );
                return createCount;
            }
        } catch (error) {
            throw error
        }
    }
    static async updatePrductToCart(id, productId, newQuantity) {
        try {
            const { quantity } = await ProductsInCart.findOne({ where: { productId: productId } });
            const { stock, price } = await Products.findOne({ where: { id: productId } });
            const diference = newQuantity - quantity;

            if ( diference > stock ) {
                return "No hay stock suficiente"
            } else {
                if (newQuantity > quantity) {
                    const updateCount = await Products.update(
                        { stock: stock - diference },
                        { where: { id: productId } }
                    );
                }

                if (newQuantity < quantity) {
                    const updateCount = await Products.update(
                        { stock: stock + (-1 * diference) },
                        { where: { id: productId } }
                    );
                };

                const result = await ProductsInCart.update({
                    total: newQuantity * price,
                    quantity: newQuantity
                }, {
                    where: { productId: productId }
                });
                const { cartProduct } = await Cart.findOne({
                    where: { id },
                    include: {
                        model: ProductsInCart,
                        as: "cartProduct",
                        attributes: ["total"]
                    }
                });

                const totalPrice = cartProduct.reduce((acc, item) => acc + item.total, 0);

                const cart = await Cart.update(
                    { totalPrice },
                    { where: { id } }
                );
                return result;
            }
        } catch (error) {
            throw error
        }
    }
    static async deleteProductInCart(id) {
        try {
            const { productId, quantity } = await ProductsInCart.findOne({ where: { id } });
            const result = await ProductsInCart.destroy({ where: { id } });
            const { stock } = await Products.findOne({ where: { id: productId } });
            const updateStock = await Products.update(
                { stock: stock + quantity },
                { where: { id: productId } }
            );
            return result;
        } catch (error) {
            throw error
        }
    }
};

module.exports = ProductsInCartServices;