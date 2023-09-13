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
            const { user, project, title, content } = data;
            if(!title || typeof title !== 'string') throw new Error('넘어온 제목값이 잘못되었습니다');
            if(!content || typeof content !== 'string') throw new Error('넘어온 내용값이 잘못되었습니다');
            if(!user || typeof user !== 'object') throw new Error('넘어온 유저값이 잘못되었습니다');
            if(!project || typeof project !== 'object') throw new Error('넘어온 플젝 아이디값이 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }
            const res = await axios.post(`${host}/api/write`, data, config);
            ProjectDispatch({ type: "WRITE_CREATE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            ProjectDispatch({ type: "WRITE_CREATE_FAILUE", data: err.message });
        };
    };

    const loadWrite = async _id => {
        try {
            if(!_id || typeof _id !== 'string') throw new Error('넘어온 _id가 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }
            const res = await axios.get(`${host}/api/write/${_id}`, config);
            WriteDispatch({ type: "WRITE_LOAD_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "WRITE_LOAD_FAILUE", data: err.message });
        };
    };

    return {
        createWrite,
        loadWrite,
    }
}

export default WriteRequest;














