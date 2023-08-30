import { Fragment, useRef, useState } from 'react';
import Button from '../form/Button';
import Popup from '../popup/Popup';
import { useGlobalState } from '../../../context/UiContext';
import './UserThum.css';


const UserThumItem = ({ users = [], className = '', isText, isButton = false, buttonName, buttonType, onClick, align = 'horizon', imgStyle}) => {
    // console.log(users)

    // const { popOpen } = useGlobalState();
    const [selectIdx, setSelectIdx] = useState(null)
    const popupRef = useRef(null);
    const popupRef2 = useRef(null);
    
    const handleIndex = idx => {
        setSelectIdx(idx)
        console.log(popupRef.current.open())
    }

    
    
    return (
        <Fragment>
            <ul className={`user_thum_wrap ${className} ${align}`}>
                {users.map((user, idx) => (
                    <li key={user._id._id}>
                        <div className="user_thum_imgwrap" style={imgStyle}>
                            <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${user._id.profileImage.key}`} alt="유저 프로필 이미지" />
                        </div>
                        {isText && (
                            <div className='user_thum_txtwrap'>
                                {idx}
                                {/* <PopupButton className={`profile_${idx}`} matched={`profile_${idx}`} data={{user: user._id, idx: idx}} onClick={() => handleIndex(idx)}> */}
                                <button type='button' onClick={() => handleIndex(idx)}>
                                    <span className='user_thum_id'>{user._id.id}</span>
                                    <span className='user_thum_name'>{user._id.name} 님</span>
                                </button>
                                {/* </PopupButton> */}
                            </div>
                        )}

                        {isButton && <Button className={`button_type_txt ${className}`} buttonType={buttonType} onClick={onClick}>{buttonName}</Button>}
                    </li>
                ))}
            </ul>

            
            <Popup className={`popup_type_default profile_${selectIdx}`} isHead={true} title={`${ 'asd' }님 회원정보`} closeClick={()=>console.log(null)} dimd={true} idx={selectIdx} ref={popupRef}>
          
                {selectIdx}
                {/* <div className="user_thum_imgwrap">
                    <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${popOpen.data?.user.profileImage.key}`} alt="유저 프로필 이미지" />
                </div>
                <div className='user_thum_txtwrap'>
                <span className='user_thum_id'>{popOpen.data?.user.email}</span>
                    <span className='user_thum_id'>{popOpen.data?.user.id}</span>
                    <span className='user_thum_name'>{popOpen.data?.user.name} 님</span>
                </div> */}
            </Popup>

            
           

               
        </Fragment>
    );
};

export default UserThumItem;