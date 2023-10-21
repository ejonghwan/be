import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PiChatCircleDotsDuotone, PiAlienDuotone, PiKeyDuotone, PiSignOutDuotone, PiSignInDuotone, PiNoteDuotone, PiHeartDuotone, PiAtDuotone, PiStackDuotone, PiFilePlus, PiBookOpenTextDuotone } from "react-icons/pi";
import { UserContext } from '../../../context/UserContext';
import { useGlobalState } from '../../../context/UiContext';
import LogoutForm from '../../user/LogoutForm';
import DarkMode from '../darkMode/DarkMode';
import './Menu.css';


const Menu = () => {
    const {state } = useContext(UserContext);
    const { name, email, id } = state.user;    
    const { menuOpen } = useGlobalState();

    return (
        <div id="menu" className={`menu_type_small ${menuOpen && 'on'}`}>
            
            <ul className='info_menu'>
                <li className='name'><strong>{name}</strong> 님 <span className='id'> - {id}</span></li>
                <li className='email'>{email}</li>
            </ul>
            <ul className='info_menu'>
                <li>
                    <Link to="/profile" className='list'>
                        <PiAlienDuotone />
                        <span>내 정보</span>
                    </Link>
                </li>
                <li>
                    <Link to="/write/mylist" className='list'>
                        <PiNoteDuotone />
                        <span>내 글</span>
                    </Link>
                </li>
                <li>
                    <Link to="/comments/mylist" className='list'>
                        <PiChatCircleDotsDuotone />
                        <span>내 댓글</span>
                    </Link>
                </li>
                <li>
                    <Link to="/profile" className='list'>
                        <PiAtDuotone />
                        <span>이메일 변경</span>
                    </Link>
                </li>
                <li>
                    <Link to="/changepassword" className='list'>
                        <PiKeyDuotone />
                        <span>비밀번호 변경</span>
                    </Link>
                </li>
            </ul>
            <ul className='info_menu'>
                <li>
                    <Link to="/project/myproject" className='list'>
                        <PiStackDuotone />
                        <span>내 습관</span>
                    </Link>
                </li>
                <li className='pc_none'>
                    <Link to="/project/list/likes" className='list'>
                        <PiBookOpenTextDuotone />
                        <span>습관 목록</span>
                    </Link>
                </li>
                <li className='pc_none'>
                    <Link to="/project/create" className='list'>
                        <PiFilePlus />
                        <span>습관 만들기</span>
                    </Link>
                </li>
                <li>
                    <Link to="/project/mylike" className='list'>
                        <PiHeartDuotone />
                        <span>좋아하는 습관</span>
                    </Link>
                </li>
                <li>
                    <Link to="/project/myapply" className='list'>
                        <PiSignInDuotone />
                        <span>신청/초대 현황</span>
                    </Link>
                </li>
            </ul>
            <ul className='info_menu'>
                <li>
                    <DarkMode />
                </li>
                <li>
                    <div className='list logout'>
                        <PiSignOutDuotone /><LogoutForm />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Menu;