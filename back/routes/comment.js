import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js' ;

// model 
import Write from '../models/write.js';
import Project from '../models/project.js';
import User from '../models/users.js';
import Comment from '../models/comment.js';

const router = express.Router();


//@ path    GET /api/comment
//@ doc     댓글 가져오기
//@ access  private
router.get('/', async (req, res) => {
    try {
        const commnet = await Comment.find();
        res.status(200).json(commnet)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


//@ path    POST /api/comment
//@ doc     댓글 생성
//@ access  private
router.post('/', async (req, res) => { 
    try {
        // get data: user, content, writeId, 
        const { user, content, writeId } = req.body;
        const comment = await new Comment(req.body).populate({ path: "user._id", select: 'id name profileImage createdAt' })
        comment.save();

        await Promise.all([
            User.findByIdAndUpdate(user._id, { $push: { comments: comment._id } }, { new: true }).exec(),
            Write.findByIdAndUpdate(writeId, { $push: { comments: comment._id }, $inc: { commentCount: 1 } }, { new: true }).exec()
        ])

        res.status(201).json(comment)

    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


//@ path    PATCH /api/comment/edit/:commentId
//@ doc     댓글 수정
//@ access  private
router.patch('/edit/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const putData = {};

        if(content) putData.content = content;

        const comment = await Comment.findByIdAndUpdate(commentId, putData, { new: true }).exec();
        res.status(201).json(comment)

    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    DELETE /api/comment
//@ doc     댓글 삭제
//@ access  private
router.delete('/', async (req, res) => {
    try {
        const { userId, writeId, commentId } = req.body;
        const [comment, user, write] = await Promise.all([
            Comment.findByIdAndDelete(commentId, { new: true }).exec(),
            User.findByIdAndUpdate(userId, { $pull: { comments: commentId } }, { new: true }).exec(),
            Write.findByIdAndUpdate(writeId, { $pull: { comments: commentId }, $inc: { commentCount: -1 } }, { new: true }).exec(),
        ])
        res.status(201).json(write);

    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
    
})



//@ path    PATCH /api/comment/like
//@ doc     좋아요 업
//@ access  private
router.patch('/like', async (req, res) => {
    try {
        const { userId, commentId } = req.body;
        const [ comment ] = await Promise.all([
            Comment.findByIdAndUpdate(commentId, { $push: {likes: userId }, $inc: { likeCount: 1 } }, { new: true }),
            // 유저모델에 좋아요한 댓글을 넣을까 말까 ...
        ])
        res.status(201).json(comment);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})



//@ path    PATCH /api/comment/unlike
//@ doc     좋아요 취소 
//@ access  private
router.patch('/unlike', async (req, res) => {
    try {
        const { userId, commentId } = req.body;
        const [ comment ] = await Promise.all([
            Comment.findByIdAndUpdate(commentId, { $pull: {likes: userId }, $inc: { likeCount: -1 } }, { new: true }),
        ])
        res.status(201).json(comment);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})






export default router;