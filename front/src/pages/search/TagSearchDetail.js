import { Fragment, useContext, useEffect, useState } from 'react';
import SearchRequest from '../../reducers/SearchRequest';
import { PiFolderDashedDuotone } from "react-icons/pi";
import { SearchContext } from '../../context/SearchContext';
import { useParams } from 'react-router-dom';
import CompleteMsg from '../../components/common/complete/CompleteMsg';
import ProjectItemsHorizon from '../../components/project/ProjectItemsHorizon';
import Pagenations from '../../components/common/pagenation/Pagenations';
import SkeletonSearchCard from '../../components/skeleton/SkeletonSearchCard';
import SkeletonItem from '../../components/skeleton/SkeletonItem';
import './TagSearchDetail.css';
import HeadMetaTag from '../../components/common/HeadMetaTag';

const TagSearchDetail = ({ page }) => {

    const { tagSearch } = SearchRequest();
    const { SearchState, SearchState: { categorySearch }, SearchDispatch } = useContext(SearchContext);
    const { tagValue } = useParams();
    const [ pageNum, setPageNum ] = useState(1);

    useEffect(() => {
        SearchDispatch({ type: "TAG_SEARCH_REQUEST" });
        tagSearch({ categoryName: tagValue, pageNum });
        // console.log('첫로딩 검색', projectSearchData, searchTagAllLength);
    }, [tagValue]);

    /*
        통합검색은 페이지네이션으로 적용. 이유는 사용자가 전에 검색했던 데이터를 대략적으로 몇페이지에 있는지 알 수 있게 하기 위해..
        내 댓글 같은 정보는 무한 스크롤로 적용.
    */

    return (
        <div>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            <div className='b_conts'>
                <h2 className='gap_0'>{page}</h2>      
            </div>
            
            <div className='b_conts full bg_gray tag_search_detail'>
                <div className='b_conts pd_0'>
                    {SearchState.SearchTagLoading ? (
                        <div>
                            <SkeletonItem style={{ maxWidth: "150px", height: "10px", borderRadius: "4px"  }} className='gap_10' />
                            <SkeletonItem style={{ maxWidth: "100px", height: "10px", borderRadius: "4px"  }} className='gap_20' />
                            <ul className='project_items_hor'>
                                {new Array(10).fill(null).map((_, idx) => <li key={idx} className='project_items'><SkeletonSearchCard /></li>)}
                            </ul>
                        </div>
                    ) : (
                        <Fragment>
                            <p className='gap_5'><strong className='point_color1'>{tagValue}</strong>에 대한 결과</p>
                            <p className='gap_20'>총 <strong className='point_color1'>{categorySearch.length}</strong> 건</p>
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
                        
                            <div className='gapt_30'>
                                <Pagenations allLength={categorySearch.length} pageNum={pageNum} setPageNum={setPageNum} />
                            </div>
                    </Fragment>
                    )}
            
                </div>
            </div>
        </div>
    );
};

export default TagSearchDetail;