import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js' ;

// model 
import Project from '../models/project.js';
import User from '../models/users.js';
import Category from '../models/category.js';
import Images from '../models/images.js';
import Write from '../models/write.js';

const router = express.Router();


//@ path    GET /api/project
//@ doc     로드 프로젝 (모두)
//@ access  private
router.get('/', async (req, res) => {
    try {
        const project = await Project.find().populate([
            { path: 'constructorUser._id', select: 'id profileImage email name createdAt' },
            { path: 'instanceUser._id', select: 'id profileImage email name createdAt' },
            { path: 'joinUser._id', select: 'id profileImage email name' },
            { path: 'categorys._id', select: 'id profileImage email name' },
            { path: 'likeUser', select: 'id profileImage email name' },
            // { path: 'projectImages._id' }, 이미지는 안에 내장해둠
            // { path: 'writes' } 
        ]);
        res.status(200).json(project)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})


//@ path    GET /api/project/:projectId
//@ doc     로드 프로젝 (특정)
//@ access  public
router.get('/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId).populate([
            { path: 'constructorUser._id', select: 'id profileImage email name createdAt' },
            { path: 'instanceUser._id', select: 'id profileImage email name createdAt' },
            { path: 'joinUser._id', select: 'id profileImage email name' },
            { path: 'categorys._id', select: 'id profileImage email name' },
            { path: 'likeUser', select: 'id profileImage email name' },
            // { path: 'projectImages._id' }, 이미지는 안에 내장해둠
            { path: 'writes', select: 'user title content likeCount commentCount createdAt updatedAt', populate: { path: "user._id", select: 'id name profileImage' } } //객체 2뎁스 퍼퓰. 이거 꼭 기억
        ]);
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
//@ doc     프로젝트 초대 & 가입신청
//@ access  private (테스트 끝나면 auth 미들웨어 붙여야됨)
router.patch('/join/:projectId/:userId', async (req, res) => {
    try {
        const { projectId, userId } = req.params;
        const isUser = await Project.findById(projectId).select({'joinUser': {$elemMatch: { _id: userId }} })
        if(isUser.joinUser.length >= 1) { 
            // 만약 초대리스트를 내려준다면 ...이건 프론트에서 체크해서 아예 요청 안보내는게 나을듯.
            return res.status(401).json({ message: "이미 진행 중" })
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
    // 221116 수락할때 promise 디비 채워야됨 - 모드설정해서 이건 못하면 걍 프로젝트 닫히는걸로... 프로젝트 생성할때 프로젝트에 1개만 넣자. 
    // 거짓으로 하고 싶어도 그것도 의지가 있을 때 얘기...니깐 
    // 230222 위 기능은 그냥 안하거나 검토
    try {
        const { projectId, userId } = req.params;
        const [project, user] = await Promise.all([
            Project.findByIdAndUpdate(projectId, { $pull: { "joinUser": { _id: userId } } }, { new: true }),
            Project.findByIdAndUpdate(projectId, { $push: { "instanceUser": { _id: userId } } }, { new: true }),
            User.findByIdAndUpdate(userId, { "joinProjects.$[ele].state": true }, { arrayFilters: [{"ele._id": projectId}], new: true })
        ])
        // console.log(project, user)
        res.status(200).json({ projectId, userId })
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
        res.status(200).json({ projectId, userId })
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})

// 23525 다시시작
// 1. 프로젝트 탈퇴
// 2. 프로젝트 강퇴 
// 3. 방장이 프로젝트 없애려할 때 유저가 있으면 삭제 못하고 유저가 없어야 가능하게
// 4. 탈퇴할때도 마찬가지 3
/*
탈퇴할때 뭐뭐 없애야 하는지
    if : 주인장일 때 or 가입원일 때 

    # 주인장일 때 
        1. 유저디비:  

    # 가입원일 때 (글, 코멘트, 좋아요 삭제 할건지? 해야될듯. 대신 삭제한 유저라고 표기? )
        1. 유저디비:  joinProjects 에서 해당 id 삭제
        2. 프로젝트디비:  instanceUser 에서 해당 id 삭제
*/

//@ path    PATCH /api/project/delete/:projectId/:userId
//@ doc     프로젝트 탈퇴
//@ access  private (테스트 끝나면 auth 미들웨어 붙여야됨)
router.patch('/delete/:projectId/:userId', async (req, res) => {
    try {
        const { projectId, userId } = req.params;
        const [project, user] = await Promise.all([
            Project.findByIdAndUpdate(projectId, { $pull: { "instanceUser": { _id: userId } } }, { new: true }),
            User.findByIdAndUpdate(userId, { $pull: { "joinProjects": { _id: projectId } } }, { new: true })
            // 프로젝트에 썼던글, 이미지 삭제? 아니면 그냥 두기 ? 그냥 두자
        ])
        res.status(200).json(project)
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})



//@ path    POST /api/project
//@ doc     생성 프로젝 
//@ access  private  (테스트 끝나면 auth 미들웨어 붙여야됨)
router.post('/', async (req, res) => {
    try {
        const { constructorUser, instanceUser, rank, title, content, write, projectPublic, categorys, joinUser, promise } = req.body; //joinUser 는 배열
        
        // 프로젝트 생성
        const newProject = await new Project(req.body);
        newProject.save();
        
        // 카테고리 생성 분기
        let findCategory;
        let newCategory;
        for(let i = 0; i < categorys.length; i++) {
            findCategory = await Category.findOne({ categoryName: categorys[i].categoryName });

            if(findCategory) { // 카테고리가 기존에 존재할 경우
                await Category.findByIdAndUpdate(findCategory._id, { $push: { projects: newProject._id } }, { new: true }).exec();
                await Project.findByIdAndUpdate(newProject._id, 
                    { 'categorys.$[cate]._id' : findCategory._id }, // 아이디 추가 업데이트
                    { arrayFilters: [ {'cate.categoryName': findCategory.categoryName} ] }, // []중 어떤거를 업데이트할건지
                ).exec();
            }
            if(!findCategory) { // 카테고리가 없어서 새로운 카테고리 생성
                newCategory = await new Category({ categoryName: categorys[i].categoryName, projects: newProject._id });
                await Project.findByIdAndUpdate(newProject._id, 
                    { 'categorys.$[cate]._id' : newCategory._id }, 
                    { arrayFilters: [ {'cate.categoryName': newCategory.categoryName} ] },
                ).exec();
                newCategory.save();
            }
           
        }
        // 프로젝트 생성 시 유저디비에 추가 / 프로젝트 참여시에도 유저디비 + 프로젝트 디비에 추가 
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
        const project = await Project.findById(projectId)
        /*
            *중요. 프로젝트삭제하면 글, 코멘트, 리코멘트 모두 삭제하지만 글, 코멘트, 리코멘트는 삭제해도 나머진 남겨놔야함. (삭제되었다고 코멘트만)

            프로젝트 삭제하면 해당 "프로젝트"아이디
            1. 프로젝트디비에서 삭제 o
            2. 생성한 유저디비에서 (인스턴스는 안해도됨, 조인, 좋아요 필드) 삭제 o

            4. 글디비에서 삭제 o
            5. 카테고리디비에서 삭제 o
            6. 이미지디비에서 삭제 o
        */
        await Promise.all([
            User.updateMany({ _id: userId }, { $pull: { "projects": project.id } }, { new: true }),
            Images.deleteMany({ _id: project.projectImages }),
            User.updateMany({ likeProject: project.id }, { $pull: { likeProject: project._id } }, { new: true }).exec(), //테스트 완료
            User.updateMany({ joinProjects: { _id: project.id } }, { $pull: { "joinProjects": { _id: project._id } } }, { new: true }).exec(), //테스트 완료
            Category.updateMany({ projects: { _id: project._id } }, { $pull: { "projects": project.id } }, { new: true }).exec(), //테스트 완료
            Write.deleteMany({ _id: project.writes })
           
        ]);
        await Project.deleteMany({ _id: projectId }),
        
        res.status(201).end();
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})



//@ path    PATCH /api/project/like
//@ doc     프로젝트 찜or좋아요
//@ access  private
router.patch('/like', async (req, res) => {
    try {
        
        const { userId, projectId } = req.body;

        const likeUser = await Project.find({_id: projectId}).select("likeUser");
        for(let i = 0; i < likeUser[0].likeUser.length; i++) {
            if(likeUser[0].likeUser[i].equals(userId)) {
                console.log('user 있음')
                return res.status(400).json({ message: "이미 좋아요를 추가했습니다." })
            } 
        }

        const [ project, user ] = await Promise.all([
            Project.findByIdAndUpdate(projectId, { $push: {likeUser: userId }, $inc: { likeCount: 1 } }, { new: true }),
            User.updateOne({_id: userId}, { $push: { likeProject: projectId } }, { new: true }), 
        ])
        res.status(201).json(projectId);

       
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})

 
//@ path    PATCH /api/project/unlike
//@ doc     프로젝트 찜or좋아요 취소
//@ access  private
router.patch('/unlike', async (req, res) => {
    try {
        const { userId, projectId } = req.body;

        // 다른사람 좋아요가 1개라도 있으면 상관없는데 0개일땐 -1로 감..
        // 근데 위에껀 상관없음 프론트에서 어차피 0개 인상태에서 시작하기 때문.
        const likeUser = await Project.find({_id: projectId}).select("likeUser");
        console.log(likeUser[0].likeUser.length)
        for(let i = 0; i < likeUser[0].likeUser.length; i++) {
            if(!likeUser[0].likeUser[i].equals(userId)) {
                return res.status(400).json({ message: "취소할 좋아요가 없습니다" })
            } 
        }

        const [ project, user ] = await Promise.all([
            Project.findByIdAndUpdate(projectId, { $pull: {likeUser: userId }, $inc: { likeCount: -1 } }, { new: true }),
            User.updateOne({_id: userId}, { $pull: {likeProject: projectId } }, { new: true }),
        ])

        res.status(201).json(projectId);
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