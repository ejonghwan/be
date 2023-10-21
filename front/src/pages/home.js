import { Fragment, useCallback, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { UserContext } from '../context/UserContext.js';
import ProjectItems from '../components/project/ProjectItems.js';
import { PiFolderNotchPlusDuotone } from "react-icons/pi";
import ProjectRequest from '../reducers/ProjectRequest.js';
import { ProjectContext } from '../context/ProjectContext.js';
import UserRequest from '../reducers/UserRequest.js';
import SkeletonItem from '../components/skeleton/SkeletonItem.js';
import SkeletonCard from '../components/skeleton/SkeletonCard.js';
import ProjectItemsSquare from '../components/project/ProjectItemsSquare.js';
import Button from '../components/common/form/Button.js';
import HeadMetaTag from '../components/common/HeadMetaTag.js';
import './home.css';



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
        ProjectDispatch({ type: "PROJECT_RANK_LOAD_REQUEST" });
        loadRankProject({ pageNum: 1, limitNum: 10 });
        ProjectDispatch({ type: "PROJECT_INSRANK_LOAD_REQUEST" });
        loadinstanceRankProject({ pageNum: 1, limitNum: 10 });
        return () => ProjectDispatch({ type: "RESET_PROJECTS_LIST" });
    }, []);


    


    return (
        <Fragment>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | 홈`} />
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

            <div className='b_conts likes_wrap'>
                <div className='h3_title_wrap gap_10'>
                    <h3 className='h3_title'>인기 습관</h3>
                    <Link to={'/project/list/likes'} className='more arrow_right'>더보기</Link>
                    <div className='project_items_btn likes mo_none'>
                        <Button type={'button'} className='button_type_arrow_l button_reset projectlikePrev hover_type2' >
                            <span className='blind'>이전 년도 보기</span>
                        </Button>
                        <Button type={'button'} className='button_type_arrow_r button_reset projectlikeNext hover_type2' >
                            <span className='blind'>다음 년도 보기</span>
                        </Button>
                    </div>
                </div> 
                <Swiper
                
                    // spaceBetween={50}
                    slidesPerView={2}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    modules={[Navigation, Pagination, Scrollbar, A11y ]}
                    navigation={{
                        prevEl: '.projectlikePrev',
                        nextEl: '.projectlikeNext',
                    }}
                    pagination={{
                        type: 'fraction',
                      }}
                    freeMode={true}
                    breakpoints={{
                        760: {
                            slidesPerView: 5
                        }
                    }}
                    // navigation={true}
                    >
                        {rankProjects?.map((project, idx) => (
                            <SwiperSlide className='project_items_square' key={idx} >
                                <div className='project_items'>
                                    <ProjectItemsSquare project={project} isRequestUser={true}  />
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>

            <div className='b_conts ins_wrap'>
                <div className='h3_title_wrap gap_10'>
                    <h3 className='h3_title'>인원 많은 습관</h3>
                    <Link to={'/project/list/attend'} className='more arrow_right'>더보기</Link>
                    <div className='project_items_btn ins mo_none'>
                        <Button type={'button'} className='button_type_arrow_l button_reset projectinsPrev hover_type2' >
                            <span className='blind'>이전 년도 보기</span>
                        </Button>
                        <Button type={'button'} className='button_type_arrow_r button_reset projectinsNext hover_type2' >
                            <span className='blind'>다음 년도 보기</span>
                        </Button>
                    </div>
                </div>
                <Swiper
                    // spaceBetween={50}
                    slidesPerView={2}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    navigation={{
                        prevEl: '.projectinsPrev',
                        nextEl: '.projectinsNext',
                    }}
                    freeMode={true}
                    breakpoints={{
                        760: {
                            slidesPerView: 5
                        }
                    }}
                    pagination={{
                        type: 'fraction',
                      }}
                    // navigation={true}
                    >
                        {insrankProjects?.map((project, idx) => (
                            <SwiperSlide className='project_items_square' key={idx} >
                                <div key={idx} className='project_items'>
                                    <ProjectItemsSquare project={project} isRequestUser={true}  />
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>

            </div>
        </Fragment>
     
            
          
    
    );
};

export default Home;
