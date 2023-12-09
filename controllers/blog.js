// showAllPosts, createPost, createComment, createLike, removeLike

const { post, like, comment } = require('../models/blog.js');


//post
const showAllPosts = async (req, res) => {
    try {
        const allPosts = await post.find({}).populate('likes').populate('comments');
        res.status(200).json({ allPosts })
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            msg: 'error in fetching all posts'
        })
    }

}
const createPost = async (req, res) => {
    try {
        const newPost = new post({
            title: req.body.title,
            body: req.body.body,
            comments: [],
            likes: []
        })
        const createdPost = await newPost.save();
        res.status(200).json({
            msg: createdPost
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            msg: 'problem in creating post'
        })
    }
}

//comment
const createComment = async (req, res) => {
    try {
        const newComment = new comment({
            body: req.body.body,
            post: req.body.post
        })
        const createdComment = await newComment.save();

        const updatedPost = await post.findByIdAndUpdate(req.body.post, { $push: { comments: newComment._id } }, { new: true })
            .populate('comments')
            .populate('likes');

        console.log(createComment, updatedPost);
        res.status(200).json({
            post: updatedPost,
            comment: createComment
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            msg: 'problem in creating comment'
        })
    }
}


//like
const createLike = async (req, res) => {
    try {
        const newLike = new like({
            post: req.body.post
        })
        const createdLike = await newLike.save();

        const updatedPost = await post.findByIdAndUpdate(req.body.post, { $push: { likes: newLike._id } }, { new: true })
            .populate('likes')
            .populate('comments');

        console.log(createLike, updatedPost);
        res.status(200).json({
            createdLike,
            updatedPost
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            msg: 'problem at creating like'
        })
    }
}

const removeLike = async (req, res) => {
    try {
        await like.findByIdAndDelete(req.body.like);

        await post.findByIdAndUpdate(req.body.post, ({ $pull: { likes: req.body.like } }))

        res.status(200).json({
            msg: 'like removed'
        })

    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            msg: 'problem with removing link'
        })
    }
}



module.exports = { showAllPosts, createPost, createComment, createLike, removeLike }

