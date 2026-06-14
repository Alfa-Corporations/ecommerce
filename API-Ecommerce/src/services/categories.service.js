const { Categories } = require("../models");


class CategoriesService {
    static async createCategory(newCategory) {
        try {
            const createdCategory = await Categories.create(newCategory);
            return createdCategory;
        } catch (error) {
            throw error;
        }
    }
    static async getAllCategories() {
        try {
            const categories = await Categories.findAll();
            return categories;
        } catch (error) {
            throw error;
        }
    }
    static async updateCategory(id, data) {
        try {
            const category = await Categories.update(data, {
                where: { id: Number(id) }
            });
            return category;
        } catch (error) {
            throw error;
        }
    }
    static async deleteCategory(id) {
        try {
            const category = await Categories.destroy({
                where: { id: Number(id) }
            });
            return category;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = CategoriesService;