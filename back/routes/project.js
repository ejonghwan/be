import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js' ;

// model 
import Project from '../models/project.js';
import User from '../models/users.js';
import Category from '../models/category.js';

const router = express.Router();


//@ path    GET /api/project
//@ doc     로드 프로젝 (모두)
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


// 1. 내가 만든 프로젝트  (이건 데이터들 내장 갯수제한 )  
// 2. 내가 가입한 프로젝트 나눠야겠구나  (이건 데이터들 몇개만 내려주고 더 요청하면 내려줌 갯수제한 없음)
// 3. 초대에 수락해야 조인프로젝트 db에 추가되게...

/*
프로젝트 초대 개념 정리  
projectDB: joinUser / userDB: joinProjects state값에 따라 두곳에서 임시로 보여줌 

# 플젝 생성 시
1. 방장이 팀원에게 초대를 보냄  (projectDB: joinUser에 _id, state 넘겨주고 instanceUser에는 데이터 없는 상태)
2. 팀원에겐 "수락", "거절"이 보여짐  (userDB: joinProjects에 _id, state로 넘겨주고 )
     case 1 수락: 
            (1) userDB: joinProjects에 state 값을 true로 만들어줌. 
            (2) projectDB: joinUser.state 값을 해당 유저만 true로,
            (3) projectDB: instanceUser에 유저 추가

     case 2 거절: 
            (1) projectDB: joinUser필드에서 해당 유저 삭제? 이걸 거절당했다고 보여줘야하나 ? 
            (2) userDB: joinProjects필드에서 해당 유저 아예 삭제? 
             

# 플젝 생성 후 초대 시
 초대를 보내는 api 생성 후 2번 부터 동일


*같은 사람한테 같은 프로젝트가 가면 중복이라고 응답 

*/



