const { AuthServices } = require('../services');

const login = async (req, res, next) => {
    try {
        const credentials = req.body;
        const result = await AuthServices.login(credentials);
        if (result) {
            const { email, password, id, firstName, lastName, roleId, phoneNumber, isVerify, codeVerify, cart } = result;
            const token = await AuthServices.generateToken({ email, password, id });
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