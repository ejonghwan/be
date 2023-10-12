import { useContext, useEffect, useState } from 'react';
import SearchRequest from '../../reducers/SearchRequest';
import { PiFolderDashedDuotone } from "react-icons/pi";
import './TagSearchDetail.css';
import { SearchContext } from '../../context/SearchContext';
import { Link, useParams } from 'react-router-dom';
import CompleteMsg from '../../components/common/complete/CompleteMsg';
import ProjectItemsHorizon from '../../components/project/ProjectItemsHorizon';
import Pagenations from '../../components/common/pagenation/Pagenations';

const TagSearchDetail = ({ page }) => {

    const { tagSearch } = SearchRequest();
    const { SearchState, SearchState: { searchTagAllLength, categorySearch }, SearchDispatch } = useContext(SearchContext);
    const { tagValue } = useParams();
    const [ pageNum, setPageNum ] = useState(1);

    // useEffect(() => {
    //     tagSearch({ type: "PROJECT_SEARCH_REQUEST" })
    //     projectSearch({ categoryName: tagValue, pageNum })
    //     // console.log('페이징 변경될때 검색', projectSearchData, searchTagAllLength)
        
    // }, [pageNum])

    useEffect(() => {
        SearchDispatch({ type: "TAG_SEARCH_REQUEST" })
        tagSearch({ categoryName: tagValue, pageNum })
        // console.log('첫로딩 검색', projectSearchData, searchTagAllLength);
    }, [tagValue])

    /*
        통합검색은 페이지네이션으로 적용. 이유는 사용자가 전에 검색했던 데이터를 대략적으로 몇페이지에 있는지 알 수 있게 하기 위해..
        내 댓글 같은 정보는 무한 스크롤로 적용.
    */

    return (
        <div>
            <div className='b_conts'>
                <h2 className='gap_0'>{page}</h2>      
            </div>
            
            {SearchState.SearchTagLoading ? (
                <div>
                    스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......스켈레톤 로딩 .......
                </div>
            ) : (
                <div className='b_conts full bg_gray tag_search_detail'>
                    <div className='b_conts pd_0'>
                        <p className='gap_5'><strong className='point_color1'>{tagValue}</strong>에 대한 결과</p>
                        <p className='gap_20'>총 <strong className='point_color1'>{searchTagAllLength}</strong> 건</p>
                        <ul className='project_items_hor'>
                            {categorySearch.map(project => (
                                <li key={project._id} className='project_items'>
                                    <ProjectItemsHorizon project={project} isRequestUser={true} isTag={true}/>
                                </li>
                            ))}
                        </ul>
                        {categorySearch.length === 0 && (
                                <div className='align_c'>
                                <CompleteMsg 
                                    icon={<PiFolderDashedDuotone />}
                                    title={`${tagValue}에 대한 내용이 없습니다.`}
                                    subText={'다른 검색어로 검색해보세요.'}
                                />
                            </div>
                        )}
                    </div>

                    <div className='gapt_30'>
                        <Pagenations allLength={searchTagAllLength} pageNum={pageNum} setPageNum={setPageNum} />
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default TagSearchDetail;