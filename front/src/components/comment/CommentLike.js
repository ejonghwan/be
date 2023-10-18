import { useState, useContext, useCallback, Fragment, memo, useRef } from 'react';
import { PiHeartDuotone } from "react-icons/pi";
import { UserContext } from '../../context/UserContext';
import WriteRequest from '../../reducers/WriteRequest';
import Button from '../common/form/Button';
import _debounce from 'lodash.debounce';
import InfoState from '../common/infoState/InfoState';
import { WriteContext } from '../../context/WriteContext';
import './CommentLike.css';



const CommentLike = ({  comment, className = '' }) => {
    
    const { likeComment, unlikeComment } = WriteRequest();
    const { state } = useContext(UserContext);
    const { WriteDispatch } = useContext(WriteContext);
    const [like, setLike] = useState(() => comment.likes?.filter(likeUser => likeUser === state.user._id).length > 0 ? true : false);
    const likeRef = useRef(false);
    const unlikeRef = useRef(false);

    const handleCommentLike = () => {
        if(!state.isLogged) return alert('좋아요를 하려면 로그인을 먼저 해주세요.');
        likeApi(like);
        setLike(!like);
        unlikeRef.current = false;
        likeRef.current = true;
    };

    const handleCommentUnlike = () => {
        if(!state.isLogged) return alert('좋아요를 취소 하려면 로그인을 먼저 해주세요.');
        likeApi(like);
        setLike(!like);
        likeRef.current = false;
        unlikeRef.current = true;
    };


    // like state는 바로 번경되더라도 실제 요청은 1.5초 후에 클릭되는 상태에 따라 가게 debouce 작업. 
    const likeApi = useCallback(_debounce(async (like) => {
        try {
            if(like) {
                // 라이크 유저에 내가 없으면 내리기 안되게 해야됨
                WriteDispatch({ type: "COMMENT_UNLIKE_REQUEST" });
                if(comment.likes?.filter(likeUser => likeUser === state.user._id).length === 0) return;
                const resUnlike = await unlikeComment({ commentId: comment._id, userId: state.user._id});
                if(resUnlike.data) setLike(!like);
            } else {
                // 라이크 유저에 내가 있으면 올리기 요청 안되게 함
                WriteDispatch({ type: "COMMENT_LIKE_REQUEST" });
                if(comment.likes?.filter(likeUser => likeUser === state.user._id).length > 0) return;
                const resLikeawait = await likeComment({ commentId: comment._id, userId: state.user._id});
                if(resLikeawait.data) setLike(!like);
            };
        } catch(err) {
            console.log(err);
        };
    }, 1000), [comment.likes]);



    return (
        <Fragment>
            <span className={`comment_like_wrap ${className}`}>
                {like && (
                    <Fragment>
                        {likeRef.current && <InfoState text={'좋아요!'}  className='comment' />}
                        <Button type={'button'} className={`button_type3 comment_like ico_hover_type1 like ${like && 'active'}`} onClick={handleCommentUnlike} title={'좋아요 취소'}>
                            <PiHeartDuotone />
                            <span className='blind'>이 글 좋아요 취소</span>
                        </Button>
                    </Fragment>
                )}

                {!like && (
                    <Fragment>
                        {unlikeRef.current && <InfoState text={'좋아요 취소!'} className='comment' />}
                        <Button type={'button'} className={`button_type3 comment_like unlike ico_hover_type1 ${like && 'active'}`} onClick={handleCommentLike} title={'좋아요'}>
                            <PiHeartDuotone />
                            <span className='blind'>이 글 좋아요</span>
                        </Button>
                    </Fragment>
                )}
                 <span className='like_count'>{comment.likeCount}</span>
            </span>
        </Fragment>
    );
};

export default memo(CommentLike);