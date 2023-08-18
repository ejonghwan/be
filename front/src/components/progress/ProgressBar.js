import { useRef, useEffect } from 'react';
import './ProgressBar.css'

const ProgressBar = ({ persent }) => {
    const barRef = useRef(null);
    const handlePersent = () => barRef.current.style.transform = `scaleX(${persent}%)`;
    
    useEffect(() => handlePersent(), [persent])

    return (
        <div className="progress-wrap">
            <div><span ref={barRef} className="bar">{persent}</span></div>
        </div>
    )
}

export default ProgressBar;