import { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext.js';
// import { Calender } from '../components/calender/Calender.js'
import ProjectItems from '../components/project/ProjectItems.js';
import { PiFolderNotchPlusDuotone } from "react-icons/pi";
import './home.css';
import ProjectRequest from '../reducers/ProjectRequest.js';
import { ProjectContext } from '../context/ProjectContext.js';

const Home = ({ page }) => {

    const { state } = useContext(UserContext);
    const { ProjectState: { myapplyProject } } = useContext(ProjectContext);
    const { myApplyProject } = ProjectRequest();

    const handleLoadApplyProject = () => {
        myApplyProject({ userId: state.user._id })
    } 
    
    useEffect(() => {
        console.log(state?.user._id)
         handleLoadApplyProject();
    }, [])

    return (
        <Fragment>
            <h2 className='blind'><span>{page}</span></h2>

            <div className='b_conts full bg_gray'>
                <div className='b_conts pd_0'>
                    <h3 className='h3_title gap_20'>내가 진행중인 습관</h3>
                    <ul className='project_items_wrap'>
                        {state.user?.projects?.map(project => (
                            <li key={project._id} className='project_items'>
                                <ProjectItems project={project} isRequestUser={true}/>
                            </li>
                        ))}
                        {myapplyProject?.map(project => (
                            <li key={project._id} className='project_items'>
                                <ProjectItems project={project} isRequestUser={true}/>
                            </li>
                        ))}
                        <li>
                            <div className='project_items new'>
                                <span className='project_image'><PiFolderNotchPlusDuotone /></span>
                                <Link to={`/createproject`}>
                                    <span className='project_title arrow_right gapt_30'>새 습관 만들기</span>
                                </Link>
                            </div>
                            
                        </li>
                    </ul>
                    {/* <Calender /> */}
                    각 플젝마다 잔디밭 넣기

                    <h3>인기 있는 습관</h3>
                    디비에서 좋아요 표시 많은거 뽑아서 습관 목록

                    <h3>달력 일자로 ? </h3>
                </div>
            </div>

            <div className='b_conts'>
                asdasdasd
            </div>
        </Fragment>
     
            
          
    
    );
};

export default Home;
