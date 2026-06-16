const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken) {
    const token = bearerToken.split("Bearer ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY, "HS512");
      next();
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: "Invalid Token",
      });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authenticate;
