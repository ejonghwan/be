import HeadMetaTag from '../components/common/HeadMetaTag';
import FindList from '../components/user/FindList';
import LoginForm from '../components/user/LoginForm';
import './login.css';

const login = ({ page }) => {
    return (
        <div className='b_conts'>
            <h2>{page}</h2>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            <LoginForm />
            <FindList />
        </div>
    );
};

export default login;