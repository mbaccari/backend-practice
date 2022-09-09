const jwt = require('jsonwebtoken');

const secret = 'j023d021398dqpoewiujrc0201293i40d0138u4d9hr32n';
const expiration = 7200;

module.exports = {
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
