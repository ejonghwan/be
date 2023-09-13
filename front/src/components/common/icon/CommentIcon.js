import React from 'react';
import { PiHeartDuotone  } from "react-icons/pi";

const CommentIcon = ({ count }) => {
    return (
        <div>
            <span className='comment_ico'>
                <PiHeartDuotone />
                <span className='count'>{count}</span>
            </span>
        </div>
    );
};

export default CommentIcon;

