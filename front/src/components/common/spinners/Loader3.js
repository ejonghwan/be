import './Loader3.css';

const Loader3 = ({className = '', full = false , bg = false, scale = '2'}) => {
    return (
        <div className={`loading_wrap loading_3 ${bg && 'bg'} ${full && 'full'} ${className}`}> 
            <svg width="16px" height="12px" style={{ transform: `scale(${scale})` }}>
                <polyline className="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
                <polyline className="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
            </svg>
        </div>
    );
};

export default Loader3;