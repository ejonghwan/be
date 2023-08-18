import React, { Fragment, useState, useContext, useEffect } from 'react'
import ImageUploadForm from '../image/ImageUploadForm.js' 
import './ProfileImageEdit.css'
import UserRequest from '../../reducers/UserRequest.js';
import { UserContext } from '../../context/UserContext.js';
import Button from '../common/form/Button.js';
import { HiOutlineCamera, HiOutlineXMark } from "react-icons/hi2";


const ProfileImageEdit = () => {
    const { state } = useContext(UserContext);
    const [profileEdit, setProfileEdit] = useState(false);
    const [uploadState, setUploadState] = useState(false);

    const handleProfileImageEdit = () => setProfileEdit(!profileEdit)
    useEffect(() => {
        if(uploadState) { setProfileEdit(!profileEdit) }
    }, [state, uploadState, profileEdit])
    

    return (
        <Fragment>
            {profileEdit ? (
                <div className='profile_wrap'>
                    <div className='profile_img_wrap'>
                        {state.user.profileImage && <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${state.user.profileImage.key}`} className="profileImage" alt="내 프로필 이미지" />} 
                    </div>
                    <div className='profile_btn'>
                        <Button className={'button_type4'} onClick={handleProfileImageEdit} >
                            <span className='blind'>내 프로필 이미지 변경취소</span>
                            <HiOutlineXMark />
                        </Button>
                    </div>
                    <ImageUploadForm noneSubmitBtn={false} path={"userProfile"} setUploadState={setUploadState} />
                </div>
            ) : (
                <div className='profile_wrap'>
                    <div className='profile_img_wrap'>
                        {state.user.profileImage && <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${state.user.profileImage.key}`} className="profileImage" alt="내 프로필 이미지" />} 
                    </div>
                   <div className='profile_btn'>
                        <Button className={'button_type4'} onClick={handleProfileImageEdit} >
                            <span className='blind'>내 프로필 이미지 변경하기</span>
                            <HiOutlineCamera />
                        </Button>
                   </div>
                </div>
            )}
        </Fragment>
    )
}


export default ProfileImageEdit;