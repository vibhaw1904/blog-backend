const Comment=require('../models/CommentModal')
const asyncHandler=require('express-async-handler')

const newComment = async (req, res) => {
    try {
        const { name, postId, date, comments } = req.body;
        const comment = await Comment.create({ name, postId, date, comments });
        res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const getComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ postId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};


const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
        await Comment.findByIdAndDelete(id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
module.exports={getComment,newComment,deleteComment}