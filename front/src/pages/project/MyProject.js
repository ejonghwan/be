import { Fragment, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext.js';
import ProjectItems from '../../components/project/ProjectItems.js';
import ProjectRequest from '../../reducers/ProjectRequest.js';
import { ProjectContext } from '../../context/ProjectContext.js';
import CompleteMsg from '../../components/common/complete/CompleteMsg.js';
import { PiFolderDashedDuotone } from "react-icons/pi";
import { Link } from 'react-router-dom';
import SkeletonCard from '../../components/skeleton/SkeletonCard.js';
import SkeletonItem from '../../components/skeleton/SkeletonItem.js';

const MyProject = ({ page }) => {

    const { state } = useContext(UserContext);
    const { ProjectState, ProjectState: { myapplyProject, myProject }, ProjectDispatch  } = useContext(ProjectContext);
    const { myApplyProject, loadMyProject } = ProjectRequest();

    const handleLoadApplyProject = () => {
        ProjectDispatch({ type: "PROJECT_MYAPPLY_LOAD_REQUEST" });
        myApplyProject({ userId: state.user._id });
    }; 

    const handleLoadMyProject = () => {
        ProjectDispatch({ type: "MYPROJECT_LOAD_REQUEST" });
        loadMyProject({ userId: state.user._id });
    }; 

    
    useEffect(() => {
        state.isLogged && handleLoadApplyProject();
        state.isLogged && handleLoadMyProject();
    }, [state.loadUserDone, state.isLogged])

    useEffect(() => {
        return () => ProjectDispatch({ type: "RESET_PROJECTS" });
    }, [])


    return (
        <Fragment>
            <div className='b_conts'>
                <h2 className='gap_0'>{page}</h2>
            </div>

            <div className='b_conts full bg_gray'>
                {ProjectState.loadMyProjectLoading ? (
                    <div className='b_conts pd_0'>
                        <h3 className='h3_title gap_20'>
                            <SkeletonItem style={{ width: "200px", height: "20px", borderRadius: "10px" }} />
                        </h3>
                        <ul className='project_items_wrap'>
                            {new Array(10).fill(null).map((_, idx) => <li key={idx} className='project_items'><SkeletonCard /></li>)}
                        </ul>
                    </div>
                ) : (
                    <div className='b_conts pd_0'>
                        <h3 className='h3_title gap_20'>내가 만든 습관</h3>
                        <ul className='project_items_wrap'>
                            {myProject?.map(project => (
                                <li key={project._id} className='project_items'>
                                    <ProjectItems project={project} isRequestUser={true} isDaysPanel={true} userDaysData={project.constructorUser?.days}/>
                                </li>
                            ))}
                        </ul>
                        {state.user?.projects.length === 0 && (
                            <div className='align_c'>
                                <CompleteMsg 
                                    icon={<PiFolderDashedDuotone />}
                                    title={'내가 만든 습관이 없습니다.'}
                                    subText={'습관을 만들어보세요.'}
                                />
                                <Link to="/project/create" className='button_type7 gapt_10'>습관 만들기</Link>
                            </div>
                        )}
                    </div>
                )}
            
                {ProjectState.loadMyapplyProjectLoading ? (
                    <div className='b_conts pd_0'>
                        <h3 className='h3_title gap_20 gapt_50'>
                            <SkeletonItem style={{ width: "200px", height: "20px", borderRadius: "10px" }} />
                        </h3>
                        <ul className='project_items_wrap'>
                            <li className='project_items'><SkeletonCard /></li>
                            <li className='project_items'><SkeletonCard /></li>
                            <li className='project_items'><SkeletonCard /></li>
                            <li className='project_items'><SkeletonCard /></li>
                            <li className='project_items'><SkeletonCard /></li>
                            <li className='project_items'><SkeletonCard /></li>
                        </ul>
                    </div>
                ) : (
                    <div className='b_conts pd_0'>
                        <h3 className='h3_title gap_20 gapt_50'>내가 가입한 습관</h3>
                        <ul className='project_items_wrap'>
                            {myapplyProject?.map(project => (
                                <li key={project._id} className='project_items'>
                                    <ProjectItems project={project} isRequestUser={true} isDaysPanel={true} userDaysData={project.instanceUser.filter(user => user._id._id === state.user._id)[0].days} />
                                </li>
                            ))}
                        </ul>
                        {myapplyProject.length === 0 && (
                            <div className='align_c'>
                                <CompleteMsg 
                                    icon={<PiFolderDashedDuotone />}
                                    title={'내가 가입한 습관이 없습니다.'}
                                    subText={'습관을 신청해보세요.'}
                                />
                                <Link to="/project/list" className='button_type7 gapt_10'>다른 습관 보러가기</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default MyProject;
