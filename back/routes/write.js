import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js' ;

// model 
import Write from '../models/write.js';
import Project from '../models/project.js';
import User from '../models/users.js';

const router = express.Router();


// 221020 내일 이미지 글에 연결하고 친추초대 기능 만들어야됨



//@ path    GET /api/write
//@ doc     로드 인증글
//@ access  private
router.get('/', async (req, res) => {
    try {
        const write = await Write.find();
        res.status(200).json(write)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


//@ path    POST /api/write
//@ doc     생성 인증글
//@ access  private
router.post('/', async (req, res) => { 
    try {
        const { user, projectId, title, content, writePublic } = req.body;
        const write = await new Write(req.body);
        write.save();


        await Promise.all([
            User.updateOne({_id: user._id}, { $push: { writes: write._id } }, { new: true }),
            Project.updateOne({_id: projectId}, { $push: { writes: write._id } }, { new: true })
        ])
        res.status(201).json(write)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


//@ path    PATCH /api/write/edit/:writeId
//@ doc     수정 인증글
//@ access  private
router.patch('/edit/:writeId', async (req, res) => {
    try {
        const { writeId } = req.params;
        const { title, content, writePublic } = req.body;

        let putData = {}
        if(title) putData.title = title;
        if(content) putData.content = content;
        if(writePublic) putData.writePublic = writePublic;

        const write = await Write.findByIdAndUpdate(writeId, putData, { new: true });

        res.status(201).json(write);

    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    DELETE /api/write
//@ doc     삭제 인증글
//@ access  private
router.delete('/', async (req, res) => {
    try {
        const { userId, writeId, projectId } = req.body;

        await Promise.all([
            Write.findByIdAndRemove(writeId),
            User.updateOne({_id: userId}, { $pull: {writes: writeId } }, { new: true }),
            Project.updateOne({_id: projectId}, { $pull: {writes: writeId } }, { new: true }),
        ])

        res.status(201).end();
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
    
})



//@ path    PATCH /api/write/like
//@ doc     좋아요 업
//@ access  private
router.patch('/like', async (req, res) => {
    try {
        const { userId, writeId } = req.body;
        const [ write ] = await Promise.all([
            Write.findByIdAndUpdate(writeId, { $push: {likes: [userId] }, $inc: { likeCount: 1 } }, { new: true }),
            User.updateOne({_id: userId}, { $push: {likePost: writeId } }, { new: true }),
        ])
        res.status(201).json(write);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})



//@ path    PATCH /api/write/unlike
//@ doc     좋아요 취소 
//@ access  private
router.patch('/unlike', async (req, res) => {
    try {
        const { userId, writeId } = req.body;

        const [ write ] = await Promise.all([
            Write.findByIdAndUpdate(writeId, { $pull: {likes: userId }, $inc: { likeCount: -1 } }, { new: true }),
            User.updateOne({_id: userId}, { $pull: {likePost: writeId } }, { new: true }),
        ])

        res.status(201).json(write);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
    
})



export default router;