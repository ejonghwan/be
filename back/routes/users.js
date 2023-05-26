import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js' ;

// model 
import User from '../models/users.js';
import Image from '../models/images.js';
import Project from '../models/project.js';
import Comment from '../models/comment.js';
import Recomment from '../models/recomment.js';
import Write from '../models/write.js';
import Category from '../models/category.js';

const router = express.Router();





//@ path    GET /api/users/load
//@ doc     로드 유저
//@ access  public
router.get('/load', auth, async (req, res) => {
    try {
        delete req.user.token;
        if(req.reftoken) {
            // auth 미들웨어에서 acc/ref 토큰 모두 만료되어 ref 다시 만들고 db에 저장 후 쿠키로 응답
            console.log('모두 만료돼서 디비 토큰 다시 저장하고 acc 다시 발급')
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.reftoken, salt,(err, hash) => {
                    // res
                    res.cookie('X-refresh-token', hash, { expires: new Date(Date.now() + 7200000), httpOnly: true });
                    res.status(200).json(req.user);
                });
            });
        } else {
            // 쿠키로 보낸 리프레시 토큰 만료안돼서 이거넘김
            console.log('acc토큰 or 쿠키로 보낸 리프레시 토큰 만료안돼서 이거넘김');
            res.status(200).json(req.user);
        };
    } catch(err) {
        console.error(err);
        res.status(501).clearCookie('X-refresh-token').end();
        // res.status(500).json({ message: err.message })
    };
});



//@ path    GET /api/users/
//@ doc     올 유저 
//@ access  public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.find()
        res.status(201).json({ user })
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})


//@ path    POST /api/users/login
//@ doc     로그인 
//@ access  public
router.post('/login', async (req, res) => {
    try {
        const { id, password } = req.body;

        if(!id) return res.status(400).json({ message: 'is not id' }) 
        if(!password) return res.status(400).json({ message: 'is not password' }) 

        // 파퓰레이트 하위는 아래처럼 쓰면됨 이거 정리해둬야됨  221109 하다감
        // const user = await User.findOne({ id: id }).populate({ path: "projects", populate: { path: "rank.a" } }).exec();
        const user = await User.findOne({ id: id }).populate("projects joinProjects._id").exec();
        if(!user) return res.status(400).json({ message: "is not find user" })

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ message: "password is not matched" })
        if(match) {
            // 2h acc토큰 발급
            jwt.sign({ id: id }, process.env.JWT_KEY, { expiresIn: "2h" }, (err, accToken) => {
                if(err) throw new Error(err)
                // token hash
                bcrypt.genSalt(10, async (err, salt) => {
                    bcrypt.hash(user.token, salt, (err, hash) => {
                        delete user._doc.password;
                        delete user._doc.token;
                        delete user._doc.question;
                        res.cookie('X-refresh-token', hash, { expires: new Date(Date.now() + 7200000), httpOnly: true });
                        res.status(200).json({ accToken, ...user._doc });
                    })
                })
            });
        };

    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message }) 
    }
})


//@ path    GET /api/users/logout
//@ doc     로그아웃
//@ access  public
router.get('/logout', auth, (req, res) => {
    res.status(200).clearCookie('X-refresh-token').end();
})



//@ path    POST /api/users/signup
//@ doc     회원가입 
//@ access  public
router.post('/signup', async (req, res) => {
    try {
        const { id, password, email, name, question, phoneNumber, gender, birthday } = req.body;
        if(!id || typeof id !== 'string') return res.status(400).json({message: 'is not id'}) 
        console.log(id)
        if(id.length <= 3 || id.length >= 13) return res.status(400).json({message: 'id length check. 4~12'}) //front 에서도 검증해야됨
        if(!password ) return res.status(400).json({message:'is not password'}) 
        if(!email || typeof email !== 'string') return res.status(400).json({message:'is not email'}) 
        if(!name || typeof name !== 'string') return res.status(400).json({message:'is not name'}) 
        if(!question || typeof question !== 'object') return res.status(400).json({message:'is not question'}) 
        if(!phoneNumber || typeof phoneNumber !== 'string') return res.status(400).json({message:'is not phoneNumber'}) 
        if(!gender || typeof gender !== 'string') return res.status(400).json({message:'is not gender'}) 
        if(!birthday || typeof birthday !== 'string') return res.status(400).json({message:'is not birthday'}) 

        const existingUser = await User.findOne({$or: [{id: id}, {phoneNumber: phoneNumber}] });
        if(existingUser) throw Error( '유저나 휴대폰번호가 이미 존재합니다' );
      
        const user = await new User(req.body, { token: null });

        // default 프로필 이미지 6369f7f0d94aae125a0bc833

        await bcrypt.genSalt(10, async (err, salt) => {
            // password hash
            await bcrypt.hash(user.password, salt, async (err, hash) => {
                if(err) throw Error(err);
                user.password = hash;
                jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "30 days" }, (err, reftoken) => {
                    user.token = reftoken;
                    user.profileImage = { _id: "6369f7f0d94aae125a0bc833", key: "8e09735b-553e-4879-b94c-7a3a23a40ce4.jpeg" }; //기본이미지 일단 이거넣음. 임시
                    user.save().then(user => {
                        console.log('프로필 이미지 전달되는지 확인 ?????????????????', user)
                        res.status(201).end();
                    });
                });
            });
        });

    } catch(err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})


