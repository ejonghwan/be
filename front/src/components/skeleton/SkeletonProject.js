import { Fragment } from 'react';
import SkeletonItem from './SkeletonItem';
const SkeletonProject = () => {
    return (
        <Fragment>
             <div className='align_c gapt_30'>
                <div className='gap_20 flex flex_r'>
                    <SkeletonItem style={{ maxWidth: "75px", height: "15px", borderRadius: "4px" }} className='gap_10' />
                </div>
                <div className='gapt_10 pos_rel'>
                    <div className='icon_wrap'>
                        <SkeletonItem style={{ width: "150px", height: "150px", borderRadius: "50%" }} className='gap_20'/>
                    </div> 
                </div>
                    <SkeletonItem style={{ maxWidth: "150px", height: "15px", borderRadius: "4px", margin: "0 auto" }} className='gap_10 gapt_40' />
                    <SkeletonItem style={{ maxWidth: "200px", height: "15px", borderRadius: "4px", margin: "0 auto" }} className='gap_10 apt_40 align_c' />
                <div className='align_c gapt_40'>
                    <SkeletonItem style={{ maxWidth: "150px", height: "15px", borderRadius: "4px", margin: "0 auto"  }} className='gap_10' />
                    <SkeletonItem style={{ maxWidth: "600px", height: "100px", borderRadius: "4px", margin: "0 auto" }} className='gap_10' />
                </div>

            </div>



            {/* <SkeletonItem style={{ width: "75px", height: "75px", borderRadius: "50%" }} className='gap_20'/> 
            <SkeletonItem style={{ maxWidth: "75px", height: "15px", borderRadius: "4px" }} className='gap_10' />
            <SkeletonItem style={{ maxWidth: "150px", height: "15px", borderRadius: "4px"  }} className='gap_10' />
            <SkeletonItem style={{ maxWidth: "200px", height: "15px", borderRadius: "4px" }} className='gap_10' />
            <SkeletonItem style={{ height: "130px", borderRadius: "4px" }} /> */}
        </Fragment>
    );
};

export default SkeletonProject;