import { Fragment, useContext } from 'react';
import { UserContext } from '../../context/UserContext.js'
import LazyImage from '../image/LazyImage.js'
import Button from '../common/form/Button.js';
import './LoginUserInfo.css';


const LoginUserInfo = () => {
    const {state, dispatch} = useContext(UserContext)
    const { name, profileImage } = state.user;
    console.log(state)

    return (
        <Fragment>
            <Button className={'button_type3'}>
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
            </Button>
        </Fragment>
    );
};

export default LoginUserInfo;