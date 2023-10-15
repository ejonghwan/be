import { Fragment, useContext, useEffect, useState, useRef } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { useParams } from 'react-router-dom';
import ProjectRequest from "../../reducers/ProjectRequest";
import ProjectItemsHorizon from "../../components/project/ProjectItemsHorizon";
import Button from '../../components/common/form/Button';
import Tab from "../../components/common/tab/Tab";
import useIntersect from '../../components/common/hooks/useIntersect';


const ProjectsList = ({ page }) => {
    const { tabName } = useParams();
    const pageN = useRef(1);
    const [ tabIdx, setTabIdx ] = useState(() => tabName === 'likes' ? 0 : 1);
    const {  ProjectState, ProjectState: { rankProjects = [], insrankProjects = [] }, ProjectDispatch  } = useContext(ProjectContext)
    const { loadRankProject, loadinstanceRankProject } = ProjectRequest();

    const handleLoadInsUser = () => {
        ProjectDispatch({ type: "PROJECT_INSRANK_LOAD_REQUEST" });
        loadinstanceRankProject({ pageNum: 1, limitNum: 20 });
        setTabIdx(0)
    }

    const handleLoadLikeRank = () => {
        ProjectDispatch({ type: "PROJECT_RANK_LOAD_REQUEST" });
        loadRankProject({ pageNum: 1, limitNum: 20 });
        setTabIdx(1)
    }

    const handleChangeTabValue = (curTabIdx) => {
        if(curTabIdx === 0 && rankProjects.length <= 0) handleLoadLikeRank();
        if(curTabIdx === 1 && insrankProjects.length <= 0) handleLoadInsUser();
    }

    const [_, setRef] = useIntersect(async(entry, observer) => {
        observer.unobserve(entry.target);
        console.log(pageN.current++)
        // loadRankProject({ pageNum: pageN.current++, limitNum: 20 });
        console.log('asd', entry)
        // await dispatch(getPageData(page.current++));
        // await dispatch(getDataFromApi(page.current, true));
        observer.observe(entry.target);
      }, {});

    useEffect(() => {
        if(tabName === 'likes') handleLoadLikeRank();
        if(tabName === 'attend') handleLoadInsUser();
    }, [])

    return (
        <Fragment>
            <div className='b_conts h2_title_wrap'>
                <h2 className='gap_0'>{page}</h2>
            </div>
            <div className='b_conts full bg_gray'>
                <div className='b_conts pd_0'>

                    <div>
                        <Tab 
                            tabHead={[<span>좋아요 순</span>, <span>참여인원 순</span>]} 
                            tabBody={[
                                <ul className='project_items_hor gapt_20'>
                                    {rankProjects?.map(project => (
                                        <li key={project._id} className='project_items'>
                                            <ProjectItemsHorizon project={project} isRequestUser={true} />
                                        </li>
                                    ))}
                                </ul>,
                                 <ul className='project_items_hor gapt_20'>
                                    {insrankProjects?.map(project => (
                                        <li key={project._id} className='project_items'>
                                            <ProjectItemsHorizon project={project} isRequestUser={true} />
                                        </li>
                                    ))}
                                </ul>,
                            ].map((item, idx) => <Fragment key={idx}>{item}</Fragment>)} 
                            id={"map_tab"}
                            className={"info_wrap tab_type1"} 
                            onClick={handleChangeTabValue}
                            initIdx={tabIdx}
                        />
                    </div>
                </div>
                {/* {(ProjectState.loadLankProjectsLoading || ProjectState.loadInsLankProjectsLoading) && <div ref={setRef}> lod</div>} */}
                { <div ref={setRef}> lod</div>}
            </div>

            
        </Fragment>
       
    );
};

export default ProjectsList;
