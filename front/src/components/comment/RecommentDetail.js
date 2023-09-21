
import { Fragment, useEffect, useRef, useState, memo, useContext } from 'react';
import { changeViewDate } from '../../utils/utils';
import Button from '../common/form/Button';
import Popup from '../common/popup/Popup';
import { PiDotsThreeOutlineVerticalDuotone, PiDotsThreeVerticalDuotone, PiPencilSimpleLineDuotone, PiXSquareDuotone  } from "react-icons/pi";
import { timeForToday, getByteLengthOfString } from '../../utils/utils';
import { UserContext } from '../../context/UserContext';
import WriteRequest from '../../reducers/WriteRequest';
import { WriteContext } from '../../context/WriteContext';
import RecommentLike from './RecommentLike';
import RecommentEdit from './RecommentEdit';
import RecommentCreate from './RecommentCreate';
import './RecommentDetail.css';



const RecommentDetail = ({ className = '', idx, align = 'horizon', imgStyle, isId = true, comment, recomment }) => {
    const { state } = useContext(UserContext);
    const { deleteRecomment } = WriteRequest();
    const { WriteState: { writes } , WriteDispatch } = useContext(WriteContext);
    const [selectIdx, setSelectIdx] = useState(0);
    const [ellip, setEllip] = useState(false);
    const [briefly, setBriefly] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [recommentOpen, setRecommentOpen] = useState(false);
    const userInfoRef = useRef(null);
    const contentRef = useRef(null);
    const commentMoreRef = useRef(null);
    
    const handleIndex = idx => {
        setSelectIdx(idx);
        userInfoRef.current.popupOpen();
    };

    const contentHeightSplit = () =>{
        parseInt(window.getComputedStyle(contentRef.current)?.height) > 80 && setEllip(true);
    };

    const handleContentViewOpen = () => {
        setEllip(!ellip) ;
        setBriefly(!briefly);
    };

    const handleOpenCommentMore = () => {
        commentMoreRef.current.popupOpen();
    };

    const handleEditComment = () => {
        setEditOpen(!editOpen);
        commentMoreRef.current.popupClose();
    };

    const handleEleteComment = async () => {
        try {
            if(!window.confirm(`"${recomment.content}" 코멘트를 정말 삭제하시겠습니까?`)) return;
            WriteDispatch({ type: "RECOMMENT_DELETE_REQUEST" })
            await deleteRecomment({
                userId: recomment.user._id._id,
                commentId: comment._id,
                recommentId: recomment._id
            })
            commentMoreRef.current.popupClose();
        } catch(err) {
            console.log(err)
        }
    };

    const handleRecommentState = () => {
        setRecommentOpen(true)
    }

    useEffect(() => {
        contentHeightSplit();
    }, []);

    return (
        <Fragment>
            <article className={`recomment_user_thum_wrap ${className} ${align}`}>
                <div className='recomment_user_thum_inner'>
                    <div className="user_thum_img_wrap" style={imgStyle}>
                        <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${recomment.user?._id.profileImage.key}`} alt="유저 프로필 이미지" />
                    </div>
                    {!editOpen ? (
                        <Fragment>
                            <div className='user_thum_txt_wrap'>
                                <div className='info'>
                                    <Button type={'button'} className={'button_reset hover_type3'} onClick={() => handleIndex(idx)}>
                                        {isId && <span className='user_thum_id'>{recomment.user?._id.id}</span>}
                                        <span className='user_thum_name'>{recomment.user?._id.name}</span>
                                    </Button>
                                    <span className='created_at'>{timeForToday(recomment.createdAt)}</span>
                                    {recomment.modified && <span className='is_update'>(수정됨)</span>}
                                </div>
                                <div className={`cont ${ellip && 'word_ellip_2'}`} ref={contentRef}>
                                    {recomment.targetUser && <span className='target_user'>@{recomment.targetUser?.name}</span>}
                                    {recomment.content}
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
                                <div className='sub'>
                                    <RecommentLike comment={comment} recomment={recomment} />
                                    <Button className={'button_type_txt2 hover_type1'} onClick={handleRecommentState}>답글</Button>
                                </div>
                            </div>
                            {recomment.user._id._id === state.user._id && (
                                 <div className='user_thum_more'>
                                    <Button type={'button'} className={'button_type3 ico_hover_type1'} onClick={handleOpenCommentMore}>
                                        <PiDotsThreeOutlineVerticalDuotone />
                                    </Button>
                                </div>
                            )}
                        </Fragment>
                    ) : (
                        <Fragment>
                            <RecommentEdit comment={comment} recomment={recomment} setEditOpen={setEditOpen} />
                        </Fragment>
                    )}

                    {/* 답글 아래 답글 다시 생성 */}
                    {recommentOpen && <RecommentCreate targetUser={recomment.user._id} comment={comment} setRecommentOpen={setRecommentOpen} />}
        
                    
                    <Popup className={`popup_type_default recomment_more`} isHead={false} dimd={true} ref={commentMoreRef}>
                        <Button className={'button_type3 ico_hover_type1'} onClick={handleEditComment}>
                            <PiPencilSimpleLineDuotone />
                            <span>수정</span>
                        </Button>
                        <Button className={'button_type3 ico_hover_type1 delete'} onClick={handleEleteComment}>
                            <PiXSquareDuotone />
                            <span>삭제</span>
                        </Button>
                    </Popup>
                   
                </div>

              
             
            </article>

            <Popup className={`popup_type_default profile_${selectIdx}`} isHead={true} title={`${recomment.user._id.name}님 회원정보`} closeClick={() => userInfoRef.current.popupClose()} dimd={true} idx={selectIdx} ref={userInfoRef}>
                <div className="user_thum_imgwrap">
                    <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${recomment.user._id.profileImage.key}`} alt="유저 프로필 이미지" />
                </div>
                <div className='user_thum_txtwrap'>
                    <span className='user_thum_name'>{recomment.user._id.name} 님</span>
                    <span className='user_thum_id'>{recomment.user._id.id}</span>
                    <span className='user_thum_email'>{recomment.user._id.email}</span>
                    <span className='user_thum_createdat'>가입일 {changeViewDate(recomment.user._id.createdAt, 'hour')}</span>
                </div>
            </Popup>

        </Fragment>
    );
};


export default memo(RecommentDetail);

