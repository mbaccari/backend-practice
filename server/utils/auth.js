const jwt = require('jsonwebtoken');
const expiration = 5000;

module.exports = {
  signToken: function ({ email, username, _id }) {
    console.log(email)
    const payload = { email, username, _id };
    const token = jwt.sign({ data: payload }, process.env.JWT_SECRET_KEY, { expiresIn: expiration });
    console.log(token)
    return token
  },
};
