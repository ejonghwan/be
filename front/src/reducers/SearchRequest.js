import { useContext } from 'react'
import { UserContext } from '../context/UserContext.js'
import axios from 'axios'


const host = process.env.REACT_APP_BACKEND_HOST;

const SearchRequest = () => {
    const { dispatch } = useContext(UserContext); 

   // 유저 검색
     const userSearch = async data => {
        try {
            const { email } = data;
            if(!email || typeof email !== 'string') throw new Error('checked email');
        
            const config = {
                headers: { "Content-Type": "application/json", },
                withCredentials: true,
            }
            const res = await axios.post(`${host}/api/auth`, data, config);
            return res;
        } catch(err) {
            console.error(err);
            dispatch({ type: "AUTH_NUMBER_FAILUE", data: err.response.data.message });
            return err.response;
        }
    }



    return {
        userSearch, 
    }
}

export default SearchRequest;














