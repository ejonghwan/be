import React, { Fragment, useState, useContext, useEffect } from 'react'

// components
import ImageUploadForm from '../image/ImageUploadForm.js' 


// request && context
import UserRequest from '../../reducers/UserRequest.js';
import { UserContext } from '../../context/UserContext.js';


const ProfileImageEdit = props => {


    const { state, dispatch } = useContext(UserContext)
    const [profileEdit, setProfileEdit] = useState(false);



    const handleProfileImageEdit = e => {
        
    }

    useEffect(() => {
        console.log(state)
    }, [state])
    

    return (
        <Fragment>
            프로필 이미지: <br />
            {profileEdit ? (
                <ImageUploadForm noneSubmitBtn={false} path={"userProfile"}/>
            ) : (
                <div>profile img</div>
            )}
            <button onClick={handleProfileImageEdit}>프로필 이미지 설정</button>
        </Fragment>
    )
}


export default ProfileImageEdit;