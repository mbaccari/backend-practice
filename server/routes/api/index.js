// Set requirements (Express Router)
const router = require('express').Router();

// Set routes (user and thought routes)
const userRoutes = require('./userRoutes');

const postRoutes = require('./postRoutes');

// Add `/users` to created routes 
router.use('/users', userRoutes);

router.use('/posts', postRoutes)


// Export Module Router
module.exports = router;