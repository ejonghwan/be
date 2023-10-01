import { Fragment, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext.js';
import ProjectItems from '../../components/project/ProjectItems.js';
import ProjectRequest from '../../reducers/ProjectRequest.js';
import { ProjectContext } from '../../context/ProjectContext.js';


const MyProject = ({ page }) => {

    const { state } = useContext(UserContext);
    const { ProjectState: { myapplyProject } } = useContext(ProjectContext);
    const { myApplyProject } = ProjectRequest();

    const handleLoadApplyProject = () => {
        myApplyProject({ userId: state.user._id })
    } 
    
    useEffect(() => {
        state.loadUserDone && handleLoadApplyProject();
    }, [state.loadUserDone])

    return (
        <Fragment>
            <div className='b_conts'>
                <h2 className='gap_0'>{page}</h2>
            </div>

            <div className='b_conts full bg_gray'>
                <div className='b_conts pd_0'>
                    <h3 className='h3_title gap_20'>내가 만든 습관</h3>
                    <ul className='project_items_wrap'>
                        {state.user?.projects?.map(project => (
                            <li key={project._id} className='project_items'>
                                <ProjectItems project={project} isRequestUser={true}/>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='b_conts pd_0'>
                    <h3 className='h3_title gap_20 gapt_50'>내가 가입한 습관</h3>
                    <ul className='project_items_wrap'>
                         {myapplyProject?.map(project => (
                            <li key={project._id} className='project_items'>
                                <ProjectItems project={project} isRequestUser={true}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

export default MyProject;
