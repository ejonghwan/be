import { useState, useContext, useEffect, useCallback } from 'react';
import { PiStarDuotone, PiHeartDuotone } from "react-icons/pi";
import { UserContext } from '../../context/UserContext';
import UserRequest from '../../reducers/UserRequest';
import Button from '../common/form/Button';
import _debounce from 'lodash.debounce';
import './LikeProject.css';


import InfoState from '../common/infoState/InfoState';

const LikeProject = ({ projectId, userId }) => {

    const { projectLike, projectUnlike }  = UserRequest();
    const { state, dispatch } = useContext(UserContext);
    console.log(projectId, userId)
    const [like, setLike] = useState(null)

    const handleProjectLike = async e => {
        try {
            if(!state.isLogged) return alert('좋아요를 하려면 로그인을 먼저 해주세요.')
            e.preventDefault();
            likeApi()
            setLike(!like)
        } catch(err) {
            console.log(err)
        }
    } 

    const handleProjectUnlike = async e => {
        try {
            if(!state.isLogged) return alert('좋아요를 취소 하려면 로그인을 먼저 해주세요.')
            e.preventDefault();
            likeApi()
            setLike(!like)
        } catch(err) {
            console.log(err)
        }
    } 


    // like state는 바로 번경되더라도 실제 요청은 1.5초 후에 클릭되는 상태에 따라 가게 debouce 작업. 
    const likeApi = useCallback(_debounce(async () => {
        dispatch({ type: "LOADING" })
        if(like) await projectUnlike({ projectId, userId });
        if(!like) await projectLike({ projectId, userId });
    }, 1500), [])


    useEffect(() => {
        // 렌더링 시작 시 넘어온 likeProject값과 스토어 내정보 likeProject가 같으면 상태변경
        state.user.likeProject.map(project => {
            if(project === projectId) setLike(true)
        })
    }, [])


    return (
        <span className=''>
            {like && (
                <Button className={`button_type4 project_like ${like && 'active'}`} onClick={handleProjectUnlike}>
                    {like && <InfoState text={'좋아요 추가!'} /> }
                    <PiHeartDuotone />
                    <span className='blind'>이 습관 즐겨찾기 및 좋아요</span>
                </Button>
            )}

            {!like && (
                <Button className={`button_type4 project_like ${like && 'active'}`} onClick={handleProjectLike}>
                    {!like && like !== null && <InfoState text={'좋아요 취소!'} /> }
                    <PiHeartDuotone />
                    <span className='blind'>이 습관 즐겨찾기 및 좋아요 취소</span>
                </Button>
            )}

        </span>
    );
};

export default LikeProject;