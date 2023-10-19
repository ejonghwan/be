import UserProfile from '../components/user/UserProfile.js';
import Secession from '../components/user/Secession.js';
import HeadMetaTag from '../components/common/HeadMetaTag.js';

const Profile = ({ page }) => {
    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            <UserProfile />
            <Secession />
        </div>
    );
};

export default Profile;
