import { Link } from 'react-router-dom';
import Button from '../../components/common/form/Button';
import LoginForm from '../../components/user/LoginForm';
import { HiOutlineKey, HiOutlineUserPlus, HiMiniMagnifyingGlass } from "react-icons/hi2";
import '../login.css';

const ProtectedPage = ({ page }) => {
    return (
        <div>
            <h2>{page}</h2>
            <p className='align_c gap_50'>{page} 페이지를 보시려면 로그인해주세요.</p>
            <LoginForm />
            <ul className='find_wrap'>
                <li><HiMiniMagnifyingGlass /><Link to="/findid" className='hover_type1'>아이디 찾기</Link></li>
                <li><HiOutlineKey /><Link to="/findpassword" className='hover_type1'>비밀번호 찾기</Link></li>
                <li><HiOutlineUserPlus /><Link to="/signup" className='hover_type1'>회원가입</Link></li>
            </ul>
        </div>
    );
};

export default ProtectedPage;