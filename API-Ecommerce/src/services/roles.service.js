const { Roles } = require("../models");

class RoleServices {
    static async create(newRole) {
        try {
            const result = await Roles.create(newRole);
            return result;
        } catch (error) {
            throw error;
        }
    }
    static async getAll() {
        try {
            const result = await Roles.findAll();
            return result;
        } catch (error) {
            throw error;
        }
    }
    static async update(id, update) {
        try {
            const result = await Roles.update(update, {
                where: { id }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
    static async delete(id) {
        try {
            const result = await Roles.destroy({
                where: { id }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RoleServices;