//@ path    PATCH /api/users/edit/userInfo
//@ doc     이름 변경
//@ access  private
router.patch('/edit/userInfo', auth, async(req, res) => {
    try {
        const { name, gender, birthday, phoneNumber, _id } = req.body;
        if(!name || typeof name !== 'string') return res.status(400).json({ message: '이름이 잘못되었습니다' }) 
        if(!gender || typeof gender !== 'string') return res.status(400).json({ message: '성별이 잘못되었습니다' }) 
        if(!birthday || typeof birthday !== 'string') return res.status(400).json({ message: '생일이 잘못되었습니다' }) 
        if(!phoneNumber || typeof phoneNumber !== 'string') return res.status(400).json({ message: '번호가 잘못되었습니다' }) 
        if(!mongoose.isValidObjectId(_id)) return res.status(400).json({ message: '_아이디가 잘못되었습니다' }) 

        // 한번 find하고 비교해서 바뀐거만 할지... 아니면 몇개안되니 find update 한번에 할지 ..고민
      
        const user = await User.findOneAndUpdate({ _id: _id }, { $set: {name, gender, birthday, phoneNumber} }, { new: true })

        res.status(201).json(user)
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})


//@ path    PATCH /api/users/edit/name
//@ doc     이메일 변경
//@ access  private
router.patch('/edit/email', auth, async(req, res) => {
    try {
        const getAuthCode = req.cookies["authCode"];
        const { email, _id, authNumber } = req.body;
        if(!email || typeof email !== 'string') return res.status(400).json({ message: 'is not email' });
        if(!mongoose.isValidObjectId(_id)) return res.status(400).json({ message: 'is not id' });
        if(!authNumber) return res.status(400).json({ message: 'is not authNumber' });

        // 3분토큰 만료인지 체크 
        if(!getAuthCode) return res.status(500).json({ message: '인증시간 만료. 다시 인증번호 발급받아주세요' });
    
        // 클라 번호와 메일 번호가 같은지 체크
        const match = await bcrypt.compare(authNumber, getAuthCode);
        // console.log('get cookie', getAuthCode, match)
        if(!match) return res.status(400).json({ message: '인증번호가 다릅니다'});

        const user = await User.findOneAndUpdate({ _id: _id }, { $set: {email: email} }, { new: true });
        if(!user) return  res.status(500).json({ message: '유저가 없습니다. 회원가입해주세요' });
      
        res.status(200).json({ email: user.email });
    } catch(err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    };
});


//@ path    POST /api/users/edit/password
//@ doc     패스워드 변경
//@ access  private
router.post('/edit/password', auth, async (req, res) => {
    try {
        const { _id, prevPassword, newPassword, newPasswordCheck } = req.body;
        console.log('back body: ', req.body)
        if(!mongoose.isValidObjectId(_id)) return res.status(400).json({ message: 'is not _id' }) 
        if(!prevPassword && typeof prevPassword !== 'string') return res.status(400).json({ message: 'is not prev password' }) 
        if(!newPassword && typeof newPassword !== 'string') return res.status(400).json({ message: 'is not checked password' }) 
        if(newPassword !== newPasswordCheck) return res.status(400).json({ message: 'not password matched' })

        const user = await User.findById(_id);
        const matched = await bcrypt.compare(prevPassword, user.password);

        if(!user) return res.status(400).json({ message: 'is not user' });
        if(!matched) return res.status(400).json({ message: '이전 비번 확인해주세요' });

        if(matched) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, (err, hash) => {
                    user.password = hash;
                    user.save();
                    res.status(201).end()
                });
            });
        };
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    };
});



