import { Fragment, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext.js';
import ProjectItemsHorizon from '../../components/project/ProjectItemsHorizon.js';
import Button from '../../components/common/form/Button.js';
import { PiUserCirclePlusDuotone, PiFolderDashedDuotone } from "react-icons/pi";
import { ProjectContext } from '../../context/ProjectContext.js';
import UserRequest from '../../reducers/UserRequest.js';
import CompleteMsg from '../../components/common/complete/CompleteMsg.js';
import './MyRequestProject.css';
import { Link } from 'react-router-dom';


const MyRequestProject = ({ page }) => {

    const { state, dispatch } = useContext(UserContext);
    const { inviteMyListProject, rejectMyListProject, requestMyProject } = UserRequest();
    


    const handleRequestMyProject = async () => {
        try {
            dispatch({ type: "MYLIST_PROJECT_REQUEST_REQUEST" });
            await requestMyProject({ userId: state.user._id});
        } catch(err) {
            console.log(err)
        }
    }

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

    useEffect(() => {
        handleRequestMyProject();
    }, [])

    return (
        <Fragment>
            <div className='b_conts'>
                <h2 className='gap_0'>{page}</h2>
            </div>

            <div className='b_conts full bg_gray'>
                <div className='b_conts pd_0'>
                    <h3 className='h3_title gap_20'>내가 신청한 습관</h3>
                    {state.requestMyProject.length > 0 ? (
                        <ul className='project_items_hor'>
                            {state.requestMyProject?.map(project => (
                                <li key={project._id} className='project_items'>
                                    <ProjectItemsHorizon project={project} isRequestUser={true} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className='align_c'>
                            <CompleteMsg 
                                icon={<PiFolderDashedDuotone />}
                                title={'내가 신청한 습관이 없습니다.'}
                                subText={'습관을 신청해보세요.'}
                            />
                            <Link to="/project/list/likes" className='button_type7 gapt_10'>다른 습관 보러가기</Link>
                        </div>
                        
                    )}
                    
                </div>

                <div className='b_conts pd_0'>
                    <h3 className='h3_title gap_20 gapt_50'>내 습관에 신청한 친구</h3>
                    {state.user?.projects?.length > 0 ? (
                        <ul className='project_items_hor friend_list'>
                            {state.user.projects?.map(project => (
                                <li key={project._id} className='project_items'>
                                    <ProjectItemsHorizon project={project} isRequestUser={true}/>
                                    <div className='request_friend'>
                                        <h4>
                                            신청한 친구
                                            <span>{project.joinUser.filter(user => user.state === false).length}명</span>
                                        </h4>
                                        {project.joinUser?.filter(user => user.state === false).map( user => (
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
                                        <h4>
                                            초대한 친구
                                            <span>{project.joinUser.filter(user => user.state === true).length}명</span>
                                        </h4>
                                        {project.joinUser.filter(user => user.state === true).map( user => 
                                            <span className='invite_friend_inner' key={user._id._id}>{user.state && user._id.id}</span> )}
                                    </div>
                                    
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className='align_c'>
                            <CompleteMsg 
                                icon={<PiFolderDashedDuotone />}
                                title={'만든 습관이 없습니다.'}
                                subText={'습관을 만들어보세요.'}
                            />
                            <Link to="/project/create" className='button_type7 gapt_10'>습관 만들기</Link>
                        </div>
                    )}
                    
                </div>

                
            </div>
        </Fragment>
    );
};

export default MyRequestProject;
