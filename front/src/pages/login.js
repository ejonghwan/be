import FindList from '../components/user/FindList';
import LoginForm from '../components/user/LoginForm';
import './login.css';

const login = ({ page }) => {
    return (
        <div>
            <h2>{page}</h2>
            <LoginForm />
            <FindList />
        </div>
    );
};

export default login;