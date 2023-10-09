import React, { useContext, useEffect } from 'react';
import { SearchContext } from '../../context/SearchContext';
import SearchRequest from '../../reducers/SearchRequest';
import { UserContext } from '../../context/UserContext';
import Spinners from '../common/spinners/Spinners';
import Button from '../common/form/Button';
import { PiClockCountdownThin, PiClockCountdownDuotone  } from "react-icons/pi";
import { Link } from 'react-router-dom';
import './SearchRecent.css';

const SearchRecent = ({ searchProjectRef }) => {

    const { state } = useContext(UserContext);
    const {SearchState, SearchState: { recentText }, SearchDispatch} = useContext(SearchContext);
    const { recentSearch, recentSearchdelete } = SearchRequest();
    const handleLoadRecentSearch = () => {
        SearchDispatch({ type: "RECENT_SEARCH_LOAD_REQUEST" })
        recentSearch(state.user._id);
    }   

    const handleDeleteRecentSearch = (searchText) => {
        SearchDispatch({ type: "RECENT_SEARCH_DELETE_REQUEST" })
        recentSearchdelete({ userId: state.user._id, searchText: searchText })
    }

    useEffect(() => {
        handleLoadRecentSearch();
    }, [])

    return (
        <article className='search_result recent'>
            <h3 className='blind'>최근 검색어</h3>
            {SearchState.recentSearchLoading ? (<Spinners />) : (
                 <ul className='search_result_wrap'>
                    {recentText.map((searchText, idx) => (
                        <li key={idx} className='search_result_item'>
                            <Link to={`/search/result/total/${searchText}`} className="link" onClick={() => searchProjectRef.current.popupClose()}>
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
           
        </article>
    );
};

export default SearchRecent;