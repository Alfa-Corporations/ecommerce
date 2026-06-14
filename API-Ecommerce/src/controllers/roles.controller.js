const { RoleServices } = require('../services');

const createRole = async (req, res, next) => {
    try {
        const newRole = req.body;
        const result = await RoleServices.create(newRole);
        res.status(201).json(result);
    } catch (error) {
        next({
            status: 400,
            message: error.message,
            errorContent: error
        })
    }
};

const getAllRoles = async (req, res, next) => {
    try {
        const result = await RoleServices.getAll();
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: error.message,
            errorContent: error
        })
    }
};

const updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const result = await RoleServices.update(id, update);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: error.message,
            errorContent: error
        })
    }
};

const deleteRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await RoleServices.delete(id);
        res.status(200).json(result);
    } catch (error) {
        next({
            status: 400,
            message: error.message,
            errorContent: error
        })
    }
};

module.exports = {
    createRole,
    getAllRoles,
    updateRole,
    deleteRole
}