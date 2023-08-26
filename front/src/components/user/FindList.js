import { Link } from 'react-router-dom';
import { PiKeyDuotone, PiMagnifyingGlassDuotone, PiUserCirclePlusDuotone } from "react-icons/pi";
import './FindList.css';

const FindList = () => {
    return (
        <ul className='find_wrap'>
            <li><PiMagnifyingGlassDuotone /><Link to="/findid" className='hover_type1'>아이디 찾기</Link></li>
            <li><PiKeyDuotone /><Link to="/findpassword" className='hover_type1'>비밀번호 찾기</Link></li>
            <li><PiUserCirclePlusDuotone /><Link to="/signuppage" className='hover_type1'>회원가입</Link></li>
        </ul>
    );
};

export default FindList;