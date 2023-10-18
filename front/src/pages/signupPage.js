import Auth from '../components/user/Auth';

const signupPage = ({ page }) => {
    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            <div className='form_wrap'>
                <Auth />
            </div>
        </div>
    );
};

export default signupPage;