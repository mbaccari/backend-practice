const { User, Post } = require('../models');
const { create } = require('../models/Post');
const moment = require('moment');
const { rawListeners } = require('../models/User');



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
            // res.json(post).send(post)
            console.log(post)
        })
        .catch((err) => res.status(500).json(err));
    },

    getPostByUser(req, res) {
        console.log(req.params.id)
        Post.find({ userId: req.params.id })
            .then(posts => {
                console.log(posts)
                res.send(posts)
            })
    },

    createPost(req, res) {
        const formatted_date = moment().format('MMM. DD, YYYY');
        const formatted_time = moment().format("h:mm A")
        res.send( {message: 'oowee'})

        Post.create({title: req.body.title, body: req.body.body, userId: req.body.user._id, username: req.body.user.username, date: formatted_date, time: formatted_time})
            .then(post => {
                console.log(post)
                User.findOne({ _id: req.body.user._id})
                    .then(user => {
                        user.posts.push(post);
                        user.save();
                    })
            })
    },
    
    async deletePost(req, res) {
        console.log(req.body.id)
        Post.findOneAndDelete({ _id: req.body.id }).then(post => {
            console.log(post)
        })
    }
}