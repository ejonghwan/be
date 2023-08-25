import { Fragment, useContext } from 'react';
import { UserContext } from '../../context/UserContext.js'
import { PiCirclesFourDuotone, PiSquaresFourDuotone } from "react-icons/pi";
import LazyImage from '../image/LazyImage.js';
import Popup from '../common/popup/Popup.js';
import PopupButton from '../common/popup/PopupButton.js';
import { useGlobalState } from '../../context/UiContext.js';

import './LoginUserInfo.css';
import Menu from '../common/menu/Menu.js';


const LoginUserInfo = () => {
    const { state } = useContext(UserContext)
    const { name, profileImage } = state.user;
    const { popOpen } = useGlobalState();

    return (
        <Fragment>
            
            <PopupButton>
                <ul className='user_profile_wrap'>
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
                    <li className='user_profile_name'><strong>{name}</strong>님
                        <div className={`user_profile_icon ${popOpen ? 'on' : ''}`}><PiSquaresFourDuotone /></div>
                    </li>
                </ul>
            </PopupButton>
            <Popup className={'popup_type_small'}>
                <Menu />
            </Popup>
        </Fragment>
    );
};

export default LoginUserInfo;