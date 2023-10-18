import { Fragment, useRef, useState } from 'react';
import { changeViewDate } from '../../../utils/utils';
import Button from '../form/Button';
import Popup from '../popup/Popup';
import NotProfileImg from '../../user/NotProfileImg';
import './UserThum.css';


const UserThumItem = ({ users = [], className = '', isText, /*isButton = false, buttonName buttonType, onClick*/ buttons = [], align = 'horizon', imgStyle, isId = true}) => {

    const [selectIdx, setSelectIdx] = useState(0);
    const userInfoRef = useRef(null);
    
    const handleIndex = idx => {
        setSelectIdx(idx);
        userInfoRef.current.popupOpen();
    };

    return (
        <Fragment>
            <ul className={`user_thum_wrap ${className} ${align}`}>
                {users.map((user, idx) => (
                    <li key={user._id._id}>
                        <div className="user_thum_imgwrap" style={imgStyle}>
                            {user._id.profileImage?.key ? (
                                <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${user._id.profileImage?.key}`} alt="유저 프로필 이미지" />
                            ) : (
                                <NotProfileImg firstString={user._id.profileImage?.firstString} userBgColor={user._id.profileImage?.bg} />
                            )}
                        </div>
                        {isText && (
                            <div className='user_thum_txtwrap'>
                                <Button type={'button'} className={'button_reset hover_type3'} onClick={() => handleIndex(idx)}>
                                    {isId && <span className='user_thum_id'>{user._id.id}</span>}
                                    <span className='user_thum_name'>{user._id.name} 님</span>
                                </Button>
                            </div>
                        )}

                        {/* {isButton. && <Button className={`button_type_txt ${className}`} buttonType={buttonType} onClick={onClick}>{buttonName}</Button>} */}
                        {buttons.length > 0 && (
                            <div className='user_button_wrap' data-userid={user._id._id}>
                                {buttons.map((item, idx) => (
                                    <Fragment key={idx}>{item}</Fragment>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <Popup className={`popup_type_default profile_${selectIdx}`} isHead={true} title={`${users[selectIdx]._id.name}님 회원정보`} closeClick={() => userInfoRef.current.popupClose()} dimd={true} idx={selectIdx} ref={userInfoRef}>
                <div className="user_thum_imgwrap pop_user">
                    {users[selectIdx]?._id.profileImage?.key ? (
                        <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${users[selectIdx]._id.profileImage?.key}`} alt="유저 프로필 이미지" />
                    ) : (
                        <NotProfileImg firstString={users[selectIdx]._id.profileImage?.firstString} userBgColor={users[selectIdx]._id.profileImage?.bg} />
                    )}
                </div>
                <div className='user_thum_txtwrap'>
                    <span className='user_thum_name'>{users[selectIdx]._id.name} 님</span>
                    <span className='user_thum_id'>{users[selectIdx]._id.id}</span>
                    <span className='user_thum_email'>{users[selectIdx]._id.email}</span>
                    <span className='user_thum_createdat'>가입일 {changeViewDate(users[selectIdx]._id.createdAt, 'day')}</span>
                </div>
            </Popup>

        </Fragment>
    );
};

export default UserThumItem;