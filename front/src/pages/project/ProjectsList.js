import { Fragment, useContext, useEffect, useState, useRef } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { useParams } from 'react-router-dom';
import ProjectRequest from "../../reducers/ProjectRequest";
import ProjectItemsHorizon from "../../components/project/ProjectItemsHorizon";
import Button from '../../components/common/form/Button';
import Tab from "../../components/common/tab/Tab";
import useIntersect from '../../components/common/hooks/useIntersect';
import useIntersectionObserver from "../../components/common/hooks/useIntersectionObserver";


const ProjectsList = ({ page }) => {
    const { tabName } = useParams();
    const [ tabIdx, setTabIdx ] = useState(() => tabName === 'likes' ? 0 : 1);
    const {  ProjectState, ProjectState: { rankProjects = [], insrankProjects = [], rankMaxCount, insrankMaxCount }, ProjectDispatch  } = useContext(ProjectContext)
    const { loadRankProject, loadinstanceRankProject } = ProjectRequest();
    const pageN = useRef(1);
    const testRef = useRef(null)

    const [testState, setTestState] = useState(false)


    const handleLoadLikeRank = () => {
        ProjectDispatch({ type: "PROJECT_RANK_LOAD_REQUEST" });
        loadRankProject({ pageNum: pageN.current, limitNum: 20 });
        setTabIdx(1)
    }

    const handleLoadInsUser = () => {
        ProjectDispatch({ type: "PROJECT_INSRANK_LOAD_REQUEST" });
        loadinstanceRankProject({ pageNum: pageN.current, limitNum: 20 });
        setTabIdx(0)
    }

   
    const handleChangeTabValue = (curTabIdx) => {
        if(curTabIdx === 0 && rankProjects.length <= 0) handleLoadLikeRank();
        if(curTabIdx === 1 && insrankProjects.length <= 0) handleLoadInsUser();
    }



    // const [_, setRef] = useIntersect(async(entry, observer) => {
        
    //     // setTest(true)
    //     observer.unobserve(entry.target);
    //     // await loadRankProject({ pageNum: pageN.current, limitNum: 20 });
    //     pageN.current++
    //     console.log(pageN.current)
    //     // setTest(false)
    //     observer.observe(entry.target);
    //   }, {});

    
   
    const [bottom, setBottom] = useState(null);
	const bottomObserver = useRef(null);
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					const { page, totalElement, limit } = params.pageData;
					if (totalElement < limit * (page - 1)) {
						return;
					}
					params.getProductList({ page: page + 1 });
				}
			},
			{ threshold: 0.25, rootMargin: '80px' },
		);
		bottomObserver.current = observer;
	}, []);

	useEffect(() => {
		const observer = bottomObserver.current;
		if (bottom) {
			observer.observe(bottom);
		}
		return () => {
			if (bottom) {
				observer.unobserve(bottom);
			}
		};
	}, [bottom]);



    useEffect(() => {
        if(tabName === 'likes') handleLoadLikeRank();
        if(tabName === 'attend') handleLoadInsUser();
    }, [])

    return (
        <Fragment>
            <div className='b_conts h2_title_wrap'>
                <h2 className='gap_0'>{page}</h2>
            </div>
            <div className='b_conts full bg_gray project_list' style={{ minHeight: '5000px' }}>
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
               
                {/* {test && <div ref={setRef}> loddddddddddddddddddddddddddddddddd</div>} */}
                {/* { <div ref={setRef}> lod</div>} */}
                {/* {ProjectState.loadLankProjectsLoading && <div ref={setRef}>asdadasdas</div>} */}
                {/* {testState && <div ref={setRef}>asdadasdas</div>} */}
                <div ref={setBottom}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
            </div>

            
        </Fragment>
       
    );
};

export default ProjectsList;
