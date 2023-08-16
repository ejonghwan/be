import { Fragment, useContext } from 'react';
import { UserContext } from '../../context/UserContext.js'
import LazyImage from '../image/LazyImage.js';

import Popup from '../common/popup/Popup.js';
import PopupButton from '../common/popup/PopupButton.js';
import './LoginUserInfo.css';
import LogoutForm from './LogoutForm.js';


const LoginUserInfo = () => {
    const {state, dispatch} = useContext(UserContext)
    const { name, profileImage, email } = state.user;

    console.log('state?', state)

    return (
        <Fragment>
            
            <PopupButton>
                <ul className='user_profile_wrap'>
                    <li className='user_profile_name'><strong>{name}</strong> 님</li>
                    <li>
                        <div className='user_profile_img'>
                            <LazyImage 
                                webpSrc={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${profileImage.key}`}
                                imageSrc={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${profileImage.key}`}
                                alt={"유저 프로필 이미지"}
                                isSkeleton={true}
                            />
                        </div>
                    </li>
                </ul>
            </PopupButton>
            <Popup className={'popup_type_small'}>
                <ul className='popup_userinfo'>
                    <li><strong>{name}</strong> 님</li>
                    <li>{email}</li>
                    <li>내 정보</li>
                    <li>내 글</li>
                    <li>내 댓글</li>
                    <li>내 습관</li>
                    <li>좋아하는 습관</li>
                    <li>신청한 습관</li>
                    <li>테마</li>
                    <li>이메일 변경</li>
                    <li>비밀번호 변경</li>
                    <li><LogoutForm /></li>
                </ul>
            </Popup>
        </Fragment>
    );
};

export default LoginUserInfo;