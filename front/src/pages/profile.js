import UserProfile from '../components/user/UserProfile.js';
import Secession from '../components/user/Secession.js';

const Profile = ({ page }) => {
    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            <UserProfile />
            <Secession />
        </div>
    );
};

export default Profile;
