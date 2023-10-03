import { Fragment, useContext } from 'react';
import { UserContext } from '../../context/UserContext.js';
import ProjectItemsHorizon from '../../components/project/ProjectItemsHorizon.js';
import './MyRequestProject.css';
import Button from '../../components/common/form/Button.js';
import { PiUserCirclePlusDuotone } from "react-icons/pi";
import { ProjectContext } from '../../context/ProjectContext.js';
import UserRequest from '../../reducers/UserRequest.js';



const MyRequestProject = ({ page }) => {

    const { state, dispatch } = useContext(UserContext);
    const { inviteMyListProject, rejectMyListProject} = UserRequest();
    
    const handleInviteProject = async (projectId, userId) => {
        try {
            dispatch({ type: "MYLIST_PROJECT_INVITE_REQUEST" });
            await inviteMyListProject({ projectId, userId});
        } catch(err) {
            console.log(err)
        }
    }

    const handleRejectProject = async (projectId, userId) => {
        try {
            dispatch({ type: "MYLIST_PROJECT_REJECT_REQUEST" });
            await rejectMyListProject({ projectId, userId });
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Fragment>
            <div className='b_conts'>
                <h2 className='gap_0'>{page}</h2>
            </div>

            <div className='b_conts full bg_gray'>
                <div className='b_conts pd_0'>
                    <h3 className='h3_title gap_20'>내가 신청한 습관</h3>
                    <ul className='project_items_hor'>
                        {state.user?.projects?.map(project => (
                            <li key={project._id} className='project_items'>
                                <ProjectItemsHorizon project={project} isRequestUser={true} />
        
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='b_conts pd_0'>
                    <h3 className='h3_title gap_20 gapt_50'>내 습관에 신청한 친구</h3>
                    <ul className='project_items_hor friend_list'>
                        {state.user?.projects?.map(project => (
                            <li key={project._id} className='project_items'>
                                <ProjectItemsHorizon project={project} isRequestUser={true}/>
                                <div className='request_friend'>
                                    <h4>신청한 친구</h4>
                                    {project.joinUser.filter(user => user.state === false).map( user => (
                                        <div className='request_friend_inner' key={user._id._id}>
                                            <span>{user._id.id}</span>
                                            <Button className={'button_reset ico_hover_type1'} onClick={() => handleInviteProject(project._id, user._id._id)}>
                                                <PiUserCirclePlusDuotone />
                                            </Button>
                                            <Button className={'button_type_close hover_type1'} onClick={() => handleRejectProject(project._id, user._id._id)}></Button>
                                        </div>
                                    ) )}
                                </div>
                                <div className='invite_friend'>
                                    <h4>초대한 친구</h4>
                                    {project.joinUser.filter(user => user.state === true).map( user => 
                                        <span className='invite_friend_inner' key={user._id._id}>{user.state && user._id.id}</span> )}
                                </div>
                                
                            </li>
                        ))}
                    </ul>
                </div>

                
            </div>
        </Fragment>
    );
};

export default MyRequestProject;
