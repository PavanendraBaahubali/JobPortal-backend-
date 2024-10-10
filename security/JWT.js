const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const secretKey = crypto.randomBytes(32).toString('hex');

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
};

module.exports = {generateToken};