import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext.js';
import { getWithExpire, setWithExpire } from '../utils/utils.js';
import { ProjectContext } from '../context/ProjectContext.js';

/*
    reducer에서 request 뺀 이유. 
    request action에서는 어차피 로딩 상태값만 변경해서 LOADING만 공통으로 쓰고  (그래서 클리어 액션 사용)
    request 자체는 UserReqeust파일 자체에서 함. 

    흐름. 
    1. 화면에서 dispatch({ type: "LOADING", loadingMessage: "로그인 중.." }) 디스패치
    2. 리듀서에서 액션 실행되며 이 파일안에서 loginUser 함수 실행
    3. 함수 자체에서 비동기 처리할거 하고 SUCCESS or FAILUE 디스패치 
    4. 리듀서에서 처리된 데이터를 화면에 다시 뿌림
*/


const host = process.env.REACT_APP_BACKEND_HOST;


const UserRequest = () => {
    const { dispatch } = useContext(UserContext); 
    const { ProjectDispatch } = useContext(ProjectContext);
    const accToken = getWithExpire('X-access-token');

   // 회원가입 유저
     const emailAuth = async data => {
        try {
            const { email } = data;
            if(!email || typeof email !== 'string') throw new Error('checked email');
        
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            };
            const res = await axios.post(`${host}/api/auth`, data, config);
            dispatch({ type: "AUTH_NUMBER_SUCCESS" })
            return res;
        } catch(err) {
            console.error(err);
            dispatch({ type: "AUTH_NUMBER_FAILUE", data: err.response.data.message });
            return err.response;
        };
    };

    
    // 회원가입 유저
     const signupUser = async data => {
        try {
            const { id, password, email, name, question, phoneNumber, gender, birthday } = data;
            if(!id || typeof id !== 'string') throw new Error('is not id');
            if(!password || typeof password !== 'string') throw new Error('is not password');
            if(!email || typeof email !== 'string') throw new Error('is not email');
            if(!name || typeof name !== 'string') throw new Error('is not name');
            if(!question || typeof question !== 'object') throw new Error('is not question');
            if(!phoneNumber || typeof phoneNumber !== 'string') throw new Error('is not phoneNumber');
            if(!gender || typeof gender !== 'string') throw new Error('is not gender');
            if(!birthday || typeof birthday !== 'string') throw new Error('is not birthday');
            
            // 다크모드 초기값은시스템에서 유저가 설정해둔 값
            const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            let initTheme = isBrowserDarkMode ? 'dark' : 'light';

            // 이미지가 없을 경우 랜덤컬러와 스펠링 저장
            const colors = ['#428f80', '#42788f', '#428f4d', '#7e8f42', '#8f8942', '#955877', '#4468a9', '#44a9a5', '#50844b', '#4b7e84',]
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            };
            const user = await axios.post(`${host}/api/users/signup`, {...data, darkMode: initTheme, profileImage: { bg: randomColor, firstString: id.slice(0, 1) }}, config);
            dispatch({ type: "USER_SIGNUP_SUCCESS" });
            return user;

        } catch(err) {
            console.error('saga err', err);
            dispatch({ type: "USER_SIGNUP_FAILUE", data: err.response.data.message });
            return err.response;
        } ;
    };


    // 유저 불러오기
     const getUser = async query => { // 쿠키없으면 로컬에서 acc토큰없애기 
        try {
            let userAccToken = null;
            if(query) { userAccToken = query }; //이미 가입된 이메일로 들어오는 유저들은 로그인 로직탐. query로 acc토큰 받음 
            if(localStorage.getItem('X-access-token')) {
                userAccToken = getWithExpire('X-access-token')
            };
            if(!userAccToken || userAccToken === null ) throw new Error('is not accToken');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'X-access-token': userAccToken,
                },
                withCredentials: true,
            };

            const user = await axios.get(`${host}/api/users/load`, config);

            // accToken 만료되었으면 다시 받아온걸로 저장소 셋팅
            // localStorage.setItem('X-access-token', user.data.accToken)
            // setWithExpire('X-access-token', user.data.accToken, 1000 * 60) //테스트용 1분 후 삭제 
            dispatch({type: "USER_LOAD_SUCCESS", data: user.data});
            return user;
        } catch(err) {
            console.error(err)
            dispatch({ type: "USER_LOAD_FAILUE", data: err.response.data.message });
            return err.response;
        };
    };
   
    
    // 유저 프로젝트만 불러오기
     const getUserProjects = async userId => {
        try {
            if(!userId || typeof userId !== 'string') throw new Error('is not id');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken,
                },
                withCredentials: true
            };

            const user = await axios.get(`${host}/api/users/load/projects/${userId}`, config);
            dispatch({ type: "MY_PROJECTS_UPDATE_SUCCESS", data: user.data });
            return user;
        } catch(err) {
            console.error(err);
            dispatch({ type: "MY_PROJECTS_UPDATE_FAILUE", data: err.response.data.message });
            return err.response;
        };
    };


    // 로그인 유저
     const loginUser = async data => {
        try {
            const { id, password } = data;
            if(!id || typeof id !== 'string') throw new Error('is not id');
            if(!password || typeof password !== 'string') throw new Error('is not password');
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true // 쿠키 cors 통신 설정
            };

            const user = await axios.post(`${host}/api/users/login`, data, config);
            // localStorage.setItem('X-access-token', user.data.accToken);
            setWithExpire('X-access-token', user.data.accToken, 1000 * 60 * 60 * 2) //로그인 후 억세스토큰 2시간 저장
            dispatch({ type: "USER_LOGIN_SUCCESS", data: user.data });
            return user;
        } catch(err) {
            console.error(err);
            dispatch({ type: "USER_LOGIN_FAILUE", data: err.response.data.message });
            return err.response;
        };
    };

    // 로그아웃 유저 
     const logoutUser = async () => {
        try {
            if(!accToken) throw new Error('is not acctoken');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'X-access-token': accToken,
                },
                withCredentials: true,
            };
            localStorage.removeItem('X-access-token');
            const user = await axios.get(`${host}/api/users/logout`, config);
            dispatch({ type: "USER_LOGOUT_SUCCESS" });
            ProjectDispatch({ type: "RESET_PROJECTS" });
            return user;
        } catch(err) {
            console.error(err);
            return err.response;
        };
    };

    

    // edit
    // 이름 수정 
     const userInfoEditUser = async data => {
        try {
            if(!accToken) throw new Error('user request error. is not acc token');

            const { name, gender, birthday, phoneNumber, _id } = data;
            if(!name || typeof name !== 'string') throw new Error('user request error. is not name');
            if(!gender || typeof gender !== 'string') throw new Error('user request error. is not gender');
            if(!birthday || typeof birthday !== 'string') throw new Error('user request error. is not birthday');
            if(!phoneNumber || typeof phoneNumber !== 'string') throw new Error('user request error. is not  phoneNumber');
            if(!_id || typeof _id !== 'string') throw new Error('user request error. is not _id');

            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken,
                },
                withCredentials: true,
            };
            const user = await axios.patch(`${host}/api/users/edit/userInfo`, data, config);
            dispatch({ type: "USER_INFO_EDIT_SUCCESS", data: user.data });
            return user;
        } catch(err) {
            console.error(err)
            dispatch({ type: "USER_INFO_EDIT_FAILUE", data: err.response.data.message });
            return err.response;
        };
    };
   
    // 회원 + 로그인 인사람 인증번호 보내기 (회원이 로그인 한 상태에서 인증할 때)
     const memberAuthNumberRequest = async data => {
        try {
            if(!accToken) return;
            const { email, _id } = data;
            if(!email && typeof email !== 'string') throw new Error('user request error. is not email');
            if(!_id && typeof _id !== 'string') throw new Error('user request error. is not _id');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken,
                },
                withCredentials: true // 쿠키 cors 통신 설정
            };
            const res = await axios.post(`${host}/api/auth/member/number`, data, config);
            dispatch({ type: "USER_MAIL_AUTH_SUCCESS" })
            return res;
        } catch(err) {
            console.error(err)
            dispatch({ type: "USER_MAIL_AUTH_FAILUE", data: err.response.data.message });
            return err.response;
        };
    };
   

    // 비회원 + 비로그인 인증번호 보내기  (회원가입)
     const nonMemberAuthNumberRequest = async data => {
        try {
            const { email, name } = data;
            if(!email || typeof email !== 'string') throw new Error('user request error. is not email');
            if(!name || typeof name !== 'string') throw new Error('user request error. is not name');
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true // 쿠키 cors 통신 설정
            }
            const res = axios.post(`${host}/api/auth/nonMember/number`, data, config);
            dispatch({ type: "AUTH_NUMBER_SUCCESS" })
            return res;
        } catch(err) {
            console.error(err)
           
            dispatch({ type: "USER_MAIL_AUTH_FAILUE", data: err.response.data.message });
            return err.response
        }
    }
 

    // 회원 + 비로그인 인증번호 보내기  (회원인데 로그인 안하고 정보 찾기)
     const nonLoginMemberAuthNumberRequest = async data => {
        try {
            const { email, name } = data;
            if(!email || typeof email !== 'string') throw new Error('user request error. is not email');
            if(!name || typeof name !== 'string') throw new Error('user request error. is not name');

            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true // 쿠키 cors 통신 설정
            }
            const res = await axios.post(`${host}/api/auth/nonLoginMember/number`, data, config);
            dispatch({ type: "NON_USER_MAIL_AUTH_SUCCESS" })
            return res;

        } catch(err) {
            console.error('user request ', err);
            dispatch({ type: "NON_USER_MAIL_AUTH_FAILUE", data: err.response.data.message });
            return err.response;
        }
    }


    // 이메일 수정 
     const emailEditUser = async data => {
        try {
            
            if(!accToken) throw new Error('is not acctoken');
            const { email, _id } = data;
            if(!email || typeof email !== 'string') throw new Error('user request error. is not email');
            if(!_id || typeof _id !== 'string') throw new Error('user request error. is not _id');

            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken,
                },
                withCredentials: true // 쿠키 cors 통신 설정
            }
            const res = await axios.patch(`${host}/api/users/edit/email`, data, config);
            dispatch({ type: "USER_MAIL_EDIT_SUCCESS", data: res.data });
            return res;
        } catch(err) {
            console.error('saga error', err.response);
            dispatch({ type: "USER_MAIL_EDIT_FAILUE", data: err.response.data.message })
            return err.response;
        };
    };
    
    
    // 이전 비번을 알고 있는 경우 비번수정 (로그인 된 상태)
     const prevPasswordEditUser = async data => {
        try {
            
            if(!accToken) throw new Error('user request error. is not accToken');
            
            const { prevPassword, newPassword, _id, newPasswordCheck } = data;
            if(!prevPassword || typeof prevPassword !== 'string') throw new Error('user request error. is not prevPassword');
            if(!newPassword || typeof newPassword !== 'string') throw new Error('user request error. is not newPassword');
            if(!newPasswordCheck || typeof newPasswordCheck !== 'string') throw new Error('user request error. is not newPasswordCheck');
            if(!_id || typeof _id !== 'string') throw new Error('user request error. is not _id');

            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken,
                },
                withCredentials: true // 쿠키 cors 통신 설정
            }
            const user = await axios.post(`${host}/api/users/edit/password`, data, config);
            dispatch({ type: "USER_PASSWORD_EDIT_SUCCESS"})
            return user;

        } catch(err) {
            console.error(err)
            dispatch({ type: "USER_PASSWORD_EDIT_FAILUE", data: err.response.data.message })
            return err.response
        }
    }
    
    // 이전 비번을 모르고 있는 경우 비번수정 (로그인 안 된 상태)
     const findPasswordEditUser = async data => {
        try {
            const { _id, newPassword, newPasswordCheck } = data;
            if(!newPassword && typeof newPassword !== 'string') throw new Error('user request error. is not newPassword');
            if(!newPasswordCheck && typeof newPasswordCheck !== 'string') throw new Error('user request error. is not newPasswordCheck');
            if(!_id && typeof _id !== 'string') throw new Error('user request error. is not _id');

            const config = {
                headers: {"Content-Type": "application/json"},
                withCredentials: true // 쿠키 cors 통신 설정
            }
            const user = await axios.post(`${host}/api/users/find/password`, data, config);
            return user;
        } catch(err) {
            console.error(err)
            return err.response
        };
    };

   
    // 아이디 찾기  (비회원 인증번호 받은 사람은 이걸로 다시 쿠키 주면서 요청해야됨) 
     const findUserId = async data => {
        try {
            const { authNumber } = data;
            if(!authNumber || typeof authNumber !== 'string') throw new Error('user request error. is not authNumber');

            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true // 쿠키 cors 통신 설정
            }

            const findId = await axios.post(`${host}/api/users/find/id`, data, config);
            dispatch({ type: "USER_FIND_ID_SUCCESS"});
            return findId;

        } catch(err) {
            console.error(err)
            dispatch({ type: "USER_FIND_ID_FAILUE", data: err.response.data.message })
            return err.response
        }
    }


    // 질답으로 아이디 찾기  
     const findUserIdQuestion = async data => {
        try {
            const { name, email, questionType, result } = data;
            if(!name || typeof name !== 'string') throw new Error('user request error. is not name');
            if(!email || typeof email !== 'string') throw new Error('user request error. is not email');
            if(!questionType || typeof questionType !== 'string') throw new Error('user request error. is not questionType');
            if(!result || typeof result !== 'string') throw new Error('user request error. is not result');

            const config = {
                headers: { "Content-Type": "application/json"},
                withCredentials: true // 쿠키 cors 통신 설정
            }

            const findId = await axios.post(`${host}/api/users/find/id/question`, data, config);
            dispatch({ type: "USER_QUESTION_FIND_ID_SUCCESS"});
            return findId;

        } catch(err) {
            console.error(err)
            dispatch({ type: "USER_QUESTION_FIND_ID_FAILUE", data: err.response.data.message })
            return err.response
        }
    }


    // 회원탈퇴
     const secession = async data => {
        try {
            
            if(!accToken) throw new Error('토큰 만료. 로그인해주세요');

            const { id, password } = data;
            if(!id || typeof id !== 'string') throw new Error('is not id');
            if(!password || typeof password !== 'string') throw new Error('is not password');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'X-access-token': accToken,
                },
                withCredentials: true,
            };
            const user = await axios.post(`${host}/api/users/delete`, data, config); 
            
            localStorage.removeItem('X-access-token');
            dispatch({ type: "USER_SECESSION_SUCCESS" });
            return user;
        } catch(err) {
            console.error(err);
            dispatch({ type: "USER_SECESSION_FAILUE", data: err.response.data.message })
            return err.response;
        };
    };

    // 프로젝트 좋아요
    const projectLike = async data => {
        try {
            if(!accToken) throw new Error('토큰 만료. 로그인해주세요');
            const { projectId, userId } = data;
            if(!projectId || typeof projectId !== 'string') throw new Error('is not projectId');
            if(!userId || typeof userId !== 'string') throw new Error('is not userId');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'X-access-token': accToken,
                },
                withCredentials: true,
            };
            const like = await axios.patch(`${host}/api/project/like`, data, config); 
            
            dispatch({ type: "PROJECT_LIKE_SUCCESS", data: like.data });
            return like;
            
        } catch(err) {
            console.error(err);
            dispatch({ type: "PROJECT_LIKE_FAILUE", data: err.response.data.message });
        };
    };

      // 프로젝트 좋아요 취소
      const projectUnlike = async data => {
        try {
            
            if(!accToken) throw new Error('토큰 만료. 로그인해주세요');

            const { projectId, userId } = data;
            if(!projectId || typeof projectId !== 'string') throw new Error('is not projectId');
            if(!userId || typeof userId !== 'string') throw new Error('is not userId');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'X-access-token': accToken,
                },
                withCredentials: true,
            };
            const unlike = await axios.patch(`${host}/api/project/unlike`, data, config); 
            dispatch({ type: "PROJECT_UNLIKE_SUCCESS", data: unlike.data });
            return unlike;

        } catch(err) {
            console.error(err);
            dispatch({ type: "PROJECT_UNLIKE_FAILUE", data: err.response.data.message });
        };
    };

     // 다크모드 변경
     const changeDarkmode = async data => {
        try {
            if(!accToken) throw new Error('토큰 만료. 로그인해주세요');

            const { userId, mode } = data;
            if(!mode || typeof mode !== 'string') throw new Error('is not mode');
            if(!userId || typeof userId !== 'string') throw new Error('is not userId');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    'X-access-token': accToken,
                },
                withCredentials: true,
            };
            const res = await axios.patch(`${host}/api/users/darkmode/change`, data, config); 
            dispatch({ type: "USER_DARKMODE_CHANGE_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            dispatch({ type: "USER_DARKMODE_CHANGE_FAILUE", data: err.response.data.message });
        };
    };

      // 프로젝트 초대수락
      const inviteMyListProject = async data => {
        try {
    
            const { projectId, userId } = data;
            if(!projectId || typeof projectId !== 'string') throw new Error('is not projectId');
            if(!userId || typeof userId !== 'string') throw new Error('is not userId');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            };
            const res = await axios.patch(`${host}/api/project/join/accept/${projectId}/${userId}`, {}, config);
            dispatch({ type: "MYLIST_PROJECT_INVITE_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            dispatch({ type: "MYLIST_PROJECT_INVITE_FAILUE", data: err.response.data.message });
        };
    };


    // 프로젝트 초대거절
     const rejectMyListProject = async data => {
        try {
            const { projectId, userId } = data;
            if(!projectId || typeof projectId !== 'string') throw new Error('is not projectId');
            if(!userId || typeof userId !== 'string') throw new Error('is not userId');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            };
            const res = await axios.patch(`${host}/api/project/join/reject/${projectId}/${userId}`, {}, config);
            dispatch({ type: "MYLIST_PROJECT_REJECT_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            dispatch({ type: "MYLIST_PROJECT_REJECT_FAILUE", data: err.response.data.message });
        };
    };


    // 내가 신청한 프로젝트
     const requestMyProject = async data => {
        try {
            const { userId } = data;
            if(!userId || typeof userId !== 'string') throw new Error('is not userId');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            };
            const res = await axios.get(`${host}/api/project/myrequest/${userId}`, config);
            dispatch({ type: "MYLIST_PROJECT_REQUEST_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            dispatch({ type: "MYLIST_PROJECT_REQUEST_FAILUE", data: err.response.data.message });
        };
    };


    return {
        emailAuth, 
        signupUser, 
        getUser, 
        loginUser, 
        logoutUser,
        userInfoEditUser,
        memberAuthNumberRequest,
        nonMemberAuthNumberRequest,
        nonLoginMemberAuthNumberRequest,
        emailEditUser,
        prevPasswordEditUser,
        findPasswordEditUser,
        findUserId,
        findUserIdQuestion,
        secession,
        projectLike,
        projectUnlike,
        changeDarkmode,
        inviteMyListProject,
        rejectMyListProject,
        requestMyProject,
        getUserProjects

    };
};

export default UserRequest;














