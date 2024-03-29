import { useState, useContext, useEffect, useCallback, Fragment, memo, useRef } from 'react';
import { PiHeartDuotone } from "react-icons/pi";
import { UserContext } from '../../context/UserContext';
import { ProjectContext } from '../../context/ProjectContext';
import UserRequest from '../../reducers/UserRequest';
import Button from '../common/form/Button';
import _debounce from 'lodash.debounce';
import InfoState from '../common/infoState/InfoState';
import './LikeProject.css';

const LikeProject = ({ projectLikeLen, projectId, userId, className = '' }) => {

    const { projectLike, projectUnlike }  = UserRequest();
    const { state, dispatch } = useContext(UserContext);
    const { ProjectState: { project }, ProjectDispatch } = useContext(ProjectContext);
    const [like, setLike] = useState(null);
    const likeRef = useRef(false);
    const unlikeRef = useRef(false);

    const handleProjectLike = e => {
        e.preventDefault();
        if(!state.isLogged) return alert('좋아요를 하려면 로그인을 먼저 해주세요.');
        e.preventDefault();
        likeApi(like);
        setLike(!like);
        unlikeRef.current = false;
        likeRef.current = true;
    };

    const handleProjectUnlike = async e => {
        e.preventDefault();
        if(!state.isLogged) return alert('좋아요를 취소 하려면 로그인을 먼저 해주세요.');
        e.preventDefault();
        likeApi(like);
        setLike(!like);
        likeRef.current = false;
        unlikeRef.current = true;
    };


    // like state는 바로 번경되더라도 실제 요청은 1.5초 후에 클릭되는 상태에 따라 가게 debouce 작업. 
    const likeApi = useCallback(_debounce(async (like) => {
        try {
            if(like) {
                if(project.likeUser?.filter(user => user._id === state.user._id).length === 0) return;
                const resUnlike = await projectUnlike({ projectId, userId });
                if(resUnlike.data) {
                    ProjectDispatch({ type: "PROJECT_LIKE_DEC_SUCCESS", data: state.user._id })
                    setLike(!like);
                };
            } else {
                if(project.likeUser?.filter(user => user._id === state.user._id).length > 0) return;
                const resLikeawait = await projectLike({ projectId, userId });
                if(resLikeawait.data) {
                    ProjectDispatch({ type: "PROJECT_LIKE_INC_SUCCESS", data: {
                        _id: state.user._id,
                        profileImage: state.user.profileImage,
                        id: state.user.id,
                        email: state.user.email,
                        name: state.user.name,
                        createdAt: state.user.createdAt,
                    } });
                    setLike(!like);
                };
            };
        } catch(err) {
            console.log(err);
        };
    }, 1000), [state.user.likeProject, project.likeUser]);


    useEffect(() => {
        project.likeUser?.filter(user => user._id === state.user._id).length > 0 ? setLike(true) : setLike(false);
    }, [project.likeUser]);

    return (
        <Fragment>
            <span className={`project_like_wrap ${className}`}>
                {like && (
                    <Fragment>
                        {likeRef.current && <InfoState text={'좋아요!'} /> }
                        <Button type={'button'} className={`button_type4 project_like ico_hover_type1 like ${like && 'active'}`} onClick={handleProjectUnlike}>
                            <PiHeartDuotone />
                            <span className='blind'>이 습관 즐겨찾기 및 좋아요 취소</span>
                        </Button>
                    </Fragment>
                )}

                {!like && (
                    <Fragment>
                        {unlikeRef.current && <InfoState text={'좋아요 취소!'} /> }
                        <Button type={'button'} className={`button_type4 project_like unlike ico_hover_type1 ${like && 'active'}`} onClick={handleProjectLike}>
                            
                            <PiHeartDuotone />
                            <span className='blind'>이 습관 즐겨찾기 및 좋아요</span>
                        </Button>
                    </Fragment>
                )}
                 <span className='like_count'>{projectLikeLen}</span>
            </span>
        </Fragment>
    );
};

export default memo(LikeProject);