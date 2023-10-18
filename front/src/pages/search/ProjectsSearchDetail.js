import { Fragment, useContext, useEffect, useState } from 'react';
import SearchRequest from '../../reducers/SearchRequest';
import { PiFolderDashedDuotone } from "react-icons/pi";
import { SearchContext } from '../../context/SearchContext';
import { Link, useParams } from 'react-router-dom';
import CompleteMsg from '../../components/common/complete/CompleteMsg';
import ProjectItemsHorizon from '../../components/project/ProjectItemsHorizon';
import Pagenations from '../../components/common/pagenation/Pagenations';
import SkeletonSearchCard from '../../components/skeleton/SkeletonSearchCard';
import SkeletonItem from '../../components/skeleton/SkeletonItem';
import './ProjectsSearchDetail.css';

const ProjectsSearchDetail = ({ page }) => {

    const { projectSearch } = SearchRequest();
    const { SearchState, SearchState: { projectSearchData, searchAllLength }, SearchDispatch } = useContext(SearchContext);
    const { searchValue } = useParams();
    const [ pageNum, setPageNum ] = useState(1);

    useEffect(() => {
        SearchDispatch({ type: "PROJECT_SEARCH_REQUEST" })
        projectSearch({ searchText: searchValue, pageNum })
        // console.log('페이징 변경될때 검색', projectSearchData, searchAllLength)
        
    }, [pageNum])

    useEffect(() => {
        SearchDispatch({ type: "PROJECT_SEARCH_REQUEST" })
        projectSearch({ searchText: searchValue, pageNum })
        // console.log('첫로딩 검색', projectSearchData, searchAllLength);
    }, [searchValue])

    /*
        통합검색은 페이지네이션으로 적용. 이유는 사용자가 전에 검색했던 데이터를 대략적으로 몇페이지에 있는지 알 수 있게 하기 위해..
        내 댓글 같은 정보는 무한 스크롤로 적용.
    */

    return (
        <div>
            <div className='b_conts'>
                <h2 className='gap_0'>{page}</h2>      
            </div>


            <div className='b_conts full bg_gray'>
                <div className='b_conts pd_0'>
                    {SearchState.searchProjectsLoading ? (
                        <div>
                            <SkeletonItem style={{ maxWidth: "150px", height: "10px", borderRadius: "4px"  }} className='gap_10' />
                            <SkeletonItem style={{ maxWidth: "100px", height: "10px", borderRadius: "4px"  }} className='gap_20' />
                            <ul className='project_items_hor'>
                                {new Array(10).fill(null).map((_, idx) => <li key={idx} className='project_items'><SkeletonSearchCard /></li>)}
                            </ul>
                        </div>
                        ) : (
                            <Fragment>
                                <p className='gap_5'><strong className='point_color1'>{searchValue}</strong>에 대한 결과</p>
                                <p className='gap_20'>총 <strong className='point_color1'>{searchAllLength}</strong> 건</p>
                                <ul className='project_items_hor'>
                                    {projectSearchData.map(project => (
                                        <li key={project._id} className='project_items'>
                                            <ProjectItemsHorizon project={project} isRequestUser={true}/>
                                        </li>
                                    ))}
                                </ul>
                                {projectSearchData.length === 0 && (
                                        <div className='align_c'>
                                        <CompleteMsg 
                                            icon={<PiFolderDashedDuotone />}
                                            title={`${searchValue}에 대한 내용이 없습니다.`}
                                            subText={'다른 검색어로 검색해보세요.'}
                                        />
                                    </div>
                                )}
                                

                                <div className='gapt_30'>
                                    <Pagenations allLength={searchAllLength} pageNum={pageNum} setPageNum={setPageNum} />
                                </div>
                            </Fragment>
                        
                        )}
            
                </div>
            </div>
        </div>
    );
};

export default ProjectsSearchDetail;