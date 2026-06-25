const { AuthServices } = require('../services');

const login = async (req, res, next) => {
    try {
        const credentials = req.body;
        const result = await AuthServices.login(credentials);
        if (result === 'not-approved') {
            return res.status(403).json({ message: 'Usuario pendiente de aprobación por el administrador' });
        }
        if (result === 'inactive') {
            return res.status(403).json({ message: 'Usuario desactivado. Contacta al administrador' });
        }
        if (result) {
            const { email, password, id, firstName, lastName, roleId, phoneNumber, isVerify, codeVerify, cart } = result;
            const token = await AuthServices.generateToken({ email, password, id, roleId });
            const user = { email, id, firstName, lastName, roleId, phoneNumber, isVerify, codeVerify, cart };
            res.status(200).json({ user, token: token });
        } else {
            res.status(400).json({ message: "Wrong password or email" });
        }
    } catch (error) {
        next({
            status: 400,
            message: error.message,
            errorContent: error
        })
    }
}

module.exports = login;