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
            if(!writeId || typeof writeId !== 'string') throw new Error('넘어온 writeId가 잘못되었습니다');
            if(!prevImagefilename || typeof prevImagefilename !== 'string') throw new Error('넘어온 이미지가 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }

            const res = await axios.patch(`${host}/api/write/edit/${writeId}`, data, config);
            WriteDispatch({ type: "WRITE_EDIT_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "WRITE_EDIT_FAILUE", data: err.message });
        };
    };
    

    const deleteWrite = async data => {
        try {
            const { userId, writeId, projectId } = data;
            if(!userId || typeof userId !== 'string') throw new Error('넘어온 userId 잘못되었습니다');
            if(!writeId || typeof writeId !== 'string') throw new Error('넘어온 writeId 잘못되었습니다');
            if(!projectId || typeof projectId !== 'string') throw new Error('넘어온 projectId 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                data: data,
                withCredentials: true,
            }

            const res = await axios.delete(`${host}/api/write`, config);
            WriteDispatch({ type: "WRITE_DELETE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "WRITE_DELETE_FAILUE", data: err.message });
        };
    };


    const createComment = async data => {
        try {
            const { user, writeId, content } = data;
            if(!user || typeof user !== 'object') throw new Error('넘어온 user가 잘못되었습니다');
            if(!writeId || typeof writeId !== 'string') throw new Error('넘어온 writeId가 잘못되었습니다');
            if(!content || typeof content !== 'string') throw new Error('넘어온 이미지가 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }

            const res = await axios.post(`${host}/api/comment`, data, config);
            WriteDispatch({ type: "COMMENT_CREATE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "COMMENT_CREATE_FAILUE", data: err.message });
        };
    };

    const likeComment = async data => {
        try {
            const { userId, commentId } = data;
            if(!userId || typeof userId !== 'string') throw new Error('넘어온 userId가 잘못되었습니다');
            if(!commentId || typeof commentId !== 'string') throw new Error('넘어온 commentId 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }

            const res = await axios.patch(`${host}/api/comment/like`, data, config);
            WriteDispatch({ type: "COMMENT_LIKE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "COMMENT_LIKE_FAILUE", data: err.message });
        };
    };

    const unlikeComment = async data => {
        try {
            const { userId, commentId } = data;
            if(!userId || typeof userId !== 'string') throw new Error('넘어온 userId 잘못되었습니다');
            if(!commentId || typeof commentId !== 'string') throw new Error('넘어온 commentId 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }

            const res = await axios.patch(`${host}/api/comment/unlike`, data, config);
            WriteDispatch({ type: "COMMENT_UNLIKE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "COMMENT_UNLIKE_FAILUE", data: err.message });
        };
    };

    const editComment = async data => {
        try {
            const { commentId, content } = data;
            if(!commentId || typeof commentId !== 'string') throw new Error('넘어온 commentId 잘못되었습니다');
            if(!content || typeof content !== 'string') throw new Error('넘어온 content 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }

            const res = await axios.patch(`${host}/api/comment/edit/${commentId}`, { content }, config);
            WriteDispatch({ type: "COMMENT_EDIT_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "COMMENT_EDIT_FAILUE", data: err.message });
        };
    };


    const deleteComment = async data => {
        try {
            const { userId, writeId, commentId } = data;
            if(!userId || typeof userId !== 'string') throw new Error('넘어온 userId 잘못되었습니다');
            if(!writeId || typeof writeId !== 'string') throw new Error('넘어온 writeId 잘못되었습니다');
            if(!commentId || typeof commentId !== 'string') throw new Error('넘어온 commentId 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                data: data,
                withCredentials: true,
            }

            const res = await axios.delete(`${host}/api/comment`, config);
            WriteDispatch({ type: "COMMENT_DELETE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "COMMENT_DELETE_FAILUE", data: err.message });
        };
    };


    const createRecomment = async data => {
        try {
            const { user, content, commentId } = data;
            if(!user || typeof user !== 'object') throw new Error('넘어온 user 잘못되었습니다');
            if(!content || typeof content !== 'string') throw new Error('넘어온 content 잘못되었습니다');
            if(!commentId || typeof commentId !== 'string') throw new Error('넘어온 commentId 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }

            const res = await axios.post(`${host}/api/recomment`, data, config);
            WriteDispatch({ type: "RECOMMENT_CREATE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "RECOMMENT_CREATE_FAILUE", data: err.message });
        };
    };


    const likeRecomment = async data => {
        try {
            const { user, commentId, recommentId } = data;
            if(!user || typeof user !== 'object') throw new Error('넘어온 user 잘못되었습니다');
            if(!commentId || typeof commentId !== 'string') throw new Error('넘어온 commentId 잘못되었습니다');
            if(!recommentId || typeof recommentId !== 'string') throw new Error('넘어온 recommentId 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }

            const res = await axios.patch(`${host}/api/recomment/like`, data, config);
            WriteDispatch({ type: "RECOMMENT_LIKE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "RECOMMENT_LIKE_FAILUE", data: err.message });
        };
    };

    const unlikeRecomment = async data => {
        try {
            const { user, commentId, recommentId } = data;
            if(!user || typeof user !== 'object') throw new Error('넘어온 user 잘못되었습니다');
            if(!commentId || typeof commentId !== 'string') throw new Error('넘어온 commentId 잘못되었습니다');
            if(!recommentId || typeof recommentId !== 'string') throw new Error('넘어온 recommentId 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }

            const res = await axios.patch(`${host}/api/recomment/unlike`, data, config);
            WriteDispatch({ type: "RECOMMENT_UNLIKE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "RECOMMENT_UNLIKE_FAILUE", data: err.message });
        };
    };

    const editRecomment = async data => {
        try {
            const { content, commentId, recommentId } = data;
            if(!content || typeof content !== 'string') throw new Error('넘어온 content 잘못되었습니다');
            if(!commentId || typeof commentId !== 'string') throw new Error('넘어온 commentId 잘못되었습니다');
            if(!recommentId || typeof recommentId !== 'string') throw new Error('넘어온 recommentId 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }

            const res = await axios.patch(`${host}/api/recomment/edit/${recommentId}`, data, config);
            WriteDispatch({ type: "RECOMMENT_EDIT_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "RECOMMENT_EDIT_FAILUE", data: err.message });
        };
    };

    const deleteRecomment = async data => {
        try {
            const { userId, commentId, recommentId } = data;
            if(!userId || typeof userId !== 'string') throw new Error('넘어온 userId 잘못되었습니다');
            if(!commentId || typeof commentId !== 'string') throw new Error('넘어온 commentId 잘못되었습니다');
            if(!recommentId || typeof recommentId !== 'string') throw new Error('넘어온 recommentId 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                data: data,
                withCredentials: true,
            }

            const res = await axios.delete(`${host}/api/recomment`, config);
            WriteDispatch({ type: "RECOMMENT_DELETE_SUCCESS", data: res.data });

            return res.data;
        } catch(err) {
            WriteDispatch({ type: "RECOMMENT_DELETE_FAILUE", data: err.message });
        };
    };

    const loadMyWrites = async data => {
        try {
            const { userId, page } = data;
            if(!userId || typeof userId !== 'string') throw new Error('넘어온 userId 잘못되었습니다');
            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    'X-access-token': accToken, 
                },
                withCredentials: true,
            }

            const res = await axios.get(`${host}/api/write/my/${userId}/${page}`, config);
            WriteDispatch({ type: "MYWRITES_LOAD_SUCCESS", data: res.data });
            console.log(res)
            return res.data;
        } catch(err) {
            WriteDispatch({ type: "MYWRITES_LOAD_FAILUE", data: err.message });
        };
    };



    return {
        createWrite,
        loadWrite,
        likeWrite,
        unLikeWrite,
        editWrite,
        deleteWrite,
        createComment,
        likeComment,
        unlikeComment,
        editComment,
        deleteComment,
        createRecomment,
        likeRecomment,
        unlikeRecomment,
        editRecomment,
        deleteRecomment,
        loadMyWrites
    };
}

export default WriteRequest;














