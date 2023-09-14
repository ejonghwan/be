import { useState, useContext, useEffect, useCallback, Fragment } from 'react';
import { PiStarDuotone, PiHeartDuotone } from "react-icons/pi";
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
    const [like, setLike] = useState(null)

    const handleProjectLike = e => {
        e.preventDefault();
        if(!state.isLogged) return alert('좋아요를 하려면 로그인을 먼저 해주세요.')
        e.preventDefault();
        likeApi(like)
        setLike(!like)
    } 

    const handleProjectUnlike = async e => {
        e.preventDefault();
        if(!state.isLogged) return alert('좋아요를 취소 하려면 로그인을 먼저 해주세요.')
        e.preventDefault();
        likeApi(like)
        setLike(!like)
    } 


    // like state는 바로 번경되더라도 실제 요청은 1.5초 후에 클릭되는 상태에 따라 가게 debouce 작업. 
    const likeApi = useCallback(_debounce(async (like) => {
        try {
            ProjectDispatch({ type: "PROJECT_REQUEST" })
            if(like) {
                const resUnlike = await projectUnlike({ projectId, userId });
                if(resUnlike.data) {
                    ProjectDispatch({ type: "PROJECT_LIKE_DEC_SUCCESS" })
                    setLike(!like)
                }
            } else {
                const resLikeawait = await projectLike({ projectId, userId });
                if(resLikeawait.data) {
                    ProjectDispatch({ type: "PROJECT_LIKE_INC_SUCCESS" })
                    setLike(!like)
                }
            }
        } catch(err) {
            console.log(err)
        }
    }, 1000), []);



    useEffect(() => {
        // 렌더링 시작 시 넘어온 likeProject값과 스토어 내정보 likeProject가 같으면 상태변경
        state.user.likeProject.map(project => {
            if(project === projectId) setLike(true)
            if(project !== projectId) setLike(false)
        })
    }, []);

    return (
        <Fragment>
            <span className={`project_like_wrap ${className}`}>
                {like && (
                    <Button type={'button'} className={`button_type4 project_like ico_hover_type1 like ${like && 'active'}`} onClick={handleProjectUnlike}>
                        {like && <InfoState text={'좋아요 취소!'} /> }
                        <PiHeartDuotone />
                        <span className='blind'>이 습관 즐겨찾기 및 좋아요 취소</span>
                    </Button>
                )}

                {!like && (
                    <Button type={'button'} className={`button_type4 project_like unlike ico_hover_type1 ${like && 'active'}`} onClick={handleProjectLike}>
                        {!like && like !== null && <InfoState text={'좋아요!'} /> }
                        <PiHeartDuotone />
                        <span className='blind'>이 습관 즐겨찾기 및 좋아요</span>
                    </Button>
                )}
                 <span className='like_count'>{projectLikeLen}</span>
            </span>
        </Fragment>
    );
};

export default LikeProject;