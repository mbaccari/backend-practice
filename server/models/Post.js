import { Schema, model} from 'mongoose'
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
    created: {
        type: Date,
        default: Date.now
    }
})

const Post = model('Post', PostSchema)

export default Post;