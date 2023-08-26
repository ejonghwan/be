import LoginForm from '../../components/user/LoginForm';
import FindList from '../../components/user/FindList';

const ProtectedPage = ({ page }) => {
    return (
        <div>
            <h2>{page}</h2>
            <p className='align_c gap_50'>{page} 페이지를 보시려면 로그인해주세요.</p>
            <LoginForm />
            <FindList />
        </div>
    );
};

export default ProtectedPage;