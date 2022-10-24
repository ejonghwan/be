import { useContext } from 'react'
import axios from 'axios'
import { ImageContext } from '../context/ImageContext.js'



const host = 'http://localhost:5000'


const useImageRequest = () => {
    const { dispatch } = useContext(ImageContext); 


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

            // dispatch({ type: "" });
            // dispatch({ type: "" });
            return image;
        } catch(err) {
            console.error(err);
            dispatch({ type: "AUTH_NUMBER_FAILUE", data: err.response.data.message })
            return err.response;
        }

    }
 



    return {
        imageUpload,
    }
}

export default useImageRequest;




