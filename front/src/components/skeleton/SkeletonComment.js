import { Fragment } from 'react';
import SkeletonItem from './SkeletonItem';

const SkeletonComment = () => {
    return (
        <Fragment>
            <SkeletonItem style={{ width: "70px", height: "70px", borderRadius: "50%", flex: "0 0 auto" }} /> 
            <div className='' style={{width: "100%"}}>
                <SkeletonItem style={{ maxWidth: "120px", height: "10px", borderRadius: "4px"  }} className='gap_10' />
                <SkeletonItem style={{ maxWidth: "200px", height: "10px", borderRadius: "4px" }} className='gap_30' />
                <SkeletonItem style={{ maxWidth: "200px", height: "10px", borderRadius: "4px" }} />
            </div>
        </Fragment>
    );
};

export default SkeletonComment;