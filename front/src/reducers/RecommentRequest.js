import { useContext } from 'react'
import axios from 'axios'
import { ImageContext } from '../context/ImageContext.js'
import { UserContext } from '../context/UserContext.js'
import { getWithExpire } from '../utils/utils.js'
import { WriteContext } from '../context/WriteContext.js'



const host = process.env.REACT_APP_BACKEND_HOST;

const RecommentRequest = () => {
    const { imageState, imageDispatch } = useContext(ImageContext); 
    const { state, dispatch } = useContext(UserContext);  // user꺼는 너무 많아서 그냥 기본으로 ...
    const { WriteDispatch } = useContext(WriteContext)
    const accToken = getWithExpire('X-access-token')

    const imageUpload = async data => {
        try {
        
        } catch(err) {
            console.error(err);
            dispatch({ type: "USER_PROFILEIMAGE_EDIT_FAILUE", data: err.response.message });
            return err.response;
        }

    }





    return {
        imageUpload,
    }
}

export default RecommentRequest;




