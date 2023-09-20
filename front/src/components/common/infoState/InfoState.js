import { memo } from 'react';
import './InfoState.css';
const InfoState = ({ text, className = '' }) => {
    return (
        <div className={`info_state_wrap ${className}`}>
            <span>{text}</span>
        </div>
    );
};

export default memo(InfoState);