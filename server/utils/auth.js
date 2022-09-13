const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET_KEY;
const expiration = 7200;

module.exports = {
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
