// Message from the author
// While express server setup is very boiler plate and this was mostly copy/paste
// I am explicitly commenting what is happening and trying my best to grasp concepts used

// Importing express module
const express = require('express');

const routes = require('./routes');

const cookieParser = require('cookie-parser')

// Database connection import
const db = require('./config/connection');

// Defining our port we're using
const PORT = process.env.PORT || 3001;

// Creating express app
const app = express();


// Express.urlencoded() and express.json() are 
// middleware to recognize incoming requests as Objects or Strings (urlencoded) or JSON (json)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

app.use(routes)

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// // Get home page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
  console.log('eee')
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  })
})
