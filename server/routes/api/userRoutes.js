const router = require('express').Router();
const {
    getUsers,
    getUserById,
    signUp,
    login,
    getStatic
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getUsers)
    .post(signUp);

router
    .route('/login')
    .post(login)

router.route('/:id')
    .get(getUserById)


module.exports = router;