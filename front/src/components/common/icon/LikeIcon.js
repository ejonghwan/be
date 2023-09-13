import { PiHeartDuotone  } from "react-icons/pi";
import './LikeIcon.css'

const LikeIcon = ({ count }) => {
    return (
        <span className='like_ico'>
            <PiHeartDuotone />
            <span className='count'>{count}</span>
        </span>
    );
};

export default LikeIcon;