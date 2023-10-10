import { useContext, useEffect } from 'react';
import SearchRequest from '../../reducers/SearchRequest';
import { PiFolderDashedDuotone } from "react-icons/pi";
import './ProjectsSearchDetail.css';
import { SearchContext } from '../../context/SearchContext';
import { Link, useParams } from 'react-router-dom';
import CompleteMsg from '../../components/common/complete/CompleteMsg';
import ProjectItemsHorizon from '../../components/project/ProjectItemsHorizon';

const ProjectsSearchDetail = ({ page }) => {

    const { projectSearch } = SearchRequest();
    const { SearchState, SearchState: { projectSearchData }, SearchDispatch } = useContext(SearchContext);
    const { searchValue } = useParams();

    useEffect(() => {
        SearchDispatch({ type: "PROJECT_SEARCH_REQUEST" })
        projectSearch(searchValue)
        console.log(projectSearchData)
        
    }, [])

    /*
        통합검색은 페이지네이션으로 적용. 이유는 사용자가 전에 검색했던 데이터를 대략적으로 몇페이지에 있는지 알 수 있게 하기 위해..
        내 댓글 같은 정보는 무한 스크롤로 적용.
    */

    return (
        <div>
            <div className='b_conts'>
                <h2 className='gap_0'>{page}</h2>      
            </div>



            {SearchState.searchProjectsLoading ? (
                <div>
                    스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......
                </div>
            ) : (
                <div className='b_conts full bg_gray'>
                    <div className='b_conts pd_0'>
                        <p className='gap_20'><strong>{searchValue}</strong>에 대한 결과</p>
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
                                    title={'내가 좋아요한 습관이 없습니다.'}
                                    subText={'다른 습관을 좋아해보세요.'}
                                />
                                
                                <Link to="/project/list" className='button_type7 gapt_10'>다른 습관 보러가기</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default ProjectsSearchDetail;