const router = require('express').Router();
const {
    getPosts,
    getPostById,
    getPostByUser,
    createPost,
    deletePost
} = require('../../controllers/post-controller');

router 
    .route('/')
    .get(getPosts)

router
    .route('/:id')
    .get(getPostById)

router
    .route('/userposts/:id')
    .get(getPostByUser)

router
    .route('/post')
    .post(createPost)

router
    .route('/delete')
    .delete(deletePost)    

module.exports = router;