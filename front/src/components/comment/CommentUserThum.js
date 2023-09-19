
import { Fragment, useEffect, useRef, useState, memo } from 'react';
import { changeViewDate } from '../../utils/utils';
import Button from '../common/form/Button';
import Popup from '../common/popup/Popup';
import { PiDotsThreeOutlineVerticalDuotone, PiDotsThreeVerticalDuotone, PiPencilSimpleLineDuotone, PiXSquareDuotone  } from "react-icons/pi";
import { timeForToday, getByteLengthOfString } from '../../utils/utils';
import './CommentUserThum.css';



const CommentUserThum = ({ users = [], className = '', idx, buttons = [], align = 'horizon', imgStyle, isId = true, comment}) => {
    
    const [selectIdx, setSelectIdx] = useState(0);
    const [ellip, setEllip] = useState(false);
    const [briefly, setBriefly] = useState(false);
    const userInfoRef = useRef(null);
    const contentRef = useRef(null);
    const commentMoreRef = useRef(null);
    
    const handleIndex = idx => {
        setSelectIdx(idx);
        userInfoRef.current.popupOpen();
    }

    const contentHeightSplit = () =>{
        parseInt(window.getComputedStyle(contentRef.current).height) > 80 && setEllip(true);
    }

    const handleContentViewOpen = () => {
        setEllip(!ellip)
        setBriefly(!briefly)
    }

    const handleOpenCommentMore = () => {
        commentMoreRef.current.popupOpen();
    }

    useEffect(() => {
        contentHeightSplit();
    }, [])

    return (
        <Fragment>
            {console.log(comment)}
            <article className={`comment_user_thum_wrap ${className} ${align}`}>
               
                <div className='comment_user_thum_inner'>
                    <div className="user_thum_imgwrap" style={imgStyle}>
                        <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${comment.user._id.profileImage.key}`} alt="유저 프로필 이미지" />
                    </div>
                    
                    <div className='user_thum_txtwrap'>
                        <div className='info'>
                            <Button type={'button'} className={'button_reset hover_type3'} onClick={() => handleIndex(idx)}>
                                {isId && <span className='user_thum_id'>{comment.user._id.id}</span>}
                                <span className='user_thum_name'>{comment.user._id.name}</span>
                            </Button>
                            <span className='created_at'>{timeForToday(comment.createdAt)}</span>
                            {comment.createdAt !== comment.updatedAt && <span className='is_update'>(수정됨)</span>}
                        </div>
                        {/* word_ellip_2 */}
                        <div className={`cont ${ellip && 'word_ellip_2'}`} ref={contentRef}>
                            {comment.content}
                        </div>
                        {ellip && (
                            <div className='cont_detail'>
                                <Button className={'button_reset hover_type3'} onClick={handleContentViewOpen}>자세히 보기</Button>
                            </div>
                        )}
                            {briefly && (
                            <div className='cont_detail'>
                                <Button className={'button_reset hover_type3'} onClick={handleContentViewOpen}>간략히</Button>
                            </div>
                        )}
                    </div>
                 

                    <div className='user_thum_more'>
                        <Button type={'button'} className={'button_type3 ico_hover_type1'} onClick={handleOpenCommentMore}>
                            <PiDotsThreeOutlineVerticalDuotone />
                        </Button>
                    </div>
                    <Popup className={`popup_type_default comment_more`} isHead={false} dimd={true} ref={commentMoreRef}>
                        <Button className={'button_type3 ico_hover_type1'}>
                            <PiPencilSimpleLineDuotone />
                            <span>수정</span>
                        </Button>
                        <Button className={'button_type3 ico_hover_type1 delete'}>
                            <PiXSquareDuotone />
                            <span>삭제</span>
                        </Button>
                    </Popup>

                    {buttons.length > 0 && (
                        <div className='user_button_wrap' data-userid={comment.user._id._id}>
                            {buttons.map((item, idx) => (
                                <Fragment key={idx}>{item}</Fragment>
                            ))}
                        </div>
                    )}
                </div>
             
            </article>

            <Popup className={`popup_type_default profile_${selectIdx}`} isHead={true} title={`${comment.user._id.name}님 회원정보`} closeClick={() => userInfoRef.current.popupClose()} dimd={true} idx={selectIdx} ref={userInfoRef}>
                <div className="user_thum_imgwrap">
                    <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${comment.user._id.profileImage.key}`} alt="유저 프로필 이미지" />
                </div>
                <div className='user_thum_txtwrap'>
                    <span className='user_thum_name'>{comment.user._id.name} 님</span>
                    <span className='user_thum_id'>{comment.user._id.id}</span>
                    <span className='user_thum_email'>{comment.user._id.email}</span>
                    <span className='user_thum_createdat'>가입일 {changeViewDate(comment.user._id.createdAt, 'hour')}</span>
                </div>
            </Popup>

        </Fragment>
    );
};


export default memo(CommentUserThum);

