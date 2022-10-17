import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js' ;

// model 
import Project from '../models/project.js';

const router = express.Router();


//@ path    GET /api/project
//@ doc     로드 프로젝
//@ access  private
router.get('/', async (req, res) => {
    try {
        const project = await Project.find();
        res.json(project)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


//@ path    POST /api/project
//@ doc     생성 프로젝
//@ access  private
router.post('/', async (req, res) => { //프로젝트는 개인당 5개까지 생성가능하게
    try {
        const { constructorUser, instanceUser, rank, title, content, write, projectPublic, category } = req.body;
        // console.log(req.body)
        const project = await new Project(req.body);
        project.save();
        res.json(project)
        // console.log('pro', project)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


//@ path    PUT /api/project
//@ doc     수정 프로젝
//@ access  private
router.put('/:projectid', async (req, res) => {
    try {
        // 양도 constructorUser
        const { constructorUser, instanceUser, rank, title, content, write, projectPublic, category } = req.body;
        const { projectid } = req.params;
        let putData = {};

        if(constructorUser) putData.constructorUser = constructorUser;
        if(instanceUser) putData.instanceUser = instanceUser;
        if(rank) putData.rank = rank;
        if(title) putData.title = title;
        if(content) putData.content = content;
        if(write) putData.write = write;
        if(projectPublic) putData.projectPublic = projectPublic;
        if(category) putData.category = category;

        const project = await Project.findByIdAndUpdate({ _id: projectid }, putData, { new: true }).exec();
  
        // console.log('얘는 왜 적용안됨? ', project); { new: true }
        res.json(project);
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
        const { projectId } = req.body;

        // console.log('delete: ', projectId)
        const project = await Project.deleteMany({ _id: projectId });
        res.end();
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


export default router;