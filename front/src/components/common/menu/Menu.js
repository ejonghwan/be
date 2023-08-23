import { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiChatCircleDotsDuotone, PiAlienDuotone, PiKeyDuotone, PiSunDuotone, PiSignOutDuotone, PiSignInDuotone, PiNoteDuotone, PiHeartDuotone, PiGameControllerDuotone, PiAtDuotone, PiMoonDuotone } from "react-icons/pi";
import { UserContext } from '../../../context/UserContext';
import LogoutForm from '../../user/LogoutForm';
import './Menu.css';
import Button from '../form/Button';

const Menu = () => {
    const [thema, setThema] = useState(false);
    const {state } = useContext(UserContext)
    const { name, email } = state.user;

    const handleThemaChange = type => {
        let html = document.querySelector('html');
        html.setAttribute('data-color', type)
        setThema(!thema)
        
    }

    return (
        <Fragment>
            <ul className='info_menu'>
                    <li className='name'>반가워요! <strong>{name}</strong> 님</li>
                    <li className='email'>{email}</li>
                </ul>
                <ul className='info_menu'>
                    <li><Link to="/profile" className='list'><PiAlienDuotone /><span>내 정보</span></Link></li>
                    <li><Link to="" className='list'><PiNoteDuotone /><span>내 글</span></Link></li>
                    <li><Link to="" className='list'><PiChatCircleDotsDuotone /><span>내 댓글</span></Link></li>
                    <li><Link to="/profile" className='list'><PiAtDuotone /><span>이메일 변경</span></Link></li>
                    <li><Link to="/changepassword" className='list'><PiKeyDuotone /><span>비밀번호 변경</span></Link></li>
                </ul>
                <ul className='info_menu'>
                    <li><Link to="" className='list'><PiGameControllerDuotone /><span>내 습관</span></Link></li>
                    <li><Link to="" className='list'><PiHeartDuotone /><span>좋아하는 습관</span></Link></li>
                    <li><Link to="" className='list'><PiSignInDuotone /><span>신청한 습관</span></Link></li>
                </ul>
                <ul className='info_menu'>
                    <li>
                        {thema ? (
                             <Button 
                                className={'button_type3 list'} 
                                onClick={() => handleThemaChange('light')}
                            ><PiSunDuotone /><span>밝은화면으로 보기</span></Button>
                        ) : (
                            <Button 
                                className={'button_type3 list'} 
                                onClick={() => handleThemaChange('dark')}
                            ><PiMoonDuotone /><span>어두운화면으로 보기</span></Button>
                        )}
                    </li>
                    <li>
                        <div className='list'>
                            <PiSignOutDuotone /><LogoutForm />
                        </div>
                    </li>
                </ul>
        </Fragment>
    );
};

export default Menu;