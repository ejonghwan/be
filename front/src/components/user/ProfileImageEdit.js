import React, { Fragment, useState, useContext, useEffect } from 'react'

// components
import ImageUploadForm from '../image/ImageUploadForm.js' 
import './ProfileImageEdit.css'


// request && context
import UserRequest from '../../reducers/UserRequest.js';
import { UserContext } from '../../context/UserContext.js';


const ProfileImageEdit = props => {
    const { state, dispatch } = useContext(UserContext);
    const [profileEdit, setProfileEdit] = useState(false);
    const [uploadState, setUploadState] = useState(false)

    const handleProfileImageEdit = e => {
        setProfileEdit(!profileEdit)
    }

    useEffect(() => {
        // console.log(state)
        // console.log('프로필 이미지 수정 컴포넌트? 업로드 상태', uploadState)
        if(uploadState) { setProfileEdit(!profileEdit) }
    }, [state, uploadState])
    

    return (
        <Fragment>
            <br /><br />
            프로필 이미지: <br />
            {profileEdit ? (
                <Fragment>
                    {state.user.profileImage && <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${state.user.profileImage.key}`} className="profileImage" />} 
                    <ImageUploadForm noneSubmitBtn={false} path={"userProfile"} setUploadState={setUploadState} />
                </Fragment>
            ) : (
                <div>
                    {state.user.profileImage && <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${state.user.profileImage.key}`} className="profileImage" />} 
                </div>
            )}
            <button onClick={handleProfileImageEdit}>
                {profileEdit ? "취소" : "프로필 이미지 설정"}
            </button>
            <br /><br />
        </Fragment>
    )
}


export default ProfileImageEdit;