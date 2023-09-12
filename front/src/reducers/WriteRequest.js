import { useContext } from 'react';
import { WriteContext } from '../context/WriteContext';
import { ProjectContext } from '../context/ProjectContext';
import axios from 'axios'

const host = process.env.REACT_APP_BACKEND_HOST;

const WriteRequest = () => {
    const { WriteDispatch } = useContext(WriteContext); 
    const { ProjectDispatch } = useContext(ProjectContext); 
    const accToken = localStorage.getItem('X-access-token');


    const createWrite = async data => {
        try {
            const { user, projectId, title, content } = data;
            // if(!title || typeof title !== 'string') throw new Error('넘어온 제목값이 잘못되었습니다');
            // if(!content || typeof content !== 'string') throw new Error('넘어온 내용값이 잘못되었습니다');
            // if(!projectPublic || typeof projectPublic !== 'boolean') throw new Error('넘어온 공개여부값이 잘못되었습니다');
            // if(!categorys || !Array.isArray(categorys)) throw new Error('넘어온 카테고리값이 잘못되었습니다');
            // if(!joinUser || !Array.isArray(joinUser)) throw new Error('넘어온 초대유저값이 잘못되었습니다');
            // if(!constructorUser || typeof constructorUser !== 'object') throw new Error('넘어온 생성자값이 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }
            const res = await axios.post(`${host}/api/write`, data, config);
            ProjectDispatch({ type: "WRITE_CREATE_SUCCESS", data: res.data })
            // WriteDispatch({ type: "WRITE_CREATE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            ProjectDispatch({ type: "WRITE_CREATE_FAILUE", data: err.message })
            // WriteDispatch({ type: "WRITE_CREATE_FAILUE", data: err.message });
        }
    }



    


    return {
        createWrite,
    }
}

export default WriteRequest;














