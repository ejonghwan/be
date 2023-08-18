import { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMiniArrowRightOnRectangle, HiOutlineDocumentText, HiOutlineChatBubbleOvalLeftEllipsis, HiOutlineSquare3Stack3D, HiOutlineKey, HiOutlineHandThumbUp, HiMiniArrowLeftOnRectangle, HiOutlineSun, HiOutlineAtSymbol, HiOutlineMoon, HiOutlineUserCircle } from "react-icons/hi2";
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
                    <li><Link to="/profile" className='list'><HiOutlineUserCircle /><span>내 정보</span></Link></li>
                    <li><Link to="" className='list'><HiOutlineDocumentText /><span>내 글</span></Link></li>
                    <li><Link to="" className='list'><HiOutlineChatBubbleOvalLeftEllipsis /><span>내 댓글</span></Link></li>
                    <li><Link to="/profile" className='list'><HiOutlineAtSymbol /><span>이메일 변경</span></Link></li>
                    <li><Link to="/changepassword" className='list'><HiOutlineKey /><span>비밀번호 변경</span></Link></li>
                </ul>
                <ul className='info_menu'>
                    <li><Link to="" className='list'><HiOutlineSquare3Stack3D /><span>내 습관</span></Link></li>
                    <li><Link to="" className='list'><HiOutlineHandThumbUp /><span>좋아하는 습관</span></Link></li>
                    <li><Link to="" className='list'><HiMiniArrowLeftOnRectangle /><span>신청한 습관</span></Link></li>
                </ul>
                <ul className='info_menu'>
                    <li>
                        {thema ? (
                             <Button 
                                className={'button_type3 list'} 
                                onClick={() => handleThemaChange('light')}
                            ><HiOutlineSun /><span>밝은 테마</span></Button>
                        ) : (
                            <Button 
                                className={'button_type3 list'} 
                                onClick={() => handleThemaChange('dark')}
                            ><HiOutlineMoon /><span>어두운 테마</span></Button>
                        )}
                    </li>
                    <li>
                        <div className='list'>
                            <HiMiniArrowRightOnRectangle /><LogoutForm />
                        </div>
                    </li>
                </ul>
        </Fragment>
    );
};

export default Menu;