import { Fragment } from 'react';
import IconData from '../common/icon/IconData';
import { changeViewDate } from '../../utils/utils';
import { PiHandHeartDuotone, PiCrownDuotone, PiNoteDuotone, PiEyeClosedDuotone, PiUsersThreeDuotone, PiUserCirclePlusDuotone, PiHandEyeDuotone } from "react-icons/pi";
import './ProjectItems.css'
import Tags from '../common/tag/Tags';
import { Link } from 'react-router-dom';
import DaysPanel from '../dayspanel/DaysPanel';



const ProjectItems = ({ project, isRequestUser = false, isTags = true, isDaysPanel = false, userDaysData = [] }) => {
    return (
        <Fragment>
            
            <div className='info_wrap'>
                <div className='project_image'>{IconData[project?.projectImages]}</div>

                <div className='info_inner'>
                    <div className='ico_wrap'>
                        {project?.projectPublic ? 
                            (<span title="공개" className='ico'><PiHandEyeDuotone /></span>) : 
                            (<span title="비공개" className='ico'><PiEyeClosedDuotone /></span>) 
                            }
                    </div>
                    <div title="인증글" className='ico_wrap'>
                        <span className='ico'><PiNoteDuotone /></span>
                        <span className='sub'>{project.writes.length}</span>    
                    </div>
                    <div title="좋아요" className='ico_wrap'>
                        <span className='ico'><PiHandHeartDuotone /></span>
                        <span className='sub'>{project.likeCount}</span>
                    </div>
                    <div title="참여한 유저" className='ico_wrap'>
                        <span className='ico'><PiUsersThreeDuotone /></span>
                        <span className='sub'>{project?.instanceUser?.length}</span>
                    </div>
                    {isRequestUser && (
                        <div title="신청한 유저" className='ico_wrap'>
                            <span className='ico'><PiUserCirclePlusDuotone /></span>
                            <span className='sub'>{project?.joinUser.length}</span>
                        </div>
                    )}
                </div>     
            </div>
           
            <div title="습관장" className='ico_wrap const_user'>
                <span className='ico'><PiCrownDuotone /></span>
                <span className='sub'>{project?.constructorUser._id.name}</span>
                {/* {project?.constructorUser.rank} */}
            </div>
           

            <Link to={`/project/detail/${project._id}`}>
                <strong className='project_title arrow_right'>{project?.title}</strong>
            </Link>
            <p className='project_conts word_ellip_2'>{project?.content}</p>
            <div className='created_at'>{changeViewDate(project?.createdAt, 'day')}</div>
           
            {isDaysPanel && <DaysPanel userDays={userDaysData} />}
    
            {isTags && project.categorys.length > 0 && (
                <div className='categorys gapt_20'>
                    <Tags tags={project.categorys} isLink={true} isNoData={false} />
                </div>
            )}
            
        </Fragment>
    );
};

export default ProjectItems;