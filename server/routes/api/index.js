// Set requirements (Express Router)
const router = require('express').Router();

// Set routes (user and thought routes)
const userRoutes = require('./userRoutes');

// Add `/users` to created routes 
router.use('/users', userRoutes);


// Export Module Router
module.exports = router;