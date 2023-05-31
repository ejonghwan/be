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
        // const write = await new Write(req.body);
        // write.save();
        /*
            5.30 인증글을 작성하면 
            0. 글쓴이가 프로젝트 리더이면 생성자로, 아니면 인스턴스 유저에서 돌아가게 분기처리
            1. 프로젝트 찾고 
            2. 프로젝트 안에 인스턴스 유저찾고 
            3. 그 안에 days에 date: `${new Date().getFullYear()}` + `${new Date().getMonth() + 1}` 이렇게 [{ date: "20235", count: 1 }], 있으면 count: $int++
        */
        // days필드엔 `${new Date().getFullYear()}` + `${new Date().getMonth() + 1}` 이렇게 [{ date: "20235", count: 1 }] 이런식으로 

        // db 구조
        // instanceUser: [{
        //     _id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'user'},
        //     rank: { type: String, required: true, default: 'e'},
        //     days: [{ 
        //         date: { type: String }, 
        //         count: { type: Number, default: 0, },
        //     }], //days로 달력/잔디 같이씀
        // },],
        const nowDate = `${new Date().getFullYear()}` + `${new Date().getMonth() + 1}`;
        const userFindDate = await Project.findOne({ "instanceUser.days.date" : nowDate })
        console.log(userFindDate)

        // 오늘 쓴 인증글이 있다면 count만 ++
        if(userFindDate) {
            await Project.findByIdAndUpdate(projectId, 
                { $inc: { "instanceUser.$[ele].days": { $inc: { count: 1 } } } }, // 5/31 여기 ++안됨 해야됨
                { arrayFilters: [{"ele._id": user._id}], new: true }
            )
        }
        // 오늘 쓴 인증글이 없다면 date count 추가
        if(!userFindDate) {
            await Project.findByIdAndUpdate(projectId, 
                { $push: { "instanceUser.$[ele].days": { date: `${new Date().getFullYear()}` + `${new Date().getMonth() + 1}`} } },
                { arrayFilters: [{"ele._id": user._id}], new: true }
            )
        }

        await Promise.all([
            // User.updateOne({_id: user._id}, { $push: { writes: write._id } }, { new: true }),
            // Project.updateOne({_id: projectId}, { $push: { writes: write._id } }, { new: true }),
            // Project.updateOne({_id: projectId}, { $push: { writes: write._id } }, { new: true })
        ])
        // res.status(201).json(write)
        res.status(201).end();
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