import React from 'react';
import { PiChatCircleDotsDuotone  } from "react-icons/pi";

const CommentIcon = ({ count }) => {
    return (
        <span className='comment_ico'>
            <PiChatCircleDotsDuotone />
            <span className='count'>{count}</span>
        </span>
    );
};

export default CommentIcon;

