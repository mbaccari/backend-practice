const { Schema, model } = require('mongoose')
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [{type: Schema.ObjectId, ref: 'User'}],
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const Post = model('Post', postSchema);

module.exports = Post