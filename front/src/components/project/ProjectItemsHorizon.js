
import { Fragment } from 'react';
import IconData from '../common/icon/IconData';
import { changeViewDate } from '../../utils/utils';
import { PiHandHeartDuotone, PiCrownDuotone, PiUsersThreeDuotone } from "react-icons/pi";
import Tags from '../common/tag/Tags';
import { Link } from 'react-router-dom';
import './ProjectItemsHorizon.css';

const ProjectItemsHorizon = ({ project, isContent = false, isTag = false }) => {
    return (
        <Fragment>
            <div className='info_wrap'>
                <div className='project_image'>{IconData[project?.projectImages]}</div>
                
                <div className='info_main'>
                    <Link to={`/project/detail/${project._id}`} >
                        <strong className='project_title arrow_right word_ellip_1'>{project?.title}</strong>
                    </Link>
                    <div title="습관장" className='ico_wrap const_user'>
                        <span className='ico'><PiCrownDuotone /></span>
                        <span className='sub'>{project?.constructorUser._id.name}</span>
                     <div className='created_at'>{changeViewDate(project?.createdAt, 'day')}</div>
                    </div>
                </div>

                <div className='info_inner'>
                    <div title="좋아요" className='ico_wrap'>
                        <span className='ico'><PiHandHeartDuotone /></span>
                        <span className='sub'>{project.likeCount}</span>
                    </div>
                    <div title="참여한 유저" className='ico_wrap'>
                        <span className='ico'><PiUsersThreeDuotone /></span>
                        <span className='sub'>{project?.instanceUser?.length}</span>
                    </div>
                </div>
                
            </div>
            {isContent && <p className='project_conts word_ellip_2'>{project?.content}</p>}
            {isTag && (<Tags tags={project?.categorys} isLink={true} isNoData={false} /> )}
        
        </Fragment>
    );
};

export default ProjectItemsHorizon;

