import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js' ;

// model 
import Project from '../models/project.js';
import User from '../models/users.js';

const router = express.Router();


//@ path    GET /api/project
//@ doc     로드 프로젝
//@ access  private
router.get('/', async (req, res) => {
    try {
        const project = await Project.find();
        res.status(200).json(project)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


//@ path    POST /api/project
//@ doc     생성 프로젝
//@ access  private
router.post('/', async (req, res) => { //프로젝트는 개인당 5개까지 생성가능하게??
    try {
        const { constructorUser, instanceUser, rank, title, content, write, projectPublic, category } = req.body;
        // console.log(req.body)
        const project = await new Project(req.body);
        project.save();

        // 프로젝트 생성 시 유저디비에 추가 / 프로젝트 참여시에도 유저디비+프로젝트 디비에 추가
        await User.updateOne({_id: constructorUser._id}, { $push: {projects: [ {_id: project._id, date: []} ] } }, { new: true })
        
        res.status(201).json(project)
        // console.log('pro', project)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


//@ path    PATCH /api/project
//@ doc     수정 프로젝
//@ access  private
router.patch('/:projectId', async (req, res) => {
    try {
        // 양도 constructorUser
        const { constructorUser, instanceUser, rank, title, content, write, projectPublic, category } = req.body;
        const { projectId } = req.params;
        let putData = {};

        // 같은건 제외 프론트에서 
        if(constructorUser) putData.constructorUser = constructorUser;
        if(instanceUser) putData.instanceUser = instanceUser;
        if(rank) putData.rank = rank;
        if(title) putData.title = title;
        if(content) putData.content = content;
        if(write) putData.write = write;
        if(projectPublic) putData.projectPublic = projectPublic;
        if(category) putData.category = category;

        const project = await Project.findByIdAndUpdate({ _id: projectId }, putData, { new: true }).exec();
        
        // console.log('얘는 왜 적용안됨? ', project); { new: true }
        res.status(201).json(project);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    };
});


//@ path    DELETE /api/project
//@ doc     삭제 프로젝
//@ access  private
router.delete('/', async (req, res) => {
    try {
        const { userId, projectId } = req.body;

        // console.log('delete: ', projectId)
        const project = await Project.deleteMany({ _id: projectId });

        await Promise.all([
            Project.deleteMany({ _id: projectId }),
            User.updateOne({_id: userId}, { $pull: {projects: {_id: projectId} } }, { new: true })
        ])
        
        res.status(201).end();
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


export default router;