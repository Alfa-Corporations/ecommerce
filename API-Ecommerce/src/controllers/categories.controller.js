const { CategoriesServices } = require('../services');

const createCategory = async (req, res, next) => {
    try {
        const newCategory = req.body;
        const result = await CategoriesServices.createCategory(newCategory);
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            message: error.message,
            errorContent: error
        });
    }
};

const getAllCategories = async (req, res, next) => {
    try {
        const result = await CategoriesServices.getAllCategories();
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: error.message,
            errorContent: error
        });
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await CategoriesServices.updateCategory(id, data);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: error.message,
            errorContent: error
        });
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await CategoriesServices.deleteCategory(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: error.message,
            errorContent: error
        });
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};