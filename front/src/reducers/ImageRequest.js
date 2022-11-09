import { useContext } from 'react'
import axios from 'axios'
import { ImageContext } from '../context/ImageContext.js'
import { UserContext } from '../context/UserContext.js'



const host = process.env.REACT_APP_BACKEND_HOST

// console.log('??????????????????????????', process.env.NODE_ENV) //이거 development
// 오 리액트는 env 안깔아도 환경 되어있음 


const useImageRequest = () => {
    const { imageState, imageDispatch } = useContext(ImageContext); 
    const { state, dispatch } = useContext(UserContext);  // user꺼는 너무 많아서 그냥 기본으로 ...


    const imageUpload = async data => {
        try {
            const { file, name, _id, imgPublic, path } = data;

            const formData = new FormData();
            formData.append('image', file) //form data에 배열로 담김
            formData.append('name', name) 
            formData.append('_id', _id) 
            formData.append('public', imgPublic) 
            console.log('front form: ', data)
            if(!formData) return;

            
            const image = await axios.post(`${host}/api/images/${encodeURIComponent(path)}/${_id}`, formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    'X-access-token': localStorage.getItem('X-access-token'),
                },
                withCredentials: true,
                onUploadProgress: ProgressEvent => {
                    // console.log(ProgressEvent)
                    // setPersent( Math.round(100 * ProgressEvent.loaded / ProgressEvent.total) )
                    setTimeout(() => {
                        // setPersent(0)
                        // setFileName(defaultFileName)
                    }, 3000)
                }
            })

            // image data는 image model 설계한대로 다 옴
            if(path === "userProfile") dispatch({ type: "USER_PROFILEIMAGE_EDIT_SUCCESS", data: { _id: image.data._id, key: image.data.key } });
            // if(path === "project") {}
            // if(path === "write") {}
            
            return image;
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

export default useImageRequest;




