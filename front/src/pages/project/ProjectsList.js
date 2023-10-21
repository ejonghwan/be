import { Fragment, useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { useParams } from 'react-router-dom';
import { PiFileXDuotone } from "react-icons/pi";
import ProjectRequest from "../../reducers/ProjectRequest";
import ProjectItemsHorizon from "../../components/project/ProjectItemsHorizon";
import Button from '../../components/common/form/Button';
import Tab from "../../components/common/tab/Tab";
import NoData from "../../components/common/notData/NoData";
import Spinners from "../../components/common/spinners/Spinners";
import HeadMetaTag from "../../components/common/HeadMetaTag";


const ProjectsList = ({ page }) => {
    const { tabName } = useParams();
    const [ tabIdx, setTabIdx ] = useState(() => tabName === 'likes' ? 0 : 1);
    const {  ProjectState, ProjectState: { rankProjects = [], insrankProjects = []}, ProjectDispatch  } = useContext(ProjectContext)
    const { loadRankProject, loadinstanceRankProject } = ProjectRequest();
    const [ likeProjectPage, setLikeProjectPage ] = useState(1);
    const [ insUserProjectPage, setInsUserProjectPage ] = useState(1);
    const [ moreLikeBtnHide, setMoreLikeBtnHide ] = useState(false);
    const [ moreInsUserBtnHide, setMoreInsUserBtnHide ] = useState(false);


    // 좋아요 순
    const handleLoadLikeRank = async () => {
        ProjectDispatch({ type: "PROJECT_RANK_LOAD_REQUEST" });
        const res = await loadRankProject({ pageNum: likeProjectPage, limitNum: 20 });
        rankProjects.length >= (res.data.maxCount - 20) && setMoreLikeBtnHide(true);
        setTabIdx(1);
    };
    const handleLikeRankPageup = () => setLikeProjectPage(prev => prev += 1);



    // 참여유저 순
    const handleLoadInsUser = async () => {
        ProjectDispatch({ type: "PROJECT_INSRANK_LOAD_REQUEST" });
        const res = await loadinstanceRankProject({ pageNum: insUserProjectPage, limitNum: 20 });
        insrankProjects.length >= (res.data.maxCount - 20) && setMoreInsUserBtnHide(true);
        setTabIdx(0);
    };
    const handleInsUserRankPageup = () => setInsUserProjectPage(prev => prev += 1);

    

    // 탭을 눌렀을 때 데이터 요청
    const handleChangeTabValue = (curTabIdx) => {
        if(curTabIdx === 0 && rankProjects.length <= 0) handleLoadLikeRank();
        if(curTabIdx === 1 && insrankProjects.length <= 0) handleLoadInsUser();
    };

    // 더보기 눌렀을때
    useEffect(() => {
       if(likeProjectPage === 1) return;
       handleLoadLikeRank();
    }, [likeProjectPage]);

    useEffect(() => {
        if(insUserProjectPage === 1) return;
        handleLoadInsUser();
    }, [insUserProjectPage]);


    // params로 구분
    useEffect(() => {
        if(tabName === 'likes') handleLoadLikeRank();
        if(tabName === 'attend') handleLoadInsUser();
    }, []);

    useEffect(() => {
        return () => ProjectDispatch({ type: "RESET_PROJECTS" });    
    }, []);

    return (
        <Fragment>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            <div className='b_conts h2_title_wrap'>
                <h2 className='gap_0'>{page}</h2>
            </div>
            <div className='b_conts full bg_gray project_list h_100'>
                <div className='b_conts pd_0'>

                    <div className="project_list_wrap">
                        <Tab 
                            tabHead={[<span>좋아요 순</span>, <span>참여인원 순</span>]} 
                            tabBody={[
                                ProjectState.loadLankProjectsDone && (
                                    rankProjects.length === 0 ? (
                                       <Fragment>
                                           <NoData 
                                               icon={<PiFileXDuotone />}
                                               title={'습관이 하나도 없습니다'}
                                           />
                                       </Fragment>
                                   ) : (
                                       <Fragment>
                                            <ul className='project_items_hor gapt_20'>
                                                {rankProjects?.map((project, idx) => (
                                                    <li key={idx} className='project_items'>
                                                        <ProjectItemsHorizon project={project} isRequestUser={true} />
                                                    </li>
                                                ))}
                                            </ul>
                                           {moreLikeBtnHide ? (
                                               <div className='align_c gapt_50 gap_50'>더 이상 정보가 없습니다.</div>
                                           ) : (
                                               <div className='align_c gapt_20'>
                                                   {ProjectState.loadLankProjectsLoading ? (<Spinners />) : (
                                                       <Button className={'button_type_2 hover_type1 arrow_bottom button_more'} onClick={handleLikeRankPageup}>더보기</Button>
                                                   )}
                                               </div>
                                           )}
                                       </Fragment>
                                   )
                               ),
                               ProjectState.loadInsLankProjectsDone && (
                                    insrankProjects.length === 0 ? (
                                        <Fragment>
                                            <NoData 
                                                icon={<PiFileXDuotone />}
                                                title={'습관이 하나도 없습니다'}
                                            />
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <ul className='project_items_hor gapt_20'>
                                                {insrankProjects?.map((project, idx) => (
                                                    <li key={idx} className='project_items'>
                                                        <ProjectItemsHorizon project={project} isRequestUser={true} />
                                                    </li>
                                                ))}
                                            </ul>
                                            {moreInsUserBtnHide ? (
                                                <div className='align_c gapt_50 gap_50'>더 이상 정보가 없습니다.</div>
                                            ) : (
                                                <div className='align_c gapt_20'>
                                                    {ProjectState.loadInsLankProjectsLoading ? (<Spinners />) : (
                                                        <Button className={'button_type_2 hover_type1 arrow_bottom button_more'} onClick={handleInsUserRankPageup}>더보기</Button>
                                                    )}
                                                </div>
                                            )}
                                        </Fragment>
                                    )
                                ),
                            ].map((item, idx) => <Fragment key={idx}>{item}</Fragment>)} 
                            id={"map_tab"}
                            className={"info_wrap tab_type1"} 
                            onClick={handleChangeTabValue}
                            initIdx={tabIdx}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProjectsList;
