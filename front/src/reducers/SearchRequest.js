import { useContext } from 'react'
import { SearchContext } from '../context/SearchContext';
import axios from 'axios'


const host = process.env.REACT_APP_BACKEND_HOST;

const SearchRequest = () => {
    const { SearchDispatch } = useContext(SearchContext); 

    // 유저 검색
     const userSearch = async userName => {
        try {
            if(!userName || typeof userName !== 'string') throw new Error('넘어온 이름값이 잘못되었습니다');
            let encodeName = encodeURIComponent(userName);
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            }
            const res = await axios.get(`${host}/api/search/user/${encodeName}`, config);
            SearchDispatch({ type: "USER_SEARCH_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            SearchDispatch({ type: "USER_SEARCH_FAILUE", data: err.response.data.message });
        }
    }

    // 습관 검색
     const projectSearch = async searchText => {
        try {
            if(!searchText || typeof searchText !== 'string') throw new Error('넘어온 검색값이 잘못되었습니다');
            let encodeName = encodeURIComponent(searchText);
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            }
            const res = await axios.get(`${host}/api/search/project/${encodeName}`, config);
            SearchDispatch({ type: "PROJECT_SEARCH_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            SearchDispatch({ type: "PROJECT_SEARCH_FAILUE", data: err.response.data.message });
        }
    }

    // 연관 검색
     const projectRelationSearch = async searchText => {
        try {
            if(!searchText || typeof searchText !== 'string') throw new Error('넘어온 검색값이 잘못되었습니다');
            let encodeName = encodeURIComponent(searchText);
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
            const res = await axios.get(`${host}/api/search/project/relation/${encodeName}`, config);
            SearchDispatch({ type: "PROJECT_SEARCH_RELATION_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            SearchDispatch({ type: "PROJECT_SEARCH_RELATION_FAILUE", data: err.response.data.message });
        }
    }


    
    // 이전 검색어 로드
    const recentSearch = async (userId) => {
        try {
            if(!userId || typeof userId !== 'string') throw new Error('넘어온 userId값이 잘못되었습니다');
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            }
            const res = await axios.get(`${host}/api/search/recent/load/${userId}`, config);
            SearchDispatch({ type: "RECENT_SEARCH_LOAD_SUCCESS", data: res.data.prevSearch });

        } catch(err) {
            console.error(err);
            SearchDispatch({ type: "RECENT_SEARCH_LOAD_FAILUE", data: err.response.data.message });
        }
    }

       // 이전 검색어 추가
       const recentSearchAdd = async data => {
        try {
            const { userId, searchText } = data;
            if(!userId || typeof userId !== 'string') throw new Error('넘어온 userId값이 잘못되었습니다');
            if(!searchText || typeof searchText !== 'string') throw new Error('넘어온 searchText값이 잘못되었습니다');
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            }
            let encodeName = encodeURIComponent(searchText);
            const res = await axios.patch(`${host}/api/search/recent/add/${userId}/${encodeName}`, {}, config);
            SearchDispatch({ type: "RECENT_SEARCH_ADD_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            SearchDispatch({ type: "RECENT_SEARCH_ADD_FAILUE", data: err.response.data.message });
        }
    }

      // 이전 검색어 삭제
      const recentSearchdelete = async data => {
        try {
            const { userId, searchText } = data;
            if(!userId || typeof userId !== 'string') throw new Error('넘어온 userId값이 잘못되었습니다');
            if(!searchText || typeof searchText !== 'string') throw new Error('넘어온 searchText값이 잘못되었습니다');
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            }
            let encodeName = encodeURIComponent(searchText);
            const res = await axios.patch(`${host}/api/search/recent/delete/${userId}/${encodeName}`, {}, config);
            SearchDispatch({ type: "RECENT_SEARCH_DELETE_SUCCESS", data: res.data });

        } catch(err) {
            console.error(err);
            SearchDispatch({ type: "RECENT_SEARCH_DELETE_FAILUE", data: err.response.data.message });
        }
    }






    return {
        userSearch, 
        projectSearch,
        recentSearch,
        recentSearchAdd,
        recentSearchdelete,
        projectRelationSearch
    }
}

export default SearchRequest;














