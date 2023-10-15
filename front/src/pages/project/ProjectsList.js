import { Fragment, useContext, useEffect } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import ProjectRequest from "../../reducers/ProjectRequest";
import ProjectItemsHorizon from "../../components/project/ProjectItemsHorizon";
import Button from '../../components/common/form/Button';
import Tab from "../../components/common/tab/Tab";

const ProjectsList = ({ page }) => {

    const {  ProjectState, ProjectState: { rankProjects = [], insrankProjects = [] }, ProjectDispatch  } = useContext(ProjectContext)
    const { loadRankProject, loadinstanceRankProject } = ProjectRequest();

    const handleLoadInsUser = () => {
        ProjectDispatch({ type: "PROJECT_INSRANK_LOAD_REQUEST" })
        loadinstanceRankProject({ pageNum: 1, limitNum: 20 })
    }

    const handleLoadLikeRank = () => {
        ProjectDispatch({ type: "PROJECT_RANK_LOAD_REQUEST" })
        loadRankProject({ pageNum: 1, limitNum: 20 })
      
    }

    useEffect(() => {
        handleLoadLikeRank();
        handleLoadInsUser()
        console.log(rankProjects)
    }, [])


    const handleLoadTEst = (a) => {
        console.log('??', a)
    }


    return (
        <Fragment>
            <div className='b_conts h2_title_wrap'>
                <h2 className='gap_0'>{page}</h2>
            </div>
            <div className='b_conts full bg_gray'>
                <div className='b_conts pd_0'>

                    <div>
                        <Tab 
                            tabHead={[<span>'좋아요 순'</span>, <span>'참여인원 순'</span>]} 
                            tabBody={[
                                <ul className='project_items_hor'>
                                    {rankProjects?.map(project => (
                                        <li key={project._id} className='project_items'>
                                            <ProjectItemsHorizon project={project} isRequestUser={true} />
                                        </li>
                                    ))}
                                </ul>,
                                 <ul className='project_items_hor'>
                                    {insrankProjects?.map(project => (
                                        <li key={project._id} className='project_items'>
                                            <ProjectItemsHorizon project={project} isRequestUser={true} />
                                        </li>
                                    ))}
                                </ul>,
                            ].map((item, idx) => <Fragment key={idx}>{item}</Fragment>)} 
                            id={"map_tab"}
                            className={"info_wrap tab_type3"} 
                            onClick={handleLoadTEst}
                        />
                    </div>

                   
                </div>
            </div>
        </Fragment>
       
    );
};

export default ProjectsList;
