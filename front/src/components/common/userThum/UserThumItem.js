import { Fragment } from 'react';
import Button from '../form/Button';
import PopupButton from '../popup/PopupButton';
import Popup from '../popup/Popup';
import { useGlobalState } from '../../../context/UiContext';
import './UserThum.css';

const UserThumItem = ({ users = [], className = '', isText, isButton = false, buttonName, buttonType, onClick, align = 'horizon' }) => {
    // console.log(users)

    const { popOpen } = useGlobalState();
    
    return (
        <Fragment>
            <ul className={`user_thum_wrap ${className} ${align}`}>
                {users.map(user => (
                    <li key={user._id._id}>
                        <div className="user_thum_imgwrap">
                            <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${user._id.profileImage.key}`} alt="유저 프로필 이미지" />
                        </div>
                        {isText && (
                            <div className='user_thum_txtwrap'>
                                <PopupButton className={'profile'} matched={'profile'} data={user._id}>
                                    <span className='user_thum_id'>{user._id.id}</span>
                                    <span className='user_thum_name'>{user._id.name} 님</span>
                                </PopupButton>
                            </div>
                        )}
                        {isButton && <Button className={`button_type_txt ${className}`} buttonType={buttonType} onClick={onClick}>{buttonName}</Button>}
                    </li>
                ))}
            </ul>
            <Popup className={'popup_type_small profile'}>
                asdasd
                {console.log(popOpen.data)}
                <div className="user_thum_imgwrap">
                    <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${popOpen.data?.profileImage.key}`} alt="유저 프로필 이미지" />
                </div>
                <div className='user_thum_txtwrap'>
                 <span className='user_thum_id'>{popOpen.data?.email}</span>
                    <span className='user_thum_id'>{popOpen.data?.id}</span>
                    <span className='user_thum_name'>{popOpen.data?.name} 님</span>
                </div>
                
            </Popup>
        </Fragment>
    );
};

export default UserThumItem;