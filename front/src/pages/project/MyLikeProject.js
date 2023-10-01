import { Fragment, useContext } from 'react';
import { UserContext } from '../../context/UserContext.js';
import ProjectItemsHorizon from '../../components/project/ProjectItemsHorizon.js';


const MyLikeProject = ({ page }) => {

    const { state } = useContext(UserContext);
    
    return (
        <Fragment>
            <div className='b_conts'>
                <h2 className='gap_0'>{page}</h2>
            </div>

            <div className='b_conts full bg_gray'>
                <div className='b_conts pd_0'>
                    <ul className='project_items_hor'>
                        {state.user?.likeProject?.map(project => (
                            <li key={project._id} className='project_items'>
                                <ProjectItemsHorizon project={project} isRequestUser={true}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

export default MyLikeProject;
