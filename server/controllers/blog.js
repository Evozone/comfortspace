const BlogModel = require('../models/blogModel');

exports.createBlog = async (req, res) => {
    const { title, content, cover, authorId, authorName, authorUsername } =
        req.body;
    try {
        const result = await BlogModel.create({
            title,
            content,
            cover,
            authorId,
            authorName,
            authorUsername,
        });
        res.status(201).json({
            success: true,
            result,
            message: 'Blog created',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};

exports.get20Blogs = async (req, res) => {
    try {
        const result = await BlogModel.find().sort({ createdAt: -1 }).limit(20);
        res.status(200).json({
            success: true,
            result,
            message: '20 blogs fetched',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};

exports.getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await BlogModel.findById(id);
        res.status(200).json({
            success: true,
            result,
            message: 'Fetched a Blog by id',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'No blog found',
            error: error.message,
        });
        console.log(error);
    }
};

exports.updateBlogById = async (req, res) => {
    const { id } = req.params;
    const { title, content, cover, authorId, authorName, authorUsername } =
        req.body;
    const update = {
        title,
        content,
        cover,
        authorId,
        authorName,
        authorUsername,
    };
    try {
        const isAuthor = await BlogModel.findById(id);
        if (isAuthor.authorId !== authorId) {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to update this blog',
            });
        }
        const result = await BlogModel.findOneAndUpdate(id, update, {
            new: true,
        });
        res.status(200).json({
            success: true,
            result,
            message: 'Blog updated',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};

exports.deleteBlogById = async (req, res) => {
    const { id } = req.params;
    const { authorId } = req.body;
    try {
        const isAuthor = await BlogModel.findById(id);
        if (isAuthor.authorId !== authorId) {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to delete this blog',
            });
        }
        await BlogModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Blog deleted',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};
