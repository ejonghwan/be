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
            // SearchDispatch({ type: "USER_SEARCH_FAILUE", data: err.response.data.message });
        }
    }



    return {
        userSearch, 
    }
}

export default SearchRequest;














