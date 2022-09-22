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
    postedBy: {type: Schema.ObjectId, ref: 'User'},
    created: {
        type: Date,
        default: Date.now
    }
})

const Post = model('Post', postSchema);

module.exports = Post