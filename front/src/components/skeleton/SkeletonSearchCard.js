import { Fragment } from 'react';
import SkeletonItem from './SkeletonItem';


const SkeletonSearchCard = () => {
    return (
        <Fragment>
            <div className='flex'>
                <div>
                    <SkeletonItem style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "15px" }} className=''/> 
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent:"center", flexDirection: "column" }}>
                    <SkeletonItem style={{ maxWidth: "75px", height: "10px", borderRadius: "4px" }} className='gap_10' />
                    <SkeletonItem style={{ maxWidth: "150px", height: "10px", borderRadius: "4px"  }} className='' />
                </div>
            </div>
        </Fragment>
    );
};

export default SkeletonSearchCard;