import './SkeletonItem.css';

const SkeletonItem = ({ style, className = '' }) => {
    return (
        <div className={`skeleton_list_item ${className}`} style={{ ...style }}></div>
    );
};

export default SkeletonItem;