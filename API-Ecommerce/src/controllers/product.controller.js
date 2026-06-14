const { ProductServices } = require('../services');
const transporter = require('../utils/mailer');
const fs = require('fs');
const UpPhoto = require('../middlewares/upPhoto.milddelware');

const createProduct = async (req, res, next) => {
    try {
        const newProduct = req.body;
        const imgs = req.files;
        req.files.forEach((file, i) => {
            req.files[i].buffer = fs.readFileSync(file.path);
        });
        newProduct.productImgs = await UpPhoto(imgs);
        
        const result = await ProductServices.create(newProduct);
        if (result === "You are not an admin") {
            return res.status(400).json(result);
        } else {
            res.status(201).json(result);
        }
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const result = await ProductServices.getAllProducts();
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

const getProductsByUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ProductServices.getProductsByUser(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await ProductServices.updateProduct(id, data);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

const updateStockProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;
        const result = await ProductServices.updateStockProduct(id, stock);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ProductServices.deleteProduct(id);

        if (result === "Product not found") res.status(400).json({ message: "Product not found" });
        if (result !== "Product not found") res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductsByUser,
    updateProduct,
    updateStockProduct,
    deleteProduct
}