//@ path    POST /api/users/find/password
//@ doc     패스워드 찾기
//@ access  private
router.post('/find/password', async (req, res) => {
    try {
        const { _id, newPassword, newPasswordCheck } = req.body;
        console.log('back body: ', req.body)
        if(!_id && typeof _id !== 'string') return res.status(400).json({ message: 'is not _id' }) 
        if(!newPassword && typeof newPassword !== 'string') return res.status(400).json({ message: 'is not checked password' }) 
        if(newPassword !== newPasswordCheck) return res.status(400).json({ message: 'not password matched' })

        const user = await User.findOne({id: _id})
        if(!user) return res.status(400).json({ message: 'is not user' })
        const prevPasswordMatched = await bcrypt.compare(newPassword, user.password)
        if(prevPasswordMatched) return res.status(401).json({ message: '이전비밀번호랑 같습니다', matched: true })
      
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
                // console.log('back hashed', hash)
                user.password = hash;
                user.save();
                res.status(201).end();
            });
        });
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})


/* 인증로직 간단하게 
1. c: 인증번호 요청 
2. s: 메일로 인증번호 날림. 
      미들웨어에서 bcrypt로 암호화해서 req.body에 담아 넘김. 
      email router에서 jwt쿠폰으로 유효기간 설정 후 쿠키로 res 
3. c: 인증번호 입력 후 서버로 보낼 때 쿠키도 같이보냄 
4. s: c에서 넘어온 쿠키 유효기간 체크하고..지났으면 에러를 안지났으면 bcript로 비교 후 
*/

