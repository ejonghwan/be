import { Fragment } from 'react';
import IconData from '../common/icon/IconData';
import { changeViewDate } from '../../utils/utils';
import { PiHandHeartDuotone, PiCrownSimpleDuotone, PiNoteDuotone, PiEyeClosedDuotone, PiUsersThreeDuotone, PiUserCirclePlusDuotone, PiHandEyeDuotone } from "react-icons/pi";
import './ProjectItems.css'
import Tags from '../common/tag/Tags';



const ProjectItems = ({ project, isRequestUser = false }) => {
    // console.log(project)
    return (
        <Fragment>
            
            <div className='info_wrap'>
                <div className='project_image'>{IconData[project?.projectImages]}</div>


                <div className=''>
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
                     <div className='created_at'>{changeViewDate(project?.createdAt, 'day')}</div>
                </div>
                
            </div>
           


            <div title="습관장" className='ico_wrap'>
                <span className='ico'><PiCrownSimpleDuotone /></span>
                <span className='sub'>{project?.constructorUser._id.name}</span>
                {/* {project?.constructorUser.rank} */}
            </div>
           

            <strong className='project_title'>{project?.title}</strong>
            <p className='project_conts'>{project?.content}</p>

           
         
            {project.categorys.length > 0 && (
                <div className='categorys gapt_30'>
                    <Tags tags={project.categorys} isLink={true} isNoData={false} />
                </div>
            )}
            
        </Fragment>
    );
};

export default ProjectItems;