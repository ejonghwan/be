import HeadMetaTag from '../components/common/HeadMetaTag';
import Auth from '../components/user/Auth';

const signupPage = ({ page }) => {
    return (
        <div className='b_conts'>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            <h2>{page}</h2>
            <div className='form_wrap'>
                <Auth />
            </div>
        </div>
    );
};

export default signupPage;