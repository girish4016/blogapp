const express = require('express');
const router = express.Router();

const { showAllPosts, createPost, createComment, createLike, removeLike } = require('../controllers/blog.js')

router.get('/post', showAllPosts);
router.post('/post', createPost);

router.post('/comments', createComment);

router.post('/like', createLike);
router.delete('/like', removeLike);

module.exports = router;