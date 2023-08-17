import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
// import { LuArchiveRestore } from "react-icons/lu";
import { HiMiniArrowRightOnRectangle, HiOutlineUser, HiOutlineDocumentText, HiOutlineChatBubbleOvalLeftEllipsis, HiOutlineArrowsRightLeft,HiOutlineLockClosed, HiOutlineSquare3Stack3D, HiOutlineKey, HiOutlineHandThumbUp, HiMiniArrowLeftOnRectangle, HiOutlineSun, HiOutlineAtSymbol } from "react-icons/hi2";
import { UserContext } from '../../../context/UserContext';
import LogoutForm from '../../user/LogoutForm';
import './Menu.css';

const Menu = () => {

    const {state, dispatch} = useContext(UserContext)
    const { name, profileImage, email } = state.user;

    return (
        <Fragment>
            <ul className='popup_userinfo'>
                    <li className='name'>반가워요! <strong>{name}</strong> 님</li>
                    <li className='email'>{email}</li>
                </ul>
                <ul className='popup_userinfo'>
                    <li><Link to="" className='list'><HiOutlineUser /><span>내 정보</span></Link></li>
                    <li><Link to="" className='list'><HiOutlineDocumentText /><span>내 글</span></Link></li>
                    <li><Link to="" className='list'><HiOutlineChatBubbleOvalLeftEllipsis /><span>내 댓글</span></Link></li>
                    <li><Link to="" className='list'><HiOutlineAtSymbol /><span>이메일 변경</span></Link></li>
                    <li><Link to="" className='list'><HiOutlineKey /><span>비밀번호 변경</span></Link></li>
                </ul>
                <ul className='popup_userinfo'>
                    <li><Link to="" className='list'><HiOutlineSquare3Stack3D /><span>내 습관</span></Link></li>
                    <li><Link to="" className='list'><HiOutlineHandThumbUp /><span>좋아하는 습관</span></Link></li>
                    <li><Link to="" className='list'><HiMiniArrowLeftOnRectangle /><span>신청한 습관</span></Link></li>
                </ul>
                <ul className='popup_userinfo'>
                    <li><Link to="" className='list'><HiOutlineSun /><span>테마</span></Link></li>
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