//@ path    PATCH /api/project/join/:projectId/:userId
//@ doc     프로젝트 초대
//@ access  private (테스트 끝나면 auth 미들웨어 붙여야됨)
router.patch('/join/:projectId/:userId', async (req, res) => {
    try {
        const { projectId, userId } = req.params;
        const isUser = await Project.findById(projectId).select({'joinUser': {$elemMatch: { _id: userId }} })
        if(isUser.joinUser.length >= 1) { 
            // 만약 초대리스트를 내려준다면 ...이건 프론트에서 체크해서 아예 요청 안보내는게 나을듯.
            return res.status(401).json({ message: "이미 초대를 보냈습니다" })
        }
        const [project, user] = await Promise.all([
            Project.findByIdAndUpdate(projectId, { $push: { "joinUser": { _id: userId } } }, { new: true }),
            User.findByIdAndUpdate(userId, { $push: { "joinProjects": { _id: projectId } } }, { new: true })
        ])
        res.status(200).json(project)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})

//@ path    PATCH /api/project/join/accept/:projectId/:userId
//@ doc     프로젝트 수락
//@ access  private (테스트 끝나면 auth 미들웨어 붙여야됨)
router.patch('/join/accept/:projectId/:userId', async (req, res) => {
    try {
        const { projectId, userId } = req.params;
        const [project, user] = await Promise.all([
            Project.findByIdAndUpdate(projectId, { $pull: { "joinUser": { _id: userId } } }, { new: true }),
            Project.findByIdAndUpdate(projectId, { $push: { "instanceUser": { _id: userId } } }, { new: true }),
            User.findByIdAndUpdate(userId, { "joinProjects.$[ele].state": true }, { arrayFilters: [{"ele._id": projectId}], new: true })

        ])
        // console.log(project, user)
        res.status(200).json(project)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})

//@ path    PATCH /api/project/join/reject/:projectId/:userId
//@ doc     프로젝트 거절
//@ access  private (테스트 끝나면 auth 미들웨어 붙여야됨)
router.patch('/join/reject/:projectId/:userId', async (req, res) => {
    try {
        const { projectId, userId } = req.params;
        const [project, user] = await Promise.all([
            Project.findByIdAndUpdate(projectId, { $pull: { "joinUser": { _id: userId } } }, { new: true }),
            User.findByIdAndUpdate(userId, { $pull: { "joinProjects": { _id: projectId } } }, { new: true })
        ])
        // console.log( 'project', project, 'user', user)
        res.status(200).json(project)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})


// 1. 프로젝트 탈퇴
// 2. 프로젝트 강퇴 
// 3. 방장이 프로젝트 없애려할 때 유저가 있으면 삭제 못하고 유저가 없어야 가능하게
// 4. 탈퇴할때도 마찬가지 3


//@ path    PATCH /api/project/reject/:projectId/:userId
//@ doc     프로젝트 탈퇴
//@ access  private (테스트 끝나면 auth 미들웨어 붙여야됨)
router.patch('/reject/:projectId/:userId', async (req, res) => {
    try {
        const { projectId, userId } = req.params;
        const [project, user] = await Promise.all([
            // Project.findByIdAndUpdate(projectId, { $pull: { "joinUser": { _id: userId } } }, { new: true }),
            // User.findByIdAndUpdate(userId, { $pull: { "joinProjects": { _id: projectId } } }, { new: true })
        ])
        // console.log( 'project', project, 'user', user)
        res.status(200).json(project)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})






//@ path    GET /api/project
//@ doc     로드 프로젝 (내가 가입한 or 가입된 프로젝트만) 이건 유저에 있어야됨
//@ access  private



//@ path    POST /api/project
//@ doc     생성 프로젝 
//@ access  private  (테스트 끝나면 auth 미들웨어 붙여야됨)
router.post('/', async (req, res) => { //프로젝트는 개인당 5개까지 생성가능하게??
    try {
        const { constructorUser, instanceUser, rank, title, content, write, projectPublic, categorys, joinUser } = req.body; //joinUser 는 배열
        
        // 프로젝트 생성
        const newProject = await new Project(req.body);
        newProject.save();

        // 카테고리 생성 분기
        let findCategory;
        let newCategory;
        for(let i = 0; i < categorys.length; i++) {
            findCategory = await Category.findOne({ categoryName: categorys[i] });

            if(findCategory) { // 카테고리가 기존에 존재할 경우
                await Category.findByIdAndUpdate(findCategory._id, { $push: { projects: newProject._id } }, { new: true }).exec();
            }
            if(!findCategory) { // 카테고리가 없어서 새로운 카테고리 생성
                newCategory = await new Category({ categoryName: categorys[i], projects: newProject._id });
                newCategory.save();
            }
        }

        // 프로젝트 생성 시 유저디비에 추가 / 프로젝트 참여시에도 유저디비+프로젝트 디비에 추가 
        await User.updateOne({_id: constructorUser._id}, { $push: { projects: { _id: newProject._id } } }, { new: true });

        // 생성 시 팀원을 추가했다면 joinproject 필드에 업데이트  
        for(let i = 0; i < joinUser.length; i++) {
            await User.findByIdAndUpdate(joinUser[i]._id, { $push: { joinProjects: { _id: newProject._id } } }, { new: true })
        }

        res.status(201).json(newProject);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})


//@ path    PATCH /api/project/edit/:projectId
//@ doc     수정 프로젝
//@ access  private  (테스트 끝나면 auth 미들웨어 붙여야됨)
router.patch('/edit/:projectId', async (req, res) => { 
    try {
        // 양도 constructorUser
        const { constructorUser, instanceUser, rank, title, content, write, projectPublic, categorys, deleteCategorys } = req.body;
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
        if(categorys) putData.categorys = categorys;

        // deleteCategorys; //array 이거 삭제할 때 프론트에서 삭제한거 보내줘야됨 
        for(let i = 0; i < deleteCategorys.length; i++) {
            await Category.findOneAndUpdate({ categoryName: deleteCategorys[i] }, { $pull: { projects: projectId } }, { new: true }).exec();
        }
        
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
//@ access  private  (테스트 끝나면 auth 미들웨어 붙여야됨)
router.delete('/', async (req, res) => {
    try {
        const { userId, projectId } = req.body;

        // console.log('delete: ', projectId)
        const project = await Project.deleteMany({ _id: projectId });

        await Promise.all([
            Project.deleteMany({ _id: projectId }),
            User.updateOne({_id: userId}, { $pull: {projects: {_id: projectId} } }, { new: true })
        ]);
        
        res.status(201).end();
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})



//@ path    GET /api/project/category/:categoryName
//@ doc     카테고리 검색
//@ access  public
router.get('/category/:categoryName', async (req, res) => {
    try {

        // 카테고리네임 프론트에서 encodeURIComponent("호호")
        const { categoryName } = req.params;
        const category = await Category.find({ categoryName: categoryName }, ).populate("projects")

        // console.log(category)

        res.status(201).json(category);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }

})


export default router;