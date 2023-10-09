import { Fragment, useContext, useState, useCallback, memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import _debounce from 'lodash.debounce';
import Search from '../common/form/Search';
import { PiSmileyXEyesDuotone, PiMagnifyingGlassDuotone  } from "react-icons/pi";
import SearchRequest from '../../reducers/SearchRequest';
import { UserContext } from '../../context/UserContext';
import { SearchContext } from '../../context/SearchContext';
import { ProjectContext } from '../../context/ProjectContext';
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import Spinners from '../common/spinners/Spinners';
import NoData from '../common/notData/NoData';
import SearchRecent from './SearchRecent';
import './SearchProject.css';



const SearchProject = ({ searchProjectRef }) => {
    const { projectSearch, recentSearchAdd } = SearchRequest();
    const { state } = useContext(UserContext);
    const { SearchState, SearchState: { recentText }, SearchDispatch } = useContext(SearchContext);
    const { ProjectState, ProjectState: { project } } = useContext(ProjectContext);
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState(''); // 인풋값
    const [isSearchResult, setIsSearchResult] = useState(false);


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

    // 검색
    const handleSearchSubmit = () => {
        if(!state.isLogged) return;
        searchProjectRef.current.popupClose()
        navigate(`/search/result/total/${searchValue}`)
        let searchTextmatched = false;
        for(let i = 0; i < recentText.length; i++) {
            if(recentText[i] === searchValue) searchTextmatched = true;
        };

        if(!searchTextmatched) {
            SearchDispatch({ type: "RECENT_SEARCH_ADD_REQUEST" })
            recentSearchAdd({ userId: state.user._id, searchText: searchValue })
        }
    }

  
    return (
        <Fragment>
            {/* PiClockCountdownDuotone */}
            <Search 
                id={'search'}
                type={"text"}
                placeholder={"다른 습관을 검색해보세요."}
                isLabel={true}
                value={searchValue}
                isSearchResult={isSearchResult}
                onChange={handleSearchCange}
                handleInputReset={handleResetSearchValue}
                isButton={true} 
                buttonType={"button"}
                buttonClick={handleSearchSubmit}
                buttonIcon={<PiMagnifyingGlassDuotone />}
            >
                {SearchState.searchProjectsLoading ? (
                    <Fragment>
                        <Spinners />
                    </Fragment>
                ) : (
                    <Fragment>
                         <ul className='search_result_wrap'>
                            {SearchState.projectSearch?.map((project, idx) => (
                                <li className='search_result_item' key={idx}>
                                    <Link to={`/search/result/total/${searchValue}`} className='link' onClick={() => searchProjectRef.current.popupClose()}>
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
            {SearchState.searchProjectsError && (
                <ErrorMsg className={'error_type1 align_c gapt_30'}>
                    {SearchState.searchProjectsError}
                </ErrorMsg>
            )}

           {/* 최근 검색어 */}
           {state.isLogged && !isSearchResult && <SearchRecent searchProjectRef={searchProjectRef} />}
        </Fragment>
    );
};

export default memo(SearchProject);