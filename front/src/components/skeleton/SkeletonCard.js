import { Fragment } from 'react';
import SkeletonItem from './SkeletonItem';
import '../project/ProjectItems.css';

const SkeletonCard = () => {
    return (
        <Fragment>
            <SkeletonItem style={{ width: "75px", height: "75px", borderRadius: "50%" }} className='gap_20'/> 
            <SkeletonItem style={{ maxWidth: "75px", height: "15px", borderRadius: "4px" }} className='gap_10' />
            <SkeletonItem style={{ maxWidth: "150px", height: "15px", borderRadius: "4px"  }} className='gap_10' />
            <SkeletonItem style={{ maxWidth: "200px", height: "15px", borderRadius: "4px" }} className='gap_10' />
            <SkeletonItem style={{ height: "130px", borderRadius: "4px" }} />
        </Fragment>
    );
};

export default SkeletonCard;