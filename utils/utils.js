const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKEN_SECRET;

exports.generateToken = (customer) => jwt.sign({ data: customer },
    tokenSecret, { expiresIn: "24h" },
)