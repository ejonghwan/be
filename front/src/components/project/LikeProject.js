import { useState, useContext } from 'react';
import { PiStarDuotone, PiHeartDuotone } from "react-icons/pi";
import { UserContext } from '../../context/UserContext';
import Button from '../common/form/Button';
import './LikeProject.css';


import InfoState from '../common/infoState/InfoState';

const LikeProject = ({ projectId, userId }) => {

    const { state } = useContext(UserContext);
    console.log(projectId, userId)
    const [like, setLike] = useState(null)
    const handleProjectLike = async e => {
        try {
            if(!state.isLogged) return alert('좋아요를 하려면 로그인을 먼저 해주세요.')
            e.preventDefault();
            setLike(!like)
        } catch(err) {
            console.log(err)
        }
        
    } 


    return (
        <span className=''>
            <Button className={`button_type4 project_like ${like && 'active'}`} onClick={handleProjectLike}>
                {like && <InfoState text={'좋아요 추가!'} /> }
                {!like && like !== null && <InfoState text={'좋아요 취소!'} /> }
                <PiHeartDuotone />
                <span className='blind'>이 습관 즐겨찾기 및 좋아요</span>
            </Button>
        </span>
    );
};

export default LikeProject;