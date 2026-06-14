const { Products, Users, Categories } = require("../models");


class ProductServices {
    static async create(newProduct) {
        try {
            const { roleId } = await Users.findOne({ where: { id: newProduct.userId }, attributes: ["roleId"] });
            if (roleId !== 1) {
                return "You are not an admin"
            } else {
                const result = await Products.create(newProduct)
                return result;
            }
        } catch (error) {
            throw error
        }
    }
    static async getAllProducts() {
        try {
            const result = await Products.findAll({
                include: [
                    {
                        model: Categories,
                        as: "category",
                        attributes: ["id","name"]
                    },
                    {
                        model: Users,
                        as: "created",
                        attributes: ["firstName", "lastName"]
                    }
                ]
                ,
                attributes: {
                    exclude: ["categoryId", "userId", "category_id", "user_id"]
                }
            });
            return result;
        } catch (error) {
            throw error
        }
    }
    static async getProductsByUser(id) {
        try {
            const result = await Products.findAll({
                where: { userId: id },
                include: {
                    model: Categories,
                    as: "category",
                    attributes: ["name"]
                },
                attributes: {
                    exclude: ["categoryId", "userId", "category_id", "user_id"]
                }
            });
            return result;
        } catch (error) {
            throw error
        }
    }
    static async updateProduct(id, data) {
        try {
            const newUpdate = {}

            if (data.title.length > 1) newUpdate.title = data.title;
            if (data.description.length > 1) newUpdate.description = data.description;
            if (data.price > 0) newUpdate.price = data.price;
            if (data.productImgs.length > 1) newUpdate.productImgs = data.productImgs;

            const previousProduct = await Products.findOne({ where: { id }, attributes: ["title", "description", "price", "productImgs", "updatedAt"] });
            await Products.update({ ...newUpdate }, { where: { id } });
            const productUpdated = await Products.findOne({ where: { id }, attributes: ["title", "description", "price", "productImgs", "updatedAt"] });

            const result = {
                previousProduct: previousProduct,
                productUpdated: productUpdated
            };
            return result;
        } catch (error) {
            throw error
        }
    }
    static async updateStockProduct(id, stock) {
        try {
            const previousProduct = await Products.findOne({ where: { id }, attributes: ["title", "stock", "updatedAt"] });
            if (stock > 0) {
                await Products.update({ stock: previousProduct.stock + stock }, { where: { id } });
                const productUpdated = await Products.findOne({ where: { id }, attributes: ["title", "stock", "updatedAt"] });

                const result = {
                    previousProduct: previousProduct,
                    productUpdated: productUpdated
                };
                return result;
            }
            return { message: "Value added must be greater than zero" }
        } catch (error) {
            throw error
        }
    }
    static async deleteProduct(id) {
        try {
            const previousProduct = await Products.findOne({ where: { id } });
            if (previousProduct) {
                await Products.destroy({ where: { id } });

                const result = {
                    status: "Deleted product",
                    DeletedProduc: previousProduct
                };

                return result;
            }
            return "Product not found"
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductServices;