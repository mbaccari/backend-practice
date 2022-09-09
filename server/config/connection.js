const { connect, connection } = require('mongoose');

const connectionString =
'mongodb+srv://mbaccari:MoNg1!93214@cluster0.t0gy9.mongodb.net/?retryWrites=true&w=majority' || 'mongodb://localhost:27017/testDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;