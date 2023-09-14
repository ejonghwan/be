import { PiChatCircleDotsDuotone  } from "react-icons/pi";
import './CommentIcon.css';

const CommentIcon = ({ count }) => {
    return (
        <span className='comment_ico'>
            <PiChatCircleDotsDuotone />
            <span className='count'>{count}</span>
        </span>
    );
};

export default CommentIcon;

