import { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext';
import axios from 'axios'


const host = process.env.REACT_APP_BACKEND_HOST;

const ProjectRequest = () => {
    const { ProjectDispatch } = useContext(ProjectContext); 

    // 프로젝트 생성
     const createProject = async data => {
        try {
            console.log('saga?', data)
            if(!userName || typeof userName !== 'string') throw new Error('넘어온 이름값이 잘못되었습니다');
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            }
            // const res = await axios.get(`${host}/api/Project/user/${encodeName}`, config);
            // ProjectDispatch({ type: "USER_Project_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            // ProjectDispatch({ type: "USER_Project_FAILUE", data: err.response.data.message });
        }
    }
    return {
        createProject, 
    }
}

export default ProjectRequest;














