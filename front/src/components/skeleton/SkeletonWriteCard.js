import { Fragment } from 'react';
import SkeletonItem from './SkeletonItem';
import '../project/ProjectItems.css'

const SkeletonWriteCard = () => {
    return (
        <Fragment>
            <div className='flex flex_align_i_c gap_15'>
                <SkeletonItem style={{ width: "25px", height: "25px", borderRadius: "50%", marginRight: "5px" }} /> 
                <SkeletonItem style={{ maxWidth: "75px", height: "10px", borderRadius: "4px" }}  />
            </div>
            <SkeletonItem style={{ maxWidth: "120px", height: "10px", borderRadius: "4px"  }} className='gap_10' />
            <SkeletonItem style={{ maxWidth: "200px", height: "10px", borderRadius: "4px" }} className='gap_30' />
            <SkeletonItem style={{ maxWidth: "200px", height: "10px", borderRadius: "4px" }} />
        </Fragment>
    );
};

export default SkeletonWriteCard;