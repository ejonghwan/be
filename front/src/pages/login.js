import { Link } from 'react-router-dom';
import LoginForm from '../components/user/LoginForm';
import { HiOutlineKey, HiOutlineUserPlus, HiMiniMagnifyingGlass } from "react-icons/hi2";
import './login.css';

const login = ({ page }) => {
    return (
        <div>
            <h2>{page}</h2>
            <LoginForm />
            <ul className='find_wrap'>
                <li><HiMiniMagnifyingGlass /><Link to="/findid" className='hover_type1'>아이디 찾기</Link></li>
                <li><HiOutlineKey /><Link to="/findpassword" className='hover_type1'>비밀번호 찾기</Link></li>
                <li><HiOutlineUserPlus /><Link to="/signup" className='hover_type1'>회원가입</Link></li>
            </ul>
        </div>
    );
};

export default login;