//@ path    POST /api/users/find/id
//@ doc     아이디 찾기
//@ access  public
router.post('/find/id', async (req, res) => {
    try {
        const getAuthCode = req.cookies["authCode"];
        const get_id = req.cookies["_id"];
        const { authNumber } = req.body;

        if(!mongoose.isValidObjectId(get_id)) return res.status(400).json({ message: 'id type check' });
        if(!authNumber) return res.status(400).json({ message: 'is not authNumber' });

        // 3분토큰 만료인지 체크 
        if(!getAuthCode) return res.status(500).json({ message: '인증시간 만료. 다시 인증번호 발급받아주세요' });
    
        // 클라 번호와 메일 번호가 같은지 체크
        const match = await bcrypt.compare(authNumber, getAuthCode);
        if(!match) return res.status(400).json({ message: '인증번호가 다릅니다'});

        const user = await User.findById(get_id)
        if(!user) return  res.status(500).json({ message: '유저가 없습니다. 회원가입해주세요' });

        res.status(200).json({id: user.id})
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})



//@ path    POST /api/users/find/id/question
//@ doc     질답으로 아이디 찾기
//@ access  public
router.post('/find/id/question', async (req, res) => {
    try {
        const { name, email, questionType, result } = req.body;
        if(!name) return res.status(400).json({ message: 'is not name' });
        if(!email) return res.status(400).json({ message: 'is not email' });
        if(!questionType) return res.status(400).json({ message: 'is not questionType' });
        if(!result) return res.status(400).json({ message: 'is not result' });

        const user = await User.findOne({email: email});
        if(!user) return  res.status(500).json({ message: '유저가 없습니다. 회원가입해주세요' });
        
        if(user.name !== name) return  res.status(500).json({ message: '이름이 등록된 정보와 다릅니다' });
        if(user.email !== email) return  res.status(500).json({ message: '이메일이 등록된 정보와 다릅니다' });
        if(user.question.questionType !== questionType) return  res.status(500).json({ message: '질문이 등록된 정보와 다릅니다' });
        if(user.question.result !== result) return  res.status(500).json({ message: '질문의 답이 등록된 정보와 다릅니다' });

        res.status(200).json({id: user.id})
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})




// router.get('/image', async (req, res) => {
//     try {
//         const image = await Image.find();
//         console.log('all img: ', image)
//         res.status(201).json(image)
//     } catch(err) {
//         console.error(err)
//         res.status(500).json({ message: err.message })
//     }
// })




//@ path    DELETE /api/users/delete
//@ doc     회원탈퇴
//@ access  private
router.post('/delete', auth, async (req, res) => {
    try {
        // 로그인 된 상태 + 아뒤/비번/이멜 입력
        const { id, password } = req.body;
        if(!id || typeof id !== 'string') return res.status(400).json({ message: 'is not id and type checked' });
        if(!password || typeof password !== 'string') return res.status(400).json({ message: 'is not result and type checked' });

        const user = await User.findOne({id: id});
        if(!user) return res.status(500).json({ message: '유저가 없습니다. 회원가입해주세요' });
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) return res.status(400).json({ message: '비밀번호가 일치하지 않습니다' });


        const projectList = await Project.find({ _id: user.projects });
        const categoryList = [];
        for(let i = 0; i < projectList.length; i++) {
            categoryList.push(...projectList[i].categorys);
        }
        const categorys = categoryList.reduce((acc, obj) => acc.includes(obj.categoryName) ? acc : [...acc, obj.categoryName], []) //중복제거
        projectList.map(async item => {
            // 유저 삭제 시 유저가 만든 카테고리에 연결된 프로젝트 아이디 삭제
            await Category.updateMany({ categoryName: categorys }, { $pull: { "projects": item._id } }, { new: true }) //후 ..삭제됐다!!!
        })


        // 0309 내일 이부분부터... 특정필드 삭제하고 하나씪 지워지는지 테스트 - 테스트 완료
        if(user && passwordMatch) {
            await Promise.all([
                Image.deleteMany({ "user._id": user._id }), // [이미지] 
                Project.deleteMany({ "constructorUser._id": user._id }), // [프로젝트]
                Write.deleteMany({ "user._id": user._id }), // [글]
                Comment.deleteMany({ "user._id": user._id }), // [코멘트]
                Recomment.deleteMany({ "user._id": user._id }), // [리코멘트]
                
                Project.updateMany( // [들어가있는 프로젝트]
                    { "instanceUser": { $elemMatch: { _id: user._id } } }, 
                    { $pull: { "instanceUser": { _id: user._id } } },
                    { new: true }
                ),
                Project.updateMany( // [신청한 프로젝트]
                    { "joinUser": { $elemMatch: { _id: user._id } } }, 
                    { $pull: { "joinUser": { _id: user._id } } },
                    { new: true }
                )
            ])
            // 테스트 다 끝나면 활성화
            // await User.deleteOne({ id: id });
            // res.status(201).clearCookie('X-refresh-token').end();
        }

        // 유저를 삭제하면 
        /*
            프로젝트 삭제하고 
            카테고리 삭제하고 
            올렸던 이미지 삭제하고 
            코멘트 삭제하고 
            글 삭제하고
            조인 유저 삭제하고 
            유저에 
        */
        //230223 프로젝트 모델에서 인스턴스유저와 조인유저에 삭제할 유저아ㅣ이디 검색해서 삭제해야함.

        // 1. [이미지]        (기본이미지는 없애면 안됨. 기본이미지는 다른아이디로 등록됨)
        // 2. [글]  
        // 3. [코멘트]   
        // 4. [리코멘트]
        // 5. [카테고리]  
        // 6. [프로젝트]  => 프로젝트 날리는게 아니라..다른 유저한테 줘야될듯 ? (결론: 걍 플젝 삭제)
        // 7. [들어가있는 프로젝트]
        // 8. [신청한 프로젝트]
        // 9. [좋아요][싫어요] 는 굳이 안없애도 될듯?




        /*
            profileImage: { 
                _id: { type: Types.ObjectId, ref: 'image' },
                key: { type: String, required: true, },
            },
            projects: [{ type: Types.ObjectId, ref: 'project'}],
            joinProjects: [
                { _id: { type: Types.ObjectId, ref: 'project'}, state: { type: Boolean, default: false } }
            ],
            writes: [{ type: Types.ObjectId, ref: 'write'}],
            comments: [{ type: Types.ObjectId, ref: 'comment'}],
            recomments: [{ type: Types.ObjectId, ref: 'recomment'}],
            likePost: [{ type: Types.ObjectId, ref: 'write' }]
        */


        

    } catch(err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
})



// seo test
//@ path    DELETE /api/users/
router.get('/settest', (req, res) => {
    // res.render(`${__dirname}/template/error.ejs`); res.end() // 응답 종료
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <p>hgophohoho</p>
    </body>
    </html>`)
    res.end();
}) 

export default router;