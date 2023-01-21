const express = require('express');
const router = express.Router();

const {
    createBlog,
    get20Blogs,
    getBlogById,
    updateBlogById,
    deleteBlogById,
} = require('../controllers/blog.js');

router.get('/getList', get20Blogs);
router.post('/create', createBlog);
router.get('/get/:id', getBlogById);
router.put('/update/:id', updateBlogById);
router.delete('/delete/:id', deleteBlogById);

module.exports = router;
