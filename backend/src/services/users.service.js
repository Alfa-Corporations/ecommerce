const { Users, Cart, Order, Products, ProductsInCart, ProductsInOrder } = require('../models')

class UserServices {
    static async create(newUser) {
        try {
            const user = await Users.create(newUser);
            const { id } = user;
            const cart = await Cart.create({ userId: id });
            const result = { userCreated: user, cartCreated: cart };
            return result;
        } catch (error) {
            throw error
        }
    }
    static async updateVerify(code, id) {
        try {
            const result = await Users.findOne({
                where: { id },
                attributes: ["codeVerify"]
              });
              if (result === null) return result;
              if (code === result.dataValues.codeVerify) {
                const userVerified = await Users.update({ isVerify: true }, {
                  where: { id }
                })
                return { status: "verified" }
              } else {
                  return "code not found";
              }
        } catch (error) {
            throw error
        }
    }
    static async getAllUsers() {
        try {
            const result = await Users.findAll({
                attributes: {
                    exclude: ["password", "codeVerify", "createdAt", "updatedAt", "role_id"]
                },
                include: [
                    {
                        model: Cart,
                        as: 'cart',
                        attributes: ["id", "status"]
                    },
                    {
                        model: Order,
                        as: 'order',
                        attributes: ["id", "status"]
                    }
                ]
            })
            return result
        } catch (error) {
            throw error
        }
    }
    static async deleteUser(id) {
        try {
            const user = await Users.findOne({
                where: { id },
                include: [
                    {
                        model: Cart,
                        as: 'cart',
                        attributes: ["id"]
                    },
                    {
                        model: Order,
                        as: 'order',
                        attributes: ["id"]
                    }
                ]
            });
            
            const promises = [
                Users.destroy({ where: { id } }),
                Cart.destroy({ where: { userId: id } }),
                Products.destroy({ where: { userId: id } }),
                user.order.id && Order.destroy({ where: { userId: id } }),
                user.cart.id && ProductsInCart.destroy({ where: { cartId: user.cart.id } }),
                user.order.id && ProductsInOrder.destroy({ where: { orderId: user.order.id } })
            ]

            await Promise.all(promises)
            return {status: "Deleted", userDeleted: user}
        } catch (error) {
            throw error
        }
    }
};

module.exports = UserServices;