import { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext';
import { getWithExpire } from '../utils/utils.js'
import axios from 'axios'


// const host = process.env.REACT_APP_BACKEND_HOST;
const host = 'https://port-0-hobbyist-back-euegqv2bln64g6o5.sel5.cloudtype.app'

const ProjectRequest = () => {
    const { ProjectDispatch } = useContext(ProjectContext); 
    const accToken = getWithExpire('X-access-token');

    // 프로젝트 생성
     const createProject = async data => {
        try {
            const { title, content, projectPublic, categorys, joinUser, constructorUser } = data;
            if(!title || typeof title !== 'string') throw new Error('넘어온 제목값이 잘못되었습니다');
            if(!content || typeof content !== 'string') throw new Error('넘어온 내용값이 잘못되었습니다');
            if(!projectPublic || typeof projectPublic !== 'boolean') throw new Error('넘어온 공개여부값이 잘못되었습니다');
            if(!categorys || !Array.isArray(categorys)) throw new Error('넘어온 카테고리값이 잘못되었습니다');
            if(!joinUser || !Array.isArray(joinUser)) throw new Error('넘어온 초대유저값이 잘못되었습니다');
            if(!constructorUser || typeof constructorUser !== 'object') throw new Error('넘어온 생성자값이 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }
            const res = await axios.post(`${host}/api/project`, data, config);
            ProjectDispatch({ type: "PROJECT_CREATE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            ProjectDispatch({ type: "PROJECT_CREATE_FAILUE", data: err.message });
        }
    } 


    // 프로젝트 로드
    const loadProject = async projectId => {
        try {
            if(!projectId || typeof projectId !== 'string') throw new Error('넘어온 projectId 잘못되었습니다');
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            }
            const res = await axios.get(`${host}/api/project/${projectId}`, config);
            ProjectDispatch({ type: "A_PROJECT_LOAD_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            console.error(err);
            ProjectDispatch({ type: "A_PROJECT_LOAD_FAILUE", data: err.response.data.message });
        }
    }

    
    // 프로젝트 초대
    const requestInviteProject = async data => {
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
            }
            const res = await axios.patch(`${host}/api/join/project/join/invite/${projectId}/${userId}`, {}, config);
            ProjectDispatch({ type: "PROJECT_REQUEST_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            ProjectDispatch({ type: "PROJECT_REQUEST_FAILUE", data: err.message.data.message });
        }
    }

     // 프로젝트 가입신청
     const requestProject = async data => {
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
            }
            const res = await axios.patch(`${host}/api/project/join/${projectId}/${userId}`, {}, config);
            ProjectDispatch({ type: "PROJECT_REQUEST_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            ProjectDispatch({ type: "PROJECT_REQUEST_FAILUE", data: err.response.data.message });
        }
    }

    // 프로젝트 초대수락
    const inviteProject = async data => {
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
            }
            const res = await axios.patch(`${host}/api/project/join/accept/${projectId}/${userId}`, {}, config);
            ProjectDispatch({ type: "PROJECT_INVITE_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            ProjectDispatch({ type: "PROJECT_INVITE_FAILUE", data: err.response.data.message });
        }
    }


    // 프로젝트 초대거절
     const rejectProject = async data => {
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
            }
            const res = await axios.patch(`${host}/api/project/join/reject/${projectId}/${userId}`, {}, config);
            ProjectDispatch({ type: "PROJECT_REJECT_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            ProjectDispatch({ type: "PROJECT_REJECT_FAILUE", data: err.response.data.message });
        }
    }


    
    // 프로젝트 탈퇴
    const withdrawProject = async data => {
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
            }
            const res = await axios.delete(`${host}/api/project/delete/${projectId}/${userId}`, config);
            ProjectDispatch({ type: "PROJECT_WITHDRAW_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err.response.data);
            ProjectDispatch({ type: "PROJECT_WITHDRAW_FAILUE", data: err.response.data });
        }
    }


    // 프로젝트 친구초대
    const addFriendProject = async data => {
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
            }
            const res = await axios.patch(`${host}/api/project/join/invite/${projectId}/${userId}`, {}, config);
            ProjectDispatch({ type: "PROJECT_ADD_INVITE_SUCCESS", data: res.data });
            return res;
        } catch(err) {
            console.error(err.response.data);
            ProjectDispatch({ type: "PROJECT_ADD_INVITE_FAILUE", data: err.response.data.message });
        }
    }


    // 프로젝트 수정
    const editProject = async data => {
        try {
            
            const { projectId, instanceUser, content, projectPublic, categorys, deleteCategorys, projectImages } = data;
            if(!projectId || typeof projectId !== 'string') throw new Error('is not projectId');
            if(instanceUser && typeof instanceUser !== 'object') throw new Error('type check instanceUser');
            if(content && typeof content !== 'string') throw new Error('type check content');
            if(projectPublic && typeof projectPublic !== 'boolean') throw new Error('type check projectPublic');
            if(categorys && typeof categorys !== 'object') throw new Error('type check categorys');
            if(deleteCategorys && typeof deleteCategorys !== 'object') throw new Error('type check deleteCategorys');
            if(projectImages && typeof projectImages !== 'number') throw new Error('type check projectImages');
            
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }
            console.log(data)
            const res = await axios.patch(`${host}/api/project/edit/${projectId}`, data, config);
            ProjectDispatch({ type: "PROJECT_EDIT_SUCCESS", data: res.data });
            console.log(res)
            return res;
        } catch(err) {
            console.error(err.response.data);
            ProjectDispatch({ type: "PROJECT_EDIT_FAILUE", data: err.response.data.message });
        }
    }

    const deleteProject = async data => {
        try {
            const { projectId, userId } = data;
            if(!projectId) throw new Error('is not projectId');
            if(userId && typeof userId !== 'string') throw new Error('type check instanceUser');
            
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                data: data,
                withCredentials: true,
            };

            const res = await axios.delete(`${host}/api/project`, config);
            ProjectDispatch({ type: "PROJECT_DELETE_SUCCESS", data: res.data });
            return res;
        } catch(err) {
            console.error(err.response.data);
            ProjectDispatch({ type: "PROJECT_DELETE_FAILUE", data: err.response.data.message });
        };
    };


    const myApplyProject = async data => {
        try {
            const { userId } = data;
            if(userId && typeof userId !== 'string') throw new Error('type check instanceUser');
            
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            };

            const res = await axios.get(`${host}/api/project/myapply/${userId}`, config);
            ProjectDispatch({ type: "PROJECT_MYAPPLY_LOAD_SUCCESS", data: res.data });
            return res;
        } catch(err) {
            console.error(err.response.data);
            ProjectDispatch({ type: "PROJECT_MYAPPLY_LOAD_FAILUE", data: err.response.data.message });
        };
    };



    return {
        createProject, 
        loadProject,
        requestProject,
        requestInviteProject,
        inviteProject,
        rejectProject,
        withdrawProject,
        addFriendProject,
        editProject,
        deleteProject,
        myApplyProject
    }
}

export default ProjectRequest;














