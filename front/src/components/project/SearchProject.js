import { Fragment, useContext, useState, useCallback, memo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import _debounce from 'lodash.debounce';
import Search from '../common/form/Search';
import { PiSmileyXEyesDuotone, PiMagnifyingGlassDuotone, PiArrowSquareInDuotone  } from "react-icons/pi";
import SearchRequest from '../../reducers/SearchRequest';
import { UserContext } from '../../context/UserContext';
import { SearchContext } from '../../context/SearchContext';
import { ProjectContext } from '../../context/ProjectContext';
import ErrorMsg from '../common/errorMsg/ErrorMsg';
import Spinners from '../common/spinners/Spinners';
import NoData from '../common/notData/NoData';
import SearchRecent from './SearchRecent';
import Button from '../common/form/Button';
import './SearchProject.css';



const SearchProject = ({ searchProjectRef }) => {
    const { projectRelationSearch, recentSearchAdd, recentSearchdelete } = SearchRequest();
    const { state } = useContext(UserContext);
    const { SearchState, SearchState: { recentText }, SearchDispatch } = useContext(SearchContext);
    const { ProjectState, ProjectState: { project } } = useContext(ProjectContext);
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState(''); // 인풋값
    const [isSearchResult, setIsSearchResult] = useState(false);
    const SearchValueRef = useRef('');


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
            SearchDispatch({ type: "PROJECT_SEARCH_RELATION_REQUEST" })
            await projectRelationSearch(searchText);
            SearchValueRef.current = searchText;
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
    const handleSearchSubmit = async (_, resentValue) => { // jsx에서 넘길 때 첫번째 인자는 event임. 주의
        if(!state.isLogged) return;
        let isResentValue = resentValue || searchValue; // 연관 검색어를 클릭하면 인자값을 적용. 아니면 인풋값을 적용 
        let searchTextmatched = false;
        SearchValueRef.current = isResentValue;

        for(let i = 0; i < recentText.length; i++) {
            if(recentText[i] === isResentValue) searchTextmatched = true;
        };

        if(searchTextmatched) { // 같은게 있다면 기존 검색어는 remove 후 다시 추가. 동기적으로 
            SearchDispatch({ type: "RECENT_SEARCH_DELETE_REQUEST" })
            await recentSearchdelete({ userId: state.user._id, searchText: isResentValue })
        };

        SearchDispatch({ type: "RECENT_SEARCH_ADD_REQUEST" });
        await recentSearchAdd({ userId: state.user._id, searchText: isResentValue });

        searchProjectRef.current.popupClose();
        navigate(`/search/result/total/${isResentValue}`);
    };

    const handleSearchTextChange = (title) => {
        setSearchValue(title)
    } 

    const handleSearchKeyUp = e => {
        if(e.key === 'Enter') {
            handleSearchSubmit();
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
                onKeyUp={handleSearchKeyUp}
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
                            {SearchState.relationSearch?.map((project, idx) => (
                                <li className='search_result_item' key={idx}>
                                    <Link 
                                        to={`/search/result/total/${project.title}`} 
                                        className='link' 
                                        onClick={e => handleSearchSubmit(e, project.title)}
                                    >
                                        <span className='icon'><PiMagnifyingGlassDuotone /></span>
                                        {/* <p className='title word_ellip_1'>
                                            {project.title.slice(0, project.title?.match(searchValue)?.index)}<strong className='search_value'>{searchValue}</strong>{project.title?.slice(searchValue.length + project.title?.match(searchValue)?.index)}
                                        </p> */}
                                        <p className='title word_ellip_1'>
                                            {project.title.slice(0, project.title?.match(SearchValueRef.current)?.index)}<strong className='search_value'>{SearchValueRef.current}</strong>{project.title?.slice(SearchValueRef.current.length + project.title?.match(SearchValueRef.current)?.index)}
                                        </p>
                                    </Link>
                                    <Button className="button_reset hover_type1" onClick={() => handleSearchTextChange(project.title)}>
                                        <span className='icon search_txt'><PiArrowSquareInDuotone /></span>
                                        <span className='blind'>이 검색어 검색창으로 이동</span>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </Fragment>
                )}
                 {/* 검색 결과가 없는 경우 */}
                 {!SearchState.searchProjectsRelationLoading && SearchState.relationSearch.length === 0 && <NoData icon={<PiSmileyXEyesDuotone />} title={"관련 내용이 없습니다."}/>}
            </Search>
            {SearchState.searchProjectsRelationError && (
                <ErrorMsg className={'error_type1 align_c gapt_30'}>
                    {SearchState.searchProjectsRelationError}
                </ErrorMsg>
            )}

           {/* 최근 검색어 */}
           {state.isLogged && !isSearchResult && <SearchRecent handleSearchSubmit={handleSearchSubmit}/>}
        </Fragment>
    );
};

export default memo(SearchProject);