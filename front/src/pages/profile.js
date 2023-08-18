import React from 'react';

// components
import UserProfile from '../components/user/UserProfile.js'
import UserPasswordEdit from '../components/user/UserPasswordEdit.js'
import FindId from '../components/user/FindId.js'
import FindPassword from '../components/user/FindPassword.js'
import FindIdQuestion from '../components/user/FindIdQuestion.js'
import Secession from '../components/user/Secession.js'


const Profile = ({ page }) => {
    return (
        <div>
            <h2>{page}</h2>
            <UserProfile />
            <UserPasswordEdit prevPasswordCheck={true}/>
            <Secession />
        </div>
    );
};

export default Profile;
