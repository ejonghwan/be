import React, { useContext, useEffect } from 'react';
import { SearchContext } from '../../context/SearchContext';
import SearchRequest from '../../reducers/SearchRequest';
import { UserContext } from '../../context/UserContext';
import Spinners from '../common/spinners/Spinners';
import Button from '../common/form/Button';
import { PiClockCountdownDuotone  } from "react-icons/pi";
import { Link } from 'react-router-dom';
import './SearchRecent.css';

const SearchRecent = ({ handleSearchSubmit }) => {

    const { state } = useContext(UserContext);
    const { SearchState, SearchState: { recentText }, SearchDispatch } = useContext(SearchContext);
    const { recentSearch, recentSearchdelete, recentSearchDeleteAll } = SearchRequest();


    const handleLoadRecentSearch = () => {
        SearchDispatch({ type: "RECENT_SEARCH_LOAD_REQUEST" });
        recentSearch(state.user._id);
    };

    const handleDeleteRecentSearch = (searchText) => {
        SearchDispatch({ type: "RECENT_SEARCH_DELETE_REQUEST" });
        recentSearchdelete({ userId: state.user._id, searchText: searchText });
    };

    const handleRecentSearchDeleteAll = () => {
        SearchDispatch({ type: "RECENT_SEARCH_ALLDELETE_REQUEST" });
        recentSearchDeleteAll({ userId: state.user._id });
    };

    useEffect(() => handleLoadRecentSearch(), []);



    // jsx에서 onClick={(e) => handleSearchSubmit(e, searchText)}> 프롭으로 받은 함수는 event 객체가 첫번쨰 인자로 되어있음. 주의
    return (
        <article className='search_result recent'>
            <h3 className='blind'>최근 검색어</h3>
            {SearchState.recentSearchLoading ? (<Spinners />) : (
                 <ul className='search_result_wrap'>
                    {recentText.map((searchText, idx) => (
                        <li key={idx} className='search_result_item'>
                            <Link to={`/search/result/total/${searchText}`} className="link" onClick={(e) => handleSearchSubmit(e, searchText)}>
                                <span className='icon'><PiClockCountdownDuotone /></span>
                                <p className='title word_ellip_1'>{searchText}</p>
                            </Link>
                            <Button className="button_type_close hover_type1" onClick={() => handleDeleteRecentSearch(searchText)}>
                                <span className='blind'>이 검색어 삭제</span>
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
            {recentText.length > 0 && (
                <div className='delete_all_wrap'>
                    <Button className="button_reset hover_type1" onClick={handleRecentSearchDeleteAll}>
                        <span >전체삭제</span>
                    </Button>
                </div>
            )}
           
        </article>
    );
};

export default SearchRecent;