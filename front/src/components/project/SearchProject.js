import { Fragment, useContext, useState, useCallback, memo } from 'react';
import Search from '../common/form/Search';
import { PiSmileyXEyesDuotone, PiMagnifyingGlassDuotone  } from "react-icons/pi";
import SearchRequest from '../../reducers/SearchRequest';
import { UserContext } from '../../context/UserContext';
import { SearchContext } from '../../context/SearchContext';
import _debounce from 'lodash.debounce';
import { ProjectContext } from '../../context/ProjectContext';
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import Spinners from '../common/spinners/Spinners';
import NoData from '../common/notData/NoData';
import './SearchProject.css';
import { Link } from 'react-router-dom';



const SearchProject = () => {
    const { projectSearch } = SearchRequest();
    const { state } = useContext(UserContext);
    const { SearchState, SearchDispatch } = useContext(SearchContext);
    const { ProjectState, ProjectState: { project } } = useContext(ProjectContext);

    const [searchValue, setSearchValue] = useState(''); // 인풋값
    const [isSearchResult, setIsSearchResult] = useState(false)
    // const [submitData, setSubmitData] = useState({ 
    //     joinUser: [],
    // });



    // 검색 관련 이벤트a
    const handleSearchCange = e => {
        setSearchValue(e.target.value)
        handleSearchProjects(e.target.value) 
        //그리고 useCallback 안에서는 state를 구독하지 않기 때문에 변화 값을 인자로 넘겨줘야함 
    }

    // 검색
    const handleSearchProjects = useCallback(_debounce(async (searchText) => {
        try {
            if(searchText === '') return setIsSearchResult(false);
            SearchDispatch({ type: "PROJECT_SEARCH_REQUEST" })
            await projectSearch(searchText);
          } catch(err) {
            console.err(err)
          }
        setIsSearchResult(true)
    }, 500), [])

     // 엑스버튼
     const handleResetSearchValue = () => {
        setSearchValue('');
        setIsSearchResult(false);
     };
    
  
    return (
        <Fragment>
            {/* PiClockCountdownDuotone */}
            <Search 
                id={'search'}
                type={"text"}
                placeholder={"다른 습관을 검색해보세요."}
                isLabel={true}
                isButton={false} 
                value={searchValue}
                buttonType={"button"}
                isSearchResult={isSearchResult}
                onChange={handleSearchCange}
                handleInputReset={handleResetSearchValue}
            >
                {SearchState.searchProjectsLoading ? (
                    <Fragment>
                        <Spinners />
                    </Fragment>
                ) : (
                    <Fragment>
                         <ul className='search_result_wrap'>
                            {SearchState.projectSearch?.map((project, idx) => (
                                <li className='search_result_item'>
                                    <Link to="/search/result/total" className='link'>
                                        <span className='icon'><PiMagnifyingGlassDuotone /></span>
                                        <p className='title word_ellip_1'>
                                            {project.title.slice(0, project.title?.match(searchValue)?.index)}<strong className='search_value'>{searchValue}</strong>{project.title?.slice(searchValue.length + project.title?.match(searchValue)?.index)}
                                            
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Fragment>
                )}
                 {/* 검색 결과가 없는 경우 */}
                 {!SearchState.searchProjectsLoading && SearchState.projectSearch.length === 0 && <NoData icon={<PiSmileyXEyesDuotone />} title={"관련 내용이 없습니다."}/>}
            </Search>
            {/* <div className='category_wrap gapt_10'>
                <Tags tags={joinUserList?.map(user => user.name)} isLink={false} handleDelete={handleJoinUserDelete} contentName={"친구"} isNoData={false}/>
            </div> */}
            {SearchState.searchProjectsError && (
                <ErrorMsg className={'error_type1 align_c gapt_30'}>
                    {SearchState.searchProjectsError}
                </ErrorMsg>
            )}
        </Fragment>
    );
};

export default memo(SearchProject);