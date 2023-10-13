import { Fragment, useCallback, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext.js';
import ProjectItems from '../components/project/ProjectItems.js';
import { PiFolderNotchPlusDuotone } from "react-icons/pi";
import ProjectRequest from '../reducers/ProjectRequest.js';
import { ProjectContext } from '../context/ProjectContext.js';
import './home.css';
import UserRequest from '../reducers/UserRequest.js';
import SkeletonItem from '../components/skeleton/SkeletonItem.js';
import SkeletonCard from '../components/skeleton/SkeletonCard.js';
import ProjectItemsHorizon from '../components/project/ProjectItemsHorizon.js';
import ProjectItemsSquare from '../components/project/ProjectItemsSquare.js';



const Home = ({ page }) => {

    const { state, dispatch } = useContext(UserContext);
    const { ProjectState, ProjectState: { myapplyProject, myProject, rankProjects, insrankProjects }, ProjectDispatch } = useContext(ProjectContext);
    const { myApplyProject, loadMyProject, loadRankProject, loadinstanceRankProject } = ProjectRequest();
    const { getUserProjects } = UserRequest();



    const handleLoadApplyProject = useCallback(() => {
        ProjectDispatch({ type: "PROJECT_MYAPPLY_LOAD_REQUEST" });
        myApplyProject({ userId: state.user._id });
    }, [state.isLogged]);

    const handleLoadMyProject = useCallback(() => {
        ProjectDispatch({ type: "MYPROJECT_LOAD_REQUEST" });
        loadMyProject({ userId: state.user._id });
    }, [state.isLogged])

    const handleUserProjectsUpdate = () => {
        dispatch({ type: "MY_PROJECTS_UPDATE_REQUEST" });
        getUserProjects(state.user._id);
    };
    
    useEffect(() => {
        state.isLogged && handleLoadApplyProject();
        state.isLogged && handleUserProjectsUpdate();
        state.isLogged && handleLoadMyProject();
    }, [state.isLogged]);

    useEffect(() => {

        ProjectDispatch({ type: "PROJECT_RANK_LOAD_REQUEST" })
        loadRankProject();
        loadinstanceRankProject();

        console.log('?', rankProjects)

        return () => ProjectDispatch({ type: "RESET_PROJECTS" });
    }, [])


    


    return (
        <Fragment>
            <h2 className='blind'><span>{page}</span></h2>
            {/* {state.loadUserLoading && ( <div><Spinners /></div> )} */}
           
            <div className='b_conts full bg_gray'>
                <div className='b_conts pd_0'>
                    {ProjectState.loadMyProjectLoading || ProjectState.loadMyapplyProjectLoading ? (
                        <Fragment>
                            <h3 className='h3_title gap_20'>
                                <SkeletonItem style={{ width: "200px", height: "20px", borderRadius: "10px" }} />
                            </h3>
                            <ul className='project_items_wrap'>
                                {new Array(10).fill(null).map((_, idx) => <li key={idx} className='project_items'><SkeletonCard /></li>)}
                            </ul>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h3 className='h3_title gap_20'>{state.user._id ? '내가 진행중인 습관' : '로그인 후 습관을 만들어보세요.'}</h3>
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
                        </Fragment>
                    )}
                </div>
            </div>

            <div className='b_conts'>
                <div className='h3_title_wrap gap_20'>
                    <h3 className='h3_title'>인기 습관</h3>
                    <Link to={'/project/list'} className='more'>더보기</Link>
                </div>
               
                <ul className='project_items_square'>
                    {rankProjects?.map(project => (
                        <li key={project._id} className='project_items'>
                            <ProjectItemsSquare project={project} isRequestUser={true}  />
                        </li>
                    ))}
                </ul>
            </div>

            <div className='b_conts pd_0'>
                <div className='h3_title_wrap gap_20'>
                    <h3 className='h3_title'>인원 많은 습관</h3>
                    <Link to={'/project/list'} className='more'>더보기</Link>
                </div>
                <ul className='project_items_square'>
                    {insrankProjects?.map(project => (
                        <li key={project._id} className='project_items'>
                            <ProjectItemsSquare project={project} isRequestUser={true}  />
                        </li>
                    ))}
                </ul>

            </div>
        </Fragment>
     
            
          
    
    );
};

export default Home;
