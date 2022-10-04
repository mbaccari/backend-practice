const router = require('express').Router();
const {
    getPosts,
    getPostById,
    createPost
} = require('../../controllers/post-controller');

router 
    .route('/')
    .get(getPosts)

router
    .route('/:id')
    .get(getPostById)

router
    .route('/post')
    .post(createPost)

module.exports = router;