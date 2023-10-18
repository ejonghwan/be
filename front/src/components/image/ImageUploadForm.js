import React, { useState, useContext } from 'react';
import _debounce from 'lodash.debounce';
import { UserContext } from '../../context/UserContext.js';
import useImageRequest from '../../reducers/ImageRequest.js';
import { statusCode } from '../../utils/utils.js';
import { HiOutlineFolderOpen, HiMiniArrowPath } from "react-icons/hi2";
import Button from '../common/form/Button.js';
import './ImageUploadForm.css';



const ImageUploadForm = ({ noneSubmitBtn, path, setUploadState }) => {
    // noneSubmitBtn 있으면 서브밋버튼 숨김
    const { imageUpload } = useImageRequest();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("파일 선택");
    // const [persent, setPersent] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    // const [imageSubmitState, setImageSubmitState] = useState(false);
    // const { imageState, imageDispatch } = useContext(ImageContext);
    const { state } = useContext(UserContext);

    const handleInputChange = e => {
        const imageData = e.target.files[0];
        if(imageData.size > 1024 * 1024 * 5) {
            return alert(`1MB 이하 파일만 등록할 수 있습니다.\n\n 지금 파일 용량 : ${(Math.round(imageData.size / 1024 / 1024 * 100) / 100)}MB`);
        }
        setFile(imageData);
        setFileName(imageData.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageData);
        fileReader.onload = e => setImageUrl(e.target.result);
    };


    // 이미지 프로필에 등록 되는거까진 테스트함. 이거 적용 테스트해봐야됨
    // 이미지 업로드 리퀘스트 디바운스 적용 
    const handleImageUploadSubmit = e => {
        e.preventDefault();
        handleImageUpload();
    };

    const handleImageUpload = _debounce(async() => {
        try {
            const number = await imageUpload({
                file: file, 
                name: state.user.name, 
                _id: state.user._id, 
                public: true, 
                path: path, 
            }); 

            if(statusCode(number.status, 2)) {
                // setImageSubmitState(true); //성공 시
                setUploadState(true);
                alert('변경이 완료 되었습니다!');
                return;
            };
        } catch(err) {
            console.error(err);
        };
    }, 1000);


    return (
        <form onSubmit={handleImageUploadSubmit}>
            <div className='profile_img_wrap'>
                {imageUrl && <img src={imageUrl} alt="변경될 이미지"/>}
                
                {/* {persent} */}
                {/* <ProgressBar persent={persent} /> */}
                <div className={'image_dropBox'}>
                    <div className='profile_text'>
                        <HiOutlineFolderOpen /><br />
                        {fileName}
                    </div>
                    <input id="image" type="file" accept='image/png, image/jpg, image/*' onChange={handleInputChange}/>
                </div>
            </div>
            {!noneSubmitBtn && imageUrl && (
                    <div className='profile_btn left'>
                    <Button className={'button_type4'} >
                        <span className='blind'>이미지 변경</span>
                        <HiMiniArrowPath />
                    </Button>
                </div>
                )}
        </form>
    )
}

export default ImageUploadForm;