const { User, Post } = require('../models');
const { create } = require('../models/Post');

module.exports = {
    getPosts(req, res) {
        Post.find()
        .then((user) => res.send(user))
        .catch((err) => res.status(500).json(err));
    },

    getPostById(req, res) {
        console.log(req.params.id)
        Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(post).send(post)
        })
        .catch((err) => res.status(500).json(err));
    },

    createPost(req, res) {
        console.log(req.body.title)
        console.log(req.body.body)
        console.log(req.body.user)
        res.send( {message: 'oowee'})

        Post.create({title: req.body.title, body: req.body.body, postedBy: req.body.user})
            .then(post => {
                console.log(post)
            })
    }
}