import { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext';
import axios from 'axios'


const host = process.env.REACT_APP_BACKEND_HOST;

const ProjectRequest = () => {
    const { ProjectDispatch } = useContext(ProjectContext); 

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
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            }
            const res = await axios.post(`${host}/api/project`, data, config);
            ProjectDispatch({ type: "PROJECT_CREATE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            console.error(err);
            ProjectDispatch({ type: "PROJECT_CREATE_FAILUE", data: err.response.data.message });
        }
    } 


    // 프로젝트 로드
    const loadProject = async projectId => {
        try {
            // if(!userName || typeof userName !== 'string') throw new Error('넘어온 이름값이 잘못되었습니다');
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






    return {
        createProject, 
        loadProject,
    }
}

export default ProjectRequest;













