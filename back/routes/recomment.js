import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js' ;

// model 
import Write from '../models/write.js';
import Project from '../models/project.js';
import User from '../models/users.js';
import Comment from '../models/comment.js';
import Recomment from '../models/recomment.js';

const router = express.Router();


//@ path    GET /api/recomment
//@ doc     대댓글 가져오기
//@ access  private
router.get('/', async (req, res) => {
    try {
        const recommnet = await Recomment.find();
        res.status(200).json(recommnet)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


//@ path    POST /api/recomment
//@ doc     대댓글 생성
//@ access  private
router.post('/', async (req, res) => { 
    try {
        // get data: user, content, coomentId, 
        const { user, content, comment } = req.body;
        const recomment = await new Recomment(req.body)
        recomment.save();

        await Promise.all([
            User.findByIdAndUpdate(user._id, { $push: { recomments: recomment._id } }, { new: true }).exec(),
            Comment.findByIdAndUpdate(comment, { $push: { recomments: recomment._id }, $inc: { recommentCount: 1 } }, { new: true }).exec()
        ])



        res.status(201).json(recomment)

    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


//@ path    PATCH /api/recomment
//@ doc     대댓글 수정
//@ access  private
router.patch('/:recommentId', async (req, res) => {
    try {
        const { recommentId } = req.params;
        const { content } = req.body;
        const putData = {};

        if(content) putData.content = content;

        const recomment = await Recomment.findByIdAndUpdate(recommentId, putData, { new: true }).exec();
        res.status(201).json(recomment)

    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    DELETE /api/recomment
//@ doc     대댓글 삭제
//@ access  private
router.delete('/', async (req, res) => {
    try {
        const { userId, commentId, recommentId } = req.body;
        const [recomment, user, comment] = await Promise.all([
            Recomment.findByIdAndDelete(recommentId, { new: true }).exec(),
            User.findByIdAndUpdate(userId, { $pull: { recomments: recommentId } }, { new: true }).exec(),
            Comment.findByIdAndUpdate(commentId, { $pull: { recomments: recommentId }, $inc: { recommentCount: -1 } }, { new: true }).exec(),
        ])
        res.status(201).json(comment);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})



//@ path    PATCH /api/recomment/like
//@ doc     좋아요 업
//@ access  private
// router.patch('/', async (req, res) => {
//     try {
//         // console.log(req.body)
//         // const { userId, recommentId } = req.body;
//         // // console.log(11, userId)
//         // const [ recomment ] = await Promise.all([
//         //     Recomment.findByIdAndUpdate(recommentId, { $push: { likes: userId }, $inc: { likeCount: 1 } }, { new: true }),
//         // ])
//         // res.status(201).json(recomment);
//         // res.send('??????????')
//     } catch (err) {
//         console.error('server:', err);
//         res.status(500).json({ message: err.message });
//     }
// })



//@ path    PATCH /api/recomment/unlike
//@ doc     좋아요 취소 
//@ access  private
router.put('/unlike', async (req, res) => {
    try {
        const { userId, recommentId } = req.body;
        const [ recomment ] = await Promise.all([
            Recomment.findByIdAndUpdate(recommentId, { $pull: {likes: userId }, $inc: { likeCount: -1 } }, { new: true }),
        ])
        res.status(201).json(recomment);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})



router.patch('/aa', async (req, res) => {
    try {
       
        console.log(123123)
        
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})




export default router;