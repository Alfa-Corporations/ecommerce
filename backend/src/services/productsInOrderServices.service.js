const { ProductsInOrder, Cart, ProductsInCart, Order, Products, Users } = require('../models');

class ProductsInOrderServices {
    static async purchases(id) {
        try {
            const cart = await Cart.findOne({
                where: { userId: id },
                include: {
                    model: ProductsInCart,
                    as: 'cartProduct',
                    attributes: ['id', 'productId', 'price', 'quantity', 'total'],
                }
            });

            const order = await Order.create({
                userId: id,
                totalPrice: cart.totalPrice,
                status: "Confirmado"
            });

            const { cartProduct } = cart;
            const promises = [
                ProductsInOrder.bulkCreate(cartProduct.map(product => {
                    return {
                        productId: product.productId,
                        price: product.price,
                        quantity: product.quantity,
                        total: product.total,
                        orderId: order.id
                    };
                })),
                ProductsInCart.destroy({ where: { cartId: cart.id } }),
                Cart.update({ totalPrice: 0, status: "Empty" }, { where: { id: cart.id } }),
                Order.findOne({
                    where: { id: order.id },
                    attributes: ["id", "totalPrice", "status"],
                    include: {
                        model: ProductsInOrder,
                        as: 'orderProduct',
                        attributes: ['id', 'productId', 'price', 'quantity', 'total'],
                        include: {
                            model: Products,
                            as: 'product',
                            attributes: ['id', 'title', 'productImgs']
                        }
                    }
                })
            ];

            const promiseAll = await Promise.all(promises);

            return promiseAll[3];
        } catch (error) {
            throw error;
        }
    }
    static async getPurchases(id) {
        try {
            const order = await Order.findAll({
                where: { userId: id },
                attributes: ["id", "totalPrice", "status", "createdAt", "updatedAt"],
                include: {
                    model: ProductsInOrder,
                    as: 'orderProduct',
                    attributes: ['id', 'productId', 'price', 'quantity', 'total'],
                    include: {
                        model: Products,
                        as: 'product',
                        attributes: ['id', 'title', 'productImgs']
                    }
                }
            });
            return order;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductsInOrderServices;

// Additional admin helpers
ProductsInOrderServices.getAllOrders = async function () {
    try {
        const orders = await Order.findAll({
            attributes: ["id", "totalPrice", "status", "createdAt", "updatedAt"],
            include: [
                {
                    model: ProductsInOrder,
                    as: 'orderProduct',
                    attributes: ['id', 'productId', 'price', 'quantity', 'total'],
                    include: {
                        model: Products,
                        as: 'product',
                        attributes: ['id', 'title', 'productImgs']
                    }
                },
                {
                    model: Users,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }
            ]
        });
        return orders;
    } catch (error) {
        throw error;
    }
};

ProductsInOrderServices.updateOrderStatus = async function (orderId, status) {
    try {
        await Order.update({ status }, { where: { id: orderId } });
        const updated = await Order.findOne({
            where: { id: orderId },
            attributes: ["id", "totalPrice", "status", "createdAt", "updatedAt", "userId"],
            include: [
                {
                    model: ProductsInOrder,
                    as: 'orderProduct',
                    attributes: ['id', 'productId', 'price', 'quantity', 'total'],
                    include: {
                        model: Products,
                        as: 'product',
                        attributes: ['id', 'title', 'productImgs']
                    }
                },
                {
                    model: Users,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                }
            ]
        });
        return updated;
    } catch (error) {
        throw error;
    }
};