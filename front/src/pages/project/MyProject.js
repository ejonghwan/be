import { Fragment, useContext } from 'react';
import { UserContext } from '../../context/UserContext.js';
import ProjectItems from '../../components/project/ProjectItems.js';


const MyProject = ({ page }) => {

    const { state } = useContext(UserContext);
    
    return (
        <Fragment>
            <div className='b_conts'>
                <h2 className='gap_0'>{page}</h2>
            </div>

            <div className='b_conts full bg_gray'>
                <div className='b_conts pd_0'>
                    <ul className='project_items_wrap'>
                        {state.user?.projects?.map(project => (
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
