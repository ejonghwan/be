
import { Fragment, useRef, useState } from 'react';
import { changeViewDate } from '../../utils/utils';
import Button from '../common/form/Button';
import Popup from '../common/popup/Popup';
import { timeForToday } from '../../utils/utils';
import './CommentUserThum.css';



const CommentUserThum = ({ users = [], className = '', isText, content, buttons = [], align = 'horizon', imgStyle, isId = true, comment}) => {
    
    const [selectIdx, setSelectIdx] = useState(0)
    const userInfoRef = useRef(null);
    
    const handleIndex = idx => {
        setSelectIdx(idx);
        userInfoRef.current.popupOpen();
    }

    return (
        <Fragment>
            <article className={`comment_user_thum_wrap ${className} ${align}`}>
                {users.map((user, idx) => (
                    <div className='comment_user_thum_inner' key={user._id._id}>
                        <div className="user_thum_imgwrap" style={imgStyle}>
                            <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${user._id.profileImage.key}`} alt="유저 프로필 이미지" />
                        </div>
                        {isText && (
                            <div className='user_thum_txtwrap'>
                                <div className='info'>
                                    <Button type={'button'} className={'button_reset hover_type3'} onClick={() => handleIndex(idx)}>
                                        {isId && <span className='user_thum_id'>{user._id.id}</span>}
                                        <span className='user_thum_name'>{user._id.name}</span>
                                    </Button>
                                    <span className='created_at'>{timeForToday(comment.createdAt)}</span>
                                    <span className='is_update'>(수정됨)</span>
                                </div>
                                <div className='cont word_ellip_2'>
                                    {content}
                                </div>
                            </div>
                        )}

                        {buttons.length > 0 && (
                            <div className='user_button_wrap' data-userid={user._id._id}>
                                {buttons.map((item, idx) => (
                                    <Fragment key={idx}>{item}</Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </article>

            <Popup className={`popup_type_default profile_${selectIdx}`} isHead={true} title={`${users[selectIdx]._id.name}님 회원정보`} closeClick={() => userInfoRef.current.popupClose()} dimd={true} idx={selectIdx} ref={userInfoRef}>
                <div className="user_thum_imgwrap">
                    <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${users[selectIdx]._id.profileImage.key}`} alt="유저 프로필 이미지" />
                </div>
                <div className='user_thum_txtwrap'>
                    <span className='user_thum_name'>{users[selectIdx]._id.name} 님</span>
                    <span className='user_thum_id'>{users[selectIdx]._id.id}</span>
                    <span className='user_thum_email'>{users[selectIdx]._id.email}</span>
                    <span className='user_thum_createdat'>가입일 {changeViewDate(users[selectIdx]._id.createdAt, 'hour')}</span>
                </div>
            </Popup>

        </Fragment>
    );
};


export default CommentUserThum;

