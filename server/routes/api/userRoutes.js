const router = require('express').Router();
const {
    getUsers,
    getUserById,
    signUp,
    login,
    editUser
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getUsers)

router
    .route('/signup')
    .post(signUp)

router
    .route('/login')
    .post(login)

router.route('/:id')
    .get(getUserById)

router
    .route('/editUser')
    .post(editUser)
module.exports = router;