const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'like'
    }]
})
const post = mongoose.model('post', postSchema);

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    body: {
        type: String,
        required: true
    }
})

const comment = mongoose.model('comment', commentSchema);


const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
})

const like = mongoose.model('like', likeSchema);

module.exports = { like, comment, post };