import React, { useState, useContext } from 'react';
import _debounce from 'lodash.debounce';
import ProgressBar from '../progress/ProgressBar.js';
import { ImageContext } from '../../context/ImageContext.js';
import { UserContext } from '../../context/UserContext.js';
import useImageRequest from '../../reducers/ImageRequest.js';
import { statusCode } from '../../utils/utils.js';
import './ImageUploadForm.css';



const ImageUploadForm = ({ noneSubmitBtn, path, setUploadState }) => {
    // noneSubmitBtn 있으면 서브밋버튼 숨김
    const { imageUpload } = useImageRequest();
    const defaultFileName = '이미지 삽입'
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("이미지파일 업로드 해주세요");
    const [persent, setPersent] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [formDatas, setFormDatas] = useState(null);
    
    const [imageSubmitState, setImageSubmitState] = useState(false);
    
    const { imageState, imageDispatch } = useContext(ImageContext);
    const { state } = useContext(UserContext);



    const handleInputChange = e => {
        const imageData = e.target.files[0];
        setFile(imageData);
        setFileName(imageData.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageData);
        fileReader.onload = e => setImageUrl(e.target.result);
    }


    const handleSubmit = async e => {
        // e.preventDefault();
        // const formData = new FormData();
        // formData.append('image', file) //form data에 배열로 담김
        // formData.append('name', state.user.name) 
        // formData.append('_id', state.user._id) 
        // formData.append('public', true) 

        // console.log('front form: ', formData)

        // if(!formData) return;
        // try {
        //     /*  
        //         http://localhost:5000/api/images/${path}
        //         userProfile 
        //         write 
        //         project
        //         프론트에서 쿼리스트링으로 path + id 넘김 
        //     */
        //     const res = await axios.post(`http://localhost:5000/api/images/${encodeURIComponent("userProfile")}/634dfa1fc8d04dace20755e7`, formData, {
        //         headers: { 
        //             "Content-Type": "multipart/form-data",
        //             'X-access-token': localStorage.getItem('X-access-token'),
        //         },
        //         withCredentials: true,
        //         onUploadProgress: ProgressEvent => {
        //             // console.log(ProgressEvent)
        //             setPersent( Math.round(100 * ProgressEvent.loaded / ProgressEvent.total) )
        //             setTimeout(() => {
        //                 setPersent(0)
        //                 setFileName(defaultFileName)
        //             }, 3000)
        //         }
        //     })
        //     imageDispatch({ type: "IMAGE_UPLOAD_REQUEST", data: res.data })
        //     toast.success('t')
        // } catch (err) {
        //     toast.error(err.message)
        //     console.error(err)
        // }
    }



    // 이미지 프로필에 등록 되는거까진 테스트함. 이거 적용 테스트해봐야됨
    // 이미지 업로드 리퀘스트 디바운스 적용 
    const handleImageUploadSubmit = e => {
        e.preventDefault();
        handleImageUpload();
    }

    const handleImageUpload = _debounce(async() => {
        try {
            const number = await imageUpload({
                file: file, 
                name: state.user.name, 
                _id: state.user._id, 
                public: true, 
                path: path, 
            }); 
            console.log('i f number: ', number)

            if(statusCode(number.status, 2)) {
                setImageSubmitState(true) //성공 시
                setUploadState(true)
                return;
            } 
        } catch(err) {
            console.error(err)
        }
    }, 1000)


    return (
        <div>
            <form onSubmit={handleImageUploadSubmit}>
            {/* <form onSubmit={handleSubmit}> */}
                <img src={imageUrl} style={{width: "200px"}} alt="변경될 이미지"/>
                {/* <label htmlFor='image' >{fileName}</label> */}
                {persent}
                <ProgressBar persent={persent} />
                <div className={'imageDropBox'}>
                    {fileName}
                    <input id="image" type="file" accept='image/png, image/jpg, image/*' onChange={handleInputChange}/>
                </div>
                {!noneSubmitBtn && <button type='submit'>submit</button>}
            </form>
        </div>
    )
}

export default ImageUploadForm;