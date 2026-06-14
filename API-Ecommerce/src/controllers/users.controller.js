const { UserServices, ProductsInCartServices, ProductsInOrderServices } = require("../services");
const template = require("../template/template");
const transporter = require('../utils/mailer');

const createUser = async (req, res, next) => {
    try {
        const newUser = req.body;
        const dataCreated = await UserServices.create(newUser);
        const { userCreated, cartCreated } = dataCreated;
        const result = { user: userCreated, cart: cartCreated };
        res.status(201).json(result);
        transporter.sendMail({
            from: "<alfonsouzcategui2@gmail.com>",
            to: userCreated.email,
            subject: "Welcome to my store",
            text: `¡Hello! ${userCreated.firstName} this is your verification code: ${userCreated.codeVerify}`,
            html: template(userCreated)
        });
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

const verifyUser = async (req, res, next) => {
    try {
        const { codeVerify } = req.body;
        const { id } = req.params;
        const result = await UserServices.updateVerify(codeVerify, id);
        if (result === null) {
            res.status(400).json({ message: "User not found" });
        } else {
            if (result !== "code not found") res.status(200).json(result);
            if (result === "code not found") res.status(400).json(result);
        }
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

const getAllUser = async (req, res, next) => {
    try {
        const result = await UserServices.getAllUsers()
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await UserServices.deleteUser(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

const getAllCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ProductsInCartServices.getAllCart(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

const addPrductToCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productToAdded = req.body;
        const result = await ProductsInCartServices.addPrductToCart(id, productToAdded);
        if (result === "No hay stock suficiente") res.status(400).json(result);
        if(result !== "No hay stock suficiente") res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
}

const updateProductInCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { productId, quantity } = req.body;
        const result = await ProductsInCartServices.updatePrductToCart(Number(id), productId, quantity);
        if (result === "No hay stock suficiente") res.status(400).json(result);
        if(result !== "No hay stock suficiente") res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
}

const deleteProductInCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ProductsInCartServices.deleteProductInCart(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

const purchases = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ProductsInOrderServices.purchases(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

const getPurchases = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ProductsInOrderServices.getPurchases(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "Algo salio mal",
        });
    }
};

module.exports = {
    createUser,
    verifyUser,
    getAllUser,
    deleteUser,
    getAllCart,
    addPrductToCart,
    updateProductInCart,
    deleteProductInCart,
    purchases,
    getPurchases
};