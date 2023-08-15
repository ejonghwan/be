import './signupPage.css'
import Auth from '../components/user/Auth';
import Title from '../components/common/title/Title'

const signupPage = () => {
    return (
        <div className='signup_page'>
            <Title className={'title_type1'}>회원가입</Title>
            <p className='gap_30'>회원가입을 하시려면 메일을 보내주세요 </p>
            <Auth />
        </div>
    );
};

export default signupPage;