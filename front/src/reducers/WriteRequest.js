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

    const likeWrite = async data => {
        try {
            const { userId, writeId } = data;
            if(!userId || typeof userId !== 'string') throw new Error('넘어온 userId가 잘못되었습니다');
            if(!writeId || typeof writeId !== 'string') throw new Error('넘어온 writeId가 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }
            const res = await axios.patch(`${host}/api/write/like`, data, config);
            WriteDispatch({ type: "WRITE_LIKE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "WRITE_LIKE_FAILUE", data: err.message });
        };
    };

    const unLikeWrite = async data => {
        try {
            const { userId, writeId } = data;
            if(!userId || typeof userId !== 'string') throw new Error('넘어온 userId가 잘못되었습니다');
            if(!writeId || typeof writeId !== 'string') throw new Error('넘어온 writeId가 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }
            const res = await axios.patch(`${host}/api/write/unlike`, data, config);
            WriteDispatch({ type: "WRITE_UNLIKE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "WRITE_UNLIKE_FAILUE", data: err.message });
        };
    };


    const editWrite = async data => {
        try {
            const { writeId, prevImagefilename } = data;
            // if(!writeId || typeof writeId !== 'string') throw new Error('넘어온 writeId가 잘못되었습니다');
            // if(!prevImagefilename || typeof prevImagefilename !== 'string') throw new Error('넘어온 이미지가 잘못되었습니다');
            console.log('???', data)
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }
            // console.log('???', data)
            console.log('???')

            const res = await axios.patch(`${host}/api/write/edit/${writeId}`, data, config);
            console.log(res)
            WriteDispatch({ type: "WRITE_EDIT_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "WRITE_EDIT_FAILUE", data: err.message });
        };
    };

    return {
        createWrite,
        loadWrite,
        likeWrite,
        unLikeWrite,
        editWrite,
    }
}

export default WriteRequest;














