import { useContext } from 'react'
import axios from 'axios'
import { ImageContext } from '../context/ImageContext.js'
import { UserContext } from '../context/UserContext.js'
import { getWithExpire } from '../utils/utils.js'
import { WriteContext } from '../context/WriteContext.js'



const host = process.env.REACT_APP_BACKEND_HOST;

const useImageRequest = () => {
    const { imageState, imageDispatch } = useContext(ImageContext); 
    const { state, dispatch } = useContext(UserContext);  // user꺼는 너무 많아서 그냥 기본으로 ...
    const { WriteDispatch } = useContext(WriteContext);
    const accToken = getWithExpire('X-access-token');

    const imageUpload = async data => {
        try {
            const { file, name, _id, imgPublic, path } = data;
            const formData = new FormData();
            formData.append('image', file) //form data에 배열로 담김
            formData.append('name', name) 
            formData.append('_id', _id) 
            formData.append('public', imgPublic) 
            if(!formData) return new Error('form data 없음.');
            
            const image = await axios.post(`${host}/api/images/${encodeURIComponent(path)}/${_id}`, formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'X-access-token': accToken
                },
                withCredentials: true,
                // onUploadProgress: ProgressEvent => {
                    // setPersent( Math.round(100 * ProgressEvent.loaded / ProgressEvent.total) )
                    // setTimeout(() => {
                        // setPersent(0)
                        // setFileName(defaultFileName)
                    // }, 3000)
                // }
            })

            // image data는 image model 설계한대로 다 옴
            if(path === "userProfile") dispatch({ type: "USER_PROFILEIMAGE_EDIT_SUCCESS", data: { _id: image.data._id, key: image.data.key } });
            if(path === "write") WriteDispatch({ type: "WRITE_IMAGE_EDIT_SUCCESS", data: { _id: image.data._id, key: image.data.key } })
            
            return image;
        } catch(err) {
            console.error(err);
            dispatch({ type: "USER_PROFILEIMAGE_EDIT_FAILUE", data: err.response.message });
            return err.response;
        }

    }

    const imageDelete = async data => {
        try {
            const { fileName } = data;
        
            const image = await axios.delete(`${host}/api/images/${encodeURIComponent(fileName)}`, {
                headers: { 
                    "Content-Type": "application/json",
                    'X-access-token': accToken
                },
                withCredentials: true,
            })
            return image;
        } catch(err) {
            console.error(err);
            return err.response;
        }
    }




    return {
        imageUpload,
        imageDelete,
    }
}

export default useImageRequest;




