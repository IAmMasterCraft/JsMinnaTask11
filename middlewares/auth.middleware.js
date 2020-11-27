const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;

exports.verifyToken = (request, response, next) => {
    const token = request.headers.authorization;
    if (!token) response.status(403).json({ error: "invalid token" });
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (error, value) => {
            if (error) response.status(500).json({ error });
            request.customer = value.data;
            next();
        });
    }
}