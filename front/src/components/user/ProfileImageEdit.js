import React, { useState, useContext, useEffect, memo } from 'react'
import { HiOutlineCamera, HiOutlineXMark } from "react-icons/hi2";
import ImageUploadForm from '../image/ImageUploadForm.js' 
import { UserContext } from '../../context/UserContext.js';
import Button from '../common/form/Button.js';
import './ProfileImageEdit.css'
import NotProfileImg from './NotProfileImg.js';


const ProfileImageEdit = () => {
    const { state } = useContext(UserContext);
    const [profileEdit, setProfileEdit] = useState(false);
    const [uploadState, setUploadState] = useState(false);

    const handleProfileImageEdit = () => setProfileEdit(!profileEdit)
    useEffect(() => {
        if(uploadState) { setProfileEdit(!profileEdit) }
    }, [state, uploadState])
    

    return (
        <div className='gap_50'>
            {profileEdit ? (
                <div className='profile_wrap'>
                    <div className='profile_img_wrap'>
                        {state.user.profileImage.key ? (
                            <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${state.user?.profileImage?.key}`} className="profileImage" alt="내 프로필 이미지" />
                        ) : (
                            <NotProfileImg style={{ fontSize: "4rem" }} firstString={state.user?.profileImage?.firstString} userBgColor={state.user?.profileImage?.bg} />
                        )} 
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
                        {state.user.profileImage.key ? (
                            <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${state.user?.profileImage.key}`} className="profileImage" alt="내 프로필 이미지" />
                        ): (
                            <NotProfileImg style={{ fontSize: "4rem" }} firstString={state.user?.profileImage?.firstString} userBgColor={state.user?.profileImage?.bg}/>
                        )} 
                    </div>
                   <div className='profile_btn'>
                        <Button className={'button_type4'} onClick={handleProfileImageEdit} >
                            <span className='blind'>내 프로필 이미지 변경하기</span>
                            <HiOutlineCamera />
                        </Button>
                   </div>
                </div>
            )}
        </div>
    )
}


export default memo(ProfileImageEdit);