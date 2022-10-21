import { useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext.js'



const host = 'http://localhost:5000'


const UserRequest = () => {
    const { dispatch } = useContext(UserContext); 


    const imageRequest = async data => {
        try {
            const { formData } = data;
            const image = await axios.post(`${host}/api/images/userProfile/id`, formData, {
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
            // dispatch({ type: ""});
            return image;
        } catch(err) {
            console.error(err);
            dispatch({ type: "AUTH_NUMBER_FAILUE", data: err.response.data.message })
            return err.response;
        }
      
    }
 



    return {
        imageRequest,
    }
}

export default UserRequest;




