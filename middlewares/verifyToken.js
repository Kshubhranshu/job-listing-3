const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const headerToken = req.headers["authorization"];

        if (!headerToken) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decode = jwt.verify(headerToken, process.env.SECRET_CODE);
        req.userId = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            errorMessage: "Invalid token!",
            isTokenExpires: true,
        });
    }
};

const decodeJwtToken = (authHeader) => {
    try {
        if (!authHeader) return;
        const decode = jwt.verify(authHeader, process.env.SECRET_CODE);
        const userId = decode.userId || null;
        return userId;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { verifyToken, decodeJwtToken };
