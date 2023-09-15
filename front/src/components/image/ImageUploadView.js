import React, { useState, useContext, useEffect } from 'react';
import _debounce from 'lodash.debounce';
import { UserContext } from '../../context/UserContext.js';
import { HiOutlineFolderOpen } from "react-icons/hi2";
import './ImageUploadView.css';


const ImageUploadView = ({ path, setImageData, className = '', initailImageSrc = null }) => {
    // const { imageUpload } = useImageRequest();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("파일 선택");
    const [imageUrl, setImageUrl] = useState(null);
    const { state } = useContext(UserContext);

    const handleInputChange = e => {
        const imageData = e.target.files[0];
        setFile(imageData);
        setFileName(imageData.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageData);
        fileReader.onload = e => setImageUrl(e.target.result);
    }

    useEffect(() => {
        setImageData({
            file: file, 
            name: state.user.name, 
            _id: state.user._id, 
            public: true, 
            path: path, 
        })
    }, [file])

    return (
        <div className={`image_upload_wrap pos_image ${className}`}>
            {initailImageSrc && <img src={initailImageSrc} alt="기존 이미지" className='init_img' />}
            {imageUrl && <img src={imageUrl} alt="변경될 이미지" className='edit_img' />}

            <div className={'image_dropBox'}>
                <div className='image_upload_text'>
                    <HiOutlineFolderOpen /><br />
                    {fileName}
                </div>
                <input id="image" type="file" accept='image/png, image/jpg, image/*' onChange={handleInputChange} />
            </div>
        </div>
    )
};

export default ImageUploadView;