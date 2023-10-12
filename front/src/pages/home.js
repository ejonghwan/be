import { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext.js';
import ProjectItems from '../components/project/ProjectItems.js';
import { PiFolderNotchPlusDuotone } from "react-icons/pi";
import ProjectRequest from '../reducers/ProjectRequest.js';
import { ProjectContext } from '../context/ProjectContext.js';
import './home.css';
import UserRequest from '../reducers/UserRequest.js';
import Spinners from '../components/common/spinners/Spinners.js';
import SkeletonItem from '../components/skeleton/SkeletonItem.js';
import SkeletonCard from '../components/skeleton/SkeletonCard.js';



const Home = ({ page }) => {

    const { state, dispatch } = useContext(UserContext);
    const { ProjectState, ProjectState: { myapplyProject, myProject }, ProjectDispatch } = useContext(ProjectContext);
    const { myApplyProject, loadMyProject } = ProjectRequest();
    const { getUserProjects } = UserRequest();

    const handleLoadApplyProject = () => {
        ProjectDispatch({ type: "PROJECT_MYAPPLY_LOAD_REQUEST" });
        myApplyProject({ userId: state.user._id });
    }; 

    const handleLoadMyProject = () => {
        ProjectDispatch({ type: "MYPROJECT_LOAD_REQUEST" });
        loadMyProject({ userId: state.user._id });
    }; 

    const handleUserProjectsUpdate = () => {
        dispatch({ type: "MY_PROJECTS_UPDATE_REQUEST" });
        getUserProjects(state.user._id);
    };
    
    useEffect(() => {
        state.isLogged && handleLoadApplyProject();
        state.isLogged && handleUserProjectsUpdate();
        state.isLogged && handleLoadMyProject();
    }, [state.loadUserDone, state.isLogged]);


    return (
        <Fragment>
            <h2 className='blind'><span>{page}</span></h2>
            {state.loadUserLoading && ( <div><Spinners /></div> )}
           
            <div className='b_conts full bg_gray'>
                <div className='b_conts pd_0'>
                    <h3 className='h3_title gap_20'>{state.user._id ? '내가 진행중인 습관' : '로그인 후 습관을 만들어보세요.'}</h3>
                    {ProjectState.loadMyProjectLoading && (
                       <ul className='project_items_wrap'>
                            <li className='project_items'><SkeletonCard /></li>
                            <li className='project_items'><SkeletonCard /></li>
                            <li className='project_items'><SkeletonCard /></li>
                            <li className='project_items'><SkeletonCard /></li>
                        </ul>
                    )}
                    {ProjectState.loadMyapplyProjectLoading && (
                       <ul className='project_items_wrap'>
                            <li className='project_items'><SkeletonCard /></li>
                            <li className='project_items'><SkeletonCard /></li>
                            <li className='project_items'><SkeletonCard /></li>
                            <li className='project_items'><SkeletonCard /></li>
                        </ul>
                    )}
                    <ul className='project_items_wrap'>
                        {/* 내가 만든 습관 */}
                        {myProject?.map(project => (
                            <li key={project._id} className='project_items'>
                                <ProjectItems project={project} isRequestUser={true} isDaysPanel={true} userDaysData={project.constructorUser?.days} />
                            </li>
                        ))}
                        {/* 신청해서 진행하는 습관 */}
                        {myapplyProject?.map(project => (
                            <li key={project._id} className='project_items'>
                                <ProjectItems project={project} isRequestUser={true} isDaysPanel={true} userDaysData={project.instanceUser?.filter(user => user._id._id === state.user._id)[0]?.days} />
                            </li>
                        ))}
                        <li>
                            <div className='project_items new'>
                                <span className='project_image'><PiFolderNotchPlusDuotone /></span>
                                <Link to="/project/create">
                                    <span className='project_title arrow_right gapt_30'>새 습관 만들기</span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='b_conts'>
                <h3 className='h3_title gap_20'>습관 목록</h3>

            </div>

            <div className='b_conts'>
                <h3 className='h3_title gap_20'>인기 습관</h3>
                    디비에서 좋아요 표시 많은거 뽑아서 습관 목록

            </div>

            <div className='b_conts'>
                <h3 className='h3_title gap_20'>인원 많은 습관</h3>
                    디비에서 좋아요 표시 많은거 뽑아서 습관 목록

            </div>
        </Fragment>
     
            
          
    
    );
};

export default Home;
