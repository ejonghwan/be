import './signupPage.css'
import Auth from '../components/user/Auth';
import Title from '../components/common/title/Title'

const signupPage = ({ page }) => {
    return (
        <div>
            <h2>{page}</h2>
            <div className='signup_page'>
                <Auth />
            </div>
        </div>
    );
};

export default signupPage;