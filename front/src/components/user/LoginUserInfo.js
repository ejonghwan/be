import { Fragment, useContext } from 'react';
import { UserContext } from '../../context/UserContext.js'
import { PiSquaresFourDuotone } from "react-icons/pi";
import LazyImage from '../image/LazyImage.js';
import MenuButton from '../common/popup/MenuButton.js';
import { useGlobalState } from '../../context/UiContext.js';
import Menu from '../common/menu/Menu.js';
import NotProfileImg from './NotProfileImg.js';
import './LoginUserInfo.css';


const LoginUserInfo = () => {
    const { state } = useContext(UserContext)
    const { name, profileImage } = state.user;
    const { menuOpen } = useGlobalState();

    return (
        <Fragment>
            <MenuButton className={'menu'}>
                <ul className='user_profile_wrap'>
                    <li>
                        <div className='user_profile_img'>
                            {profileImage.key ? (
                                 <LazyImage 
                                    webpSrc={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${profileImage.key}`}
                                    imageSrc={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${profileImage.key}`}
                                    alt={"유저 프로필 이미지"}
                                    isSkeleton={true}
                                />
                            ) : (
                                <NotProfileImg firstString={profileImage.firstString} userBgColor={profileImage.bg} />
                            )}
                        </div>
                    </li>
                    <li className='user_profile_name mo_none_flex'><strong>{name}</strong>님
                        <div className={`user_profile_icon ${menuOpen ? 'on' : ''}`}><PiSquaresFourDuotone /></div>
                    </li>
                </ul>
            </MenuButton> 
            <Menu />
        </Fragment>
    );
};

export default LoginUserInfo;