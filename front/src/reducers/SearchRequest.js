import { useContext } from 'react'
import { UserContext } from '../context/UserContext.js'
import axios from 'axios'


const host = process.env.REACT_APP_BACKEND_HOST;

const SearchRequest = () => {
    const { dispatch } = useContext(UserContext); 

   // 유저 검색
     const userSearch = async userName => {
        try {
            console.log('userName?', userName)
            if(!userName || typeof userName !== 'string') throw new Error('넘어온 이름값이 잘못되었습니다');
            let encodeName = encodeURIComponent(userName);
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            }
            const res = await axios.get(`${host}/api/search/user/${encodeName}`, config);
            console.log('reqsut?', res);
            return res;
        } catch(err) {
            console.error(err);
            // dispatch({ type: "AUTH_NUMBER_FAILUE", data: err.response.data.message });
            // return err.response;
        }
    }



    return {
        userSearch, 
    }
}

export default SearchRequest;














